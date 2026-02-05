import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        strongSubjects: [],
        weakSubjects: []
    });
    const [loading, setLoading] = useState(true);

    // Get token from localStorage
    const getToken = () => localStorage.getItem('token');

    // Set token in localStorage
    const setToken = (token) => localStorage.setItem('token', token);

    // Remove token from localStorage
    const removeToken = () => localStorage.removeItem('token');

    // API request helper
    const apiRequest = useCallback(async (url, options = {}) => {
        try {
            const token = getToken();
            const headers = {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers
            };

            const response = await fetch(`${API_BASE}${url}`, {
                ...options,
                headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'API request failed');
            }

            return response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            // Check if it's a connection error
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                throw new Error('Cannot connect to server. Please make sure the backend is running.');
            }
            throw error;
        }
    }, []);

    // Memoize loadUserProfile to fix dependency warning
    const loadUserProfile = useCallback(async () => {
        try {
            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await apiRequest('/user/profile');
            if (!response.error) {
                setUser(response.user);
                setUserData(response.userData);
            }
        } catch (error) {
            console.error('Failed to load user profile:', error);
            removeToken();
        } finally {
            setLoading(false);
        }
    }, [apiRequest]);

    // Login
    const login = async (email, password) => {
        try {
            const response = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            setToken(response.token);

            // Set user with default examType if not provided
            const userWithDefaults = {
                ...response.user,
                examType: response.user.examType || 'jee',
                name: response.user.name || response.user.email?.split('@')[0] || 'Student',
                avatar: response.user.avatar || response.user.email?.substring(0, 2).toUpperCase() || 'ST'
            };

            setUser(userWithDefaults);
            await loadUserProfile();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Sign up
    const signUp = async (email, password) => {
        try {
            const response = await apiRequest('/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            setToken(response.token);

            // Set user with default examType if not provided
            const userWithDefaults = {
                ...response.user,
                examType: response.user.examType || 'jee',
                name: response.user.name || response.user.email?.split('@')[0] || 'Student',
                avatar: response.user.avatar || response.user.email?.substring(0, 2).toUpperCase() || 'ST'
            };

            setUser(userWithDefaults);
            await loadUserProfile();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout
    const logout = () => {
        removeToken();
        setUser(null);
        setUserData({
            testResults: [],
            totalTests: 0,
            averageScore: 0,
            strongSubjects: [],
            weakSubjects: []
        });
    };

    // Save test result
    const saveTestResult = async (testResult) => {
        try {
            const response = await apiRequest('/user/test-results', {
                method: 'POST',
                body: JSON.stringify(testResult)
            });
            setUserData(response.userData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Get questions
    const getQuestions = async (examType, subject, count = 10) => {
        try {
            const response = await apiRequest(`/questions/${examType}/${subject}?count=${count}`);
            return { success: true, questions: response.questions };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Initialize user on mount
    useEffect(() => {
        loadUserProfile();
    }, [loadUserProfile]);

    const value = {
        user,
        userData,
        loading,
        signUp,
        login,
        logout,
        saveTestResult,
        getQuestions,
        apiRequest,
        isAuthenticated: !!user
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
