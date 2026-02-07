const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const UserData = require('../models/UserData');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const userData = await UserData.findOne({ userId: req.user._id });
        if (!userData) {
            return res.status(404).json({ message: 'User data not found' });
        }

        res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                examType: req.user.examType,
                avatar: req.user.avatar,
                createdAt: req.user.createdAt
            },
            userData: {
                ...userData.toObject(),
                currentStreak: userData.currentStreak || 0,
                maxStreak: userData.maxStreak || 0,
                lastTestDate: userData.lastTestDate
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update user profile (name and avatar only, not examType)
router.put('/profile', auth, async (req, res) => {
    try {
        const { name, avatar } = req.body;

        // Only allow updating name and avatar
        const updateData = {};
        
        if (name) {
            if (name.length < 2) {
                return res.status(400).json({ message: 'Name must be at least 2 characters' });
            }
            updateData.name = name;
        }

        if (avatar) {
            // Validate avatar filename (should be like avatar_1.jpg to avatar_10.jpg)
            if (!/^avatar_\d{1,2}\.jpg$/.test(avatar)) {
                return res.status(400).json({ message: 'Invalid avatar filename' });
            }
            updateData.avatar = avatar;
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                examType: user.examType,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Save test results
router.post('/test-results', auth, async (req, res) => {
    try {
        let { examType, subject, testNumber, rawScore, correctAnswers, incorrectAnswers, skipped, totalQuestions, timeTaken, questionStatuses, questionDetails } = req.body;

        // Validate and set defaults for required fields
        totalQuestions = parseInt(totalQuestions) || 0;
        correctAnswers = parseInt(correctAnswers) || 0;
        incorrectAnswers = parseInt(incorrectAnswers) || 0;
        skipped = parseInt(skipped) || 0;
        rawScore = parseInt(rawScore) || 0;
        timeTaken = parseInt(timeTaken) || 0;
        testNumber = parseInt(testNumber) || 1;
        examType = examType || 'jee';
        subject = subject || 'Physics';

        // Validate that we have at least totalQuestions
        if (totalQuestions <= 0) {
            return res.status(400).json({ message: 'totalQuestions must be greater than 0' });
        }

        let userData = await UserData.findOne({ userId: req.user._id });
        if (!userData) {
            userData = new UserData({ userId: req.user._id });
        }

        // Calculate accuracy safely
        const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        // Build test result object with all fields including questionDetails
        const testResultObj = {
            examType,
            subject,
            testNumber,
            rawScore,
            correctAnswers,
            incorrectAnswers,
            skipped,
            totalQuestions,
            timeTaken,
            accuracy: accuracy || 0,
            questionStatuses: questionStatuses || [],
            questionDetails: questionDetails || [] // IMPORTANT: Save actual question data
        };

        // Add test result with all required fields and defaults
        userData.testResults.push(testResultObj);

        // UPDATE STREAK LOGIC
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!userData.lastTestDate) {
            // First test ever
            userData.currentStreak = 1;
            userData.maxStreak = 1;
        } else {
            const lastTest = new Date(userData.lastTestDate);
            lastTest.setHours(0, 0, 0, 0);
            
            const diffTime = today - lastTest;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                // Test taken today already, don't change streak
            } else if (diffDays === 1) {
                // Test taken yesterday, increment streak
                userData.currentStreak += 1;
                if (userData.currentStreak > userData.maxStreak) {
                    userData.maxStreak = userData.currentStreak;
                }
            } else {
                // Streak broken, reset to 1
                userData.currentStreak = 1;
            }
        }
        
        // Record today's test in streak history
        userData.lastTestDate = today;
        userData.streakHistory.push({
            date: today,
            status: 'completed'
        });

        // Update statistics
        userData.totalTests = userData.testResults.length;
        const scoreSum = userData.testResults.reduce((acc, test) => acc + (test.accuracy || 0), 0);
        userData.averageScore = userData.testResults.length > 0 ? scoreSum / userData.testResults.length : 0;
        
        // Ensure averageScore is not NaN
        if (!isFinite(userData.averageScore)) {
            userData.averageScore = 0;
        }

        // Update subject performance
        const subjectScores = userData.testResults
            .filter(test => test.subject === subject)
            .map(test => test.accuracy || 0);

        const avgSubjectScore = subjectScores.length > 0 ? subjectScores.reduce((a, b) => a + b) / subjectScores.length : 0;

        if (avgSubjectScore >= 70) {
            userData.strongSubjects = [...new Set([...userData.strongSubjects, subject])];
            userData.weakSubjects = userData.weakSubjects.filter(s => s !== subject);
        } else if (avgSubjectScore < 50) {
            userData.weakSubjects = [...new Set([...userData.weakSubjects, subject])];
            userData.strongSubjects = userData.strongSubjects.filter(s => s !== subject);
        }

        userData.lastUpdated = new Date();
        await userData.save();

        res.json({ 
            message: 'Test results saved successfully', 
            userData,
            streak: userData.currentStreak || 0,
            maxStreak: userData.maxStreak || 0
        });
    } catch (error) {
        console.error('❌ Test results save error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
