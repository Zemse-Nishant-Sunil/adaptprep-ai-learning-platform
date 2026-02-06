import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, User } from 'lucide-react';
import './SignUp.css';
import { useUser } from '../contexts/UserContext';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        examType: 'jee'
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { signUp } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        const result = await signUp(formData.name, formData.email, formData.password, formData.examType);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrors({ general: result.error });
        }

        setIsLoading(false);
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

                {errors.general && <div className="error-message">{errors.general}</div>}

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={20} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.name && <small className="error-hint">{errors.name}</small>}
                        <small className="form-hint">
                            We'll use this to personalize your experience
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.email && <small className="error-hint">{errors.email}</small>}
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
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.password && <small className="error-hint">{errors.password}</small>}
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
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.confirmPassword && <small className="error-hint">{errors.confirmPassword}</small>}
                    </div>

                    <div className="form-group">
                        <label>Competitive Exam</label>
                        <div className="exam-type-selector">
                            <label className={`exam-option ${formData.examType === 'jee' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="examType"
                                    value="jee"
                                    checked={formData.examType === 'jee'}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <span>JEE (Engineering)</span>
                            </label>
                            <label className={`exam-option ${formData.examType === 'neet' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="examType"
                                    value="neet"
                                    checked={formData.examType === 'neet'}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                                <span>NEET (Medical)</span>
                            </label>
                        </div>
                        <small className="form-hint">
                            Choose your competitive exam pathway
                        </small>
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
            </div>
        </div>
    );
};

export default SignUp;
