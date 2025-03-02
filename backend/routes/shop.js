const express = require('express');
const Shop = require('../models/shop');
const verifyToken = require('../middlewares/verifyToken');
const { parseUserAgent } = require('../utils/userAgentParser');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
      const { title, url, isActive } = req.body;
      
      const shop = await Shop.create({
        userId: req.user.id,
        title,
        url,
        isActive
      });
      
      res.status(201).json({
        success: true,
        message: 'Shop link created successfully',
        shop: shop
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating shop link',
        error: error.message
       });
    }
  });
  
  // Get all shop links for a user
  router.get('/', verifyToken, async (req, res) => {
    try {
      const shops = await Shop.find({ userId: req.user.id });
      return res.status(200).json({
        success: true,
        message: 'shops retrieved successfully',
        shops: shops
      })
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Error retrieving shops',
        error: error.message
       });
    }
  });
  
  // Update a shop link
  router.put('/:id', verifyToken, async (req, res) => {
    try {
      const { title, url, isActive } = req.body;
      
      const shop = await Shop.findById(req.params.id);
      if (!shop) return res.status(404).json({ message: 'Shop link not found' });
      
      // Verify ownership
      if (shop.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const updatedShop = await Shop.findByIdAndUpdate(
        req.params.id,
        { title, url, isActive },
        { new: true }
      );
      
      res.json(updatedShop);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a shop link
  router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id);
      if (!shop) return res.status(404).json({ message: 'Shop link not found' });
      
      // Verify ownership
      if (shop.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      await Shop.findByIdAndDelete(req.params.id);
      res.json({ message: 'Shop link deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Record a click
  router.post('/:id/click', async (req, res) => {
    try {
      const { ipAddress, userAgent, device, os, referrer } = req.body;
      
      const shop = await Shop.findById(req.params.id);
      if (!shop) return res.status(404).json({ message: 'Shop link not found' });
      
      // Add click data
      shop.clickData.push({ 
        timestamp: new Date(),
        ipAddress, 
        userAgent, 
        device,
        os,
        referrer
      });
      
      await shop.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/:url/track-click', async (req, res) => {
    try {
        const { url } = req.params;
        const { referrer } = req.body;
        const existingShop = await Shop.findOne({ url });

        if (!existingShop) {
            return res.status(404).json({ 
                success: false,
                message: 'Link not found'
            });
        }

        let redirectUrl = existingShop.url;
        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
            redirectUrl = 'https://' + redirectUrl;
        }


        const userAgent = req.headers["user-agent"];
        const { device, os } = parseUserAgent(userAgent);

        const clientIP = req.headers["x-forwarded-for"]?.split(',')[0] || 
                         req.socket?.remoteAddress || 
                         req.ip || 
                         "Unknown";

        // **Check if user has a tracking cookie**
        let userIdentifier = req.cookies["click-tracker"]; // Read cookie

        // **Check if this user (IP or Cookie) has already clicked**
        const alreadyClicked = existingShop.clickData.some(click => 
            click.ipAddress === clientIP || click.userIdentifier === userIdentifier
        );

        // if (!alreadyClicked) {
        //     if (!userIdentifier) {
        //         // If no cookie, generate a new unique identifier
        //         userIdentifier = Math.random().toString(36).substring(2) + Date.now();
        //         res.cookie("click-tracker", userIdentifier, {
        //             httpOnly: true,
        //             maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
        //         });
        //     }

            existingShop.clickData.push({
                ipAddress: clientIP,
                userIdentifier,
                timestamp: new Date(),
                userAgent, 
                device,
                os,
                referrer,
            });

            await existingShop.save();
        // } else {
        //     console.log(`User ${clientIP} (or cookie) has already clicked, ignoring duplicate.`);
        // }

        res.status(200).json({ success: true, redirectUrl: redirectUrl});
    } catch (error) {
        console.error('Error tracking click:', error);
        res.status(500).json({ message: 'Error tracking click' });
    }
});
  
module.exports = router