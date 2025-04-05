import { useEffect, useState, useContext } from "react";
import { Mycontext } from "../context/context";

function Inbox() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { user } = useContext(Mycontext);

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function fetchInbox() {
      try {
        const response = await fetch("http://localhost:3000/fetchinbox", {
          method: "POST",
          body: JSON.stringify({name:user.name}),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        // If `data` is an array of emails:
        if (Array.isArray(data)) {
          setEmails(data);
        } else {
          // In case it's a single email or object
          setEmails([data]);
        }

        console.log("Inbox Fetched:", data);
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      }
    }

    if (user) {
      fetchInbox();
    }
  }, [user]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleBackClick = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="flex-1 h-screen bg-gray-100 overflow-y-auto">
      {selectedEmail ? (
        <div className="p-4">
          <button
            onClick={handleBackClick}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Inbox
          </button>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{selectedEmail.subject}</h1>
            <p className="text-sm text-gray-600 mb-2">From: {selectedEmail.sender}</p>
            <p className="text-sm text-gray-600 mb-4">Time: {selectedEmail.time}</p>
            <p className="text-gray-800">{selectedEmail.body || "No email body available."}</p>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {emails.length === 0 ? (
            <p className="text-gray-600">No emails to show.</p>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className="bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-50 transition cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{email.subject}</h3>
                <p className="text-sm text-gray-600">From: {email.sender}</p>
                <p className="text-xs text-gray-500">{email.time}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Inbox;
