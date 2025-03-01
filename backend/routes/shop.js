const express = require('express');
const Shop = require('../models/shop');
const verifyToken = require('../middlewares/verifyToken')
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

  
module.exports = router