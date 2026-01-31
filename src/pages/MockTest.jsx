import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Brain, TrendingUp, Award, Target, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { questionBank } from '../questions';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DetailedSolutions from '../components/DetailedSolutions';
import './MockTest.css';

const MockTest = () => {
    const { user, updateTestResults } = useUser();
    const [testState, setTestState] = useState('setup'); // setup, testing, results, solutions
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
    const [questions, setQuestions] = useState([]);
    const [testResults, setTestResults] = useState(null);

    // Timer effect
    useEffect(() => {
        if (testState === 'testing' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && testState === 'testing') {
            submitTest();
        }
    }, [timeLeft, testState]);

    const startTest = () => {
        if (!selectedSubject) {
            alert('Please select a subject!');
            return;
        }
        const subjectQuestions = questionBank[user.examType][selectedSubject];
        setQuestions(subjectQuestions);
        setTestState('testing');
        setTimeLeft(subjectQuestions.length * 180); // 3 minutes per question
    };

    const selectAnswer = (questionId, answerIndex) => {
        setAnswers({ ...answers, [questionId]: answerIndex });
    };

    const submitTest = () => {
        // Calculate results
        let correct = 0;
        let incorrect = 0;
        let skipped = 0;
        const topicWise = {};
        const difficultyWise = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };

        questions.forEach((q) => {
            const userAnswer = answers[q.id];

            if (userAnswer === undefined) {
                skipped++;
            } else if (userAnswer === q.correct) {
                correct++;
                if (!topicWise[q.topic]) topicWise[q.topic] = { correct: 0, total: 0 };
                topicWise[q.topic].correct++;
                difficultyWise[q.difficulty].correct++;
            } else {
                incorrect++;
            }

            if (!topicWise[q.topic]) topicWise[q.topic] = { correct: 0, total: 0 };
            topicWise[q.topic].total++;
            difficultyWise[q.difficulty].total++;
        });

        const totalMarks = questions.length * 4;
        const marksObtained = correct * 4 - incorrect * 1; // JEE marking scheme
        const accuracy = ((correct / questions.length) * 100).toFixed(1);
        const timeTaken = (questions.length * 180) - timeLeft;

        // Map questions with user answers and status
        const questionsWithStatus = questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correct: q.correct,
            userAnswer: answers[q.id],
            status: answers[q.id] === undefined ? 'skipped' : (answers[q.id] === q.correct ? 'correct' : 'incorrect'),
            topic: q.topic,
            difficulty: q.difficulty,
            theory: q.theory,
            explanation: q.explanation,
            timeSpent: Math.floor(Math.random() * 180) + 60
        }));

        const results = {
            subject: selectedSubject,
            correct,
            incorrect,
            skipped,
            total: questions.length,
            marksObtained,
            totalMarks,
            accuracy,
            timeTaken,
            topicWise,
            difficultyWise,
            questions: questionsWithStatus
        };

        setTestResults(results);

        // Update user data in context
        updateTestResults(results);

        setTestState('results');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getAIAnalysis = () => {
        if (!testResults) return null;

        const { accuracy, topicWise, difficultyWise } = testResults;
        const insights = [];

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

        // Topic analysis
        const weakTopics = Object.entries(topicWise)
            .filter(([_, data]) => (data.correct / data.total) < 0.6)
            .map(([topic]) => topic);

        if (weakTopics.length > 0) {
            insights.push({
                type: 'info',
                icon: '📚',
                title: 'Focus Areas',
                message: `You need to work on: ${weakTopics.join(', ')}. Practice 20+ problems daily in these topics.`
            });
        }

        // Difficulty analysis
        if (difficultyWise.easy.correct < difficultyWise.easy.total * 0.8) {
            insights.push({
                type: 'warning',
                icon: '⚡',
                title: 'Master the Basics',
                message: 'You\'re missing easy questions. Strengthen your fundamentals first!'
            });
        }

        // Time management
        const avgTime = testResults.timeTaken / testResults.total;
        if (avgTime > 180) {
            insights.push({
                type: 'info',
                icon: '⏱️',
                title: 'Speed Up!',
                message: `You're taking ${Math.floor(avgTime)}s per question. Practice with a timer to improve speed.`
            });
        }

        return insights;
    };

    // Setup Screen
    if (testState === 'setup') {
        return (
            <div className="mock-test">
                <div className="test-setup animate-scale-in">
                    <div className="setup-header">
                        <div className="icon-wrapper">
                            <Brain size={64} className="animate-float" />
                        </div>
                        <h1 className="gradient-text">Start Your Mock Test</h1>
                        <p className="subtitle">Test your knowledge for {user.examType.toUpperCase()} and get AI-powered analysis</p>
                    </div>

                    <div className="setup-content">
                        <div className="subject-selection">
                            <h3>Select Subject</h3>
                            <div className="subject-grid">
                                {Object.keys(questionBank[user.examType]).map((subject) => (
                                    <button
                                        key={subject}
                                        className={`subject-card ${selectedSubject === subject ? 'active' : ''}`}
                                        onClick={() => setSelectedSubject(subject)}
                                    >
                                        <div className="subject-icon">
                                            {subject === 'physics' && '⚛️'}
                                            {subject === 'chemistry' && '🧪'}
                                            {subject === 'mathematics' && '📐'}
                                            {subject === 'biology' && '🧬'}
                                        </div>
                                        <div className="subject-name">{subject.charAt(0).toUpperCase() + subject.slice(1)}</div>
                                        <div className="subject-info">5 Questions</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="start-test-btn"
                            onClick={startTest}
                            disabled={!selectedSubject}
                        >
                            <span>Start Test</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Testing Screen
    if (testState === 'testing') {
        const currentQ = questions[currentQuestion];

        return (
            <div className="mock-test testing">
                <div className="test-header">
                    <div className="test-info">
                        <h2>{selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} Test</h2>
                        <p>Question {currentQuestion + 1} of {questions.length}</p>
                    </div>
                    <div className="test-timer">
                        <Clock size={24} />
                        <span className={timeLeft < 300 ? 'timer-warning' : ''}>{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="question-navigator">
                    {questions.map((_, idx) => (
                        <button
                            key={idx}
                            className={`nav-btn ${currentQuestion === idx ? 'active' : ''} ${answers[questions[idx].id] !== undefined ? 'answered' : ''}`}
                            onClick={() => setCurrentQuestion(idx)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

                <div className="question-container animate-slide-up">
                    <div className="question-header">
                        <span className={`difficulty-badge ${currentQ.difficulty}`}>
                            {currentQ.difficulty}
                        </span>
                        <span className="topic-badge">{currentQ.topic}</span>
                    </div>

                    <h3 className="question-text">{currentQ.question}</h3>

                    <div className="options-container">
                        {currentQ.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`option-btn ${answers[currentQ.id] === idx ? 'selected' : ''}`}
                                onClick={() => selectAnswer(currentQ.id, idx)}
                            >
                                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                                <span className="option-text">{option}</span>
                                {answers[currentQ.id] === idx && <CheckCircle size={20} />}
                            </button>
                        ))}
                    </div>

                    <div className="question-actions">
                        <button
                            className="btn-secondary"
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button className="btn-primary" onClick={submitTest}>
                                Submit Test
                            </button>
                        ) : (
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
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
    if (testState === 'results' && testResults) {
        const pieData = [
            { name: 'Correct', value: testResults.correct, color: '#10B981' },
            { name: 'Incorrect', value: testResults.incorrect, color: '#EF4444' },
            { name: 'Skipped', value: testResults.skipped, color: '#F59E0B' }
        ];

        const topicData = Object.entries(testResults.topicWise).map(([topic, data]) => ({
            name: topic,
            accuracy: ((data.correct / data.total) * 100).toFixed(1),
            correct: data.correct,
            total: data.total
        }));

        const difficultyData = Object.entries(testResults.difficultyWise).map(([diff, data]) => ({
            name: diff.charAt(0).toUpperCase() + diff.slice(1),
            accuracy: data.total > 0 ? ((data.correct / data.total) * 100).toFixed(1) : 0,
            attempted: data.total
        }));

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
                        <div className="card-value">{testResults.marksObtained}/{testResults.totalMarks}</div>
                        <div className="card-label">Total Score</div>
                    </div>
                    <div className="summary-card success">
                        <div className="card-icon">✅</div>
                        <div className="card-value">{testResults.accuracy}%</div>
                        <div className="card-label">Accuracy</div>
                    </div>
                    <div className="summary-card info">
                        <div className="card-icon">⏱️</div>
                        <div className="card-value">{formatTime(testResults.timeTaken)}</div>
                        <div className="card-label">Time Taken</div>
                    </div>
                    <div className="summary-card warning">
                        <div className="card-icon">📊</div>
                        <div className="card-value">{testResults.correct}/{testResults.total}</div>
                        <div className="card-label">Correct Answers</div>
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

                    <div className="result-card animate-slide-up">
                        <h3>Topic-wise Analysis</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topicData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar dataKey="accuracy" fill="#6366F1" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="result-card animate-slide-up">
                        <h3>Difficulty Analysis</h3>
                        <div className="difficulty-breakdown">
                            {difficultyData.map((item) => (
                                <div key={item.name} className="difficulty-item">
                                    <div className="difficulty-header">
                                        <span className="difficulty-name">{item.name}</span>
                                        <span className="difficulty-accuracy">{item.accuracy}%</span>
                                    </div>
                                    <div className="difficulty-bar">
                                        <div
                                            className="difficulty-fill"
                                            style={{ width: `${item.accuracy}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                        setTestState('setup');
                        setAnswers({});
                        setCurrentQuestion(0);
                        setTestResults(null);
                    }}>
                        Take Another Test
                    </button>
                    <button className="btn-primary" onClick={() => setTestState('solutions')}>
                        View Detailed Solutions
                    </button>
                </div>
            </div>
        );
    }

    // Detailed Solutions Screen
    if (testState === 'solutions' && testResults) {
        return (
            <DetailedSolutions
                testResults={testResults}
                selectedSubject={selectedSubject}
                onBack={() => setTestState('results')}
            />
        );
    }

    return null;
};

export default MockTest;