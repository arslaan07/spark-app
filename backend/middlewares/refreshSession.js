const jwt = require('jsonwebtoken')
const User = require('../models/user')

const refreshSession = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken 
        if(!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token not found'
            })
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.id)
        if(!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({
                success: false,
                message: 'Invalid refresh token'
            })
        }
        // console.log('Creating a new Session Token ...')
        // Create new session token
        const sessionToken = jwt.sign(
            { id: user._id },
            process.env.SESSION_TOKEN_SECRET,
            { expiresIn: '15m' }
          );
          // Send new session token to client
        res.cookie('sessionToken', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 15 * 60 * 1000,
          });
          res.status(200).json({ success: true });
    } catch (error) {
        res.status(401).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
}

module.exports = refreshSession