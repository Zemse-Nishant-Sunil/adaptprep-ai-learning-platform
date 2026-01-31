import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('adaptprep_user');
        const savedData = localStorage.getItem('adaptprep_data');

        if (savedUser && savedData) {
            setUser(JSON.parse(savedUser));
            setUserData(JSON.parse(savedData));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userProfile) => {
        // Check if user data already exists in localStorage
        const existingData = localStorage.getItem('adaptprep_data');

        let userData;

        if (existingData) {
            // Use existing data for returning users
            userData = JSON.parse(existingData);
        } else {
            // Create initial data only for new users
            userData = {
                testsCompleted: 0,
                currentScore: 0,
                previousScore: 0,
                accuracy: 0,
                rank: 0,
                totalStudents: userProfile.examType === 'jee' ? 50000 : 75000,
                strengths: [],
                weaknesses: [],
                subjects: userProfile.examType === 'jee' ? {
                    physics: { score: 0, total: 100, accuracy: 0, trend: 'stable', questions: 30 },
                    chemistry: { score: 0, total: 100, accuracy: 0, trend: 'stable', questions: 30 },
                    mathematics: { score: 0, total: 100, accuracy: 0, trend: 'stable', questions: 30 }
                } : {
                    physics: { score: 0, total: 180, accuracy: 0, trend: 'stable', questions: 45 },
                    chemistry: { score: 0, total: 180, accuracy: 0, trend: 'stable', questions: 45 },
                    biology: { score: 0, total: 360, accuracy: 0, trend: 'stable', questions: 90 }
                },
                progressHistory: [
                    { week: 1, score: 0, accuracy: 0 }
                ],
                timeline: [],
                testHistory: [],
                totalStudyHours: 0,
                targetRank: userProfile.examType === 'jee' ? 1500 : 1000
            };
        }

        setUser(userProfile);
        setUserData(userData);
        setIsAuthenticated(true);

        localStorage.setItem('adaptprep_user', JSON.stringify(userProfile));
        localStorage.setItem('adaptprep_data', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setUserData(null);
        setIsAuthenticated(false);
        // Preserve localStorage data after logout
    };

    const updateTestResults = (testResults) => {
        if (!userData) return;

        const newData = { ...userData };

        // Update test count
        newData.testsCompleted += 1;

        // Update scores
        newData.previousScore = newData.currentScore;
        newData.currentScore = testResults.marksObtained;
        newData.accuracy = parseFloat(testResults.accuracy);

        // Calculate rank (simplified - based on score percentage)
        const maxScore = user.examType === 'jee' ? 300 : 720;
        const percentage = (testResults.marksObtained / maxScore) * 100;
        newData.rank = Math.max(1, Math.floor(newData.totalStudents * (1 - percentage / 100)));

        // Update subject data
        if (testResults.subject) {
            const subject = testResults.subject;
            if (newData.subjects[subject]) {
                newData.subjects[subject].score = testResults.marksObtained;
                newData.subjects[subject].accuracy = parseFloat(testResults.accuracy);

                // Determine trend
                const prevAccuracy = newData.subjects[subject].accuracy || 0;
                if (testResults.accuracy > prevAccuracy + 5) {
                    newData.subjects[subject].trend = 'up';
                } else if (testResults.accuracy < prevAccuracy - 5) {
                    newData.subjects[subject].trend = 'down';
                } else {
                    newData.subjects[subject].trend = 'stable';
                }
            }
        }

        // Update progress history
        newData.progressHistory.push({
            week: newData.progressHistory.length + 1,
            score: testResults.marksObtained,
            accuracy: parseFloat(testResults.accuracy)
        });

        // Keep only last 10 weeks
        if (newData.progressHistory.length > 10) {
            newData.progressHistory = newData.progressHistory.slice(-10);
        }

        // Update strengths and weaknesses based on topic performance
        const topicPerformance = Object.entries(testResults.topicWise || {})
            .map(([topic, data]) => ({
                topic,
                accuracy: (data.correct / data.total) * 100
            }))
            .sort((a, b) => b.accuracy - a.accuracy);

        if (topicPerformance.length > 0) {
            newData.strengths = topicPerformance
                .filter(t => t.accuracy >= 70)
                .slice(0, 3)
                .map(t => `${testResults.subject} - ${t.topic}`);

            newData.weaknesses = topicPerformance
                .filter(t => t.accuracy < 60)
                .slice(0, 3)
                .map(t => `${testResults.subject} - ${t.topic}`);
        }

        // Add to timeline
        newData.timeline.unshift({
            week: `Test ${newData.testsCompleted}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            recommendation: `Take ${testResults.subject} test`,
            action: `Attempted ${testResults.total} questions`,
            result: `Score: ${testResults.marksObtained}, Accuracy: ${testResults.accuracy}%`,
            impact: testResults.accuracy >= 80 ? 'high' : testResults.accuracy >= 60 ? 'medium' : 'low'
        });

        // Keep only last 10 timeline items
        if (newData.timeline.length > 10) {
            newData.timeline = newData.timeline.slice(0, 10);
        }

        // Add to test history
        newData.testHistory = newData.testHistory || [];
        newData.testHistory.unshift({
            date: new Date().toISOString(),
            subject: testResults.subject,
            ...testResults
        });

        // Store last test questions for Performance analysis
        newData.lastTestQuestions = testResults.questions || [];

        // Update study hours (estimate 3 minutes per question)
        newData.totalStudyHours += Math.round((testResults.timeTaken / 3600) * 10) / 10;

        setUserData(newData);
        localStorage.setItem('adaptprep_data', JSON.stringify(newData));
    };

    const value = {
        user,
        userData,
        isAuthenticated,
        login,
        logout,
        updateTestResults
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};