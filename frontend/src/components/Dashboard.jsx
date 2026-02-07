import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, userData, loading } = useUser();

    // console.log(user, userData)
    if (loading) {
        return (
            <div className="dashboard">
                <div className="empty-state">
                    <h2>Loading your dashboard...</h2>
                </div>
            </div>
        );
    }

    // Add comprehensive null checks
    if (!user) {
        return (
            <div className="dashboard">
                <div className="empty-state">
                    <h2>Loading user data...</h2>
                </div>
            </div>
        );
    }

    // Safe defaults for backend userData structure
    const safeUserData = {
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        strongSubjects: [],
        weakSubjects: [],
        ...userData
    };

    // Calculate stats from backend testResults
    const calculateStats = () => {
        const { testResults } = safeUserData;

        if (!testResults || testResults.length === 0) {
            return {
                totalTests: 0,
                averageScore: 0,
                accuracy: 0,
                currentScore: 0,
                previousScore: 0,
                currentRawScore: 0,
                previousRawScore: 0,
                rank: 0
            };
        }

        // Filter valid test results with proper data
        const validResults = testResults.filter(test => test && test.totalQuestions && test.correctAnswers !== undefined);
        
        if (validResults.length === 0) {
            return {
                totalTests: testResults.length,
                averageScore: 0,
                accuracy: 0,
                currentScore: 0,
                previousScore: 0,
                currentRawScore: 0,
                previousRawScore: 0,
                rank: 0
            };
        }

        const totalQuestions = validResults.reduce((sum, test) => sum + (test.totalQuestions || 0), 0);
        const totalCorrect = validResults.reduce((sum, test) => sum + (test.correctAnswers || 0), 0);
        const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

        // Get current and previous scores and raw scores
        const currentScore = validResults[validResults.length - 1]?.correctAnswers || 0;
        const currentRawScore = validResults[validResults.length - 1]?.rawScore || 0;
        const previousScore = validResults.length > 1 ? validResults[validResults.length - 2]?.correctAnswers || 0 : 0;
        const previousRawScore = validResults.length > 1 ? validResults[validResults.length - 2]?.rawScore || 0 : 0;

        return {
            totalTests: validResults.length,
            averageScore: isNaN(accuracy) ? 0 : accuracy,
            accuracy: isNaN(accuracy) ? 0 : accuracy,
            currentScore: currentScore,
            previousScore: previousScore,
            currentRawScore: currentRawScore,
            previousRawScore: previousRawScore,
            rank: 0
        };
    };

    const stats = calculateStats();

    return (
        <div className="dashboard">
            <div className="dashboard-header animate-slide-up">
                <div className="header-content">
                    <h1 className="gradient-text">Welcome to AdaptPrep</h1>
                    <p className="header-subtitle">AI-powered insights for your {user.examType?.toUpperCase() || 'JEE'} preparation journey</p>
                </div>
            </div>

            <div className="student-info animate-slide-up">
                <div className="avatar">
                    <img 
                        src={`/assets/avatar/${user.avatar || 'avatar_1.jpg'}`}
                        alt={user.name}
                        className="avatar-img"
                    />
                </div>
                <div className="student-details">
                    <h2>{user.name}</h2>
                    <p className="mono">{user.email || 'No email'}</p>
                </div>
                <div className="exam-badge">
                    <span className="exam-label">{user.examType?.toUpperCase() || 'JEE'}</span>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="stats-overview">
                    <div className="stat-card">
                        <h3>Tests Taken</h3>
                        <div className="stat-value">{stats.totalTests}</div>
                        <small>Total mock tests completed</small>
                    </div>
                    <div className="stat-card">
                        <h3>Average Score</h3>
                        <div className="stat-value">{isNaN(stats.averageScore) ? '0.0' : stats.averageScore.toFixed(1)}%</div>
                        <small>Overall accuracy across all tests</small>
                    </div>
                    <div className="stat-card">
                        <h3>Latest Raw Score</h3>
                        <div className="stat-value">{stats.currentRawScore}</div>
                        <small>{stats.currentRawScore - stats.previousRawScore !== 0 ? `${stats.currentRawScore - stats.previousRawScore > 0 ? '+' : ''}${stats.currentRawScore - stats.previousRawScore} from last test` : 'Take a test to start'}</small>
                    </div>
                    <div className="stat-card">
                        <h3>Strong Subjects</h3>
                        <div className="stat-value">{safeUserData.strongSubjects?.length || 0}</div>
                        <small>Subjects you excel in</small>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <Link to="/mock-test" className="action-card">
                        <div className="action-icon">📝</div>
                        <h3>Take Mock Test</h3>
                        <p>Practice with {user.examType?.toUpperCase() || 'JEE'} questions</p>
                    </Link>

                    <Link to="/insights" className="action-card">
                        <div className="action-icon">📊</div>
                        <h3>View Insights</h3>
                        <p>Analyze your performance and progress</p>
                    </Link>

                    <Link to="/performance" className="action-card">
                        <div className="action-icon">🎯</div>
                        <h3>Performance Analysis</h3>
                        <p>Detailed breakdown of your results</p>
                    </Link>

                    <div className="action-card chat-card">
                        <div className="action-icon">🤖</div>
                        <h3>AI Study Coach</h3>
                        <p>Get personalized study advice</p>
                        <small>Click the chat icon below!</small>
                    </div>
                </div>

                {safeUserData.testResults?.length > 0 ? (
                    <div className="recent-tests">
                        <h3>Recent Tests</h3>
                        <div className="test-list">
                            {safeUserData.testResults.slice(-3).reverse().map((test, index) => {
                                // Ensure test has required fields
                                const totalQs = test.totalQuestions || 0;
                                const correct = test.correctAnswers || 0;
                                const accuracy = totalQs > 0 ? (correct / totalQs) * 100 : 0;
                                
                                return (
                                    <div key={index} className="test-item">
                                        <div className="test-info">
                                            <span className="test-subject">{test.examType?.toUpperCase() || 'JEE'} - {test.subject || 'Physics'}</span>
                                            <span className="test-score">{correct}/{totalQs}</span>
                                        </div>
                                        <div className="test-date">
                                            {test.date ? new Date(test.date).toLocaleDateString() : 'Recently'}
                                        </div>
                                        <div className="test-accuracy">
                                            {isNaN(accuracy) ? '0' : Math.round(accuracy)}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state-card animate-slide-up">
                        <div className="empty-icon">📚</div>
                        <h2>Start Your Journey!</h2>
                        <p>Take your first mock test to see detailed analytics and AI-powered insights.</p>
                        <Link to="/mock-test" className="cta-button">
                            Take Mock Test
                        </Link>
                    </div>
                )}

                {(safeUserData.strongSubjects?.length > 0 || safeUserData.weakSubjects?.length > 0) && (
                    <div className="insights-section animate-slide-up">
                        <div className="insights-header">
                            <h2>🤖 AI-Powered Insights</h2>
                            <span className="insights-badge">Live Analysis</span>
                        </div>

                        <div className="insights-grid">
                            {safeUserData.strongSubjects?.length > 0 && (
                                <div className="insight-card strength">
                                    <div className="insight-icon">💪</div>
                                    <h3>Strengths</h3>
                                    <ul>
                                        {safeUserData.strongSubjects.map((strength, i) => (
                                            <li key={i}>{strength}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {safeUserData.weakSubjects?.length > 0 && (
                                <div className="insight-card weakness">
                                    <div className="insight-icon">🎯</div>
                                    <h3>Focus Areas</h3>
                                    <ul>
                                        {safeUserData.weakSubjects.map((weakness, i) => (
                                            <li key={i}>{weakness}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="insight-card recommendation">
                                <div className="insight-icon">💡</div>
                                <h3>Next Steps</h3>
                                <ul>
                                    <li>Take tests regularly to track progress</li>
                                    <li>Focus on weak topics daily</li>
                                    <li>Review mistakes within 24 hours</li>
                                    <li>Maintain consistency in practice</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {stats.totalTests > 0 && (
                    <div className="progress-summary animate-slide-up">
                        <h3>Your Progress Summary</h3>
                        <div className="progress-content">
                            <p>
                                You've completed <strong>{stats.totalTests}</strong> tests with an average accuracy of <strong>{stats.averageScore.toFixed(1)}%</strong>.
                            </p>
                            {stats.averageScore >= 80 ? (
                                <p className="progress-message success">
                                    🎉 Excellent progress! You're well-prepared for your {user.examType?.toUpperCase() || 'JEE'} exam.
                                </p>
                            ) : stats.averageScore >= 60 ? (
                                <p className="progress-message warning">
                                    💪 Good progress! Keep practicing to reach your target score.
                                </p>
                            ) : (
                                <p className="progress-message info">
                                    🎯 Great start! Focus on consistent practice to improve your scores.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Dashboard;