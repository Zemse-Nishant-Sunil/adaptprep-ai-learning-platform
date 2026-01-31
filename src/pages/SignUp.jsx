import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import './SignUp.css';

const SignUp = ({ onLogin }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: email & password, 2: exam selection
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Step 1: Email and Password Creation
    const handleCreateAccount = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!password || !confirmPassword) {
            setError('Please enter and confirm your password');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check for password strength
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
            setError(
                'Password must contain at least one uppercase letter, lowercase letter, and number'
            );
            return;
        }

        setSuccess('Account details confirmed! Now select your exam.');
        setStep(2); // Move to exam selection
    };

    // Step 2: Select exam and complete signup
    const handleCompleteSignUp = () => {
        setError('');

        if (!selectedExam) {
            setError('Please select an exam');
            return;
        }

        // Store signup credentials for login verification
        const signupData = {
            email,
            password, // In production, this should be hashed
            examType: selectedExam,
            registeredDate: new Date().toISOString()
        };

        localStorage.setItem('adaptprep_signup', JSON.stringify(signupData));

        setSuccess('Account created successfully! Redirecting to login...');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };


    return (
        <div className="signup-container">
            <div className="signup-background"></div>
            <div className="signup-card animate-scale-in">
                <div className="signup-header">
                    <div className="signup-icon">
                        <GraduationCap size={48} />
                    </div>
                    <h1 className="gradient-text">Create Your Account</h1>
                    <p className="signup-subtitle">Join AdaptPrep - AI-Powered Exam Analytics</p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {/* Step 1: Email and Password */}
                {step === 1 && (
                    <form className="signup-form" onSubmit={handleCreateAccount}>
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
                            <small className="form-hint">
                                We'll use this email to create your account
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Create Password</label>
                            <div className="input-wrapper">
                                <Lock size={20} />
                                <input
                                    type="password"
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <small className="form-hint">
                                Must contain uppercase, lowercase, and numbers
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock size={20} />
                                <input
                                    type="password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="signup-btn">
                            <span>Continue</span>
                            <ArrowRight size={20} />
                        </button>

                        <div className="signup-footer">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="link-primary">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                )}

                {/* Step 2: Exam Selection */}
                {step === 2 && (
                    <form className="signup-form">
                        <div className="selection-info">
                            <CheckCircle size={24} className="selection-icon" />
                            <p>Almost there! Select your exam</p>
                        </div>

                        <div className="exam-options">
                            <button
                                type="button"
                                className={`exam-option ${selectedExam === 'jee' ? 'selected' : ''}`}
                                onClick={() => setSelectedExam('jee')}
                            >
                                <div className="exam-icon">🎯</div>
                                <h3>JEE</h3>
                                <p>Joint Entrance Examination</p>
                                <div className="exam-subjects">Physics • Chemistry • Mathematics</div>
                            </button>

                            <button
                                type="button"
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
                            type="button"
                            className="signup-btn"
                            onClick={handleCompleteSignUp}
                            disabled={!selectedExam}
                        >
                            <span>Create Account</span>
                            <ArrowRight size={20} />
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;
