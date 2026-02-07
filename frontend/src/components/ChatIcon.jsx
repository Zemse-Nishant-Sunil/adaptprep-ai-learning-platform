import React from 'react';
import { MessageCircle } from 'lucide-react';
import './ChatIcon.css';

const ChatIcon = ({ onClick, hasNewMessages = false }) => {
    return (
        <button
            className="chat-icon-button"
            onClick={onClick}
            title="Open AI Tutor"
            aria-label="Open AI Tutor Chat"
        >
            <MessageCircle size={24} />
            {hasNewMessages && <span className="notification-dot"></span>}
        </button>
    );
};

export default ChatIcon;
