"use client"
import React, { useState } from 'react';
import './page.css'; // Assuming you have some global styles, if not remove this

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "left" },
    { text: "I need help with React.js!", sender: "right" }
  ]);

  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, sender: "right" }]);
      setInputText(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`bubble ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      
      <div className="input-container">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="send-button">
          ➔
        </button>
      </div>
    </div>
  );
};

export default Chat;
