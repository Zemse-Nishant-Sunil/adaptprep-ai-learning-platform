import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, XCircle, Circle, BookOpen } from 'lucide-react';
import './DetailedSolutions.css';

const DetailedSolutions = ({ testResults, selectedSubject, onBack }) => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [filterType, setFilterType] = useState('all'); // all, incorrect, skipped

    // Handle both old and new data structures
    const questions = testResults.questions || testResults.detailedResults || [];

    const filteredQuestions = questions.filter((q) => {
        if (filterType === 'all') return true;
        if (filterType === 'incorrect') return q.status === 'incorrect' || q.status === 'skipped';
        return false;
    });

    const toggleQuestion = (idx) => {
        setExpandedQuestion(expandedQuestion === idx ? null : idx);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'correct':
                return <CheckCircle className="status-icon correct" size={24} />;
            case 'incorrect':
                return <XCircle className="status-icon incorrect" size={24} />;
            case 'skipped':
                return <Circle className="status-icon skipped" size={24} />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'correct':
                return 'success';
            case 'incorrect':
                return 'danger';
            case 'skipped':
                return 'warning';
            default:
                return 'info';
        }
    };

    return (
        <div className="detailed-solutions">
            <div className="solutions-header">
                <button className="back-btn" onClick={onBack}>
                    <ArrowLeft size={20} />
                    Back to Results
                </button>
                <div className="header-title">
                    <BookOpen size={28} className="animate-float" />
                    <div>
                        <h2>Detailed Solutions</h2>
                        <p>{selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} - {testResults.total || testResults.totalQuestions} Questions</p>
                    </div>
                </div>
            </div>

            <div className="filter-options">
                <button
                    className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterType('all')}
                >
                    All Questions ({testResults.total || testResults.totalQuestions})
                </button>
                <button
                    className={`filter-btn ${filterType === 'incorrect' ? 'active' : ''}`}
                    onClick={() => setFilterType('incorrect')}
                >
                    Incorrect & Skipped ({(testResults.incorrect || 0) + (testResults.skipped || 0)})
                </button>
            </div>

            <div className="solutions-list">
                {filteredQuestions.map((question, idx) => (
                    <div
                        key={question.id || idx}
                        className={`solution-card ${question.status} ${expandedQuestion === idx ? 'expanded' : ''
                            }`}
                    >
                        <div
                            className="solution-question-header"
                            onClick={() => toggleQuestion(idx)}
                        >
                            <div className="question-info">
                                <span className="question-number">Q{idx + 1}</span>
                                <div className="question-title">
                                    <p className="question-text">{question.question}</p>
                                    <div className="question-meta">
                                        {question.difficulty && (
                                            <span className={`difficulty-badge ${question.difficulty}`}>
                                                {question.difficulty}
                                            </span>
                                        )}
                                        {question.topic && (
                                            <span className="topic-badge">{question.topic}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="status-section">
                                {getStatusIcon(question.status)}
                                <button className="expand-btn">
                                    {expandedQuestion === idx ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {expandedQuestion === idx && (
                            <div className="solution-details animate-slide-down">
                                {/* Options Display */}
                                <div className="section options-section">
                                    <h4>Options:</h4>
                                    <div className="options-grid">
                                        {question.options && question.options.map((option, optIdx) => (
                                            <div
                                                key={optIdx}
                                                className={`option-display ${optIdx === question.correct ? 'correct-option' : ''
                                                    } ${optIdx === question.userAnswer &&
                                                        optIdx !== question.correct
                                                        ? 'wrong-option'
                                                        : ''
                                                    }`}
                                            >
                                                <span className="option-label">
                                                    {String.fromCharCode(65 + optIdx)}.
                                                </span>
                                                <span className="option-text">{option}</span>
                                                {optIdx === question.correct && (
                                                    <span className="correct-mark">✓</span>
                                                )}
                                                {optIdx === question.userAnswer &&
                                                    optIdx !== question.correct && (
                                                        <span className="wrong-mark">✗</span>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Answer Summary */}
                                <div className="section answer-summary">
                                    <h4>Your Answer:</h4>
                                    <div className="answer-info">
                                        {question.status === 'skipped' ? (
                                            <div className="skipped-answer">
                                                <Circle size={20} />
                                                <span>Not Answered</span>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>
                                                    You selected:{' '}
                                                    <strong>
                                                        {String.fromCharCode(65 + question.userAnswer)}.{' '}
                                                        {question.options[question.userAnswer]}
                                                    </strong>
                                                </p>
                                                <p>
                                                    Correct Answer:{' '}
                                                    <strong className="correct">
                                                        {String.fromCharCode(65 + question.correct)}.{' '}
                                                        {question.options[question.correct]}
                                                    </strong>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Explanation */}
                                {question.explanation && (
                                    <div className="section explanation-section">
                                        <h4>Explanation:</h4>
                                        <p className="explanation-text">{question.explanation}</p>
                                    </div>
                                )}

                                {/* Theory/Concept */}
                                {question.theory && (
                                    <div className="section theory-section">
                                        <h4>📚 Theory & Concept:</h4>
                                        <div className="theory-box">
                                            <p className="theory-text">{question.theory}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Info */}
                                <div className="section info-section">
                                    <div className="info-grid">
                                        {question.topic && (
                                            <div className="info-item">
                                                <span className="info-label">Topic:</span>
                                                <span className="info-value">{question.topic}</span>
                                            </div>
                                        )}
                                        {question.difficulty && (
                                            <div className="info-item">
                                                <span className="info-label">Difficulty:</span>
                                                <span className={`info-value ${question.difficulty}`}>
                                                    {question.difficulty.charAt(0).toUpperCase() +
                                                        question.difficulty.slice(1)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="info-item">
                                            <span className="info-label">Status:</span>
                                            <span className={`info-value ${getStatusColor(question.status)}`}>
                                                {question.status.charAt(0).toUpperCase() +
                                                    question.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailedSolutions;
