import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import './ChatBot.css';
import { X, Send, Loader, Maximize2, Minimize2, Trash2 } from 'lucide-react';

const ChatBot = ({ isOpen, onClose }) => {
    const { user, userData } = useUser();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [error, setError] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    const getToken = () => localStorage.getItem('token');

    // Initialize chat session
    useEffect(() => {
        if (isOpen && !sessionId) {
            initializeSession();
        }
    }, [isOpen, sessionId]);

    const initializeSession = async () => {
        try {
            setError('');
            const token = getToken();
            const response = await fetch(`${API_BASE}/chat/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    examType: user?.examType || 'jee',
                    subject: 'General',
                    topic: 'Student Tutoring'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create session');
            }

            const data = await response.json();
            setSessionId(data.sessionId);
            setMessages(data.messages || []);

            // Add initial greeting
            if (!data.messages || data.messages.length === 0) {
                const greetingMessage = `Hello ${user?.name}! 👋\n\nI'm your AI tutor here to help you with your ${user?.examType?.toUpperCase()} exam preparation. I have access to your performance data and can help you:\n\n✓ Understand difficult concepts\n✓ Solve problems step-by-step\n✓ Analyze your performance\n✓ Learn from your mistakes\n✓ Suggest topics to focus on\n✓ Keep you motivated on your learning journey\n\nWhat would you like to learn today?`;
                setMessages([{
                    role: 'assistant',
                    content: greetingMessage
                }]);
            }
        } catch (err) {
            console.error('Error initializing chat:', err);
            setError(err.message || 'Failed to initialize chat');
        }
    };

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim() || !sessionId) {
            return;
        }

        const userMessage = inputValue.trim();
        setInputValue('');

        // Add user message to UI immediately
        const newMessages = [...messages, {
            role: 'user',
            content: userMessage
        }];
        setMessages(newMessages);

        setIsLoading(true);
        setError('');

        try {
            const token = getToken();
            const response = await fetch(`${API_BASE}/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sessionId,
                    message: userMessage
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }

            const data = await response.json();
            setMessages([...newMessages, {
                role: 'assistant',
                content: data.message
            }]);
        } catch (err) {
            console.error('Error sending message:', err);
            setError(err.message || 'Failed to send message. Please try again.');
            // Remove the user message if there was an error
            setMessages(newMessages.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearChat = () => {
        if (window.confirm('Are you sure you want to clear this conversation?')) {
            setMessages([{
                role: 'assistant',
                content: `Hi ${user?.name}! 👋 Your chat has been cleared. What would you like to learn today?`
            }]);
            setError('');
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`chatbot-container ${isExpanded ? 'expanded' : ''}`}>
            <div className="chatbot-header">
                <div className="header-content">
                    <div className="header-title">
                        <span className="header-icon">🤖</span>
                        <h2>AI Tutor</h2>
                    </div>

                </div>
                <div className="header-actions">
                    <button
                        className="icon-btn expand-btn"
                        onClick={toggleExpand}
                        title={isExpanded ? "Minimize" : "Maximize"}
                    >
                        {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                    <button
                        className="icon-btn clear-btn"
                        onClick={handleClearChat}
                        title="Clear chat"
                    >
                        <Trash2 size={18} />
                    </button>
                    <button className="icon-btn close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-avatar">
                            {msg.role === 'user' ? '👤' : '🤖'}
                        </div>
                        <div className="message-content">
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message assistant loading">
                        <div className="message-avatar">🤖</div>
                        <div className="message-content">
                            <Loader size={18} className="spinner" />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {error && (
                <div className="error-message">
                    <span>⚠️</span>
                    {error}
                </div>
            )}

            <form className="chatbot-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your studies..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !inputValue.trim()} className="send-btn">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatBot;
