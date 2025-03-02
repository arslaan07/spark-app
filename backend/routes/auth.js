const express = require('express')
const router = express.Router() 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../middlewares/multer')
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
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
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
            sameSite: 'none',
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
                profileImage: user.profileImage,
                bio: user.bio,
                bannerBackground: user.bannerBackground,
                layout: user.layout,
                buttonStyle: user.buttonStyle,
                buttonColor: user.buttonColor,
                buttonFontColor: user.buttonFontColor,
                font: user.font,
                fontColor: user.fontColor,
                buttonRadius: user.buttonRadius,
                theme: user.theme
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
        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }
        await User.findByIdAndUpdate(req.user.id, { username }, { new: true })
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
        const { fname, lname, email, oldPassword, newPassword, password } = req.body;
        const userId = req.user.id;

        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let isUpdated = false;

        // Update first name and last name
        if (fname) {
            user.firstName = fname;
            isUpdated = true;
        }
        if (lname) {
            user.lastName = lname;
            isUpdated = true;
        }

        // Handle email and password updates (Requires password verification)
        if (email && email !== user.email) {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: "Password is required to change email"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect password"
                });
            }

            user.email = email;
            isUpdated = true;
        }

        // Handle password change (Requires oldPassword)
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Old password is required to set a new password"
                });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect old password"
                });
            }

            if (newPassword === oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: "New password cannot be the same as the old password"
                });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
            isUpdated = true;
        }

        // Save changes if any updates were made
        if (isUpdated) {
            await user.save();
        }

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


router.put('/update-user-card', verifyToken, upload.single('profileImage'), async (req, res) => {
    try {
        const { username, bio, bannerBackground, layout, buttonStyle, buttonColor,
            buttonFontColor, font, fontColor, buttonRadius, theme, profileImage
        } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let isUpdated = false;

        if (req.file) {
            user.profileImage = `/images/uploads/${req.file.filename}`;
            isUpdated = true;
        }
        if(profileImage) {
            user.profileImage = null;
            isUpdated = true;
        }
        if (username && user.username !== username) {
            user.username = username;
            isUpdated = true;
        }

        if (bio && user.bio !== bio) {
            user.bio = bio;
            isUpdated = true;
        }

        if (bannerBackground && user.bannerBackground !== bannerBackground) {
            user.bannerBackground = bannerBackground;
            isUpdated = true;
        }

        if (layout && user.layout !== layout) {
            user.layout = layout;
            isUpdated = true;
        }

        if (buttonStyle && user.buttonStyle !== buttonStyle) {
            user.buttonStyle = buttonStyle;
            isUpdated = true;
        }

        if (buttonColor && user.buttonColor !== buttonColor) {
            user.buttonColor = buttonColor;
            isUpdated = true;
        }

        if (buttonFontColor && user.buttonFontColor !== buttonFontColor) {
            user.buttonFontColor = buttonFontColor;
            isUpdated = true;
        }

        if (font && user.font !== font) {
            user.font = font;
            isUpdated = true;
        }

        if (fontColor && user.fontColor !== fontColor) {
            user.fontColor = fontColor;
            isUpdated = true;
        }

        if (buttonRadius && user.buttonRadius !== buttonRadius) {
            user.buttonRadius = buttonRadius;
            isUpdated = true;
        }

        if (theme && user.theme !== theme) {
            user.theme = theme;
            isUpdated = true;
        }

        if (!isUpdated) {
            return res.status(204).json({
                success: false,
                message: "No updates provided"
            });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User card updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                bio: user.bio,
                bannerBackground: user.bannerBackground,
                layout: user.layout,
                buttonStyle: user.buttonStyle,
                buttonColor: user.buttonColor,
                buttonFontColor: user.buttonFontColor,
                font: user.font,
                fontColor: user.fontColor,
                buttonRadius: user.buttonRadius,
                theme: user.theme
            }
        });

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            success: false,
            message: "User card update failed",
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