import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, CheckCircle, XCircle, Clock, Brain } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './Performance.css';

const Performance = () => {
    const { userData, loading } = useUser();
    const [selectedSubject, setSelectedSubject] = useState('All');

    if (loading) {
        return (
            <div className="performance">
                <div className="empty-state">
                    <h2>Loading performance data...</h2>
                </div>
            </div>
        );
    }

    // Safe defaults for userData
    const safeUserData = {
        testResults: [],
        totalTests: 0,
        averageScore: 0,
        ...userData
    };

    // Calculate performance stats from test results
    const reconstructStatuses = (totalQs, correct, incorrect) => {
        // NOTE: This is a FALLBACK. Ideal approach is to use stored questionStatuses.
        // This reconstruction only works well if we know the EXACT ORDER of correct/incorrect/skipped answers.
        // Since we don't have that order, we ESTIMATE by assuming:
        // - First 'correct' questions are correct
        // - Next 'incorrect' questions are incorrect  
        // - Remaining are skipped
        // This may NOT match reality - some correct answers might be interspersed with incorrect ones!
        
        // IMPORTANT: If this is giving wrong results, the issue is that questionStatuses
        // is not being stored/retrieved properly from the backend.
        
        const skipped = totalQs - correct - incorrect;
        const result = [];
        
        for (let i = 0; i < totalQs; i++) {
            if (i < correct) {
                result.push('correct');
            } else if (i < correct + incorrect) {
                result.push('incorrect');
            } else {
                result.push('skipped');
            }
        }
        
        return result;
    };

    const calculatePerformanceStats = () => {
        const { testResults } = safeUserData;

        if (!testResults || testResults.length === 0) {
            return {
                totalQuestions: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
                rawScore: 0,
                averageTime: 0,
                subjectStats: {},
                questionStatus: []
            };
        }

        // Filter results by selected subject if not 'All'
        const filteredResults = selectedSubject === 'All' 
            ? testResults 
            : testResults.filter(test => test.subject === selectedSubject);

        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalIncorrect = 0;
        let totalSkipped = 0;
        let totalRawScore = 0;
        let totalTime = 0;
        const subjectStats = {};
        const questionStatus = [];

        filteredResults.forEach((test, testIndex) => {
            const testQuestions = test.totalQuestions || 10;
            
            // Handle both old and new test formats
            // New format: correctAnswers, incorrectAnswers, skipped
            // Old format: score (needs conversion)
            let testCorrect, testIncorrect, testSkipped;
            
            if (test.correctAnswers !== undefined && test.incorrectAnswers !== undefined && test.skipped !== undefined) {
                // New format
                testCorrect = test.correctAnswers || 0;
                testIncorrect = test.incorrectAnswers || 0;
                testSkipped = test.skipped || 0;
                
                // Validate counts add up
                const totalFromCounts = testCorrect + testIncorrect + testSkipped;
                if (totalFromCounts !== testQuestions) {
                    console.warn(`⚠️ Count mismatch for ${test.subject} test ${test.testNumber}: ${totalFromCounts} != ${testQuestions}`);
                }
            } else if (test.score !== undefined) {
                // Old format - convert score to new format
                testCorrect = test.score || 0;
                testIncorrect = testQuestions - testCorrect;
                testSkipped = 0;
            } else {
                // No data available
                testCorrect = 0;
                testIncorrect = 0;
                testSkipped = testQuestions;
            }
            
            const rawScore = test.rawScore || (testCorrect * 4 - testIncorrect * 1);
            const subject = test.subject || 'Unknown';

            totalQuestions += testQuestions;
            totalCorrect += testCorrect;
            totalIncorrect += testIncorrect;
            totalSkipped += testSkipped;
            totalRawScore += rawScore;
            totalTime += test.timeTaken || 0;

            // Subject stats
            if (!subjectStats[subject]) {
                subjectStats[subject] = { correct: 0, incorrect: 0, skipped: 0, total: 0, rawScore: 0, tests: 0 };
            }
            subjectStats[subject].correct += testCorrect;
            subjectStats[subject].incorrect += testIncorrect;
            subjectStats[subject].skipped += testSkipped;
            subjectStats[subject].total += testQuestions;
            subjectStats[subject].rawScore += rawScore;
            subjectStats[subject].tests += 1;

            // Generate question identifiers with proper naming and actual statuses
            const subjectPrefix = {
                'Physics': 'p',
                'Chemistry': 'c',
                'Mathematics': 'm',
                'Biology': 'b'
            }[subject] || 's';

            // Use actual statuses from questionStatuses array if available
            let statuses;
            
            // Validate questionStatuses: must be array with correct length and valid values
            if (Array.isArray(test.questionStatuses) && test.questionStatuses.length === testQuestions) {
                const validStatuses = ['correct', 'incorrect', 'skipped'];
                if (test.questionStatuses.every(s => validStatuses.includes(s))) {
                    // Valid questionStatuses found
                    statuses = test.questionStatuses;
                    console.log(`✓ Using stored questionStatuses for ${subject} test ${test.testNumber}`);
                } else {
                    // Invalid values in array, reconstruct
                    console.warn(`⚠️ Invalid status values in questionStatuses for ${subject} test ${test.testNumber}`);
                    statuses = reconstructStatuses(testQuestions, testCorrect, testIncorrect);
                }
            } else {
                // No questionStatuses or wrong length, reconstruct
                if (!test.questionStatuses) {
                    console.log(`ℹ️ No questionStatuses found for ${subject} test ${test.testNumber} - using reconstruction`);
                } else {
                    console.warn(`⚠️ Incorrect length for ${subject} test ${test.testNumber}: got ${test.questionStatuses?.length || 0}, expected ${testQuestions}`);
                }
                statuses = reconstructStatuses(testQuestions, testCorrect, testIncorrect);
            }

            for (let i = 0; i < testQuestions; i++) {
                questionStatus.push({
                    questionNumber: `${subjectPrefix}${i + 1}`,
                    status: statuses[i] || 'skipped',
                    subject: subject,
                    testNumber: test.testNumber || (testIndex + 1),
                    testIndex: testIndex
                });
            }
        });

        return {
            totalQuestions,
            correct: totalCorrect,
            incorrect: totalIncorrect,
            skipped: totalSkipped,
            rawScore: totalRawScore,
            averageTime: filteredResults.length > 0 ? Math.round(totalTime / filteredResults.length) : 0,
            subjectStats,
            questionStatus
        };
    };

    const stats = calculatePerformanceStats();

    if (stats.totalQuestions === 0) {
        return (
            <div className="performance">
                <div className="performance-header animate-slide-up">
                    <h1 className="gradient-text">Performance Analysis</h1>
                    <p className="header-subtitle">Detailed breakdown of your test performance</p>
                </div>

                <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <h2>No Performance Data</h2>
                    <p>Take some mock tests to see detailed performance analysis!</p>
                </div>
            </div>
        );
    }

    // Prepare chart data
    const subjectChartData = Object.entries(stats.subjectStats).map(([subject, data]) => {
        const accuracy = data.total > 0 ? ((data.correct / data.total) * 100).toFixed(1) : 0;
        return {
            name: subject,
            accuracy: parseFloat(accuracy),
            correct: data.correct,
            incorrect: data.incorrect,
            skipped: data.skipped,
            rawScore: data.rawScore,
            total: data.total
        };
    });

    const pieData = [
        { name: 'Correct', value: stats.correct, color: '#10B981' },
        { name: 'Incorrect', value: stats.incorrect, color: '#EF4444' },
        ...(stats.skipped > 0 ? [{ name: 'Skipped', value: stats.skipped, color: '#F59E0B' }] : [])
    ];

    return (
        <div className="performance animate-fade-in">
            <div className="performance-header animate-slide-up">
                <h1 className="gradient-text">Performance Analysis</h1>
                <p className="header-subtitle">Detailed breakdown of your test performance</p>
            </div>

            <div className="controls animate-slide-up">
                <select
                    className="subject-selector"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    <option value="All">All Subjects</option>
                    {Object.keys(stats.subjectStats).map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            <div className="performance-stats animate-slide-up">
                <div className="stat-card primary-card">
                    <Target className="stat-icon" size={32} />
                    <div className="stat-value">{stats.rawScore}</div>
                    <div className="stat-label">Raw Score</div>
                </div>

                <div className="stat-card correct-card">
                    <CheckCircle className="stat-icon" size={32} />
                    <div className="stat-value">{stats.correct}</div>
                    <div className="stat-label">Correct (+4)</div>
                </div>

                <div className="stat-card incorrect-card">
                    <XCircle className="stat-icon" size={32} />
                    <div className="stat-value">{stats.incorrect}</div>
                    <div className="stat-label">Incorrect (-1)</div>
                </div>

                <div className="stat-card warning-card">
                    <Target className="stat-icon" size={32} />
                    <div className="stat-value">{stats.skipped}</div>
                    <div className="stat-label">Skipped (0)</div>
                </div>

                <div className="stat-card time-card">
                    <Clock className="stat-icon" size={32} />
                    <div className="stat-value">{Math.floor(stats.averageTime / 60)}m</div>
                    <div className="stat-label">Avg Time</div>
                </div>
            </div>

            <div className="question-grid-section animate-slide-up">
                <h2 className="section-title">Question-wise Performance</h2>
                <div className="question-grid">
                    {stats.questionStatus.map((question, index) => (
                        <div
                            key={index}
                            className={`question-box status-${question.status}`}
                            title={`${question.questionNumber} (Test ${question.testNumber}): ${question.status} (${question.subject})`}
                        >
                            <span className="question-number">{question.questionNumber}</span>
                            <span className="status-icon">
                                {question.status === 'correct' ? '✔' : question.status === 'incorrect' ? '❌' : 'Ø'}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="legend">
                    <div className="legend-item">
                        <div className="legend-box correct"></div>
                        <span>✔ Correct</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-box incorrect"></div>
                        <span>❌ Incorrect</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-box skipped"></div>
                        <span>Ø Skipped</span>
                    </div>
                </div>
            </div>

            <div className="charts-section animate-slide-up">
                <div className="chart-card">
                    <h3>Overall Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Subject-wise Accuracy</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px'
                                }}
                            />
                            <Bar dataKey="accuracy" fill="#6366F1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Performance;
