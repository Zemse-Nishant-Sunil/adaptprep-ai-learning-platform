import React from 'react';
import { Award, Target, TrendingUp, Brain } from 'lucide-react';
import { useUser } from '../context/UserContext';
import MetricCard from '../components/MetricCard';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const { user, userData } = useUser();

    if (!userData) {
        return (
            <div className="dashboard">
                <div className="empty-state">
                    <h2>Loading your data...</h2>
                </div>
            </div>
        );
    }

    const scoreDiff = userData.currentScore - userData.previousScore;
    const rankPercentile = userData.rank > 0
        ? ((userData.totalStudents - userData.rank) / userData.totalStudents * 100).toFixed(1)
        : 0;

    return (
        <div className="dashboard">
            <div className="dashboard-header animate-slide-up">
                <div className="header-content">
                    <h1 className="gradient-text">Performance Analytics</h1>
                    <p className="header-subtitle">AI-powered insights for your {user.examType.toUpperCase()} preparation journey</p>
                </div>
            </div>

            <div className="student-info animate-slide-up">
                <div className="avatar">
                    {user.avatar}
                </div>
                <div className="student-details">
                    <h2>{user.name}</h2>
                    <p className="mono">{user.email}</p>
                </div>
                <div className="exam-badge">
                    <span className="exam-label">{user.examType.toUpperCase()}</span>
                </div>
            </div>

            <div className="metrics-grid">
                <MetricCard
                    title="Current Score"
                    value={userData.currentScore || 0}
                    subtitle={scoreDiff !== 0 ? `${scoreDiff > 0 ? '+' : ''}${scoreDiff} from last test` : 'Take a test to start'}
                    trend={scoreDiff > 0 ? 'up' : scoreDiff < 0 ? 'down' : 'stable'}
                    icon={Target}
                    gradient="gradient-1"
                />
                <MetricCard
                    title="Overall Accuracy"
                    value={`${userData.accuracy || 0}%`}
                    subtitle={`${userData.testsCompleted} tests completed`}
                    trend={userData.accuracy >= 70 ? 'up' : 'stable'}
                    icon={TrendingUp}
                    gradient="gradient-2"
                />
                <MetricCard
                    title="All India Rank"
                    value={userData.rank > 0 ? `#${userData.rank.toLocaleString()}` : 'N/A'}
                    subtitle={userData.rank > 0 ? `Top ${rankPercentile}%` : 'Complete tests to get rank'}
                    trend={scoreDiff > 0 ? 'up' : 'stable'}
                    icon={Award}
                    gradient="gradient-3"
                />
                <MetricCard
                    title="AI Confidence"
                    value={userData.testsCompleted > 0 ? `${Math.min(95, 60 + userData.accuracy / 3).toFixed(0)}%` : '0%'}
                    subtitle={userData.testsCompleted > 0 ? 'Target achievable' : 'Start testing'}
                    trend="up"
                    icon={Brain}
                    gradient="gradient-4"
                />
            </div>

            {userData.progressHistory && userData.progressHistory.length > 1 && (
                <div className="charts-section">
                    <div className="chart-card animate-slide-up">
                        <h2 className="chart-title">Progress Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={userData.progressHistory}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="week" stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        color: '#1F2937'
                                    }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="score" stroke="#6366F1" fillOpacity={1} fill="url(#colorScore)" />
                                <Area type="monotone" dataKey="accuracy" stroke="#10B981" fillOpacity={1} fill="url(#colorAccuracy)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card animate-slide-up">
                        <h2 className="chart-title">Subject-wise Performance</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={Object.entries(userData.subjects).map(([name, subject]) => ({
                                name: name.charAt(0).toUpperCase() + name.slice(1),
                                score: subject.score,
                                accuracy: subject.accuracy,
                                total: subject.total
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '12px',
                                        color: '#1F2937'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="score" fill="#6366F1" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="accuracy" fill="#10B981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {userData.testsCompleted === 0 && (
                <div className="empty-state-card animate-slide-up">
                    <div className="empty-icon">📚</div>
                    <h2>Start Your Journey!</h2>
                    <p>Take your first mock test to see detailed analytics and AI-powered insights.</p>
                    <a href="/test" className="cta-button">
                        Take Mock Test
                    </a>
                </div>
            )}

            {userData.strengths.length > 0 || userData.weaknesses.length > 0 ? (
                <div className="insights-section animate-slide-up">
                    <div className="insights-header">
                        <h2>🤖 AI-Powered Insights</h2>
                        <span className="insights-badge">Live Analysis</span>
                    </div>

                    <div className="insights-grid">
                        {userData.strengths.length > 0 && (
                            <div className="insight-card strength">
                                <div className="insight-icon">💪</div>
                                <h3>Strengths</h3>
                                <ul>
                                    {userData.strengths.map((strength, i) => (
                                        <li key={i}>{strength}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {userData.weaknesses.length > 0 && (
                            <div className="insight-card weakness">
                                <div className="insight-icon">🎯</div>
                                <h3>Focus Areas</h3>
                                <ul>
                                    {userData.weaknesses.map((weakness, i) => (
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
            ) : null}

            {userData.timeline && userData.timeline.length > 0 && (
                <div className="timeline-section animate-slide-up">
                    <h2 className="section-title">📊 Recent Activity</h2>

                    <div className="timeline">
                        {userData.timeline.map((item, index) => (
                            <div key={index} className={`timeline-item impact-${item.impact}`}>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <span className="timeline-week">{item.week}</span>
                                        <span className="timeline-date mono">{item.date}</span>
                                    </div>
                                    <div className="timeline-body">
                                        <div className="timeline-row">
                                            <strong>Action:</strong>
                                            <span>{item.action}</span>
                                        </div>
                                        <div className="timeline-row result">
                                            <strong>Result:</strong>
                                            <span>{item.result}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;