import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, XCircle, Brain, TrendingUp, Award, Target, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './MockTest.css';

const TEST_DURATION = 600; // 10 minutes in seconds

const MockTest = () => {
    // State variables
    const [selectedExam, setSelectedExam] = useState('JEE');
    const [selectedSubject, setSelectedSubject] = useState('Physics');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testStarted, setTestStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const timer = useRef(null);
    const { getQuestions, saveTestResult, user } = useUser();

    // Timer effect
    useEffect(() => {
        if (testStarted && timeRemaining > 0) {
            const timerInterval = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
            return () => clearTimeout(timerInterval);
        } else if (timeRemaining === 0 && testStarted) {
            submitTest();
        }
    }, [timeRemaining, testStarted]);

    const handleAnswerSelect = (answerIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const startTest = async () => {
        setIsLoading(true);

        try {
            const result = await getQuestions(selectedExam, selectedSubject, 10);

            if (result.success) {
                setQuestions(result.questions);
                setCurrentQuestionIndex(0);
                setUserAnswers(new Array(result.questions.length).fill(null));
                setTestStarted(true);
                setStartTime(Date.now());
                setTimeRemaining(TEST_DURATION);
                setShowResults(false);
            } else {
                alert('Failed to load questions: ' + result.error);
            }
        } catch (error) {
            alert('Failed to load questions. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const submitTest = async () => {
        clearInterval(timer.current);
        setTestStarted(false);

        // Calculate results
        let correctAnswers = 0;
        const detailedResults = questions.map((question, index) => {
            const isCorrect = userAnswers[index] === question.correctAnswer;
            if (isCorrect) correctAnswers++;

            return {
                question: question.question,
                userAnswer: question.options[userAnswers[index]] || 'Not answered',
                correctAnswer: question.options[question.correctAnswer],
                isCorrect,
                explanation: question.explanation
            };
        });

        // Save result to backend
        const testResult = {
            examType: selectedExam,
            subject: selectedSubject,
            score: correctAnswers,
            totalQuestions: questions.length,
            timeTaken: Math.round((Date.now() - startTime) / 1000)
        };

        await saveTestResult(testResult);

        setResults({
            score: correctAnswers,
            totalQuestions: questions.length,
            percentage: Math.round((correctAnswers / questions.length) * 100),
            timeTaken: Math.round((Date.now() - startTime) / 1000),
            detailedResults,
            accuracy: Math.round((correctAnswers / questions.length) * 100)
        });

        setShowResults(true);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getAIAnalysis = () => {
        if (!results) return [];

        const insights = [];
        const accuracy = results.accuracy;

        // Overall performance
        if (accuracy >= 80) {
            insights.push({
                type: 'success',
                icon: '🎉',
                title: 'Excellent Performance!',
                message: `You scored ${accuracy}%! You have a strong grasp of ${selectedSubject}. Keep maintaining this level.`
            });
        } else if (accuracy >= 60) {
            insights.push({
                type: 'warning',
                icon: '💪',
                title: 'Good Effort!',
                message: `You scored ${accuracy}%. With focused practice, you can reach 80%+ easily.`
            });
        } else {
            insights.push({
                type: 'danger',
                icon: '🎯',
                title: 'Needs Improvement',
                message: `You scored ${accuracy}%. Don't worry! Let's create a focused study plan for you.`
            });
        }

        return insights;
    };

    // Setup Screen
    if (!testStarted && !showResults) {
        return (
            <div className="mock-test">
                <div className="test-setup animate-scale-in">
                    <div className="setup-header">
                        <div className="icon-wrapper">
                            <Brain size={64} className="animate-float" />
                        </div>
                        <h1 className="gradient-text">Start Your Mock Test</h1>
                        <p className="subtitle">Test your knowledge for {user?.examType?.toUpperCase() || 'JEE'} and get AI-powered analysis</p>
                    </div>

                    <div className="setup-content">
                        <div className="subject-selection">
                            <h3>Select Subject</h3>
                            <div className="subject-grid">
                                {['Physics', 'Chemistry', 'Mathematics', 'Biology'].filter(subject =>
                                    (selectedExam === 'JEE' && subject !== 'Biology') ||
                                    (selectedExam === 'NEET' && subject !== 'Mathematics')
                                ).map((subject) => (
                                    <button
                                        key={subject}
                                        className={`subject-card ${selectedSubject === subject ? 'active' : ''}`}
                                        onClick={() => setSelectedSubject(subject)}
                                    >
                                        <div className="subject-icon">
                                            {subject === 'Physics' && '⚛️'}
                                            {subject === 'Chemistry' && '🧪'}
                                            {subject === 'Mathematics' && '📐'}
                                            {subject === 'Biology' && '🧬'}
                                        </div>
                                        <div className="subject-name">{subject}</div>
                                        <div className="subject-info">10 Questions</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="start-test-btn"
                            onClick={startTest}
                            disabled={!selectedSubject || isLoading}
                        >
                            <span>{isLoading ? 'Loading...' : 'Start Test'}</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Testing Screen
    if (testStarted && questions.length > 0) {
        const currentQ = questions[currentQuestionIndex];

        return (
            <div className="mock-test testing">
                <div className="test-header">
                    <div className="test-info">
                        <h2>{selectedSubject} Test</h2>
                        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    <div className="test-timer">
                        <Clock size={24} />
                        <span className={timeRemaining < 300 ? 'timer-warning' : ''}>{formatTime(timeRemaining)}</span>
                    </div>
                </div>

                <div className="question-navigator">
                    {questions.map((_, idx) => (
                        <button
                            key={idx}
                            className={`nav-btn ${currentQuestionIndex === idx ? 'active' : ''} ${userAnswers[idx] !== null ? 'answered' : ''}`}
                            onClick={() => setCurrentQuestionIndex(idx)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

                <div className="question-container animate-slide-up">
                    <h3 className="question-text">{currentQ.question}</h3>

                    <div className="options-container">
                        {currentQ.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`option-btn ${userAnswers[currentQuestionIndex] === idx ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(idx)}
                            >
                                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                                <span className="option-text">{option}</span>
                                {userAnswers[currentQuestionIndex] === idx && <CheckCircle size={20} />}
                            </button>
                        ))}
                    </div>

                    <div className="question-actions">
                        <button
                            className="btn-secondary"
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>

                        {currentQuestionIndex === questions.length - 1 ? (
                            <button className="btn-primary" onClick={submitTest}>
                                Submit Test
                            </button>
                        ) : (
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (showResults && results) {
        const pieData = [
            { name: 'Correct', value: results.score, color: '#10B981' },
            { name: 'Incorrect', value: results.totalQuestions - results.score, color: '#EF4444' }
        ];

        const aiInsights = getAIAnalysis();

        return (
            <div className="mock-test results">
                <div className="results-header animate-slide-up">
                    <Award size={64} className="results-icon animate-float" />
                    <h1>Test Completed!</h1>
                    <p className="subtitle">Here's your detailed performance analysis</p>
                </div>

                <div className="results-summary animate-scale-in">
                    <div className="summary-card primary">
                        <div className="card-icon">🎯</div>
                        <div className="card-value">{results.score}/{results.totalQuestions}</div>
                        <div className="card-label">Score</div>
                    </div>
                    <div className="summary-card success">
                        <div className="card-icon">✅</div>
                        <div className="card-value">{results.accuracy}%</div>
                        <div className="card-label">Accuracy</div>
                    </div>
                    <div className="summary-card info">
                        <div className="card-icon">⏱️</div>
                        <div className="card-value">{formatTime(results.timeTaken)}</div>
                        <div className="card-label">Time Taken</div>
                    </div>
                </div>

                <div className="results-grid">
                    <div className="result-card animate-slide-up">
                        <h3>Performance Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="result-card ai-insights animate-slide-up">
                        <div className="ai-header">
                            <Brain size={32} />
                            <h3>AI Analysis & Recommendations</h3>
                        </div>
                        <div className="insights-list">
                            {aiInsights.map((insight, idx) => (
                                <div key={idx} className={`insight-item ${insight.type}`}>
                                    <div className="insight-icon">{insight.icon}</div>
                                    <div className="insight-content">
                                        <h4>{insight.title}</h4>
                                        <p>{insight.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="results-actions">
                    <button className="btn-secondary" onClick={() => {
                        setTestStarted(false);
                        setShowResults(false);
                        setUserAnswers([]);
                        setCurrentQuestionIndex(0);
                        setResults(null);
                        setQuestions([]);
                    }}>
                        Take Another Test
                    </button>
                </div>
            </div>
        );
    }

    return null;
};

export default MockTest;