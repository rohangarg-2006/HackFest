import { useEffect, useState, useContext } from "react";
import { Mycontext } from "../context/context";

function Inbox() {
  const { user } = useContext(Mycontext);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [autoReplyData, setAutoReplyData] = useState(null);
  const [copied, setCopied] = useState(false);

  async function summarize(message) {
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDeTk6G1d1YvDT-QdURXJEz_iAuWZfFi_s",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `email : ${message} . write very short summary of email above`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";
    } catch (err) {
      console.error("Error summarizing:", err);
      return "Error generating summary.";
    }
  }

  const handleSummary = async (email) => {
    setLoadingSummary(true);
    const summary = await summarize(email.message);
    setSummaryData({
      summary,
      subject: email.subject,
      sender: email.sender,
    });
    setLoadingSummary(false);
  };

  async function autoreply(x) {
    
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

  async function finalautoreply(email) {
    const result = await autoreply(email.message);
    if (result) {
      setAutoReplyData({
        replyText: result,
        subject: email.subject,
        sender: email.sender,
      });
    }
  }

  useEffect(() => {
    async function fetchInbox() {
      try {
        const response = await fetch("http://localhost:3000/fetchinbox", {
          method: "POST",
          body: JSON.stringify({ name: user.name }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setEmails(Array.isArray(data) ? data : [data]);

        console.log("Inbox Fetched:", data);
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      }
    }

    if (user) {
      fetchInbox();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen bg-gray-100 overflow-y-auto relative">

      {/* 🔍 Summary Popup */}
      {summaryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setSummaryData(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-700">
              Summary of : {summaryData.subject}
            </h2>
            <p className="text-sm mb-1 text-gray-600">From: {summaryData.sender}</p>
            <hr className="my-2" />
            <p className="text-gray-800">{summaryData.summary}</p>
          </div>
        </div>
      )}

      {/* ✉️ Auto Reply Popup */}
      {autoReplyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setAutoReplyData(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2 text-gray-700">
              Auto Reply for: {autoReplyData.subject}
            </h2>
            <p className="text-sm mb-1 text-gray-600">To: {autoReplyData.sender}</p>
            <hr className="my-2" />
            <pre className="text-gray-800 whitespace-pre-wrap mb-4">{autoReplyData.replyText}</pre>

            <div className="flex items-center gap-3">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(autoReplyData.replyText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Copy
              </button>
              {copied && (
                <span className="text-green-600 text-sm font-semibold">Copied!</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 📥 Email Display */}
      {selectedEmail ? (
        <div className="p-4">
          <button
            onClick={() => setSelectedEmail(null)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Inbox
          </button>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">{selectedEmail.subject}</h1>
            <p className="text-sm text-gray-600 mb-2">From: {selectedEmail.sender}</p>
            <p className="text-sm text-gray-600 mb-4">Time: {selectedEmail.time}</p>
            <p className="text-gray-800">
              {selectedEmail.message || "No email body available."}
            </p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleSummary(selectedEmail)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {loadingSummary ? "Summarizing..." : "Summary"}
              </button>
              <button
                onClick={() => finalautoreply(selectedEmail)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Auto Reply
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {emails.length === 0 ? (
            <p className="text-gray-600">No emails to show.</p>
          ) : (
            emails.map((email, index) => (
              <div
                key={index}
                onClick={() => setSelectedEmail(email)}
                className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-50 transition cursor-pointer"
              >
                <h3 className="font-semibold text-sm text-gray-700 mb-1">
                  Subject : {email.subject}
                </h3>
                <p className="text-md font-semibold text-gray-600 mb-2">
                  From: {email.sender}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{email.time}</p>
                  <p>{email.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Inbox;
