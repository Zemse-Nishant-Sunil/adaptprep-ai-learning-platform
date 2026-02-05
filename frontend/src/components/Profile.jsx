import React, { useState } from 'react';
import { User, Mail, Calendar, Award, Edit3, Save, X, Camera } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './Profile.css';

const Profile = () => {
    const { user, userData, loading, apiRequest } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        examType: ''
    });
    const [isSaving, setIsSaving] = useState(false);

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

    const handleEditClick = () => {
        setEditForm({
            name: user.name || user.email?.split('@')[0] || 'Student',
            examType: user.examType || 'JEE'
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await apiRequest('/user/profile', {
                method: 'PUT',
                body: JSON.stringify(editForm)
            });

            if (response.success) {
                // Update local user state
                setIsEditing(false);
                // Optionally refresh user data
                window.location.reload(); // Simple refresh for now
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm({ name: '', examType: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                            <span>{user.avatar || user.email?.substring(0, 2).toUpperCase() || 'ST'}</span>
                            <button className="avatar-edit-btn" title="Change Avatar">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="profile-basic-info">
                            {isEditing ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Your name"
                                        className="edit-input"
                                    />
                                    <select
                                        name="examType"
                                        value={editForm.examType}
                                        onChange={handleInputChange}
                                        className="edit-select"
                                    >
                                        <option value="JEE">JEE</option>
                                        <option value="NEET">NEET</option>
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <h2>{user.name || user.email?.split('@')[0] || 'Student'}</h2>
                                    <p className="profile-email">{user.email}</p>
                                    <div className="profile-exam-badge">
                                        <span>{user.examType?.toUpperCase() || 'JEE'} Aspirant</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="profile-actions">
                            {isEditing ? (
                                <div className="edit-actions">
                                    <button
                                        className="save-btn"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        <Save size={16} />
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button className="cancel-btn" onClick={handleCancel}>
                                        <X size={16} />
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button className="edit-btn" onClick={handleEditClick}>
                                    <Edit3 size={16} />
                                    Edit Profile
                                </button>
                            )}
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