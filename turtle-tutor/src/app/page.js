import Image from "next/image";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Placeholder } from "react-bootstrap";
import "./globals.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Dropdown from 'react-bootstrap/Dropdown';
// import dynamic from 'next/dynamic';

// const Dropdown = dynamic(() => import('react-bootstrap/Dropdown'), { ssr: false });

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Main Content */}
        <div id="main-content">
          {/* Left Column (Homepage content) */}
          <div id="left-column">
            {/* Main title */}
            <h1 id="main-title-content" style={{ color: "#468585", fontSize: "5.5em", justifyContent: "center", fontWeight: "bold", letterSpacing: ".3em" }} className="items-center">
              turtle tutor
            </h1>

            {/* Topic selection */}
            <div id="topic-content" className="w-1/10 mx-auto items-center justify-items-center" style={{color: "#000", fontSize: "1.75em"}}>
              <p>
                Select a
                
                <select style={{ paddingLeft: "0.5em", marginLeft: "0.5em", marginRight: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} className="topic">
                <option value="java">Topic</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="javascript">Javascript</option>
                </select>
                  
                or

                  <input style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} placeholder="type your topic here.">

                  </input>
                </p>
            </div>

            {/* Class size selection */}
            <div id="class-size-content" className="w-1/10 mx-auto">
              <p style={{ color: "#000", fontSize: "1.75em"}}>
                Class size: 
                <button style={{ marginLeft: "0.5em",paddingLeft: "0.5em", paddingRight: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}}>Small</button>
                <button style={{ marginLeft: "0.5em", paddingLeft: "0.5em", paddingRight: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}}>Medium</button>
                <button style={{ marginLeft: "0.5em", paddingLeft: "0.5em", paddingRight: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}}>Large</button>
              </p>
            </div>

            {/* Submission button */}
            <div id="submission-button-content" className="w-1/2 mx-auto">
              <a
                id="submission-button"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                style={{backgroundColor: "#468585", fontSize: "1.75em"}}
              >
                Start review!
              </a>
            </div>
          </div>

          {/* Right Column (Logo) */}
          <img id="right-column" src="static/main-logo.svg" alt="The tutor turtle logo." width="600px" height="auto"></img>


        </div>
      </main>
  

      {/* Credits footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p style={{color: "#9D5E5B", fontSize: "1.0em"}}>
          Created by Amisha, Jordan, Tory, and Gabe @HackMIT 2024! =)
        </p>
      </footer>
    </div>
  );
}
