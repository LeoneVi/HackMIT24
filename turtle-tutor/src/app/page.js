"use client";  // Ensures this is a client component

import Image from "next/image";
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';  // Updated to use the App Router's useRouter



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
        <h1 style={{ color: "#468585", fontSize: "4em", justifyContent: "center", fontWeight: "bold", letterSpacing: ".3em" }} className="items-center">
          turtle tutor
        </h1>
        <form id = "form" onSubmit = {handleSubmit}>
          <div className="items-center justify-items-center">
            <p style={{ color: "#000", fontSize: "1.5em"}}>Select a
            <select onChange = {(e) => setHardTopic(e.target.value)} name = "topic" style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} className="topic">
              <option value="java">Topic</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">Javascript</option>
            </select>
            </p>
          </div>
        <div>
          <p style={{ color: "#000", fontSize: "1.5em"}}>
            or 
            <input id = "manual" name = "manual" disabled = {hardTopic != ""} className = {hardTopic != "" ?  "ml-2 pl-2 " : ""}
            style= {{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} />
          </p>
        </div>

        <div>
          <p style={{ color: "#000", fontSize: "1.5em"}}>
            Class Size: 
            <input style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} />
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button type = "submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            style={{ backgroundColor: "#468585" }}
          >
            Go!
          </button>
        </div>
        </form>
      </main>
    </div>
  );
}
