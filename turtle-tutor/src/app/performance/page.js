import React from 'react';
import './page.css'; // Assuming some global styles, you can create this file or include it in your project

const PerformanceStats = () => {
  // These variables will hold the performance data
  const positives = ["Great at explaining complex concepts", "Engaged actively with AI student", "Provided clear examples"];
  const negatives = ["Struggled with time management", "Missed addressing some key questions"];
  const additionalNotes = ["Consider using more visuals", "Try to be more concise with explanations"];

  async function getText() {
    return ["", "", ""];
  }

  async function setText() {
    
  }

  return (
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
  );
};

export default PerformanceStats;
