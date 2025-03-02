const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const Link = require('../models/link');
const { parseUserAgent } = require('../utils/userAgentParser');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
      const { title, url, application, isActive } = req.body;
    //   console.log(url)
      const link = await Link.create({
        userId: req.user.id,
        title,
        url,
        application,
        isActive,
      });
      
      res.status(200).json({
        success: true,
        message: 'Link created successfully',
        link: {
            id: link._id,
            title: link.title,
            url: link.url,
            application: link.application,
            isActive: link.isActive,
          }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create link',
        error: error.message,
      });
    }
  });

  // Get all links for a user
router.get('/', verifyToken, async (req, res) => {
    try {
      const links = await Link.find({ userId: req.user.id });
      return res.status(200).json({
        success: true,
        message: 'Links retrieved successfully',
        links: links
      })
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Failed to get links',
        error: error.message,
       });
    }
  });

  // Delete a link
router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) return res.status(404).json({ 
        success: false,
        message: 'Link not found',
       });
      
      // Verify ownership
      if (link.userId.toString() !== req.user.id) {
        return res.status(403).json({ 
            success: false,
            message: 'Not authorized to delete this link',
         });
      }
      
      await Link.findByIdAndDelete(req.params.id);
      res.json({ 
        success: true,
        message: 'Link deleted successfully',
       });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete link',
        error: error.message,
       });
    }
  });

    // Update a link
router.put('/:id', verifyToken, async (req, res) => {
    try {
      const { title, url, isActive } = req.body;
      const link = await Link.findById(req.params.id);
      if (!link) return res.status(404).json({ message: 'Link not found' });
      
      // Verify ownership
      if (link.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      await Link.findByIdAndUpdate(req.params.id, {
        title,
        url,
        isActive,
      },
      { new: true }
    );
      return res.status(200).json({
        success: true,
        message: 'Link updated successfully',
        link: link,
      })
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Failed to update link',
        error: error.message,
       });
    }
  });

  // Delete a link
router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) return res.status(404).json({ message: 'Link not found' });
      
      // Verify ownership
      if (link.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      await Link.findByIdAndDelete(req.params.id);
      res.json({ message: 'Link deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/:url/track-click', async (req, res) => {
    try {
        const { url } = req.params;
        const { referrer } = req.body;
        const existingLink = await Link.findOne({ url });

        if (!existingLink) {
            return res.status(404).json({ 
                success: false,
                message: 'Link not found'
            });
        }

        let redirectUrl = existingLink.url;
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
        const alreadyClicked = existingLink.clickData.some(click => 
            click.ipAddress === clientIP || click.userIdentifier === userIdentifier
        );

        // if (!alreadyClicked) {
        //     if (!userIdentifier) {
        //         userIdentifier = Math.random().toString(36).substring(2) + Date.now();
        //         res.cookie("click-tracker", userIdentifier, {
        //             httpOnly: true,
        //             maxAge: 30 * 24 * 60 * 60 * 1000, 
        //         });
        //     }

            existingLink.clickData.push({
                ipAddress: clientIP,
                userIdentifier,
                timestamp: new Date(),
                userAgent, 
                device,
                os,
                referrer,
            });

            await existingLink.save();
        // } else {
        //     console.log(`User ${clientIP} (or cookie) has already clicked, ignoring duplicate.`);
        // }

        res.status(200).json({ success: true, redirectUrl: redirectUrl });
    } catch (error) {
        console.error('Error tracking click:', error);
        res.status(500).json({ message: 'Error tracking click' });
    }
});

module.exports = router