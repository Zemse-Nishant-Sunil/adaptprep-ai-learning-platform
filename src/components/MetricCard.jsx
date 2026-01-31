import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './MetricCard.css';

const MetricCard = ({ title, value, subtitle, trend, icon: Icon, gradient }) => {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp size={20} />;
        if (trend === 'down') return <TrendingDown size={20} />;
        return <Minus size={20} />;
    };

    const getTrendClass = () => {
        if (trend === 'up') return 'trend-up';
        if (trend === 'down') return 'trend-down';
        return 'trend-stable';
    };

    return (
        <div className={`metric-card ${gradient || 'gradient-1'}`}>
            <div className="metric-header">
                <div className="metric-icon">
                    {Icon && <Icon size={24} />}
                </div>
                <h3 className="metric-title">{title}</h3>
            </div>

            <div className="metric-value">{value}</div>

            <div className="metric-footer">
                <span className={`metric-trend ${getTrendClass()}`}>
                    {getTrendIcon()}
                    <span>{subtitle}</span>
                </span>
            </div>

            <div className="metric-glow"></div>
        </div>
    );
};

export default MetricCard;