import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EmailDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get the email data passed via state

  if (!email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No email selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-3/4">
        <h1 className="text-2xl font-bold mb-4">{email.subject}</h1>
        <p className="text-sm text-gray-600 mb-2">From: {email.sender}</p>
        <p className="text-sm text-gray-600 mb-4">Time: {email.time}</p>
        <p className="text-gray-800">{email.body || "No email body available."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default EmailDetail;