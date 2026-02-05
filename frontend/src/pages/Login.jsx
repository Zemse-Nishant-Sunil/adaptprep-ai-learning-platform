import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import './Login.css';
import { useUser } from '../contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useUser();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Login failed. Please try again.');
        }

        setIsLoading(false);
    };

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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        <span>{isLoading ? 'Signing in...' : 'Continue'}</span>
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
};

export default Login;