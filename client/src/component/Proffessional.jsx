import { useState } from "react";

function Inbox() {
  const [autoReplyData, setAutoReplyData] = useState(null);
  const [copied, setCopied] = useState(false);

  async function autoreply(message) {
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `email : ${message} . generate one best production level reply, just subject and body.`
            }]
          }]
        })
      });

      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply available.";
    } catch (err) {
      console.error("Error generating auto reply:", err);
      return "Error generating auto reply.";
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

  return (
    <div>
      {/* Add this where appropriate, like inside a message/email block */}
      <button onClick={() => finalautoreply(email)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Auto Reply
      </button>

      {/* 🚀 Auto Reply Popup */}
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
              {copied && <span className="text-green-600 text-sm font-semibold">Copied!</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
