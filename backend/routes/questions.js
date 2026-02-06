const express = require('express');
const auth = require('../middleware/auth');
const { questionBank } = require('../data/questionBank');

const router = express.Router();

// Get questions by exam type, subject, and optional test number
router.get('/:examType/:subject/:testNumber?', auth, async (req, res) => {
    try {
        const { examType, subject, testNumber } = req.params;
        const { count = 10 } = req.query;

        // Convert examType to lowercase for consistent lookup
        const normalizedExamType = examType.toLowerCase();
        const normalizedSubject = subject.toLowerCase();

        let questions = questionBank[normalizedExamType]?.[normalizedSubject];
        if (!questions) {
            return res.status(404).json({ message: 'Questions not found' });
        }

        // If test number is specified, get questions from that specific test
        if (testNumber) {
            const testKey = `test${testNumber}`;
            if (questions[testKey]) {
                // Questions are already in the test format (array of 10)
                questions = questions[testKey];
            } else {
                return res.status(404).json({ message: `Test ${testNumber} not found` });
            }
        } else {
            // If no test number, flatten all questions from all tests
            if (Array.isArray(questions)) {
                // Old format - just use as is
            } else if (typeof questions === 'object' && questions.test1) {
                // New format - flatten all test questions
                questions = Object.keys(questions)
                    .sort((a, b) => {
                        const numA = parseInt(a.replace('test', ''));
                        const numB = parseInt(b.replace('test', ''));
                        return numA - numB;
                    })
                    .reduce((acc, key) => [...acc, ...questions[key]], []);
            }
        }

        // Return requested number of questions (or all if test number specified)
        const selectedQuestions = testNumber ? questions : questions.sort(() => 0.5 - Math.random()).slice(0, parseInt(count));

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
