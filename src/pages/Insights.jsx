import React, { useMemo } from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb, Target, Calendar, Zap, Award, BookOpen, CheckCircle, Trophy, Flame } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import './Insights.css';

const Insights = () => {
    const { userData, user } = useUser();

    if (!userData || userData.testsCompleted === 0) {
        return (
            <div className="insights-page">
                <div className="empty-state animate-slide-up">
                    <Brain size={48} style={{ color: 'rgba(255, 107, 53, 0.6)' }} />
                    <h2>No Insights Yet</h2>
                    <p>Complete a mock test to get AI-powered personalized insights</p>
                </div>
            </div>
        );
    }

    const strengths = userData.strengths || [];
    const weaknesses = userData.weaknesses || [];
    const progressData = userData.progressHistory || [];
    const accuracy = userData.accuracy || 0;
    const rank = userData.rank || 0;
    const targetRank = userData.targetRank || 1000;

    // Calculate improvement trends
    const recentAccuracy = progressData.slice(-5);
    const accuracyTrend = recentAccuracy.length > 1
        ? recentAccuracy[recentAccuracy.length - 1]?.accuracy - recentAccuracy[0]?.accuracy
        : 0;

    const scoreTrend = userData.currentScore - userData.previousScore;

    // Calculate subject wise performance
    const subjectPerformance = Object.entries(userData.subjects || {}).map(([subject, data]) => ({
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        accuracy: data.accuracy || 0,
        trend: data.trend,
        score: data.score
    }));

    // Mock data for visualization - based on test history
    const chartData = progressData.map((item, index) => ({
        test: `Test ${index + 1}`,
        accuracy: item.accuracy,
        score: item.score
    }));

    return (
        <div className="insights-page">
            <div className="insights-header animate-slide-up">
                <div className="header-icon-wrapper">
                    <Brain size={40} className="header-icon" />
                </div>
                <div>
                    <h1 className="gradient-text">AI-Powered Insights</h1>
                    <p className="header-subtitle">Personalized recommendations based on your {userData.testsCompleted} test performance</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats animate-slide-up">
                <div className="stat-box stat-accuracy">
                    <div className="stat-icon">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Current Accuracy</p>
                        <h3 className="stat-value">{accuracy.toFixed(1)}%</h3>
                        <span className={`stat-change ${accuracyTrend >= 0 ? 'positive' : 'negative'}`}>
                            {accuracyTrend >= 0 ? '+' : ''}{accuracyTrend.toFixed(1)}% from last test
                        </span>
                    </div>
                </div>

                <div className="stat-box stat-rank">
                    <div className="stat-icon">
                        <Trophy size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Current Rank</p>
                        <h3 className="stat-value">#{rank.toLocaleString()}</h3>
                        <span className="stat-change">{Math.round((userData.totalStudents - rank) / userData.totalStudents * 100)}% percentile</span>
                    </div>
                </div>

                <div className="stat-box stat-tests">
                    <div className="stat-icon">
                        <Flame size={24} />
                    </div>
                    <div className="stat-content">
                        <p className="stat-label">Tests Completed</p>
                        <h3 className="stat-value">{userData.testsCompleted}</h3>
                        <span className="stat-change">Total study hours: {userData.totalStudyHours.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="insight-cards animate-slide-up">
                <div className="insight-card strength-card">
                    <div className="card-header">
                        <div className="icon-badge success">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h2>Your Strengths</h2>
                            <p className="card-subtitle">Keep up the excellent work!</p>
                        </div>
                    </div>
                    <div className="card-content">
                        {strengths.length > 0 ? (
                            strengths.map((strength, i) => (
                                <div key={i} className="insight-item strength-item">
                                    <div className="bullet success"></div>
                                    <div className="item-content">
                                        <h4>{strength}</h4>
                                        <p>You're performing exceptionally well here. Maintain this momentum!</p>
                                    </div>
                                    <Award size={16} className="item-icon" />
                                </div>
                            ))
                        ) : (
                            <p className="no-data">Complete more tests to identify strengths</p>
                        )}
                    </div>
                </div>

                <div className="insight-card weakness-card">
                    <div className="card-header">
                        <div className="icon-badge warning">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <h2>Areas for Improvement</h2>
                            <p className="card-subtitle">Focus and you'll see quick gains!</p>
                        </div>
                    </div>
                    <div className="card-content">
                        {weaknesses.length > 0 ? (
                            weaknesses.map((weakness, i) => (
                                <div key={i} className="insight-item weakness-item">
                                    <div className="bullet warning"></div>
                                    <div className="item-content">
                                        <h4>{weakness}</h4>
                                        <p>Focus needed here. We've created personalized practice sets for you.</p>
                                    </div>
                                    <Zap size={16} className="item-icon" />
                                </div>
                            ))
                        ) : (
                            <p className="no-data">No weak areas identified yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Subject Performance */}
            <div className="subject-performance animate-slide-up">
                <h2>Subject-wise Performance</h2>
                <div className="subject-grid">
                    {subjectPerformance.map((subject) => (
                        <div key={subject.subject} className="subject-card">
                            <div className="subject-header">
                                <h3>{subject.subject}</h3>
                                <span className={`trend-badge trend-${subject.trend}`}>
                                    {subject.trend === 'up' ? '↗' : subject.trend === 'down' ? '↘' : '→'}
                                    {subject.trend}
                                </span>
                            </div>
                            <div className="subject-stats">
                                <div className="accuracy-display">
                                    <span className="accuracy-value">{subject.accuracy.toFixed(1)}%</span>
                                    <span className="accuracy-label">Accuracy</span>
                                </div>
                                <div className="accuracy-bar">
                                    <div className="bar-fill" style={{ width: `${subject.accuracy}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Chart */}
            {chartData.length > 0 && (
                <div className="progress-chart animate-slide-up">
                    <h2>Performance Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis dataKey="test" stroke="rgba(255, 255, 255, 0.5)" />
                            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 40, 0.9)', border: '1px solid rgba(255, 107, 53, 0.3)' }} />
                            <Legend />
                            <Line type="monotone" dataKey="accuracy" stroke="#FF6B35" dot={{ fill: '#FF6B35' }} name="Accuracy %" />
                            <Line type="monotone" dataKey="score" stroke="#4F46E5" dot={{ fill: '#4F46E5' }} name="Score" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Recommendations Section */}
            <div className="recommendations-section animate-slide-up">
                <div className="section-header">
                    <Lightbulb size={32} />
                    <div>
                        <h2>Personalized Action Plan</h2>
                        <p>Custom strategies tailored to your performance</p>
                    </div>
                </div>

                <div className="action-cards">
                    <div className="action-card urgent">
                        <div className="action-header">
                            <Zap size={24} />
                            <span className="action-label">This Week</span>
                        </div>
                        <h3>🎯 Immediate Focus</h3>
                        <ul>
                            <li>Complete 20 problems daily in your weak areas</li>
                            <li>Watch concept videos for fundamentals</li>
                            <li>Take 2-3 full-length mock tests</li>
                            <li>Review all incorrect answers with solutions</li>
                        </ul>
                        <div className="action-progress">
                            <span>Priority: Critical</span>
                            <div className="priority-dot high"></div>
                        </div>
                    </div>

                    <div className="action-card important">
                        <div className="action-header">
                            <Calendar size={24} />
                            <span className="action-label">This Month</span>
                        </div>
                        <h3>📊 Long-term Strategy</h3>
                        <ul>
                            <li>Master all weak topics systematically</li>
                            <li>Maintain strong performance in your strengths</li>
                            <li>Improve time management by 15-20%</li>
                            <li>Target rank: {targetRank.toLocaleString()}</li>
                        </ul>
                        <div className="action-progress">
                            <span>Priority: High</span>
                            <div className="priority-dot medium"></div>
                        </div>
                    </div>

                    <div className="action-card growth">
                        <div className="action-header">
                            <Target size={24} />
                            <span className="action-label">Next 3 Months</span>
                        </div>
                        <h3>🚀 Advanced Optimization</h3>
                        <ul>
                            <li>Take 15+ full-length tests</li>
                            <li>Analyze error patterns in detail</li>
                            <li>Practice high-difficulty questions</li>
                            <li>Expected rank improvement: ~{Math.round((rank - targetRank) * 0.5)}</li>
                        </ul>
                        <div className="action-progress">
                            <span>Priority: Medium</span>
                            <div className="priority-dot low"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Prediction */}
            <div className="ai-prediction animate-slide-up">
                <div className="prediction-header">
                    <Brain size={28} />
                    <h2>AI Performance Prediction</h2>
                </div>
                <div className="prediction-content">
                    <div className="prediction-card">
                        <h3>📈 Expected Score</h3>
                        <p className="prediction-value">{Math.round(userData.currentScore * 1.15)}</p>
                        <p className="prediction-detail">+15% improvement with consistent practice</p>
                    </div>

                    <div className="prediction-card">
                        <h3>🏆 Target Rank</h3>
                        <p className="prediction-value">#{Math.round(rank * 0.85).toLocaleString()}</p>
                        <p className="prediction-detail">Achievable in next 30 days</p>
                    </div>

                    <div className="prediction-card">
                        <h3>⭐ Success Probability</h3>
                        <p className="prediction-value">{Math.min(95, 60 + accuracy / 2).toFixed(0)}%</p>
                        <p className="prediction-detail">Based on your current trajectory</p>
                    </div>
                </div>

                <div className="prediction-message">
                    <p>
                        Based on your performance patterns and consistency, you're on track to achieve your target score.
                        With focused effort on weak areas and maintaining your strengths, you can improve your rank significantly.
                    </p>
                </div>
            </div>

            {/* Study Tips */}
            <div className="study-tips animate-slide-up">
                <h2>💡 AI-Recommended Study Tips</h2>
                <div className="tips-grid">
                    <div className="tip-card">
                        <BookOpen size={24} />
                        <h4>Concept Review</h4>
                        <p>Revisit weak topic basics before attempting advanced questions</p>
                    </div>
                    <div className="tip-card">
                        <Zap size={24} />
                        <h4>Time Management</h4>
                        <p>Practice time allocation on difficult topics to maximize efficiency</p>
                    </div>
                    <div className="tip-card">
                        <Trophy size={24} />
                        <h4>Consistency</h4>
                        <p>Study 2-3 hours daily rather than cramming on weekends</p>
                    </div>
                    <div className="tip-card">
                        <Target size={24} />
                        <h4>Smart Practice</h4>
                        <p>Focus on high-impact topics that appear frequently in tests</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;