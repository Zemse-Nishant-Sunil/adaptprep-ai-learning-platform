const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');
const User = require('../models/User');
const UserData = require('../models/UserData');

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

console.log(UserData)
// Utility function to fetch user data for context
const getUserContext = async (userId) => {
    try {
        const user = await User.findById(userId);
        const userData = await UserData.findOne({ userId });
        console.log(UserData)

        // Get incorrect questions from all tests
        const incorrectQuestions = [];
        if (userData?.testResults && userData.testResults.length > 0) {
            userData.testResults.forEach(test => {
                if (test.questionDetails && test.questionDetails.length > 0) {
                    const incorrect = test.questionDetails.filter(q => q.status === 'incorrect');
                    incorrectQuestions.push(...incorrect);
                }
            });
        }

        return {
            name: user?.name || 'Student',
            examType: user?.examType || 'jee',
            totalTests: userData?.totalTests || 0,
            averageScore: userData?.averageScore || 0,
            strongSubjects: userData?.strongSubjects || [],
            weakSubjects: userData?.weakSubjects || [],
            currentStreak: userData?.currentStreak || 0,
            maxStreak: userData?.maxStreak || 0,
            testResults: userData?.testResults?.slice(-5) || [], // Last 5 tests
            incorrectQuestions: incorrectQuestions.slice(-10) // Last 10 incorrect questions
        };
    } catch (error) {
        console.error('Error fetching user context:', error);
        return {};
    }
};

// Create or get active chat session
router.post('/session', auth, async (req, res) => {
    try {
        const { examType, subject, topic } = req.body;

        // Check if active session exists
        let session = await Chat.findOne({
            userId: req.user._id,
            isActive: true
        });

        if (!session) {
            session = new Chat({
                userId: req.user._id,
                examType: examType || 'jee',
                subject: subject || '',
                topic: topic || '',
                messages: [],
                isActive: true
            });
            await session.save();
        }

        res.json({
            sessionId: session._id,
            messages: session.messages
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating chat session', error: error.message });
    }
});

// Send message to chatbot
router.post('/message', auth, async (req, res) => {
    try {
        const { sessionId, message } = req.body;

        if (!sessionId || !message) {
            return res.status(400).json({ message: 'Session ID and message are required' });
        }

        // Get chat session
        const session = await Chat.findOne({
            _id: sessionId,
            userId: req.user._id
        });

        if (!session) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        // Add user message to session
        session.messages.push({
            role: 'user',
            content: message
        });

        // Get user context for the AI
        const userContext = await getUserContext(req.user._id);

        // Build system prompt with user context
        const systemPrompt = `You are an expert AI tutor and student performance analyzer for ${userContext.examType?.toUpperCase() || 'JEE/NEET'} exam preparation. Your role is to:

1. Help students understand concepts and solve problems
2. Analyze their performance based on their test results
3. Provide personalized study recommendations
4. Explain topics in simple, understandable language
5. Suggest weak areas that need more focus
6. Motivate students to improve their performance
7. Help them learn from mistakes in incorrect questions

Student Context:
- Name: ${userContext.name}
- Exam Type: ${userContext.examType}
- Total Tests Taken: ${userContext.totalTests}
- Average Score: ${userContext.averageScore?.toFixed(2) || 'N/A'}
- Strong Subjects: ${userContext.strongSubjects?.join(', ') || 'Not determined yet'}
- Weak Subjects: ${userContext.weakSubjects?.join(', ') || 'Not determined yet'}
- Current Study Streak: ${userContext.currentStreak} days
- Best Streak Achieved: ${userContext.maxStreak} days
- Session Topic: ${session.topic || 'General'}
- Subject: ${session.subject || 'General'}

Recent Incorrect Questions (to help focus improvement):
${userContext.incorrectQuestions?.map((q, i) =>
            `${i + 1}. Topic: ${q.topic}, Status: Incorrect, 
    Correct Answer: ${q.correctAnswer}, User Answer: ${q.userAnswer}`
        ).join('\n') || 'No incorrect questions yet - keep up the good work!'}

Be encouraging, patient, and focus on helping them learn effectively. Provide concise answers but go into detail when needed. Reference their incorrect questions when relevant to help them improve.`;

        // Prepare messages for Gemini API
        const messages = session.messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        try {
            // Call Gemini API
            // Convert messages to Gemini format
            const geminiMessages = [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }]
                },
                ...messages.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }))
            ];

            const response = await axios.post(
                `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
                {
                    contents: geminiMessages,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const assistantMessage = response.data.candidates[0].content.parts[0].text;

            // Add assistant message to session
            session.messages.push({
                role: 'assistant',
                content: assistantMessage
            });

            session.updatedAt = new Date();
            await session.save();

            res.json({
                message: assistantMessage,
                sessionId: session._id
            });
        } catch (apiError) {
            console.error('Gemini API Error:', apiError.response?.data || apiError.message);
            res.status(500).json({
                message: 'Error communicating with AI service',
                error: apiError.response?.data?.error?.message || apiError.message
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing message', error: error.message });
    }
});

// Get chat history
router.get('/history/:sessionId', auth, async (req, res) => {
    try {
        const session = await Chat.findOne({
            _id: req.params.sessionId,
            userId: req.user._id
        });

        if (!session) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        res.json({
            sessionId: session._id,
            messages: session.messages,
            examType: session.examType,
            subject: session.subject,
            topic: session.topic,
            createdAt: session.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat history', error: error.message });
    }
});

// Get all chat sessions for user
router.get('/sessions', auth, async (req, res) => {
    try {
        const sessions = await Chat.find({
            userId: req.user._id
        }).sort({ updatedAt: -1 });

        res.json({
            sessions: sessions.map(s => ({
                id: s._id,
                examType: s.examType,
                subject: s.subject,
                topic: s.topic,
                isActive: s.isActive,
                lastMessage: s.messages[s.messages.length - 1]?.content?.substring(0, 50) || 'No messages',
                createdAt: s.createdAt,
                updatedAt: s.updatedAt
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sessions', error: error.message });
    }
});

// Close chat session
router.put('/session/:sessionId/close', auth, async (req, res) => {
    try {
        const session = await Chat.findOne({
            _id: req.params.sessionId,
            userId: req.user._id
        });

        if (!session) {
            return res.status(404).json({ message: 'Chat session not found' });
        }

        session.isActive = false;
        await session.save();

        res.json({ message: 'Session closed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error closing session', error: error.message });
    }
});

module.exports = router;
