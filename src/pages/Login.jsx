import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [step, setStep] = useState(1); // 1: login, 2: exam selection
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        // Validate credentials against signup data
        const signupData = localStorage.getItem('adaptprep_signup');
        if (!signupData) {
            setError('No account found. Please sign up first.');
            return;
        }

        const parsedSignup = JSON.parse(signupData);
        if (parsedSignup.email !== email || parsedSignup.password !== password) {
            setError('Invalid email or password. Please try again.');
            return;
        }

        setError('');
        setSelectedExam(parsedSignup.examType); // Pre-fill with registered exam
        setStep(2);
    };

    const handleExamSelection = () => {
        if (!selectedExam) {
            setError('Please select an exam');
            return;
        }

        // Create user profile
        const userProfile = {
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Student',
            email,
            examType: selectedExam,
            avatar: email.substring(0, 2).toUpperCase(),
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };

        onLogin(userProfile);
    };

    if (step === 1) {
        return (
            <div className="login-container">
                <div className="login-background"></div>
                <div className="login-card animate-scale-in">
                    <div className="login-header">
                        <div className="login-icon">
                            <GraduationCap size={48} />
                        </div>
                        <h1 className="gradient-text">Welcome to AdaptPrep</h1>
                        <p className="login-subtitle">AI-Powered Exam Analytics Platform</p>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={20} />
                                <input
                                    type="email"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={20} />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-btn">
                            <span>Continue</span>
                            <ArrowRight size={20} />
                        </button>

                        <div className="login-footer">
                            <p>
                                New user?{' '}
                                <Link to="/signup" className="link-primary">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="exam-selection-card animate-scale-in">
                <div className="selection-header">
                    <div className="selection-icon">
                        <GraduationCap size={48} />
                    </div>
                    <h1 className="gradient-text">Welcome Back</h1>
                    <p className="selection-subtitle">Your registered exam is selected</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="exam-info">
                    <p className="email-display">Logged in as: <strong>{email}</strong></p>
                </div>

                <div className="exam-options">
                    <button
                        className={`exam-option ${selectedExam === 'jee' ? 'selected' : ''}`}
                        onClick={() => setSelectedExam('jee')}
                    >
                        <div className="exam-icon">🎯</div>
                        <h3>JEE</h3>
                        <p>Joint Entrance Examination</p>
                        <div className="exam-subjects">Physics • Chemistry • Mathematics</div>
                    </button>

                    <button
                        className={`exam-option ${selectedExam === 'neet' ? 'selected' : ''}`}
                        onClick={() => setSelectedExam('neet')}
                    >
                        <div className="exam-icon">🏥</div>
                        <h3>NEET</h3>
                        <p>National Eligibility Entrance Test</p>
                        <div className="exam-subjects">Physics • Chemistry • Biology</div>
                    </button>
                </div>

                <button
                    className="continue-btn"
                    onClick={handleExamSelection}
                    disabled={!selectedExam}
                >
                    <span>Continue to Dashboard</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Login;