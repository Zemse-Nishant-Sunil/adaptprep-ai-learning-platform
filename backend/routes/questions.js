const express = require('express');
const auth = require('../middleware/auth');
const { questionBank } = require('../data/questionBank');

const router = express.Router();

// Get questions by exam type and subject
router.get('/:examType/:subject', auth, async (req, res) => {
    try {
        const { examType, subject } = req.params;
        const { count = 10 } = req.query;

        const questions = questionBank[examType]?.[subject];
        if (!questions) {
            return res.status(404).json({ message: 'Questions not found' });
        }

        // Shuffle and return requested number of questions
        const shuffled = questions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, parseInt(count));

        res.json({ questions: selectedQuestions });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all available exam types and subjects
router.get('/', auth, async (req, res) => {
    try {
        const structure = {};
        Object.keys(questionBank).forEach(examType => {
            structure[examType] = Object.keys(questionBank[examType]);
        });

        res.json(structure);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
