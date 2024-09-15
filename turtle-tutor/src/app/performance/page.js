import React from 'react';
import Image from "next/image";
import './page.css'; // Assuming some global styles, you can create this file or include it in your project

import TurtleSad from '../images/Turtle_Sad.svg'

const PerformanceStats = () => {
  // These variables will hold the performance data
  const positives = ["Great at explaining complex concepts", "Engaged actively with AI student", "Provided clear examples"];
  const negatives = ["Struggled with time management", "Missed addressing some key questions"];
  const additionalNotes = ["Consider using more visuals", "Try to be more concise with explanations"];

  var bestAnswer = [1, "faithfulness", "context relevancy", "answer relevancy"];
  var worstAnswer = [1, "faithfulness", "context relevancy", "answer relevancy"];
  var placeholder = [];
  var max = 0;
  var min = Number.MAX_SAFE_INTEGER;
  var maxObj = [];
  var minObj = [];


  async function getText() {
    return [[1, "faithfulness", "context relevancy", "answer relevancy"], [1, "faithfulness", "context relevancy", "answer relevancy"], ["faithfulness", "context relevancy", "answer relevancy"]];
  }


  async function setText() {
    bestAnswer = getText()[0];
    worstAnswer = getText()[1];
  //  additionalNotes = getText()[2];
  }

  // eval_json = {"faithfulness": faith_metric.score, "faithfulness_reason": faith_metric.reason, "relevancy": relv_metric.score, "relevancy_reason": relv_metric.reason, "cont": cont_metric.score, "cont_reason": cont_metric.reason} 
  async function getScore(params) {
    placeholder.push(reasoningChat);
    for (let index = 0; index < placeholder.length; index++) {
      if(placeholder[index] > max){
        max = placeholder[index];
        maxObj = [placeholder[index][1], placeholder[index][2]];
      }
      if(placeholder[index] < min){
        min = placeholder[index];
        maxObj = [placeholder[index][1], placeholder[index][2]];
      }
    }
    return;
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
async function reasoningChat() {
  const res = await fetch("http://localhost:5000/reasoning")
  const json = await res.json()
  console.log(json)
  return json
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

  

  /// move the text to the left

  return (
    <div class ="main-container">
      <div className="performance-container">
        <h1 className="title">Performance Overview</h1>

        <div className="stats-section">
          <h2>Positives</h2>
          <ul className="positives-list">
            {positives.map((positive, index) => (
              <li key={index} className="positive-item">
                {positive}
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h2>Negatives</h2>
          <ul className="negatives-list">
            {negatives.map((negative, index) => (
              <li key={index} className="negative-item">
                {negative}
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h2>Additional Notes</h2>
          <ul className="notes-list">
            {additionalNotes.map((note, index) => (
              <li key={index} className="note-item">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="score_container">
        <div class="image_container">
          <Image
          src={TurtleSad}
          alt="Turtle lowering his head in sadness."
          width={300} // Adjust size as needed
          height={300} // Adjust size as needed
          />
        </div>
        <div className="home_container">
          <h1 class="score">2/100</h1>
          <h3 class="take_me_home">Try again.</h3>
          <button class="home_button">
            Take me home.
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;
