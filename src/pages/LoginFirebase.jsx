import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import './Login.css';

const LoginFirebase = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [step, setStep] = useState(1); // 1: login, 2: exam selection
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }

        try {
            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                setError('Please verify your email first. Check your inbox for verification link.');
                setLoading(false);
                return;
            }

            // Get signup data to determine exam type
            const signupData = localStorage.getItem('adaptprep_signup');
            if (signupData) {
                const parsedData = JSON.parse(signupData);
                setSelectedExam(parsedData.examType);
            }

            setStep(2);
            setLoading(false);
        } catch (err) {
            let errorMessage = err.message;

            if (err.code === 'auth/user-not-found') {
                errorMessage = 'No account found. Please sign up first.';
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address.';
            } else if (err.code === 'auth/user-disabled') {
                errorMessage = 'This account has been disabled.';
            }

            setError(errorMessage);
            setLoading(false);
        }
    };

    const handleExamSelection = () => {
        if (!selectedExam) {
            setError('Please select an exam');
            return;
        }

        // Get user info from Firebase
        const user = auth.currentUser;
        if (!user) {
            setError('User not found. Please login again.');
            return;
        }

        // Create user profile
        const userProfile = {
            uid: user.uid,
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Student',
            email: user.email,
            examType: selectedExam,
            avatar: user.email.substring(0, 2).toUpperCase(),
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            emailVerified: user.emailVerified
        };

        // Store in localStorage
        localStorage.setItem('adaptprep_user', JSON.stringify(userProfile));

        // Call onLogin callback
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
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                            <span>{loading ? 'Logging in...' : 'Continue'}</span>
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
                        disabled={loading}
                    >
                        <div className="exam-icon">🎯</div>
                        <h3>JEE</h3>
                        <p>Joint Entrance Examination</p>
                        <div className="exam-subjects">Physics • Chemistry • Mathematics</div>
                    </button>

                    <button
                        className={`exam-option ${selectedExam === 'neet' ? 'selected' : ''}`}
                        onClick={() => setSelectedExam('neet')}
                        disabled={loading}
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
                    disabled={!selectedExam || loading}
                >
                    <span>{loading ? 'Continuing...' : 'Continue to Dashboard'}</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default LoginFirebase;
