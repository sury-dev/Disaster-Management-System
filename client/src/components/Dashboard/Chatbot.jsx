// src/components/Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios directly
import MessageBubble from './MessageBubble';
import './Chatbot.css'; // Import styles for chatbot

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // To keep track of conversation
    const [userInput, setUserInput] = useState(''); // User input field value

    // Function to handle message sending
    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Append the user's message to the messages list
        const newMessages = [...messages, { text: userInput, sender: 'user' }];
        setMessages(newMessages);

        try {
            // Make a request to the backend to get AI response
            const response = await axios.post('http://localhost:5000/api/v1/ai/askai', { message: userInput });
            const aiResponse = response.data.data; // Extract AI response

            // Append the AI's response to the messages list
            setMessages([...newMessages, { text: aiResponse, sender: 'ai' }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }

        // Clear input after sending
        setUserInput('');
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
