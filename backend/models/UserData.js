const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    examType: String,
    subject: String,
    testNumber: Number,
    rawScore: Number,
    correctAnswers: Number,
    incorrectAnswers: Number,
    skipped: Number,
    totalQuestions: Number,
    timeTaken: Number,
    accuracy: Number,
    questionStatuses: [String],
    date: { type: Date, default: Date.now }
});

const userDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    testResults: [testResultSchema],
    totalTests: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    strongSubjects: [String],
    weakSubjects: [String],
    currentStreak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    lastTestDate: { type: Date, default: null },
    streakHistory: [{
        date: { type: Date },
        status: { type: String, enum: ['completed', 'missed'] }
    }],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserData', userDataSchema);
