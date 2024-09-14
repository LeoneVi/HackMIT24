import Image from "next/image";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import Dropdown from 'react-bootstrap/Dropdown';
// import dynamic from 'next/dynamic';

// const Dropdown = dynamic(() => import('react-bootstrap/Dropdown'), { ssr: false });


export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 style={{ color: "#468585", fontSize: "4em", justifyContent: "center", fontWeight: "bold", letterSpacing: ".3em" }} className="items-center">
          turtle tutor
        </h1>

        <div className="items-center justify-items-center">
          <p style={{ color: "#000", fontSize: "1.5em"}}>
            Select a
            
            <select style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}} className="topic">
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
            <input style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}}>

            </input>
          </p>
        </div>

        <div>
          <p style={{ color: "#000", fontSize: "1.5em"}}>
            Class Size: 
            <input style={{ paddingLeft: "0.5em", marginLeft: "0.5em", borderWidth: "0.10em", borderRadius: "0.4em", borderColor: "#808080"}}>

            </input>
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            style={{backgroundColor: "#468585"}}
          >
            Go!
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
