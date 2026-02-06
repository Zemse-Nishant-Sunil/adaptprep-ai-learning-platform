import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle, XCircle, Brain, TrendingUp, Award, Target, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DetailedSolutions from './DetailedSolutions';
import './MockTest.css';

const TEST_DURATION = 600; // 10 minutes in seconds

const MockTest = () => {
    // State variables
    const [selectedSubject, setSelectedSubject] = useState('Physics');
    const [selectedTest, setSelectedTest] = useState('test1');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testStarted, setTestStarted] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);
    const [showResults, setShowResults] = useState(false);
    const [showDetailedSolutions, setShowDetailedSolutions] = useState(false);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const timer = useRef(null);
    const { getQuestions, saveTestResult, user } = useUser();

    // Use user's exam type
    const selectedExam = user?.examType?.toUpperCase() || 'JEE';

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

    const getCorrectAnswerIndex = (question) => {
        // Handle both 'correct' and 'correctAnswer' field names
        return question.correct !== undefined ? question.correct : question.correctAnswer;
    };

    const startTest = async () => {
        setIsLoading(true);

        try {
            const testNumber = parseInt(selectedTest.replace('test', ''));
            const result = await getQuestions(selectedExam, selectedSubject, testNumber, 10);

            if (result.success) {
                const normalizedQuestions = result.questions.map(q => ({
                    ...q,
                    // Normalize the correct answer field
                    correct: q.correct !== undefined ? q.correct : q.correctAnswer,
                    correctAnswer: q.correct !== undefined ? q.correct : q.correctAnswer
                }));

                setQuestions(normalizedQuestions);
                setCurrentQuestionIndex(0);
                setUserAnswers(new Array(normalizedQuestions.length).fill(null));
                setTestStarted(true);
                setStartTime(Date.now());
                setTimeRemaining(TEST_DURATION);
                setShowResults(false);
                setShowDetailedSolutions(false);
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

        // Calculate results with JEE/NEET scoring format (+4 for correct, -1 for incorrect, 0 for skipped)
        let rawScore = 0;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let skippedAnswers = 0;
        
        const detailedResults = questions.map((question, index) => {
            const correctAnswerIndex = getCorrectAnswerIndex(question);
            const userAnswerIndex = userAnswers[index];
            const isCorrect = userAnswerIndex === correctAnswerIndex;
            const isSkipped = userAnswerIndex === null;

            if (isCorrect) {
                correctAnswers++;
                rawScore += 4;
            } else if (!isSkipped) {
                incorrectAnswers++;
                rawScore -= 1;
            } else {
                skippedAnswers++;
            }

            return {
                id: question.id,
                question: question.question,
                options: question.options,
                userAnswer: userAnswerIndex,
                correct: correctAnswerIndex,
                isCorrect: isCorrect,
                status: isSkipped ? 'skipped' : isCorrect ? 'correct' : 'incorrect',
                explanation: question.explanation,
                theory: question.theory,
                topic: question.topic,
                difficulty: question.difficulty
            };
        });

        // Calculate stats
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        const accuracy = Math.round((correctAnswers / questions.length) * 100);

        // Extract question statuses in order for accurate tracking
        const questionStatuses = detailedResults.map(result => result.status);

        // Save result to backend with JEE/NEET format
        const testResult = {
            examType: selectedExam,
            subject: selectedSubject,
            testNumber: parseInt(selectedTest.replace('test', '')),
            rawScore: rawScore,
            correctAnswers: correctAnswers,
            incorrectAnswers: incorrectAnswers,
            skipped: skippedAnswers,
            totalQuestions: questions.length,
            timeTaken: timeTaken,
            questionStatuses: questionStatuses
        };

        await saveTestResult(testResult);

        setResults({
            rawScore: rawScore,
            correctAnswers: correctAnswers,
            incorrectAnswers: incorrectAnswers,
            skipped: skippedAnswers,
            totalQuestions: questions.length,
            percentage: accuracy,
            timeTaken: timeTaken,
            accuracy: accuracy,
            detailedResults: detailedResults,
            questions: detailedResults,
            total: questions.length
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

    // Show Detailed Solutions
    if (showDetailedSolutions && results) {
        return (
            <DetailedSolutions
                testResults={results}
                selectedSubject={selectedSubject}
                onBack={() => setShowDetailedSolutions(false)}
            />
        );
    }

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

                        <div className="test-selection">
                            <h3>Select Test (1-10)</h3>
                            <div className="test-grid">
                                {Array.from({ length: 10 }, (_, i) => `test${i + 1}`).map((testNum) => (
                                    <button
                                        key={testNum}
                                        className={`test-card ${selectedTest === testNum ? 'active' : ''}`}
                                        onClick={() => setSelectedTest(testNum)}
                                    >
                                        <span className="test-number">{testNum.replace('test', '')}</span>
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
            { name: 'Correct', value: results.correctAnswers, color: '#10B981' },
            { name: 'Incorrect', value: results.incorrectAnswers, color: '#EF4444' },
            { name: 'Skipped', value: results.skipped, color: '#F59E0B' }
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
                        <div className="card-value">{results.rawScore}</div>
                        <div className="card-label">Raw Score</div>
                    </div>
                    <div className="summary-card success">
                        <div className="card-icon">✅</div>
                        <div className="card-value">{results.correctAnswers}</div>
                        <div className="card-label">Correct (+4 each)</div>
                    </div>
                    <div className="summary-card error">
                        <div className="card-icon">❌</div>
                        <div className="card-value">{results.incorrectAnswers}</div>
                        <div className="card-label">Incorrect (-1 each)</div>
                    </div>
                    <div className="summary-card warning">
                        <div className="card-icon">⏭️</div>
                        <div className="card-value">{results.skipped}</div>
                        <div className="card-label">Skipped (0 each)</div>
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
                    <button
                        className="btn-primary"
                        onClick={() => setShowDetailedSolutions(true)}
                    >
                        View Detailed Solutions
                    </button>
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