import React, { useState } from 'react';
import axios from 'axios';

export default function Aside() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Function to send a message to the API
  const sendMessage = async () => {
    if (input.trim() === '') return;
    
    // Add user message to chat
    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, type: 'user' }
    ]);
    
    // Send message to the API
    try {
      const response = await axios.post('http://localhost:5000/api/v1/ai/askai', { message: input });
      console.log(response)
      const aiMessage = response.data.data; // Correctly access the answer
      
      // Add AI message to chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: aiMessage, type: 'ai' }
      ]);
      
      setInput(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, handle error by showing a message to the user
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error: Unable to get a response from the AI.', type: 'ai' }
      ]);
    }
  };
  

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <aside id="help" className="hidden lg:block w-full lg:w-[28.5%] rounded-3xl">
      <section id="chat" className="w-full h-full flex flex-col justify-between gap-4">
        <section className="w-full h-[88%] flex flex-col justify-between bg-white border-2 border-dark-purple-x p-4 flex-1 rounded-3xl">
          <h2 className="text-4xl text-dark-purple-x mb-4 pb-4 text-left border-b border-dark-purple">SachetakAI</h2>
          <div id="chatbot-chat" className="w-full text-dark-purple-x flex flex-col gap-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 w-2/3 ${msg.type === 'user' ? 'bg-purple-400 text-white self-start' : 'bg-dark-purple text-white self-end'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </section>
        <form className="w-full border-2 border-dark-purple-x rounded-2xl overflow-hidden flex flex-row" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Ask me anything..."
            className="h-12 w-[80%] rounded-none text-black px-4 text-xl outline-none"
          />
          <button
            type="submit"
            className="flex-1 rounded-none text-white text-2xl bg-dark-purple hover:bg-dark-purple-x h-full"
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </form>
      </section>
    </aside>
  );
}
