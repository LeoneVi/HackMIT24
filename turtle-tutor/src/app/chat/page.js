"use client";
import React, { useState } from 'react';
import './page.css'; // Ensure your global styles are applied
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "left" },
    { text: "I need help with React.js!", sender: "right" },
  ]);
  const [inputText, setInputText] = useState("");
  const router = useRouter(); // Initialize router

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, sender: "right" }]);
      setInputText(""); // Clear the input field
    }
  };

  // Function to handle "End Session" button click
  const handleEndSession = () => {
    // Navigate to the performance page
    router.push("/performance");
  };

  return (
    // ALL CONTENT
    <div id="main-content-container">
      {/* Left column */}
      <div id="left-column">
        {/* Live feedback text */}
        <div id="live-feedback-content">
          Live Feedback
        </div>

        {/* Turtle container */}
        <div id="turtle-container">
          {/* Turtle #1 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>
          
          {/* Turtle #2 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #3 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #4 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #5 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #6 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #7 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #8 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #9 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>

          {/* Turtle #10 */}
          <div>
            <img className="turtle-image" src="static/turtle-symbol-grey.svg"></img>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div id="right-column">
        {/* Chat container */}
        <div className="chat-container">
          {/* Chat box */}
          <div className="chat-box">
            {messages.map((message, index) => (
              <div key={index} className={`bubble ${message.sender}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          {/* Input container */}
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

          {/* End Session Button */}
          <div className="end-session-container">
            <button onClick={handleEndSession} className="end-session-button">
              End Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;