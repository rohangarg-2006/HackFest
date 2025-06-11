# Go Flow Mail – AI-Powered Email & Chat Application

**Go Flow Mail** is an educational and productive full-stack web application that simulates a modern email client, enhanced with a real-time **AI assistant**. Built using **React**, **Node.js**, and **Google Gemini AI**, this project demonstrates your ability to integrate full-stack development with real-time AI features — including email folder navigation, message composition, user authentication, and a chatbot — all wrapped in a clean, responsive UI.

This app is ideal for showcasing in interviews, tech portfolios, or as a hackathon submission.

---

## 📌 Project Overview

Go Flow Mail mimics a feature-rich email client with integrated AI capabilities. Registered users can **sign up, log in**, and manage their emails under folders like **Inbox, Starred, Sent, Drafts**, and **Spam**. A standout feature is the embedded **AI chatbot**, powered by **Google Gemini**, which can answer user queries live on the dashboard.

This project bridges practical frontend/backend skills with AI innovation — perfect for demonstrating hands-on knowledge of modern web stacks and cloud APIs.

---

## ✅ Features

- 🔐 **User Authentication** – Secure signup, login, and logout using Express.js and session/token handling.
- 📥 **Folder Navigation** – Functional mailbox UI including Inbox, Sent, Starred, Drafts, and Spam.
- 📝 **Message Composition** – Compose and simulate sending emails using a clean modal interface.
- 🤖 **AI Chat Assistant** – Integrated chatbot powered by Google Gemini for interactive Q&A.
- 🌐 **Global State Handling** – User state managed via React Context API.
- 🧭 **Responsive Sidebar Navigation** – Intuitive layout built with Tailwind CSS and React Router.
- 💬 **Real-Time AI Chat** – Prompts receive intelligent responses via fetch requests to Gemini API.
- 📱 **Mobile-Friendly UI** – Fully responsive interface for all screen sizes.

---

## 🧰 Technologies Used

### 🖥 Frontend
- React.js (with Vite)
- React Router DOM
- React Context API
- Tailwind CSS

### ⚙ Backend
- Node.js
- Express.js
- Mongoose (MongoDB-ready user model)

### 🤖 AI Integration
- Google Generative Language API (Gemini)
- Real-time fetch integration from frontend

### 🔧 Tools
- Git & GitHub
- npm / Node.js
- VS Code

---

## 🚀 Installation and Setup

To run Go Flow Mail locally:

### 1. Clone the Repository
```bash
git clone https://github.com/rohangarg-2006/HackFest.git
cd HackFest
```
2. Setup and Start Backend
  ```bash
Copy
Edit
cd server
npm install
node index.js
The backend server will typically run on http://localhost:5000.
```
4. Setup and Start Frontend
```bash
Copy
Edit
cd client
npm install
npm run dev
The frontend will run on http://localhost:5173 (Vite default).
```

💡 Usage Guide
Sign Up / Login: Users start by creating a new account or logging in.

Navigate Folders: Use the sidebar to explore folders like Inbox, Sent, Starred, Drafts, and Spam.

View Messages: Click on messages to view simulated content (placeholder logic in place).

Compose Emails: Use the ✉️ icon to open a modal and simulate sending a message.

AI Chat: Use the chatbot at the side or bottom of the dashboard to ask questions and receive AI-powered responses.

Responsive Layout: Resize your browser or use mobile to see responsive behavior.

📁 Project Structure
```bash
Copy
Edit
GoFlowMail/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Pages and UI Components
│   │   ├── context/         # Global state (auth, user)
│   │   └── App.jsx          # Routing & Layout
│   └── vite.config.js
│
├── server/                  # Express Backend
│   ├── Models/              # Mongoose User Schema
│   └── index.js             # Express App Entry Point
│
├── RAG.ipynb                # Bonus: Retrieval-Augmented Generation Notebook
└── 3rd presentation.pdf     # Team presentation slides
```
👥 Contributors

Rohan Garg – Frontend Logic, Gemini AI setup 

Mishra Mukul – Frontend logic, UI Ideas

Robin – Backend-Chat assistant integration, Authentication, architecture & integration

Suryansh Dixit- Backend-Chat assistant integration, Authentication, architecture & integration

Rudra Gupta- Gemini AI Setup , will implement RAG model in future

🔭 Future Scope
📧 Real Email Backend (SMTP / Nodemailer)

💾 Persistent Email History (MongoDB)

⚙ Profile Settings Page

🌑 Dark Mode Toggle

🔐 OAuth Login (Google/GitHub)

🚀 Deployment on Vercel / Render / Railway

🧠 Enhance Gemini Assistant with Document RAG

✅ Add Unit Tests and Error Boundaries

📝 License
This project is not licensed for public use by default. For reuse, demo, or collaboration, please contact the project authors.

Thanks for checking out Go Flow Mail!
