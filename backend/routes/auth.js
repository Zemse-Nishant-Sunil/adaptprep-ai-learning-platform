const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserData = require('../models/UserData');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, examType, avatar } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Validate examType
        if (!examType || !['jee', 'neet'].includes(examType.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid exam type. Must be "jee" or "neet"' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user with avatar
        const user = new User({ 
            name, 
            email, 
            password, 
            examType: examType.toLowerCase(),
            avatar: avatar || 'avatar_1.jpg'
        });
        await user.save();

        // Create user data
        const userData = new UserData({ userId: user._id });
        await userData.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                examType: user.examType,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                examType: user.examType,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
