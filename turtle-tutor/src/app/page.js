"use client";  // Ensures this is a client component

import Image from "next/image";
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';  // Updated to use the App Router's useRouter
import logo from './static/logo.svg';



export default function Home() {
  console.log("test")
  const router = useRouter();
  const [hardTopic, setHardTopic] = useState("");
  const [chosenTopic, setChosenTopic] = useState("")  
  console.log("test2")
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (hardTopic == "") {
        const form_topic = e.target.manual.value.split(" ").join("+")
        router.push(`/chat?topic=${form_topic}`)
    }
    else {
        router.push(`/chat?topic=${hardTopic}`)
    }
  }  

  useEffect(() => {
        const element = document.getElementById("manual")
        element.value = "" 
  }, [hardTopic])
  console.log("test3")
        
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Main content */}
        <div id="main-content">
          {/* Left column (homepage content) */}
          <div id ="left-column">
            {/* Main title */}
            <h1 id="main-title-content" style={{ color: "#468585", fontSize: "5.5em", justifyContent: "center", fontWeight: "bold", letterSpacing: ".3em" }} className="items-center">
              turtle tutor
            </h1>

            {/* Topic Selection */}
            <form id = "form" onSubmit = {handleSubmit}>
              <div  id="main-title-content" className="w-1/10 mx-auto items-center justify-items-center" style={{ color: "#000", fontSize: "1.5em"}}>
                {/* Dropdown */}
                <p>Select a
                <select onChange = {(e) => setHardTopic(e.target.value)} name = "topic" style={{ paddingLeft: "0.5em", marginLeft: "0.5em", marginRight: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} className="topic">
                  <option value="java">Topic</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="javascript">Javascript</option>
                </select>
                  or 
                  <input id = "manual" name = "manual" disabled = {hardTopic != ""} className = {hardTopic != "" ?  "ml-2 pl-2 " : ""}
                  style= {{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} placeholder="type your topic here." />
                </p>
              </div>

              {/* Submission button */}
              <div id="submission-button-content" className="w-1/2 mx-auto">
                <button 
                  id="submission-button"
                  type = "submit"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                  style={{ backgroundColor: "#468585" }}
                >
                  Start Review!
                </button>
              </div>
            </form>
          </div>

          {/* Right column (main logo) */}
          <Image
            id="right-column"
            src={logo}
            alt="The tutor turtle logo."
            width="600px"
            height="auto" />
        </div>
      </main>

        {/* Credits footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p style={{color: "#50B498", fontSize: "1.0em"}}>
          Created by Amisha, Jordan, Tory, and Gabe @HackMIT 2024! =)
        </p>
      </footer>
    </div>
  );
}
