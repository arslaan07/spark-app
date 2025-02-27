const express = require('express')
const router = express.Router() 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const verifyToken = require('../middlewares/verifyToken')
// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { fname, lname, email, password, confirmPassword } = req.body;
        // console.log(req.body)

        if (!fname || !lname || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(userInitials)
        const user = await User.create({
            firstName: fname,
            lastName: lname,
            email,
            password: hashedPassword,
        });
        console.log('hello')
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: null,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
});

// Login Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
});
router.post('/set-username', verifyToken, async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { username }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Username updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Username update failed",
            error: error.message
        });
    }
})

router.put('/update-user', verifyToken, async (req, res) => {
    try {
        // Extract data from request body
        const { fname, lname, email, oldPassword, newPassword } = req.body;
        const userId = req.user.id; // Assuming verifyToken middleware sets req.user.id
        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found"
            });
        }

        // Track if any updates are made
        let isUpdated = false; 

        // Update fname and lname if provided (no restrictions)
        if (fname) {
            user.firstName = fname;
            isUpdated = true;
        }

        if (lname) {
            user.lastName = lname;
            isUpdated = true;
        }
        // Handle email and password updates (requires oldPassword)
        if (oldPassword) {

            // Verify old password (assuming User model has a method to compare passwords)
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password); // You’ll need bcrypt or similar
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect old password"
                });
            }

            // Update email if provided
            if (email) {
                user.email = email;
                isUpdated = true;
            }

            // Update password if newPassword is provided
            if (newPassword) {
                if(newPassword === oldPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "New password cannot be the same as the old password"
                    });
                }
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(newPassword, salt); // Hash the new password
                isUpdated = true;
            }
        } else if ((email && email !== user.email) || newPassword) {

            // If email or newPassword is provided without oldPassword, reject the request
            return res.status(400).json({
                success: false,
                message: "Old password is required to update email or password"
            });
        }

        // Save changes if any updates were made
        if (isUpdated) {
            await user.save();
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User update failed",
            error: error.message
        });
    }
});
router.get('/logout', verifyToken, (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: process.env.NODE_ENV === 'production',
            expires: new Date(0)
        });
        res.json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
});

module.exports = router