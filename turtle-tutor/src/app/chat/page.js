"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react';
import './page.css'; // Assuming you have some global styles, if not remove this


async function getText() {
    return "foo"
}



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
      setMessages(new_msgs)
      setInputText(""); // Clear the input field
      const res = await messageChat(inputText) 
      setMessages([...new_msgs, {text: res, sender: "left"}])
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
          className = "text-slate-800"
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
