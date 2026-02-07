import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, Minimize2, Send, Trash2, X, MessageCircle, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './ChatBot.css';

const ChatBot = () => {
    const { apiRequest, user, userData } = useUser();

    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const loadChatHistory = useCallback(async () => {
        try {
            const response = await apiRequest('/chat/history');
            if (response.success && response.messages) {
                setMessages(response.messages);
            }
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
    }, [apiRequest]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            loadChatHistory();
        }
    }, [isOpen, messages.length, loadChatHistory]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isFullscreen]);

    const getUserLevel = () => {
        if (!userData?.testResults?.length) return 'beginner';
        const avgScore = userData.averageScore || 0;
        return avgScore >= 80 ? 'advanced' : avgScore >= 60 ? 'intermediate' : 'beginner';
    };

    const analyzeFailedQuestions = () => {
        const failedTopics = {};
        const failedQuestions = [];
        const subjectAnalysis = {};

        userData?.testResults?.forEach(test => {
            // Initialize subject analysis
            if (!subjectAnalysis[test.subject]) {
                subjectAnalysis[test.subject] = {
                    total: 0,
                    failed: 0,
                    accuracy: 0,
                    tests: 0
                };
            }

            subjectAnalysis[test.subject].total += test.totalQuestions || 0;
            subjectAnalysis[test.subject].failed += test.incorrectAnswers || 0;
            subjectAnalysis[test.subject].tests += 1;

            // Track question statuses if available
            if (test.questionStatuses && test.questionStatuses.length > 0) {
                test.questionStatuses.forEach((status, idx) => {
                    if (status === 'incorrect' || status === 'skipped') {
                        const topic = test.topic || test.subject || 'General';
                        failedTopics[topic] = (failedTopics[topic] || 0) + 1;
                        failedQuestions.push({
                            subject: test.subject,
                            topic: topic,
                            testNumber: test.testNumber,
                            questionIndex: idx + 1,
                            status: status
                        });
                    }
                });
            } else {
                // Fallback: if no question statuses, estimate from correctAnswers
                const incorrectCount = test.incorrectAnswers || (test.totalQuestions - test.correctAnswers);
                if (incorrectCount > 0) {
                    const topic = test.subject || 'General';
                    failedTopics[topic] = (failedTopics[topic] || 0) + incorrectCount;
                }
            }
        });

        // Calculate accuracy for each subject
        Object.keys(subjectAnalysis).forEach(subject => {
            const analysis = subjectAnalysis[subject];
            if (analysis.total > 0) {
                analysis.accuracy = Math.round(((analysis.total - analysis.failed) / analysis.total) * 100);
            }
        });

        // Get top 3 failed topics
        const topFailedTopics = Object.entries(failedTopics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([topic, count]) => ({ topic, count }));

        const totalTests = userData?.testResults?.length || 0;
        const totalQuestionsAsked = userData?.testResults?.reduce((sum, test) => sum + (test.totalQuestions || 0), 0) || 0;

        return {
            topFailedTopics,
            totalFailed: failedQuestions.length,
            failureRate: totalTests > 0 ? Math.round((failedQuestions.length / totalQuestionsAsked) * 100) : 0,
            failedQuestions: failedQuestions, // Added detailed failed questions list
            subjectAnalysis: subjectAnalysis // Added subject-wise analysis
        };
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentMessage = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        // Analyze failed questions
        const failureAnalysis = analyzeFailedQuestions();

        // Build subject stats from test results
        const subjectStats = {};
        userData?.testResults?.forEach(test => {
            const subject = test.subject || 'Unknown';
            if (!subjectStats[subject]) {
                subjectStats[subject] = {
                    totalTests: 0,
                    totalQuestions: 0,
                    correctAnswers: 0,
                    incorrectAnswers: 0,
                    accuracy: 0
                };
            }
            subjectStats[subject].totalTests += 1;
            subjectStats[subject].totalQuestions += test.totalQuestions || 0;
            subjectStats[subject].correctAnswers += test.correctAnswers || 0;
            subjectStats[subject].incorrectAnswers += test.incorrectAnswers || 0;
        });

        // Calculate accuracies for each subject
        Object.keys(subjectStats).forEach(subject => {
            const stats = subjectStats[subject];
            if (stats.totalQuestions > 0) {
                stats.accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
            }
        });

        // Prepare rich context with all user data
        const contextData = {
            examType: user?.examType || 'JEE',
            userName: user?.name || 'Student',
            userEmail: user?.email || '',
            userLevel: getUserLevel(),
            totalTests: userData?.totalTests || 0,
            averageScore: userData?.averageScore || 0,
            testResults: userData?.testResults || [],
            strongSubjects: userData?.strongSubjects || [],
            weakSubjects: userData?.weakSubjects || [],
            createdAt: user?.createdAt || '',
            failureAnalysis: failureAnalysis,
            recentTestsCount: Math.min(userData?.testResults?.length || 0, 3),
            subjectStats: subjectStats // Include subject-wise stats
        };

        console.log('Sending enhanced context to ChatBot:', contextData);

        try {
            const response = await apiRequest('/chat/message', {
                method: 'POST',
                body: JSON.stringify({
                    message: currentMessage,
                    context: contextData
                })
            });

            const aiMessage = {
                role: 'assistant',
                content: response.message || response.response || 'I am having trouble connecting to my brain right now.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('AI API Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "⚠️ Connection error. Please check if the Backend server is running and your Gemini API key is valid.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
            {/* Toggle Button - ALWAYS RENDERS */}
            <button
                className={`chatbot-toggle-btn ${isOpen ? 'hidden' : 'visible'}`}
                onClick={() => setIsOpen(true)}
                title="Open AI Study Coach"
                aria-label="Open AI Study Coach"
            >
                <div className="toggle-icon-wrapper">
                    <MessageCircle size={28} className="toggle-icon" />
                    <Zap size={16} className="toggle-spark" />
                </div>
                <span className="toggle-text">AI Coach</span>
            </button>

            {/* Chat Window - Only visible when open */}
            {isOpen && (
                <div className={`chatbot-window ${isFullscreen ? 'fullscreen' : ''}`}>
                    <div className="chatbot-header">
                        <div className="header-info">
                            <span className="bot-icon">🤖</span>
                            <div>
                                <h3>AI Study Coach</h3>
                                <small>{isLoading ? 'Thinking...' : 'Online'}</small>
                            </div>
                        </div>
                        <div className="chatbot-controls">
                            <button
                                onClick={toggleFullscreen}
                                className="control-btn"
                                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            >
                                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </button>
                            <button
                                onClick={() => setMessages([])}
                                className="control-btn"
                                title="Clear Chat"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsFullscreen(false);
                                }}
                                className="control-btn close"
                                title="Close Chat"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.length === 0 && (
                            <div className="welcome-card">
                                <h4>Welcome, {user?.name || 'Scholar'}! 👋</h4>
                                <p>I'm synced with your <b>{user?.examType || 'JEE'}</b> progress. How can I help today?</p>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`message-wrapper ${msg.role}`}>
                                <div className="message-bubble">
                                    {msg.content}
                                </div>
                                <span className="timestamp">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        {isLoading && <div className="typing-indicator"><span></span><span></span><span></span></div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-area">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your study question..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            title="Send Message"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Fullscreen Overlay */}
            {isFullscreen && (
                <div className="fullscreen-overlay" onClick={() => setIsFullscreen(false)}></div>
            )}
        </div>
    );
};

export default ChatBot;