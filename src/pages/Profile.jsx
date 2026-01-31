import React from 'react';
import { User as UserIcon, Mail, BookOpen, Trophy, Calendar, Settings } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Profile.css';

const Profile = () => {
    const { user, userData } = useUser();

    if (!user || !userData) {
        return (
            <div className="profile-page">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header animate-slide-up">
                <div className="profile-avatar-large">
                    {user.avatar}
                </div>
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p className="mono">{user.email}</p>
                    <p className="joined-date">Member since {user.joinedDate}</p>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-card animate-slide-up">
                    <div className="card-icon">
                        <BookOpen size={28} />
                    </div>
                    <div className="card-content">
                        <h3>Target Exam</h3>
                        <p>{user.examType.toUpperCase()}</p>
                    </div>
                </div>

                <div className="profile-card animate-slide-up">
                    <div className="card-icon">
                        <Trophy size={28} />
                    </div>
                    <div className="card-content">
                        <h3>Current Rank</h3>
                        <p>{userData.rank > 0 ? `#${userData.rank.toLocaleString()}` : 'N/A'}</p>
                    </div>
                </div>

                <div className="profile-card animate-slide-up">
                    <div className="card-icon">
                        <Calendar size={28} />
                    </div>
                    <div className="card-content">
                        <h3>Tests Completed</h3>
                        <p>{userData.testsCompleted}</p>
                    </div>
                </div>

                <div className="profile-card animate-slide-up">
                    <div className="card-icon">
                        <Settings size={28} />
                    </div>
                    <div className="card-content">
                        <h3>Study Hours</h3>
                        <p>{userData.totalStudyHours}H</p>
                    </div>
                </div>
            </div>

            <div className="goals-section animate-slide-up">
                <h2 className="section-title">Your Goals</h2>
                <div className="goals-card">
                    <div className="goal-item">
                        <div className="goal-label">Target Rank</div>
                        <div className="goal-value">#{userData.targetRank.toLocaleString()}</div>
                        <div className="goal-progress">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${userData.rank > 0 ? Math.min(100, ((userData.rank - userData.targetRank) / userData.rank) * 100) : 0}%` }}
                                ></div>
                            </div>
                            <span className="progress-text">
                                {userData.rank > 0 ? `${Math.min(100, Math.round(((userData.rank - userData.targetRank) / userData.rank) * 100))}% to goal` : 'Start testing to track progress'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="settings-section animate-slide-up">
                <h2 className="section-title">Settings</h2>
                <div className="settings-card">
                    <div className="setting-item">
                        <div className="setting-info">
                            <h3>Email Notifications</h3>
                            <p>Receive daily progress reports and insights</p>
                        </div>
                        <label className="toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <h3>AI Recommendations</h3>
                            <p>Get personalized study suggestions</p>
                        </div>
                        <label className="toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-info">
                            <h3>Performance Alerts</h3>
                            <p>Get notified about significant changes</p>
                        </div>
                        <label className="toggle">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;