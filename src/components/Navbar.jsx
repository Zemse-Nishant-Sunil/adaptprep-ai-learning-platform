import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, User, BookOpen, Target, Menu, X, Sparkles, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { logout } = useUser();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: BarChart3 },
        { path: '/performance', label: 'Performance', icon: Target },
        { path: '/test', label: 'Mock Test', icon: Sparkles },
        { path: '/insights', label: 'AI Insights', icon: BookOpen },
        { path: '/profile', label: 'Profile', icon: User }
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-icon">
                        <BarChart3 size={28} />
                    </div>
                    <span className="brand-text">AdaptPrep</span>
                    <span className="brand-badge">AI</span>
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;