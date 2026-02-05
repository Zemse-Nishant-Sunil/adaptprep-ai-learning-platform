const express = require('express');
const auth = require('../middleware/auth');
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
                email: req.user.email,
                examType: req.user.examType
            },
            userData
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Save test results
router.post('/test-results', auth, async (req, res) => {
    try {
        const { examType, subject, score, totalQuestions, timeTaken } = req.body;

        let userData = await UserData.findOne({ userId: req.user._id });
        if (!userData) {
            userData = new UserData({ userId: req.user._id });
        }

        // Add test result
        userData.testResults.push({
            examType,
            subject,
            score,
            totalQuestions,
            timeTaken
        });

        // Update statistics
        userData.totalTests += 1;
        userData.averageScore = userData.testResults.reduce((acc, test) =>
            acc + (test.score / test.totalQuestions * 100), 0) / userData.testResults.length;

        // Update subject performance
        const subjectScores = userData.testResults
            .filter(test => test.subject === subject)
            .map(test => test.score / test.totalQuestions * 100);

        const avgSubjectScore = subjectScores.reduce((a, b) => a + b) / subjectScores.length;

        if (avgSubjectScore >= 70) {
            userData.strongSubjects = [...new Set([...userData.strongSubjects, subject])];
            userData.weakSubjects = userData.weakSubjects.filter(s => s !== subject);
        } else if (avgSubjectScore < 50) {
            userData.weakSubjects = [...new Set([...userData.weakSubjects, subject])];
            userData.strongSubjects = userData.strongSubjects.filter(s => s !== subject);
        }

        userData.lastUpdated = new Date();
        await userData.save();

        res.json({ message: 'Test results saved successfully', userData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
