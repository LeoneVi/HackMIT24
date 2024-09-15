"use client";
import Image from 'next/image'
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import './page.css'; // Assuming you have some global styles, if not remove this
import Turtle from "../static/turtle-symbol-grey.svg"
import TurtleGreen from "../static/turtle-symbol-color.svg"


//Returns first studen's question based on a topic
async function startChat(topic) {
    const form = new FormData()
    console.log("start chat")
    form.append("topic", topic)
    const res = await fetch("http://localhost:5000/init", {
        method: "POST",
        body: form
    })
    console.log(res)
    const json = await res.json()
    console.log(json)
    return json["text"]    
}





//Returns a value 0-1 rating a response to the last question
async function reviewChat() {
    const res = await fetch("http://localhost:5000/review")
    const json = await res.json()
    return json["score"]
}

//send an answer back to LLM
async function messageChat(msg) {
    const form = new FormData()
    form.append("answer", msg)
    const res = await fetch("http://localhost:5000/session", {
        method: "POST",
        body: form
    }) 
    const json = await res.json()
    return json["question"]
}



const Chat = () => {
  const search = useSearchParams();
  const topic = search.get("topic")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  useEffect(() => {
      startChat(topic).then((res) => {
        console.log(res)
        console.log("red")
        const newMessages = [...messages, {"text": res, "sender": "left"}]
        setMessages(newMessages)
   })
  }, [])
  
  

  /* 
  const [messages, setMessages] = useState([
    { text: "Java programming", sender: "left" },
    { text: "I need help with React.js!", sender: "right" }
  ]);
  */
  const [inputText, setInputText] = useState("");
    
  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const new_msgs = [...messages, 
        {text: inputText, sender: "right"}];
      console.log(score)
      setMessages(new_msgs)
      setInputText(""); // Clear the input field
      const res = await messageChat(inputText) 
      setMessages([...new_msgs, {text: res, sender: "left"}])
        reviewChat().then((res) => {
            setScore(score + res)
  
      })  
 
    }
  };

  // Function to handle "End Session" button click
  const handleEndSession = () => {
    // Navigate to the performance page
    router.push("/performance");
  };

  const turtles = []
  for (let i = 0; i < 5; i++) {
    turtles.push(i)
  }

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
            {turtles.map((t) =>  {
                if (score < t) {
                    return (<Image width = {100} height = {100} className="turtle-image" src={Turtle} key = {t}/>);
                }
             return (<Image width = {100} height = {100} className="turtle-image" src={TurtleGreen} key = {t}/>);
            })}
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
