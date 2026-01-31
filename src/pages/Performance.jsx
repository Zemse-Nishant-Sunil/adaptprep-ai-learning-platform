import React, { useState } from 'react';
import { CheckCircle2, XCircle, Circle, Clock, Brain, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Performance.css';

const Performance = () => {
    const { userData } = useUser();
    const [selectedSubject, setSelectedSubject] = useState('');

    // Get last test questions
    const questions = userData?.lastTestQuestions || [];
    const lastTest = userData?.testHistory?.[0];

    // Auto-select first subject if not selected and we have tests
    React.useEffect(() => {
        if (!selectedSubject && lastTest?.subject) {
            setSelectedSubject(lastTest.subject);
        }
    }, [lastTest, selectedSubject]);

    if (!userData || !lastTest || questions.length === 0) {
        return (
            <div className="performance">
                <div className="empty-state animate-slide-up">
                    <AlertCircle size={48} style={{ color: 'rgba(255, 107, 53, 0.6)' }} />
                    <h2>No Test Data Available</h2>
                    <p>Complete a mock test to see detailed performance analysis</p>
                </div>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'correct': return <CheckCircle2 size={16} className="status-icon correct" />;
            case 'incorrect': return <XCircle size={16} className="status-icon incorrect" />;
            case 'skipped': return <Circle size={16} className="status-icon skipped" />;
            default: return null;
        }
    };

    const getStatusClass = (status) => {
        return `question-box status-${status}`;
    };

    const stats = {
        correct: questions.filter(q => q.status === 'correct').length,
        incorrect: questions.filter(q => q.status === 'incorrect').length,
        skipped: questions.filter(q => q.status === 'skipped').length,
        avgTime: Math.floor(questions.reduce((acc, q) => acc + q.timeSpent, 0) / questions.length)
    };

    return (
        <div className="performance">
            <div className="performance-header animate-slide-up">
                <h1 className="gradient-text">Question-Level Analysis</h1>
                <p className="header-subtitle">Detailed breakdown of your {lastTest.subject} performance</p>
            </div>

            <div className="performance-stats animate-slide-up">
                <div className="stat-card correct-card">
                    <CheckCircle2 size={32} />
                    <div className="stat-value">{stats.correct}</div>
                    <div className="stat-label">Correct</div>
                </div>
                <div className="stat-card incorrect-card">
                    <XCircle size={32} />
                    <div className="stat-value">{stats.incorrect}</div>
                    <div className="stat-label">Incorrect</div>
                </div>
                <div className="stat-card skipped-card">
                    <Circle size={32} />
                    <div className="stat-value">{stats.skipped}</div>
                    <div className="stat-label">Skipped</div>
                </div>
                <div className="stat-card time-card">
                    <Clock size={32} />
                    <div className="stat-value">{stats.avgTime}s</div>
                    <div className="stat-label">Avg Time</div>
                </div>
            </div>

            <div className="question-grid-section animate-slide-up">
                <h2 className="section-title">Question Heatmap</h2>
                <div className="question-grid">
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            className={getStatusClass(question.status)}
                            title={`Q${question.id} - ${question.topic} - ${question.difficulty}`}
                        >
                            <span className="question-number">{question.id}</span>
                            {getStatusIcon(question.status)}
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
                    <div className="legend-item">
                        <div className="legend-box skipped"></div>
                        <span>Skipped</span>
                    </div>
                </div>
            </div>

            <div className="topic-analysis animate-slide-up">
                <h2 className="section-title">Topic-wise Breakdown</h2>
                <div className="topic-cards">
                    {[...new Set(questions.map(q => q.topic))].map(topic => {
                        const topicQuestions = questions.filter(q => q.topic === topic);
                        const topicCorrect = topicQuestions.filter(q => q.status === 'correct').length;
                        const topicAccuracy = Math.round((topicCorrect / topicQuestions.length) * 100);

                        return (
                            <div key={topic} className="topic-card">
                                <h3>{topic}</h3>
                                <div className="topic-stats">
                                    <div className="topic-accuracy">
                                        <div className="accuracy-circle">
                                            <svg viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="rgba(255, 255, 255, 0.1)"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#FF6B35"
                                                    strokeWidth="2"
                                                    strokeDasharray={`${topicAccuracy}, 100`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="accuracy-text">{topicAccuracy}%</div>
                                        </div>
                                    </div>
                                    <div className="topic-details">
                                        <div className="detail-row">
                                            <span>Attempted:</span>
                                            <strong>{topicQuestions.length - topicQuestions.filter(q => q.status === 'skipped').length}</strong>
                                        </div>
                                        <div className="detail-row">
                                            <span>Correct:</span>
                                            <strong>{topicCorrect}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="ai-recommendations animate-slide-up">
                <div className="recommendation-header">
                    <Brain size={28} />
                    <h2>AI Recommendations for {lastTest.subject.charAt(0).toUpperCase() + lastTest.subject.slice(1)}</h2>
                </div>
                <div className="recommendations-list">
                    <div className="recommendation-item priority-high">
                        <div className="priority-badge">High Priority</div>
                        <h3>Focus on weak topics</h3>
                        <p>Spend extra time on topics where accuracy is below 60%. Review concepts and practice similar problems.</p>
                    </div>
                    <div className="recommendation-item priority-medium">
                        <div className="priority-badge">Medium Priority</div>
                        <h3>Improve time management</h3>
                        <p>Your average time per question is {stats.avgTime}s. Practice more to improve speed while maintaining accuracy.</p>
                    </div>
                    <div className="recommendation-item priority-low">
                        <div className="priority-badge">Low Priority</div>
                        <h3>Review skipped questions</h3>
                        <p>You skipped {stats.skipped} questions. Try to attempt all questions, even if uncertain.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;