import React from 'react';
import './StreakBoard.css';

const StreakBoard = ({ currentStreak = 0, maxStreak = 0 }) => {
    const isStreakActive = currentStreak > 0;

    return (
        <div className="streak-board-container">
            <div className="streak-board animate-slide-up">
                <div className="streak-display">
                    <div className="streak-symbol">
                        {isStreakActive ? '🔥' : '💔'}
                    </div>
                    <div className="streak-info">
                        <h2>StreakBoard</h2>
                        <div className="streak-numbers">
                            <div className="current-streak">
                                <span className="streak-label">Current</span>
                                <span className="streak-value">{currentStreak}</span>
                            </div>
                            <div className="streak-divider">•</div>
                            <div className="max-streak">
                                <span className="streak-label">Best</span>
                                <span className="streak-value">{maxStreak}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="streak-message">
                    {currentStreak === 0 && (
                        <p>Start your streak today! Take a test to ignite the flame 🔥</p>
                    )}
                    {currentStreak === 1 && (
                        <p>Great start! Keep the momentum going! 🚀</p>
                    )}
                    {currentStreak > 1 && currentStreak < 7 && (
                        <p>You're on fire! Maintain the streak! 🔥</p>
                    )}
                    {currentStreak >= 7 && currentStreak < 30 && (
                        <p>Incredible! You're unstoppable! 💪</p>
                    )}
                    {currentStreak >= 30 && (
                        <p>Legend! 30+ day streak! You're a machine! 🏆</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StreakBoard;
