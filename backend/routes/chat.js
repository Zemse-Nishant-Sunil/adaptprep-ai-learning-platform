const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const auth = require('../middleware/auth');
const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get working model - Updated to use available models
async function getWorkingModel() {
    console.log('\n📡 INITIALIZING GEMINI MODEL...');
    
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ CRITICAL: GEMINI_API_KEY not found in environment variables!');
        throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    console.log(`✅ API Key found: ${process.env.GEMINI_API_KEY.substring(0, 10)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 5)}`);
    
    // Try the newest models first (they're more likely to be available)
    const modelsToTry = [
        'gemini-2.0-flash',     // Latest model
        'gemini-2.0-flash-exp', // Experimental version
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro'
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`🔄 Trying to initialize model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            console.log(`✅ Model ${modelName} initialized successfully`);
            // Don't test with generateContent here - save that for actual use
            return { model, name: modelName };
        } catch (error) {
            console.log(`❌ Model ${modelName} initialization failed`);
            console.log(`   Full Error: ${JSON.stringify(error, null, 2)}`);
            continue;
        }
    }

    console.error('❌ FATAL: No Gemini model could be initialized!');
    throw new Error('No working Gemini model found - all models failed to initialize');
}

// Test endpoint to verify API key and model
router.get('/test', async (req, res) => {
    try {
        console.log('\n🧪 TESTING GEMINI API CONNECTION...');
        
        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY not found in environment variables');
            return res.status(500).json({
                success: false,
                error: 'GEMINI_API_KEY not found in environment variables',
                apiKeyStatus: 'NOT SET'
            });
        }

        console.log(`✅ API Key found: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);

        try {
            console.log('📡 Attempting to initialize Gemini model...');
            const { model, name } = await getWorkingModel();
            console.log(`✅ SUCCESS! Model initialized: ${name}`);
            
            res.json({
                success: true,
                message: 'Gemini API is initialized and ready!',
                model: name,
                apiKeyStatus: 'VALID AND WORKING',
                note: 'Model is loaded and ready to process requests'
            });
        } catch (modelError) {
            console.error('❌ Model initialization failed:', modelError.message);
            res.status(500).json({
                success: false,
                error: 'Failed to initialize Gemini models',
                details: modelError.message,
                apiKeyStatus: 'KEY EXISTS BUT MODEL FAILED',
                possibleReasons: [
                    'Check if API_KEY is valid at https://aistudio.google.com/app/apikey',
                    'Ensure the API key has Generative Language API enabled',
                    'Check if you have exceeded usage limits',
                    'Try creating a new API key if the current one is old'
                ]
            });
        }
    } catch (error) {
        console.error('❌ Test endpoint error:', error);
        res.status(500).json({
            success: false,
            error: 'Test endpoint encountered an error',
            details: error.message
        });
    }
});

// Send message to AI - Enhanced with detailed user data
router.post('/message', auth, async (req, res) => {
    try {
        const { message, context } = req.body;
        const userId = req.user.id;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Convert message to lowercase for easier pattern matching
        const lowerMessage = message.toLowerCase().trim();

        console.log('\n✅ CHAT MESSAGE RECEIVED');
        console.log(`User Question: "${message}"`);
        console.log(`Context has ${context?.testResults?.length || 0} test results`);
        
        // Check if questionDetails exist
        let totalQDCount = 0;
        if (context?.testResults?.length > 0) {
            context.testResults.forEach(test => {
                if (test.questionDetails) {
                    totalQDCount += test.questionDetails.length;
                }
            });
        }
        console.log(`Total question details available: ${totalQDCount}\n`);

        // Get user's complete data for better context
        let userProfile = null;
        let userData = null;
        
        try {
            const User = require('../models/User');
            const UserData = require('../models/UserData');
            userProfile = await User.findById(userId).select('-password');
            userData = await UserData.findOne({ userId });
        } catch (dbError) {
            console.warn('⚠️ Database access error:', dbError.message);
            // Continue anyway, userData is optional
        }

        let model = null;
        let name = 'fallback';
        
        try {
            const modelResult = await getWorkingModel();
            model = modelResult.model;
            name = modelResult.name;
            console.log(`✅ Model loaded successfully in chat handler: ${name}`);
        } catch (modelError) {
            console.error('❌ FAILED TO LOAD MODEL IN CHAT HANDLER:');
            console.error(modelError.message);
            console.error('Stack:', modelError.stack);
            // Will use fallback response
        }

        // Build detailed test insights
        let testInsights = '';
        if (context?.testResults?.length > 0) {
            const recentTests = context.testResults.slice(-3);
            testInsights = recentTests.map(test => {
                const accuracy = test.totalQuestions ? Math.round((test.correctAnswers / test.totalQuestions) * 100) : 0;
                const failedCount = test.incorrectAnswers || 0;
                return `- ${test.subject} (Test ${test.testNumber}): ${test.correctAnswers}/${test.totalQuestions} correct (${accuracy}%) - Failed: ${failedCount}`;
            }).join('\n');
        }

        // Build failed topics string safely
        let failedTopicsStr = 'None';
        if (context?.failureAnalysis?.topFailedTopics?.length > 0) {
            failedTopicsStr = context.failureAnalysis.topFailedTopics
                .map(t => `${t.topic} (${t.count} failures)`)
                .join(', ');
        }

        // Build detailed failed questions data - VERY CLEAR FORMAT FOR GEMINI
        let failedQuestionsData = '\n⚠️ NO QUESTION DETAILS SAVED YET - User has not taken tests with detailed question tracking.';
        const failedQuestionsList = [];
        
        if (context?.testResults?.length > 0) {
            context.testResults.forEach(test => {
                if (test.questionDetails && test.questionDetails.length > 0) {
                    test.questionDetails.forEach(q => {
                        if (q.status === 'incorrect') {
                            failedQuestionsList.push({
                                testNumber: test.testNumber,
                                subject: test.subject,
                                questionNumber: q.questionNumber,
                                topic: q.topic,
                                question: q.question,
                                correctAnswer: q.correctAnswer,
                                userAnswer: q.userAnswer,
                                explanation: q.explanation
                            });
                        }
                    });
                }
            });

            if (failedQuestionsList.length > 0) {
                failedQuestionsData = `\n✅ DETAILED QUESTION DATA AVAILABLE - ${failedQuestionsList.length} failed questions:\n\n`;
                failedQuestionsList.forEach((q, i) => {
                    failedQuestionsData += `FAILED QUESTION #${i+1}:\n`;
                    failedQuestionsData += `  • Test: ${q.subject} Test ${q.testNumber}, Question ${q.questionNumber}\n`;
                    failedQuestionsData += `  • Topic: ${q.topic}\n`;
                    failedQuestionsData += `  • Question Text: "${q.question}"\n`;
                    failedQuestionsData += `  • Correct Answer Option Index: ${q.correctAnswer} (Option ${q.correctAnswer + 1})\n`;
                    failedQuestionsData += `  • Your Answer Option Index: ${q.userAnswer !== null ? q.userAnswer + ' (Option ' + (q.userAnswer + 1) + ')' : 'Skipped'}\n`;
                    failedQuestionsData += `  • Explanation: ${q.explanation || 'No explanation available'}\n\n`;
                });

                // Log to console for debugging
                console.log('✅ Chat context includes', failedQuestionsList.length, 'failed questions with explanations');
            } else if (context?.testResults?.length > 0) {
                console.warn('⚠️ User has test results but no question details - tests may have been created before question tracking was added');
            }
        }

        // Enhanced system prompt with detailed user performance data
        const systemPrompt = `You are an expert study guide helping students understand specific questions in ${context?.examType || 'JEE'} exams.

STUDENT PROFILE:
- Name: ${context?.userName || userProfile?.name || 'Student'}
- Exam: ${context?.examType || 'JEE'}  
- Tests Taken: ${context?.totalTests || 0}
- Average Score: ${context?.averageScore?.toFixed(1) || 0}%

DETAILED QUESTIONS DATABASE (For Reference):
========== ALL STUDENT'S QUESTIONS DATA ==========
${failedQuestionsData}
==================================================

YOUR ROLE:
You have access to the student's complete question database above. Your job is to:
1. Answer specific questions about ANY question number the student asks about
2. Provide the exact question text, correct answer, student's answer, and explanation
3. Help explain WHY the correct answer is right
4. Keep responses focused and concise (max 2-3 paragraphs per question)
5. Only answer about questions from their test data above

IMPORTANT RULES:
================
- When student asks "Explain Q5" → Show them Q5, why they got it wrong, and the explanation
- When student asks about ANY question number → Check the database above and provide details
- DO NOT give general study advice UNLESS specifically asked
- DO NOT provide long lectures - keep it concise
- ALWAYS use the actual question data from above (Section marked with "DETAILED QUESTIONS DATABASE")
- If a question number is not in the database, say "That question number isn't in your test results"

FORMAT FOR QUESTION EXPLANATIONS:
- Start with the question text
- Show their answer vs correct answer  
- Give 2-3 sentence explanation of why correct answer is right
- That's it - no additional advice unless asked

Student Question: "${message}"`;



        console.log(`Using ${name} with enhanced user context...`);
        console.log(`\n=== CHAT REQUEST DEBUG ===`);
        console.log(`User: ${context?.userName}, Exam: ${context?.examType}`);
        console.log(`Test Results Count: ${context?.testResults?.length || 0}`);
        console.log(`Failed Questions Count: ${failedQuestionsList.length}`);
        console.log(`First Failed Question: ${failedQuestionsList[0]?.question?.substring(0, 50)}...` || 'None');
        console.log(`========================\n`);

        // Collect all question details for easier lookup
        const allQuestionsMap = {};
        const passedQuestionsDetail = [];
        const failedQuestionsDetail = [];
        
        if (context?.testResults?.length > 0) {
            context.testResults.forEach(test => {
                if (test.questionDetails && test.questionDetails.length > 0) {
                    test.questionDetails.forEach(q => {
                        const key = `${test.subject}_Q${q.questionNumber}`;
                        allQuestionsMap[key] = {
                            testNumber: test.testNumber,
                            subject: test.subject,
                            questionNumber: q.questionNumber,
                            topic: q.topic,
                            question: q.question,
                            options: q.options || [],
                            correctAnswer: q.correctAnswer,
                            userAnswer: q.userAnswer,
                            explanation: q.explanation,
                            status: q.status
                        };
                        
                        if (q.status === 'correct') {
                            passedQuestionsDetail.push(allQuestionsMap[key]);
                        } else if (q.status === 'incorrect') {
                            failedQuestionsDetail.push(allQuestionsMap[key]);
                        }
                    });
                }
            });
        }

        // Check if this is an initial question about questions (not a follow-up)
        const isAskingAboutFailed = lowerMessage.includes('which') && (lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('incorrect'));
        const isAskingAboutPassed = lowerMessage.includes('which') && (lowerMessage.includes('passed') || lowerMessage.includes('correct') || lowerMessage.includes('right'));
        const isInitialQuestionQuery = lowerMessage.includes('which questions') || 
                                       lowerMessage.includes('my failed') || 
                                       lowerMessage.includes('my passed') ||
                                       lowerMessage.includes('questions i') ||
                                       lowerMessage.includes('questions did i') ||
                                       isAskingAboutFailed ||
                                       isAskingAboutPassed;
        
        // If asking about question lists initially, provide detailed list instead of Gemini response
        let responseMessage = null;
        
        if (isInitialQuestionQuery && context?.testResults?.length > 0) {
            // Show only failed questions if user specifically asked about failed
            if (isAskingAboutFailed && failedQuestionsDetail.length > 0) {
                responseMessage = '❌ **YOUR FAILED QUESTIONS:**\n\n';
                failedQuestionsDetail.forEach((q, idx) => {
                    responseMessage += `📌 **Q${q.questionNumber} (${q.subject} - Test ${q.testNumber})**\n`;
                    responseMessage += `📚 Topic: ${q.topic}\n`;
                    responseMessage += `❓ Question: "${q.question}"\n`;
                    responseMessage += `Your Answer: Option ${q.userAnswer !== null ? String.fromCharCode(65 + q.userAnswer) : 'Skipped'}\n`;
                    responseMessage += `Correct Answer: Option ${String.fromCharCode(65 + q.correctAnswer)}\n`;
                    if (idx < failedQuestionsDetail.length - 1) {
                        responseMessage += `\n${'─'.repeat(60)}\n\n`;
                    } else {
                        responseMessage += `\n\n`;
                    }
                });
                responseMessage += `💡 *Ask me to explain any of these questions (e.g., "Explain Q1" or "Why Q3?") for detailed help.*`;
            }
            // Show only passed questions if user specifically asked about passed
            else if (isAskingAboutPassed && passedQuestionsDetail.length > 0) {
                responseMessage = '✅ **YOUR PASSED QUESTIONS:**\n\n';
                passedQuestionsDetail.forEach((q, idx) => {
                    responseMessage += `📌 **Q${q.questionNumber} (${q.subject} - Test ${q.testNumber})**\n`;
                    responseMessage += `📚 Topic: ${q.topic}\n`;
                    responseMessage += `❓ Question: "${q.question}"\n`;
                    if (idx < passedQuestionsDetail.length - 1) {
                        responseMessage += `\n${'─'.repeat(60)}\n\n`;
                    } else {
                        responseMessage += `\n\n`;
                    }
                });
                responseMessage += `🎯 *You got these right! Want me to explain how to solve them or explore any specific question?*`;
            }
            // Default: show both failed and passed
            else if ((failedQuestionsDetail.length > 0 || passedQuestionsDetail.length > 0)) {
                responseMessage = '📋 **YOUR QUESTION SUMMARY:**\n\n';
                
                if (failedQuestionsDetail.length > 0) {
                    responseMessage += `❌ **Failed Questions (${failedQuestionsDetail.length}):**\n`;
                    failedQuestionsDetail.forEach(q => {
                        responseMessage += `  • Q${q.questionNumber} (${q.subject}): "${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}"\n`;
                    });
                    responseMessage += '\n';
                }
                
                if (passedQuestionsDetail.length > 0) {
                    responseMessage += `✅ **Passed Questions (${passedQuestionsDetail.length}):**\n`;
                    passedQuestionsDetail.slice(0, 5).forEach(q => {
                        responseMessage += `  • Q${q.questionNumber} (${q.subject})\n`;
                    });
                    if (passedQuestionsDetail.length > 5) {
                        responseMessage += `  • ... and ${passedQuestionsDetail.length - 5} more\n`;
                    }
                    responseMessage += '\n';
                }
                
                responseMessage += `💡 *Ask me about failed questions or any specific question (e.g., "Explain Q5" or "Why did I fail Q3?") for detailed help.*`;
            }
        }
        
        // If no simple response generated, check for specific question queries
        if (!responseMessage) {
            const detailedResponse = getDetailedQuestionResponse(message, context);
            if (detailedResponse) {
                responseMessage = detailedResponse;
            }
        }

        // If still no simple response generated, use Gemini for follow-up questions
        if (!responseMessage) {
            if (model) {
                try {
                    console.log(`\n📨 Sending message to Gemini (${name})...`);
                    console.log(`System prompt length: ${systemPrompt.length} characters`);
                    
                    const result = await model.generateContent(systemPrompt);
                    responseMessage = result.response.text();
                    
                    console.log(`✅ Gemini response received: ${responseMessage.substring(0, 100)}...`);
                } catch (geminiError) {
                    console.error('\n❌ GEMINI ERROR IN CHAT HANDLER:');
                    console.error('Error Message:', geminiError.message);
                    console.error('Error Status:', geminiError.status);
                    console.error('Error Code:', geminiError.code);
                    console.error('Full Error:', JSON.stringify(geminiError, null, 2));
                    
                    // Check if quota exceeded
                    const isQuotaError = geminiError.message?.includes('quota') || 
                                        geminiError.message?.includes('429') ||
                                        geminiError.status === 429;
                    
                    // Check if user was asking about questions, then use fallback with question summary
                    if (isInitialQuestionQuery) {
                        console.log('⚠️ User asked about questions, showing question summary fallback');
                        responseMessage = getSimpleQuestionListResponse(context);
                    } else if (isQuotaError) {
                        // For quota issues, show more descriptive message
                        console.log('⚠️ API quota exceeded, showing quota-friendly fallback');
                        responseMessage = `I'm currently at my usage limit, but I'm still here to help! 🚀\n\n`;
                        responseMessage += `**What I can do right now:**\n`;
                        responseMessage += `✅ Show your failed questions - "Show me my failed questions"\n`;
                        responseMessage += `✅ Show your passed questions - "Show me my passed questions"\n`;
                        responseMessage += `✅ Explain specific questions - "Explain Q5"\n`;
                        responseMessage += `✅ Help you study any topic\n\n`;
                        responseMessage += `**💡 Pro Tip:** Come back tomorrow or [upgrade to paid API](https://aistudio.google.com/app/apikey) for unlimited help!\n\n`;
                        responseMessage += `What would you like help with?`;
                    } else {
                        // For other errors, show generic helpful message
                        console.log('⚠️ Gemini failed, showing helpful fallback');
                        responseMessage = `Hello! I'm having a temporary issue with the AI, but I can still help you! 💡\n\n`;
                        responseMessage += `**What I can do right now:**\n`;
                        responseMessage += `✅ Show your failed questions - "Show me my failed questions"\n`;
                        responseMessage += `✅ Explain any question - "Explain Q5"\n`;
                        responseMessage += `✅ Help you study - "Which questions did I get wrong?"\n\n`;
                        responseMessage += `Try one of these, or just keep asking - I'll help however I can!`;
                    }
                }
            } else {
                // Model is not available, use fallback
                console.warn('\n⚠️ Gemini model not available at all in chat handler');
                responseMessage = `Hello! 👋 I'm running in limited mode right now, but I can still help you!\n\n`;
                responseMessage += `**I can:** 📚\n`;
                responseMessage += `• Show you your failed questions\n`;
                responseMessage += `• Explain any question (e.g., "Explain Q5")\n`;
                responseMessage += `• Help you improve weak areas\n\n`;
                responseMessage += `What would you like help with?`;
            }
        }

        // Save chat messages to database
        try {
            if (userData) {
                // Add messages to chat history
                userData.chatHistory = userData.chatHistory || [];
                userData.chatHistory.push({
                    role: 'user',
                    content: message,
                    timestamp: new Date()
                });
                userData.chatHistory.push({
                    role: 'assistant',
                    content: responseMessage,
                    timestamp: new Date()
                });
                // Keep only last 50 messages to avoid bloating
                userData.chatHistory = userData.chatHistory.slice(-50);
                await userData.save();
            }
        } catch (saveError) {
            console.error('Error saving chat history:', saveError);
            // Don't fail the response if save fails
        }

        res.json({
            success: true,
            message: responseMessage,
            response: responseMessage,
            modelUsed: name,
            contextUsed: !!context?.totalTests
        });

    } catch (error) {
        console.error('\n❌ CHAT API ERROR:');
        console.error('Error Message:', error.message);
        console.error('Error Stack:', error.stack);
        console.error('Error Details:', error);

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

        // Try to provide a helpful fallback response instead of error message
        let fallbackResponse = `Sorry, I encountered an error while processing your request. Let me help with what I can! 😔\n\n`;
        
        // Try to show question summary if available
        try {
            if (req.body?.context?.testResults?.length > 0) {
                const passedQuestionsDetail = [];
                const failedQuestionsDetail = [];
                
                req.body.context.testResults.forEach(test => {
                    if (test.questionDetails && test.questionDetails.length > 0) {
                        test.questionDetails.forEach(q => {
                            if (q.status === 'correct') {
                                passedQuestionsDetail.push(q);
                            } else if (q.status === 'incorrect') {
                                failedQuestionsDetail.push(q);
                            }
                        });
                    }
                });
                
                if (failedQuestionsDetail.length > 0) {
                    fallbackResponse += `I can show you your **${failedQuestionsDetail.length} failed questions** though!\n\n`;
                    fallbackResponse += `Try asking: "Show me my failed questions" or "Explain Q5"\n`;
                } else if (passedQuestionsDetail.length > 0) {
                    fallbackResponse += `You have **${passedQuestionsDetail.length} questions** in your test results.\n\n`;
                    fallbackResponse += `Try asking: "Show me my passed questions"\n`;
                }
            } else {
                fallbackResponse += `**I can still help with:**\n`;
                fallbackResponse += `• "Show me my failed questions"\n`;
                fallbackResponse += `• "Explain Q5" (any question number)\n`;
            }
        } catch (fallbackError) {
            console.error('Error generating fallback:', fallbackError);
        }

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

// Simple function to list passed/failed questions with enhanced details
function getSimpleQuestionListResponse(context) {
    const passedQuestionsDetail = [];
    const failedQuestionsDetail = [];
    
    if (context?.testResults?.length > 0) {
        context.testResults.forEach(test => {
            if (test.questionDetails && test.questionDetails.length > 0) {
                test.questionDetails.forEach(q => {
                    const questionData = {
                        testNumber: test.testNumber,
                        subject: test.subject,
                        questionNumber: q.questionNumber,
                        topic: q.topic,
                        question: q.question,
                        options: q.options || [],
                        correctAnswer: q.correctAnswer,
                        userAnswer: q.userAnswer,
                        explanation: q.explanation,
                        status: q.status
                    };
                    
                    if (q.status === 'correct') {
                        passedQuestionsDetail.push(questionData);
                    } else if (q.status === 'incorrect') {
                        failedQuestionsDetail.push(questionData);
                    }
                });
            }
        });
    }
    
    let response = '📋 **YOUR QUESTION SUMMARY:**\n\n';
    
    if (failedQuestionsDetail.length > 0) {
        response += `❌ **Failed Questions (${failedQuestionsDetail.length}):**\n`;
        failedQuestionsDetail.forEach(q => {
            response += `  • Q${q.questionNumber} (${q.subject}): "${q.question.substring(0, 60)}${q.question.length > 60 ? '...' : ''}"\n`;
        });
        response += '\n';
    } else {
        response += `✅ **No Failed Questions!** Great job!\n\n`;
    }
    
    if (passedQuestionsDetail.length > 0) {
        response += `✅ **Passed Questions (${passedQuestionsDetail.length}):**\n`;
        passedQuestionsDetail.slice(0, 5).forEach(q => {
            response += `  • Q${q.questionNumber} (${q.subject})\n`;
        });
        if (passedQuestionsDetail.length > 5) {
            response += `  • ... and ${passedQuestionsDetail.length - 5} more\n`;
        }
        response += '\n';
    }
    
    response += `💡 *Ask me about any question (e.g., "Explain Q5" or "Why did I fail Q3?") for detailed help.*`;
    
    return response;
}

// Function to extract question number from message and get detailed info
function getDetailedQuestionResponse(message, context) {
    // Extract question number from message (e.g., "Explain Q5", "Why did I fail Q3", "Q1 explanation")
    const qMatch = message.match(/Q(\d+)/i);
    if (!qMatch) {
        return null; // No question number found
    }
    
    const targetQNum = parseInt(qMatch[1]);
    let foundQuestion = null;
    let foundTest = null;
    
    // Search for the question in all test results
    if (context?.testResults?.length > 0) {
        for (let test of context.testResults) {
            if (test.questionDetails && test.questionDetails.length > 0) {
                for (let q of test.questionDetails) {
                    if (q.questionNumber === targetQNum) {
                        foundQuestion = {
                            testNumber: test.testNumber,
                            subject: test.subject,
                            questionNumber: q.questionNumber,
                            topic: q.topic,
                            question: q.question,
                            options: q.options || [],
                            correctAnswer: q.correctAnswer,
                            userAnswer: q.userAnswer,
                            explanation: q.explanation,
                            status: q.status
                        };
                        foundTest = test;
                        break;
                    }
                }
                if (foundQuestion) break;
            }
        }
    }
    
    if (!foundQuestion) {
        return null;
    }
    
    // Build detailed response
    let response = `${'═'.repeat(60)}\n`;
    response += `📌 **Question ${foundQuestion.questionNumber} - ${foundQuestion.subject} (Test ${foundQuestion.testNumber})**\n`;
    response += `${'═'.repeat(60)}\n\n`;
    response += `📚 **Topic:** ${foundQuestion.topic}\n\n`;
    response += `❓ **The Question:**\n"${foundQuestion.question}"\n\n`;
    response += `${'─'.repeat(60)}\n\n`;
    
    // Show options if available
    if (foundQuestion.options && foundQuestion.options.length > 0) {
        response += `**Options:**\n`;
        foundQuestion.options.forEach((opt, idx) => {
            const marker = idx === foundQuestion.correctAnswer ? '✅' : idx === foundQuestion.userAnswer ? '❌' : '  ';
            response += `${marker} ${String.fromCharCode(65 + idx)}) ${opt}\n`;
        });
        response += '\n';
    }
    
    response += `${'─'.repeat(60)}\n\n`;
    
    // Show answers
    response += `**Your Answer:** ${foundQuestion.userAnswer !== null ? String.fromCharCode(65 + foundQuestion.userAnswer) : '⊘ Skipped'}\n`;
    response += `**Correct Answer:** ${String.fromCharCode(65 + foundQuestion.correctAnswer)}\n`;
    response += `**Status:** ${foundQuestion.status === 'correct' ? '✅ Correct!' : '❌ Incorrect'}\n\n`;
    response += `${'─'.repeat(60)}\n\n`;
    
    // Show explanation
    if (foundQuestion.explanation) {
        response += `💡 **Explanation:**\n${foundQuestion.explanation}\n`;
    } else {
        response += `💡 **Explanation:** Not available for this question.\n`;
    }
    
    response += `\n${'═'.repeat(60)}\n`;
    
    return response;
}

// Subject statistics helper
function calculateSubjectStats(testResults) {
    const subjectStats = {};

    if (!testResults || !Array.isArray(testResults)) {
        return subjectStats;
    }

    testResults.forEach(test => {
        const subject = test.subject || 'Unknown';
        if (!subjectStats[subject]) {
            subjectStats[subject] = {
                totalTests: 0,
                totalQuestions: 0,
                correctAnswers: 0,
                incorrectAnswers: 0,
                accuracy: 0,
                avgScore: 0
            };
        }

        subjectStats[subject].totalTests += 1;
        subjectStats[subject].totalQuestions += test.totalQuestions || 0;
        subjectStats[subject].correctAnswers += test.correctAnswers || 0;
        subjectStats[subject].incorrectAnswers += test.incorrectAnswers || 0;
    });

    // Calculate accuracies
    Object.keys(subjectStats).forEach(subject => {
        const stats = subjectStats[subject];
        if (stats.totalQuestions > 0) {
            stats.accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
        }
    });

    return subjectStats;
}

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
