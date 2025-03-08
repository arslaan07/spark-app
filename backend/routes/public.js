const express = require('express')
const router = express.Router() 
const User = require('../models/user')
const Link = require('../models/link')
const Shop = require('../models/shop');

router.get('/:username', async (req, res) => {
    try {
    const user = await User.findOne({ username: req.params.username })
        .select('-firstName -lastName -email -password -refreshToken -resetPasswordToken -resetPasswordExpires');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch links and shops related to this user
      const links = await Link.find({ userId: user._id })
      .select('-clickData -createdAt -updatedAt -userId');

      const shops = await Shop.find({ userId: user._id })
      .select('-clickData -createdAt -updatedAt -userId');
      // Convert user to a plain object and remove _id
      const userObject = user.toObject();
      delete userObject._id;
      // Return the combined data
      return res.status(200).json({
        ...userObject,
        links,
        shops
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router