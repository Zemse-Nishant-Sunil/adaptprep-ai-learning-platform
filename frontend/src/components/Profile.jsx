import React from 'react';
import { User, Mail, Calendar, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './Profile.css';

const Profile = () => {
    const { user, userData, loading } = useUser();

    // Safe defaults
    const safeUserData = {
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        strongSubjects: [],
        weakSubjects: [],
        ...userData
    };

    if (loading) {
        return (
            <div className="profile">
                <div className="empty-state">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile">
                <div className="empty-state">
                    <h2>User not found</h2>
                </div>
            </div>
        );
    }

    // Calculate profile stats
    const profileStats = {
        testsCompleted: safeUserData.totalTests,
        averageScore: safeUserData.averageScore,
        strongSubjects: safeUserData.strongSubjects?.length || 0,
        joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'
    };

    return (
        <div className="profile animate-fade-in">
            <div className="profile-header animate-slide-up">
                <h1 className="gradient-text">My Profile</h1>
                <p className="header-subtitle">Manage your account information and preferences</p>
            </div>

            <div className="profile-content">
                <div className="profile-card animate-slide-up">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            <img 
                                src={`/assets/avatar/${user.avatar || 'avatar_1.jpg'}`}
                                alt={user.name}
                                className="avatar-image"
                            />
                        </div>
                        <div className="profile-basic-info">
                            <h2>{user.name}</h2>
                            <p className="profile-email">{user.email}</p>
                            <div className="profile-exam-badge">
                                <span>{user.examType?.toUpperCase() || 'JEE'} Aspirant</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-stats animate-slide-up">
                    <h3>Profile Statistics</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <Award size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{profileStats.testsCompleted}</div>
                                <div className="stat-label">Tests Completed</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <User size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{profileStats.averageScore.toFixed(1)}%</div>
                                <div className="stat-label">Average Score</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <Award size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{profileStats.strongSubjects}</div>
                                <div className="stat-label">Strong Subjects</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <Calendar size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{profileStats.joinDate}</div>
                                <div className="stat-label">Member Since</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-details animate-slide-up">
                    <h3>Account Information</h3>
                    <div className="details-grid">
                        <div className="detail-row">
                            <div className="detail-icon">
                                <Mail size={20} />
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Email Address</div>
                                <div className="detail-value">{user.email}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-icon">
                                <User size={20} />
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Display Name</div>
                                <div className="detail-value">{user.name || 'Not set'}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-icon">
                                <Award size={20} />
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Target Exam</div>
                                <div className="detail-value">{user.examType?.toUpperCase() || 'JEE'}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-icon">
                                <Calendar size={20} />
                            </div>
                            <div className="detail-content">
                                <div className="detail-label">Account Created</div>
                                <div className="detail-value">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'Unknown'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {safeUserData.strongSubjects?.length > 0 && (
                    <div className="profile-subjects animate-slide-up">
                        <h3>Strong Subjects</h3>
                        <div className="subjects-list">
                            {safeUserData.strongSubjects.map((subject, index) => (
                                <div key={index} className="subject-tag">
                                    {subject}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="profile-progress animate-slide-up">
                    <h3>Learning Journey</h3>
                    <div className="progress-summary">
                        {profileStats.testsCompleted > 0 ? (
                            <>
                                <p>
                                    You've completed <strong>{profileStats.testsCompleted}</strong> tests
                                    with an average score of <strong>{profileStats.averageScore.toFixed(1)}%</strong>.
                                </p>
                                {profileStats.averageScore >= 80 ? (
                                    <p className="progress-message success">
                                        🎉 Excellent progress! You're well-prepared for your {user.examType?.toUpperCase() || 'JEE'} exam.
                                    </p>
                                ) : profileStats.averageScore >= 60 ? (
                                    <p className="progress-message warning">
                                        💪 Good progress! Keep practicing to reach your target score.
                                    </p>
                                ) : (
                                    <p className="progress-message info">
                                        🎯 Great start! Focus on consistent practice to improve your scores.
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="progress-message info">
                                🚀 Start your learning journey by taking your first mock test!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;