Go Flow Mail – AI-Powered Email & Chat Application
Go Flow Mail is an educational and productive full-stack web application that mimics a modern email client, enhanced with a real-time AI assistant. Built with React, Node.js, and Google Gemini AI, this project showcases your ability to integrate real-world features like inbox navigation, message composition, user authentication, and AI-based chatting — all under a polished, responsive UI.

This app is ideal to present in interviews or showcase in your professional portfolio.

📌 Project Overview
Go Flow Mail is a functional simulation of an email client, combined with an AI chatbot. Users can sign up, log in, and manage folders such as Inbox, Starred, Sent, Drafts, and Spam. One of the standout features is the real-time chat powered by Google Gemini API, allowing the user to interact with an intelligent assistant directly on the dashboard.

This project not only reflects frontend/backend proficiency but also illustrates your ability to build usable, production-inspired interfaces.

✅ Features
🔐 User Authentication – Signup, login, logout using Express backend and session/token management.

📥 Email Folder UI – Functional navigation for Inbox, Sent, Starred, Drafts, and Spam.

📝 Compose Message Modal – Write and “send” messages (simulation mode).

🧠 AI Chat Assistant – Google Gemini-powered chatbot for live Q&A.

📱 Fully Responsive UI – Built with Tailwind CSS.

🧭 Side Navigation Bar – Smooth navigation with React Router & clean structure.

🌐 React Context API – Manages user state globally.

🔄 Real-Time Chat Prompts – User prompts generate AI responses within seconds.

🧰 Technologies Used
🖥 Frontend
React.js (with Vite)

React Router DOM

React Context API

Tailwind CSS

⚙ Backend
Node.js + Express.js

Mongoose (MongoDB-ready user model)

🤖 AI Integration
Google Generative Language API (Gemini)

Real-time AI fetch requests from React frontend

📦 Tools
Git, GitHub, npm, VS Code

🚀 Getting Started
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/rohangarg-2006/HackFest.git
cd HackFest
2. Start Backend Server
bash
Copy
Edit
cd server
npm install
node index.js
3. Start Frontend (React)
bash
Copy
Edit
cd client
npm install
npm run dev
Now open http://localhost:5173 in your browser.

💡 How to Use
Sign Up / Log In: Create an account using the signup form.

Navigate Folders: Switch between Inbox, Starred, Sent, Drafts, and Spam.

Compose Emails: Click the Compose (✉️) button to write a new message.

Use AI Chat: In the AI panel, type any question and let Gemini answer.

Log Out: Use the profile icon to sign out securely.

📁 Project Structure
bash
Copy
Edit
GoFlowMail/

│
├── client/ 
# React Frontend
│   ├── src/
│   │   ├── components/  # Pages and UI components
│   │   ├── context/     # Auth & global state
│   │   └── App.jsx
│   └── vite.config.js
│
├── server/              # Express Backend
│   ├── Models/          # Mongoose user schema
│   └── index.js
│
├── RAG.ipynb            # Bonus AI notebook
└── 3rd presentation.pdf # Project presentation slides
🧑‍💻 Contributors
Rohan Garg – Full-stack dev, system architecture

Mishra Mukul – Frontend features, UI logic

Robin – Chat integration & Gemini setup

🔭 Future Scope
Email backend with SMTP & database

Profile settings page

Persistent message history

OAuth login (Google)

Dark mode theme

Deploy on Vercel/Render

📝 License
This project does not currently include a license. For collaboration or usage, please contact the authors.

