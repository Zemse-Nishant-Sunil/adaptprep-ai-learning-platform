import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './StreakCalendar.css';

const StreakCalendar = ({ testResults = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get the current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the month and number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Helper function to format date in local timezone (YYYY-MM-DD)
    const getLocalDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Create a map of test dates for quick lookup (using local timezone)
    const testDateMap = useMemo(() => {
        const map = {};
        if (testResults) {
            testResults.forEach(test => {
                const testDate = new Date(test.date);
                const dateKey = getLocalDateKey(testDate);
                map[dateKey] = true;
            });
        }
        return map;
    }, [testResults]);

    // Function to check if date has a test
    const hasTestOnDate = (day) => {
        const date = new Date(year, month, day);
        const dateKey = getLocalDateKey(date);
        return testDateMap[dateKey] || false;
    };

    // Function to check if date is in the future
    const isFutureDate = (day) => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
    };

    // Function to check if date is today
    const isToday = (day) => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date.getTime() === today.getTime();
    };

    // Function to check if date is missed (past date without test)
    const isMissedDate = (day) => {
        const date = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today && !hasTestOnDate(day);
    };

    // Create array of days to display
    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Weekday names
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1));
    };

    return (
        <div className="streak-calendar-container">
            <div className="calendar-header">
                <button className="month-nav-btn" onClick={handlePrevMonth}>
                    <ChevronLeft size={20} />
                </button>
                <h2 className="month-year">{monthName}</h2>
                <button className="month-nav-btn" onClick={handleNextMonth}>
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="calendar-weekdays">
                {weekDays.map((day) => (
                    <div key={day} className="weekday-label">
                        {day}
                    </div>
                ))}
            </div>

            <div className="calendar-grid">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${!day ? 'empty' : ''} ${
                            day && hasTestOnDate(day) ? 'completed' : ''
                        } ${day && isMissedDate(day) ? 'missed' : ''} ${
                            day && isToday(day) ? 'today' : ''
                        } ${day && isFutureDate(day) ? 'future' : ''}`}
                    >
                        {day && (
                            <>
                                <span className="day-number">{day}</span>
                                {hasTestOnDate(day) && (
                                    <span className="day-status">✓</span>
                                )}
                                {isMissedDate(day) && (
                                    <span className="day-status">✕</span>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-color completed"></div>
                    <span>Test Completed</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color missed"></div>
                    <span>Test Missed</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color today"></div>
                    <span>Today</span>
                </div>
            </div>
        </div>
    );
};

export default StreakCalendar;
