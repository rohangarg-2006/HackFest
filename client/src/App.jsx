import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// function App() {

//   const [a,b]=useState("");
//   const [c,d]=useState("");
//   const [e,f]=useState("");
//   const [g,h]=useState("");

  
//   let [summary,updsummary]=useState("");
//   let [withoutgram,aftergrammar]=useState("");


//   function summarize(x){
//   fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       contents: [{ role: "user", parts: [{ text:`email : ${x} . write summary of email above`}] }]
//     })
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then(data => {
//           if (data && data.candidates && data.candidates.length > 0) {
//         const aiOutput = data.candidates[0]?.content?.parts[0]?.text;
//         updsummary(aiOutput)
//       } else {
//         console.log("No response from AI.");
//       }
//     })
//   }

//   async function summarize(x){
//     const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [{
//           role: "user",
//           parts: [{
//             text:`email : ${x} . write very short summary of email above`
//           }]
//         }]
//       })
//     });
  
//     const data = await res.json();
  
//     if (data?.candidates?.length > 0) {
//       return data.candidates[0]?.content?.parts[0]?.text;
//     } else {
//       console.log("No response from AI.");
//       return null;
//     }
//   }
//   async function runsumm(temp) {
//     const result = await summarize(temp);
//     console.log(result);
//   }

//   async function checktype(x){
//     const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [{
//           role: "user",
//           parts: [{
//             text: `email : ${x} . check whether this email is professional or personal or spam, just write category`
//           }]
//         }]
//       })
//     });
  
//     const data = await res.json();
  
//     if (data?.candidates?.length > 0) {
//       return data.candidates[0]?.content?.parts[0]?.text;
//     } else {
//       console.log("No response from AI.");
//       return null;
//     }
//   }

//   async function run(temp) {
//     const result = await checktype(temp);
//     console.log(result);
//   }

//   async function autoreply(x){
//     const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [{
//           role: "user",
//           parts: [{
//             text: `email : ${x} . generate one best production level reply, just subject and body.`
//           }]
//         }]
//       })
//     });
  
//     const data = await res.json();
  
//     if (data?.candidates?.length > 0) {
//       return data.candidates[0]?.content?.parts[0]?.text;
//     } else {
//       console.log("No response from AI.");
//       return null;
//     }
//   }

//   async function finalautoreply(temp) {
//     const result = await autoreply(temp);
//     console.log(result);
//   }
  

//   function correctgrammar(x){
//     fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [{ role: "user", parts: [{ text:`sentence : ${x} . correct gramatical error in above sentenc eand rewrite`}] }]
//       })
//     })
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//             if (data && data.candidates && data.candidates.length > 0) {
//           const aiOutput = data.candidates[0]?.content?.parts[0]?.text;
//           aftergrammar(aiOutput)
//         } else {
//           console.log("No response from AI.");
//         }
//       })
//   }


//   return (
//     <>

//       <input type="text" value={a} onChange={(e)=>{b(e.target.value)}}  placeholder="from" />
//       <input type="text" value={c} onChange={(e)=>{d(e.target.value)}} placeholder="to" />
//       <input type="text" value={e} onChange={(e)=>{f(e.target.value)}} placeholder="subject" />
//       <input type="text" value={g} onChange={(e)=>{h(e.target.value)}} placeholder="message" />

//       {/* <button onClick={()=>{
//         const now = new Date();
//         const date = now.toLocaleDateString();
//         const time = now.toLocaleTimeString();
       
//        let mail={
//         sender:a,
//         reciever:c,
//         subject:e,
//         message:g,
//         date:date,
//         time:time
//       }
//       console.log(mail)
       
//       }}>send</button> */}

//       <button onClick={async()=>{
            
//              const now = new Date();
//              const date = now.toLocaleDateString();
//              const time = now.toLocaleTimeString();

//             let mail={
//               sender:a,
//               reciever:c,
//               subject:e,
//               message:g,
//               date:date,
//               time:time
//             }

//             const response = await fetch('http://localhost:3000/draft', {
//                 method: 'POST',
//                 body: JSON.stringify(mail),
//                 headers: { 'Content-Type': 'application/json' }
//             })

//             const findedone = await response.json()
//             console.log(findedone)

//         }}>Send</button>
      
//     </>
//   )
// }

// export default App
import Home from './component/Home'
import Navbar from './component/Navbar'
import Inbox from './component/inbox'
import EmailDetail from './component/Emaildetail'
import SignupForm from './component/signuppage'
import { Userdetail } from './context/context'
function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return(<>
<Userdetail>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path='/' element={<><div className="flex h-screen">
      <Home isOpen={true} onSelect={() => {}} />
      <Inbox />
</div>
<EmailDetail/></> }/>


    <Route path="/signup" element={<SignupForm/>} />

   
</Routes>




</BrowserRouter>
</Userdetail>
  </>)


}

export default App
