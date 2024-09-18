import React from 'react';
import './MessageBubble.css'; // Import message bubble styles

const MessageBubble = ({ message }) => {
    return (
        <div className={`message-bubble ${message.sender}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default MessageBubble;