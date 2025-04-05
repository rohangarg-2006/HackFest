import clsx from "clsx";
import { useState } from "react";
import ComposeWindow from "./composemess";

function Home({ isOpen, onSelect }) {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("Ask me anything!");

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
  };

  const handleChatSend = async () => {
    if (chatInput.trim() === "") return;

    const input = chatInput;
    setChatResponse("Thinking...");
    setChatInput("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDxsjH9yULP6zU3urKgEuP44jIkzMGtqBg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      if (data?.candidates?.length > 0) {
        setChatResponse(data.candidates[0]?.content?.parts[0]?.text || "No answer found.");
      } else {
        setChatResponse("No response from AI.");
      }
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setChatResponse("An error occurred while contacting AI.");
    }
  };

  return (
    <>
      <aside
        className={clsx(
          "bg-white border-r border-gray-200 h-screen w-64 flex-shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full lg:translate-x-0": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="p-4">
          <button
            onClick={handleComposeClick}
            className="flex items-center w-full bg-blue-500 text-white rounded-full py-2 mb-4 hover:bg-blue-600 transition"
          >
            <svg
              className="h-5 w-5 ml-3 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15.232 5.232l3.536 3.536M2 18l1.414-1.414 13.536-13.536a2 2 0 012.828 0l2.122 2.122a2 2 0 010 2.828L8.364 21.414H2V18z" />
            </svg>
            <span className="font-semibold mr-3">Compose</span>
          </button>

          <nav className="space-y-1">
            <button
              onClick={() => window.open("/", "_self")}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 mr-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v13H4z" />
                <path d="M2 6h20M6 20h12" />
              </svg>
              <span>Inbox</span>
            </button>

            <button
              onClick={() => onSelect("starred")}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 mr-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 17l-5 3 1.54-6.59L3 8.24l6.62-.57L12 2l2.38 5.67 6.62.57-5.54 4.17L17 20z" />
              </svg>
              <span>Starred</span>
            </button>

            <button
              onClick={() => window.open("/sent", "_self")}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 mr-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22l-4-9-9-4z" />
              </svg>
              <span>Sent</span>
            </button>

            <button
              onClick={() => onSelect("drafts")}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 mr-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 19h16V5H4v14zm8-14v14M4 10h16" />
              </svg>
              <span>Drafts</span>
            </button>

            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 mr-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span>Chat</span>
            </button>
          </nav>
        </div>
      </aside>

      {isComposeOpen && <ComposeWindow onClose={handleCloseCompose} />}

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-[28rem] bg-white shadow-lg rounded-lg border border-gray-300 p-4 z-50 h-[32rem] flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Chat</h2>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto border border-gray-200 rounded p-2 text-sm text-gray-800 whitespace-pre-line mb-2">
            {chatResponse}
          </div>

          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask something..."
            className="w-full border px-3 py-2 rounded mb-2"
          />

          <button
            onClick={handleChatSend}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
