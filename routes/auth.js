const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

// Validate Google client ID
if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID environment variable is required');
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Sign In
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        
        if (!token) {
            console.error('No token provided');
            return res.status(400).json({ error: 'No token provided' });
        }

        // Verify the token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        }).catch(error => {
            console.error('Token verification failed:', error);
            throw new Error('Failed to verify Google token');
        });

        const payload = ticket.getPayload();
        console.log('Google auth payload:', payload);

        if (!payload || !payload.email) {
            console.error('Invalid payload received');
            return res.status(400).json({ error: 'Invalid Google token payload' });
        }

        const { name, email, picture, sub: googleId } = payload;

        // Find or create user
        let user = await User.findOne({ email });
        
        if (!user) {
            console.log('Creating new user:', email);
            user = new User({
                name,
                email,
                googleId,
                picture,
                googleAuth: {
                    accessToken: token,
                    expiryDate: new Date(Date.now() + 3600000)
                }
            });
            await user.save();
        } else {
            console.log('Updating existing user:', email);
            user.name = name;
            user.picture = picture;
            user.googleId = googleId;
            user.googleAuth = {
                accessToken: token,
                expiryDate: new Date(Date.now() + 3600000)
            };
            await user.save();
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response
        res.json({
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
    } catch (error) {
        console.error('Google authentication error:', error);
        res.status(500).json({ 
            error: error.message || 'Authentication failed',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Regular Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });
        
        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        
        // Create new user
        user = new User({ 
            name, 
            email, 
            password // Will be hashed by the pre-save middleware
        });
        
        await user.save();
        
        res.status(201).json({ 
            success: true,
            message: 'Signup successful! Please login.'
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Signup failed. Please try again.' });
    }
});

// Check authorization status
router.get('/status', async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: "Access Denied" });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.userId);
        
        if (!user) return res.status(404).json({ error: "User not found" });
        
        res.json({ 
            isEmailAuthorized: user.isEmailAuthorized,
            email: user.email 
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
});

module.exports = router;
