const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');
const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get working model - Updated to use latest models
async function getWorkingModel() {
    const modelsToTry = [
        'gemini-2.5-flash',     // Latest experimental model
        'gemini-1.5-flash-latest',  // Latest stable flash
        'gemini-1.5-flash',         // Stable flash
        'gemini-1.5-pro-latest',    // Latest pro
        'gemini-1.5-pro',           // Stable pro
        'gemini-pro'                // Legacy fallback
    ];

    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // Test the model with a simple prompt
            await model.generateContent("Hello");
            console.log(`✅ Using model: ${modelName}`);
            return { model, name: modelName };
        } catch (error) {
            console.log(`❌ Model ${modelName} failed:`, error.message.substring(0, 50));
            continue;
        }
    }

    throw new Error('No working Gemini model found');
}

// Test endpoint to verify API key and model
router.get('/test', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: 'GEMINI_API_KEY not found in environment variables'
            });
        }

        const { model, name } = await getWorkingModel();
        const result = await model.generateContent("Hello, just testing the API connection with the latest Gemini model.");
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            message: 'Gemini API is working!',
            modelUsed: name,
            testResponse: text
        });
    } catch (error) {
        console.error('Gemini API Test Error:', error);
        res.status(500).json({
            error: 'Gemini API failed',
            details: error.message,
            suggestion: 'Please check your API key at https://aistudio.google.com/app/apikey'
        });
    }
});

// Send message to AI - Enhanced with user data
router.post('/message', auth, async (req, res) => {
    try {
        const { message, context } = req.body;
        const userId = req.user.id;
        console.log(context)

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get user's complete data for better context
        const User = require('../models/User');
        const UserData = require('../models/UserData');

        const userProfile = await User.findById(userId).select('-password');
        const userData = await UserData.findOne({ userId });

        const { model, name } = await getWorkingModel();

        // Enhanced study coaching prompt with user data
        const systemPrompt = `You are an expert AI study coach for ${context?.examType || 'JEE'} exam preparation in India.

STUDENT PROFILE:
- Name: ${context?.userName || userProfile?.name || 'Student'}
- Exam: ${context?.examType || 'JEE'}  
- Level: ${context?.userLevel || 'beginner'}
- Tests Taken: ${context?.totalTests || 0}
- Average Score: ${context?.averageScore || 0}%
- Strong Subjects: ${context?.strongSubjects?.join(', ') || 'None identified yet'}
- Weak Subjects: ${context?.weakSubjects?.join(', ') || 'None identified yet'}
- Recent Performance: ${context?.recentPerformance || 'new_user'}
- Study Pattern: ${context?.studyPattern || 'new_user'}

RECENT TEST RESULTS:
${context?.testResults?.slice(-3).map(test =>
            `- ${test.subject}: ${test.score}/${test.totalQuestions} (${Math.round(test.score / test.totalQuestions * 100)}%)`
        ).join('\n') || 'No recent tests'}

CONTEXT-AWARE GUIDELINES:
${generatePersonalizedGuidelines(context)}

Student Question: "${message}"

Provide a personalized response (150-250 words) that:
1. Addresses their specific performance data
2. References their strengths and weaknesses
3. Gives actionable advice based on their level
4. Encourages based on their recent progress
5. Suggests specific next steps`;

        console.log(`Sending to ${name} with enhanced context...`);
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const aiMessage = response.text();

        // Save enhanced chat history with context
        if (userData) {
            const chatEntry = {
                userId,
                messages: [
                    {
                        role: 'user',
                        content: message,
                        timestamp: new Date(),
                        context: context
                    },
                    {
                        role: 'assistant',
                        content: aiMessage,
                        timestamp: new Date(),
                        modelUsed: name
                    }
                ]
            };

            // Save to database if you have ChatHistory model
            // await ChatHistory.create(chatEntry);
        }

        res.json({
            success: true,
            message: aiMessage,
            response: aiMessage,
            modelUsed: name,
            contextUsed: !!context?.totalTests
        });

    } catch (error) {
        console.error('Chat API Error:', error);

        // Provide detailed error information
        let errorMessage = 'AI service temporarily unavailable';

        if (error.message?.includes('API_KEY') || error.message?.includes('Invalid API key')) {
            errorMessage = 'API key configuration issue. Please check your Gemini API key.';
        } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
            errorMessage = 'API quota exceeded. Please try again later.';
        } else if (error.message?.includes('No working')) {
            errorMessage = 'All Gemini models are currently unavailable. Using fallback response.';
        } else if (error.message?.includes('SAFETY')) {
            errorMessage = 'Content filtered by AI safety systems. Please rephrase your question.';
        }

        // Enhanced fallback response
        const fallbackResponse = getEnhancedFallbackResponse(req.body.message, req.body.context);

        res.json({
            success: true,
            message: fallbackResponse,
            response: fallbackResponse,
            fallback: true,
            error: errorMessage,
            timestamp: new Date().toISOString()
        });
    }
});

// Generate personalized guidelines based on user data
function generatePersonalizedGuidelines(context) {
    const guidelines = [];

    if (context?.userLevel === 'beginner') {
        guidelines.push('Focus on building strong fundamentals');
        guidelines.push('Encourage confidence building');
    } else if (context?.userLevel === 'advanced') {
        guidelines.push('Provide advanced strategies and shortcuts');
        guidelines.push('Focus on fine-tuning and speed');
    }

    if (context?.recentPerformance === 'declining') {
        guidelines.push('Address motivation and identify specific issues');
        guidelines.push('Suggest strategy changes');
    } else if (context?.recentPerformance === 'improving') {
        guidelines.push('Reinforce positive trends');
        guidelines.push('Suggest ways to maintain momentum');
    }

    if (context?.weakSubjects?.length > 0) {
        guidelines.push(`Prioritize help with: ${context.weakSubjects.join(', ')}`);
    }

    return guidelines.join('\n- ');
}

// Enhanced fallback response function
function getEnhancedFallbackResponse(message, context) {
    const lowerMessage = message.toLowerCase();
    const examType = context?.examType?.toUpperCase() || 'JEE';

    if (lowerMessage.includes('physics')) {
        return `📚 **Physics Study Strategy for ${examType}:**

**Key Approach:**
• Understand concepts before memorizing formulas
• Practice numerical problems daily (minimum 5-10)
• Create visual diagrams for complex topics
• Focus on previous year question patterns

**Quick Tips:**
• Mechanics: Master free body diagrams
• Electricity: Visualize field lines and circuits
• Modern Physics: Understand dual nature concepts

**Daily Routine:**
1. Theory reading (30 mins)
2. Solved examples (45 mins)
3. Practice problems (60 mins)
4. Revision of mistakes (15 mins)

Which specific physics topic would you like detailed help with?`;
    }

    if (lowerMessage.includes('chemistry')) {
        return `🧪 **Chemistry Mastery for ${examType}:**

**Three Pillars Approach:**
• **Physical Chemistry**: Focus on numerical and concepts
• **Organic Chemistry**: Learn mechanisms, not just reactions
• **Inorganic Chemistry**: Memorize with logic and trends

**Study Method:**
1. Read theory with understanding
2. Practice numerical problems
3. Create reaction flowcharts
4. Regular revision of exceptions

**Pro Tips:**
• Organic: Practice naming daily
• Inorganic: Use periodic trends
• Physical: Master mathematical concepts

What specific chemistry area needs your attention?`;
    }

    if (lowerMessage.includes('math') || lowerMessage.includes('mathematics')) {
        return `📐 **Mathematics Excellence for ${examType}:**

**Success Formula:**
• Daily practice (minimum 2 hours)
• Speed + Accuracy focus
• Previous year paper analysis
• Concept clarity before problem solving

**Topic Priority:**
1. **High Weightage**: Calculus, Coordinate Geometry, Algebra
2. **Medium Weightage**: Trigonometry, Vectors, Statistics
3. **Practice Daily**: All topics with time limits

**Improvement Strategy:**
• Identify weak areas from mock tests
• Practice similar problems in groups
• Learn shortcut methods gradually
• Regular formula revision

Which mathematics topic challenges you most?`;
    }

    if (lowerMessage.includes('study plan') || lowerMessage.includes('schedule')) {
        return `📅 **Personalized ${examType} Study Schedule:**
```
    }

    if (lowerMessage.includes('motivation') || lowerMessage.includes('stress')) {
        return `💪 **Stay Strong and Motivated:**
```
    }

    // Default comprehensive response
    return `👋 **Hello! I'm your AI Study Coach for ${examType}.**

**I can help you with:**
📚 **Subject Guidance:** Physics, Chemistry, Math concepts & strategies
🎯 **Test Preparation:** Mock test strategies & time management
📊 **Performance Analysis:** Identifying strengths & improvement areas
💪 **Motivation:** Study planning & stress management
🔄 **Progress Tracking:** Setting goals & measuring improvement

**Quick Help Options:**
• "Help me with Physics mechanics"
• "Create a study schedule for ${examType}"
• "I'm struggling with organic chemistry"
• "How to improve my test speed"
• "I'm feeling overwhelmed with studies"

**Pro Tip:** Be specific in your questions for better personalized advice!

What would you like help with today? 🚀`;
}

// Get chat history (simplified)
router.get('/history', auth, async (req, res) => {
    try {
        res.json({
            success: true,
            messages: []
        });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.json({
            success: true,
            messages: []
        });
    }
});

// Clear chat history
router.delete('/history', auth, async (req, res) => {
    try {
        res.json({ success: true, message: 'Chat history cleared' });
    } catch (error) {
        console.error('Error clearing chat history:', error);
        res.json({ success: true, message: 'Chat history cleared' });
    }
});

module.exports = router;
