import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {

  const [a,b]=useState("");
  let [summary,updsummary]=useState("");
  let [withoutgram,aftergrammar]=useState("");


  function summarize(x){
  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text:`email : ${x} . write summary of email above`}] }]
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
          if (data && data.candidates && data.candidates.length > 0) {
        const aiOutput = data.candidates[0]?.content?.parts[0]?.text;
        updsummary(aiOutput)
      } else {
        console.log("No response from AI.");
      }
    })
  }

  async function summarize(x){
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text:`email : ${x} . write very short summary of email above`
          }]
        }]
      })
    });
  
    const data = await res.json();
  
    if (data?.candidates?.length > 0) {
      return data.candidates[0]?.content?.parts[0]?.text;
    } else {
      console.log("No response from AI.");
      return null;
    }
  }
  async function runsumm(temp) {
    const result = await summarize(temp);
    console.log(result);
  }

  async function checktype(x){
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `email : ${x} . check whether this email is professional or personal or spam, just write category`
          }]
        }]
      })
    });
  
    const data = await res.json();
  
    if (data?.candidates?.length > 0) {
      return data.candidates[0]?.content?.parts[0]?.text;
    } else {
      console.log("No response from AI.");
      return null;
    }
  }

  async function run(temp) {
    const result = await checktype(temp);
    console.log(result);
  }

  async function autoreply(x){
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{
            text: `email : ${x} . generate one best production level reply, just subject and body.`
          }]
        }]
      })
    });
  
    const data = await res.json();
  
    if (data?.candidates?.length > 0) {
      return data.candidates[0]?.content?.parts[0]?.text;
    } else {
      console.log("No response from AI.");
      return null;
    }
  }

  async function finalautoreply(temp) {
    const result = await autoreply(temp);
    console.log(result);
  }
  

  function correctgrammar(x){
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text:`sentence : ${x} . correct gramatical error in above sentenc eand rewrite`}] }]
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
            if (data && data.candidates && data.candidates.length > 0) {
          const aiOutput = data.candidates[0]?.content?.parts[0]?.text;
          aftergrammar(aiOutput)
        } else {
          console.log("No response from AI.");
        }
      })
  }


  return (
    <>

<h1>Email platform</h1>
      <input type="text" value={a} onChange={(e)=>{b(e.target.value)}}/>
      <h2 id='txt'></h2>

      <button onClick={()=>{
        console.log(runsumm(a))
      }}>Summary</button>
      
    </>
  )
}

export default App
