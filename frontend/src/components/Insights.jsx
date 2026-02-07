import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Award, BookOpen, Sparkles, Lightbulb } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './Insights.css';

const Insights = () => {
    const { user, userData, loading } = useUser();
    const [selectedExam, setSelectedExam] = useState(user.examType);

    if (loading) {
        return (
            <div className="insights-page">
                <div className="empty-state">
                    <h2>Loading your insights...</h2>
                </div>
            </div>
        );
    }

    // Safe defaults for userData
    const safeUserData = {
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        strongSubjects: [],
        weakSubjects: [],
        ...userData
    };

    // Calculate stats from test results
    const calculateStats = () => {
        const { testResults } = safeUserData;

        if (!testResults || testResults.length === 0) {
            return {
                totalTests: 0,
                averageScore: 0,
                accuracy: 0,
                totalTimeTaken: 0,
                totalRawScore: 0,
                strengths: [],
                weaknesses: [],
                subjectStats: {}
            };
        }

        // Filter valid test results
        const validResults = testResults.filter(test => test && test.totalQuestions && test.correctAnswers !== undefined);
        
        if (validResults.length === 0) {
            return {
                totalTests: testResults.length,
                averageScore: 0,
                accuracy: 0,
                totalTimeTaken: 0,
                totalRawScore: 0,
                strengths: [],
                weaknesses: [],
                subjectStats: {}
            };
        }

        const totalQuestions = validResults.reduce((sum, test) => sum + (test.totalQuestions || 0), 0);
        const totalCorrect = validResults.reduce((sum, test) => sum + (test.correctAnswers || 0), 0);
        const totalRawScore = validResults.reduce((sum, test) => sum + (test.rawScore || 0), 0);
        const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
        const totalTime = validResults.reduce((sum, test) => sum + (test.timeTaken || 0), 0);

        // Calculate subject performance
        const subjectStats = {};
        validResults.forEach(test => {
            const subject = test.subject || 'Unknown';
            if (!subjectStats[subject]) {
                subjectStats[subject] = { correctAnswers: 0, total: 0, tests: 0, rawScore: 0 };
            }
            subjectStats[subject].correctAnswers += test.correctAnswers || 0;
            subjectStats[subject].total += test.totalQuestions || 0;
            subjectStats[subject].tests += 1;
            subjectStats[subject].rawScore += test.rawScore || 0;
        });

        const strengths = [];
        const weaknesses = [];

        Object.entries(subjectStats).forEach(([subject, stats]) => {
            const subjectAccuracy = stats.total > 0 ? (stats.correctAnswers / stats.total) * 100 : 0;
            if (subjectAccuracy >= 70) {
                strengths.push(subject);
            } else if (subjectAccuracy < 50) {
                weaknesses.push(subject);
            }
        });

        return {
            totalTests: validResults.length,
            averageScore: isNaN(accuracy) ? 0 : accuracy,
            accuracy: isNaN(accuracy) ? 0 : accuracy,
            totalTimeTaken: totalTime,
            totalRawScore: totalRawScore,
            strengths,
            weaknesses,
            subjectStats
        };
    };

    const stats = calculateStats();

    if (stats.totalTests === 0) {
        return (
            <div className="insights-page">
                <div className="insights-header">
                    <div className="header-icon-wrapper">
                        <Brain className="header-icon" size={48} />
                    </div>
                    <div>
                        <h1>AI-Powered Insights</h1>
                        <p className="header-subtitle">Discover your learning patterns and get personalized recommendations</p>
                    </div>
                </div>

                <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <h2>No Performance Data Yet</h2>
                    <p>Take some mock tests to unlock powerful AI insights about your learning journey!</p>
                    <div className="ai-coach-tip">
                        <p>💡 <strong>Tip:</strong> Click the 🤖 chat icon to get personalized study advice from your AI coach!</p>
                    </div>
                </div>
            </div>
        );
    }

    // Generate AI recommendations based on performance
    const getRecommendations = () => {
        const recommendations = [];

        if (stats.accuracy < 60) {
            recommendations.push({
                type: 'urgent',
                title: 'Focus on Fundamentals',
                description: 'Your accuracy needs improvement. Spend more time on basic concepts.',
                actions: ['Review theory before practicing', 'Start with easier questions', 'Focus on one topic at a time']
            });
        }

        if (stats.weaknesses.length > 0) {
            recommendations.push({
                type: 'important',
                title: 'Strengthen Weak Areas',
                description: `You need extra practice in: ${stats.weaknesses.join(', ')}`,
                actions: ['Allocate 60% study time to weak subjects', 'Take subject-specific tests', 'Get help from mentors']
            });
        }

        if (stats.strengths.length > 0) {
            recommendations.push({
                type: 'growth',
                title: 'Leverage Your Strengths',
                description: `You excel in: ${stats.strengths.join(', ')}. Use this to boost confidence.`,
                actions: ['Solve advanced problems in strong subjects', 'Help others to reinforce learning', 'Maintain regular practice']
            });
        }

        return recommendations;
    };

    const recommendations = getRecommendations();

    return (
        <div className="insights-page animate-fade-in">
            <div className="insights-header animate-slide-up">
                <div className="header-icon-wrapper">
                    <Brain className="header-icon" size={48} />
                </div>
                <div>
                    <h1>AI-Powered Insights</h1>
                    <p className="header-subtitle">Discover your learning patterns and get personalized recommendations</p>
                </div>
            </div>

            <div className="exam-selector animate-slide-up">
                <button
                    className={`exam-btn active}`}
                    onClick={() => setSelectedExam('JEE')}
                >
                    {selectedExam}
                </button>
                {/* <button
                    className={`exam-btn ${selectedExam === 'NEET' ? 'active' : ''}`}
                    onClick={() => setSelectedExam('NEET')}
                >
                    NEET
                </button> */}
            </div>

            <div className="quick-stats animate-slide-up">
                <div className="stat-box stat-accuracy">
                    <div className="stat-icon">
                        <Target size={32} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Overall Accuracy</p>
                        <h3 className="stat-value">{isNaN(stats.accuracy) ? '0.0' : stats.accuracy.toFixed(1)}%</h3>
                        <span className={`stat-change ${stats.accuracy >= 70 ? 'positive' : stats.accuracy >= 50 ? 'neutral' : 'negative'}`}>
                            {stats.accuracy >= 70 ? 'Excellent!' : stats.accuracy >= 50 ? 'Good Progress' : 'Needs Improvement'}
                        </span>
                    </div>
                </div>

                <div className="stat-box stat-tests">
                    <div className="stat-icon">
                        <BookOpen size={32} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Tests Completed</p>
                        <h3 className="stat-value">{stats.totalTests}</h3>
                        <span className="stat-change">
                            Keep practicing regularly
                        </span>
                    </div>
                </div>

                <div className="stat-box stat-rank">
                    <div className="stat-icon">
                        <Award size={32} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Average Score</p>
                        <h3 className="stat-value">{stats.averageScore.toFixed(1)}%</h3>
                        <span className="stat-change">
                            {stats.totalTests > 1 ? 'Based on all tests' : 'Take more tests for trends'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="insight-cards animate-slide-up">
                {stats.strengths.length > 0 && (
                    <div className="insight-card strength-card">
                        <div className="card-header">
                            <div className="icon-badge success">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h2>Your Strengths</h2>
                                <p className="card-subtitle">Subjects where you excel</p>
                            </div>
                        </div>
                        <div className="card-content">
                            {stats.strengths.map((subject, index) => (
                                <div key={index} className="insight-item strength-item">
                                    <div className="bullet success"></div>
                                    <div className="item-content">
                                        <h3>{subject}</h3>
                                        <p>Excellent performance! Continue regular practice to maintain your edge.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {stats.weaknesses.length > 0 && (
                    <div className="insight-card weakness-card">
                        <div className="card-header">
                            <div className="icon-badge warning">
                                <Target size={24} />
                            </div>
                            <div>
                                <h2>Focus Areas</h2>
                                <p className="card-subtitle">Subjects that need attention</p>
                            </div>
                        </div>
                        <div className="card-content">
                            {stats.weaknesses.map((subject, index) => (
                                <div key={index} className="insight-item weakness-item">
                                    <div className="bullet warning"></div>
                                    <div className="item-content">
                                        <h3>{subject}</h3>
                                        <p>Allocate more study time and practice more questions in this subject.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {recommendations.length > 0 && (
                <div className="recommendations-section animate-slide-up">
                    <div className="section-header">
                        <Lightbulb size={24} />
                        <h2>AI Recommendations</h2>
                    </div>
                    <div className="action-cards">
                        {recommendations.map((rec, index) => (
                            <div key={index} className={`action-card ${rec.type}`}>
                                <div className="action-header">
                                    <Sparkles size={24} />
                                    <span className="action-label">{rec.type}</span>
                                </div>
                                <h3>{rec.title}</h3>
                                <p>{rec.description}</p>
                                <ul>
                                    {rec.actions.map((action, actionIndex) => (
                                        <li key={actionIndex}>{action}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {stats.subjectStats && Object.keys(stats.subjectStats).length > 0 && (
                <div className="subject-performance animate-slide-up">
                    <h2>Subject-wise Performance</h2>
                    <div className="subject-grid">
                        {Object.entries(stats.subjectStats).map(([subject, subjectData]) => {
                            // Ensure we have valid data before calculating
                            const totalQs = subjectData.total || 0;
                            const correct = subjectData.correctAnswers || 0;
                            const accuracy = totalQs > 0 ? (correct / totalQs) * 100 : 0;
                            const trend = accuracy >= 70 ? 'up' : accuracy >= 50 ? 'stable' : 'down';

                            return (
                                <div key={subject} className="subject-card">
                                    <div className="subject-header">
                                        <h3>{subject}</h3>
                                        <span className={`trend-badge trend-${trend}`}>
                                            {isNaN(accuracy) ? '0.0' : accuracy.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="subject-stats">
                                        <div className="accuracy-display">
                                            <span className="accuracy-value">{isNaN(accuracy) ? '0' : Math.round(accuracy)}%</span>
                                            <span className="accuracy-label">Accuracy</span>
                                        </div>
                                        <div className="accuracy-bar">
                                            <div
                                                className="bar-fill"
                                                style={{ width: `${Math.min(isNaN(accuracy) ? 0 : accuracy, 100)}%` }}
                                            ></div>
                                        </div>
                                        <small>{subjectData.tests} tests • {correct}/{totalQs} correct</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}


        </div>
    );
};

export default Insights;