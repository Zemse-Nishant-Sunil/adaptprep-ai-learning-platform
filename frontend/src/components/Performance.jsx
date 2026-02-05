import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, CheckCircle, XCircle, Clock, Brain } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './Performance.css';

const Performance = () => {
    const { userData, loading } = useUser();
    const [selectedSubject, setSelectedSubject] = useState('All');

    if (loading) {
        return (
            <div className="performance">
                <div className="empty-state">
                    <h2>Loading performance data...</h2>
                </div>
            </div>
        );
    }

    // Safe defaults for userData
    const safeUserData = {
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        ...userData
    };

    // Calculate performance stats from test results
    const calculatePerformanceStats = () => {
        const { testResults } = safeUserData;

        if (!testResults || testResults.length === 0) {
            return {
                totalQuestions: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                averageTime: 0,
                subjectStats: {},
                questionStatus: []
            };
        }

        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalTime = 0;
        const subjectStats = {};
        const questionStatus = [];

        testResults.forEach((test, testIndex) => {
            const testQuestions = test.totalQuestions || 10;
            const testCorrect = test.score || 0;
            const testIncorrect = testQuestions - testCorrect;

            totalQuestions += testQuestions;
            totalCorrect += testCorrect;
            totalTime += test.timeTaken || 0;

            // Subject stats
            const subject = test.subject || 'Unknown';
            if (!subjectStats[subject]) {
                subjectStats[subject] = { correct: 0, total: 0, tests: 0 };
            }
            subjectStats[subject].correct += testCorrect;
            subjectStats[subject].total += testQuestions;
            subjectStats[subject].tests += 1;

            // Generate question status for visualization
            for (let i = 0; i < testQuestions; i++) {
                questionStatus.push({
                    questionNumber: totalQuestions - testQuestions + i + 1,
                    status: i < testCorrect ? 'correct' : 'incorrect',
                    subject: subject,
                    testIndex: testIndex
                });
            }
        });

        return {
            totalQuestions,
            correct: totalCorrect,
            incorrect: totalQuestions - totalCorrect,
            skipped: 0,
            averageTime: testResults.length > 0 ? Math.round(totalTime / testResults.length) : 0,
            subjectStats,
            questionStatus
        };
    };

    const stats = calculatePerformanceStats();

    if (stats.totalQuestions === 0) {
        return (
            <div className="performance">
                <div className="performance-header animate-slide-up">
                    <h1 className="gradient-text">Performance Analysis</h1>
                    <p className="header-subtitle">Detailed breakdown of your test performance</p>
                </div>

                <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <h2>No Performance Data</h2>
                    <p>Take some mock tests to see detailed performance analysis!</p>
                </div>
            </div>
        );
    }

    // Prepare chart data
    const subjectChartData = Object.entries(stats.subjectStats).map(([subject, data]) => ({
        name: subject,
        accuracy: ((data.correct / data.total) * 100).toFixed(1),
        correct: data.correct,
        total: data.total
    }));

    const pieData = [
        { name: 'Correct', value: stats.correct, color: '#10B981' },
        { name: 'Incorrect', value: stats.incorrect, color: '#EF4444' },
        ...(stats.skipped > 0 ? [{ name: 'Skipped', value: stats.skipped, color: '#F59E0B' }] : [])
    ];

    return (
        <div className="performance animate-fade-in">
            <div className="performance-header animate-slide-up">
                <h1 className="gradient-text">Performance Analysis</h1>
                <p className="header-subtitle">Detailed breakdown of your test performance</p>
            </div>

            <div className="controls animate-slide-up">
                <select
                    className="subject-selector"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    <option value="All">All Subjects</option>
                    {Object.keys(stats.subjectStats).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            <div className="performance-stats animate-slide-up">
                <div className="stat-card correct-card">
                    <CheckCircle className="stat-icon" size={32} />
                    <div className="stat-value">{stats.correct}</div>
                    <div className="stat-label">Correct</div>
                </div>

                <div className="stat-card incorrect-card">
                    <XCircle className="stat-icon" size={32} />
                    <div className="stat-value">{stats.incorrect}</div>
                    <div className="stat-label">Incorrect</div>
                </div>

                <div className="stat-card time-card">
                    <Clock className="stat-icon" size={32} />
                    <div className="stat-value">{Math.floor(stats.averageTime / 60)}m</div>
                    <div className="stat-label">Avg Time</div>
                </div>
            </div>

            <div className="question-grid-section animate-slide-up">
                <h2 className="section-title">Question-wise Performance</h2>
                <div className="question-grid">
                    {stats.questionStatus.map((question, index) => (
                        <div
                            key={index}
                            className={`question-box status-${question.status}`}
                            title={`Question ${question.questionNumber}: ${question.status} (${question.subject})`}
                        >
                            <span className="question-number">{question.questionNumber}</span>
                            <span className="status-icon">
                                {question.status === 'correct' ? '✓' : '✗'}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-box correct"></div>
                        <span>Correct</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-box incorrect"></div>
                        <span>Incorrect</span>
                    </div>
                </div>
            </div>

            <div className="charts-section animate-slide-up">
                <div className="chart-card">
                    <h3>Overall Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Subject-wise Accuracy</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px'
                                }}
                            />
                            <Bar dataKey="accuracy" fill="#6366F1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Performance;
