import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { Mycontext } from "../context/context";

function ComposeWindow({ onClose }) {
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [notification, setNotification] = useState(null);
  const [vis, setvis] = useState(true);
  const fileInputRef = useRef(null);

  const { user } = useContext(Mycontext);

  const [formData, setFormData] = useState({
    reciever: "",
    subject: "",
    messageBody: "",
  });

  useEffect(() => {
    const savedDraft = localStorage.getItem("emailDraft");
    if (savedDraft) {
      const { reciever, subject, messageBody } = JSON.parse(savedDraft);
      setFormData({ reciever, subject, messageBody });
    }
  }, []);

  const showTempNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem("emailDraft", JSON.stringify(formData));
    showTempNotification("Draft saved!", "warning");
  };

  const handleDiscardDraft = async() => {
    setFormData({ sender:user.email,reciever: "", subject: "", messageBody: "" });
    setAttachedFiles([]);
    localStorage.removeItem("emailDraft");
    showTempNotification("Draft discarded!", "error");

    onClose();
  };
  const handleSend = async () => {
    // Validate inputs
    if (!formData.recipient.trim() || !formData.subject.trim()) {
      showTempNotification("Recipient and Subject are required!", "error");
      return; // Stop execution if fields are invalid
    }
  
    const mailData = {
      sender: user.email,
      reciever: formData.recipient,
      subject: formData.subject,
      messageBody: formData.messageBody,
    };
  
    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        body: JSON.stringify(mailData),
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        showTempNotification(data.error || "Failed to send", "error");
        return;
      }
  
      showTempNotification("Message sent successfully!", "success");
  
      // Reset form and clear draft
      setFormData({
        sender: user.email,
        recipient: "",
        subject: "",
        messageBody: "",
      });
      setAttachedFiles([]);
      localStorage.removeItem("emailDraft");
      onClose();
  
    } catch (err) {
      console.error("Error sending email:", err);
      showTempNotification("Something went wrong", "error");
    }
  };
  

  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-400 text-black",
  };

  return (
    <>
      {vis && (
        <div className="fixed bottom-0 right-4 w-full max-w-md bg-white shadow-xl border rounded-t-lg flex flex-col z-50">
          {notification && (
            <div
              className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium tracking-wide transition-all duration-500 transform ${
                alertStyles[notification.type]
              }`}
            >
              {notification.message}
            </div>
          )}

          <div className="flex items-center justify-between p-2 border-b bg-gray-50">
            <span className="font-semibold text-sm">New Message</span>
            <button
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={() => setvis(false)}
            >
              ✖
            </button>
          </div>

          <div className="p-2 flex-1 overflow-auto text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <label className="w-10 text-gray-600">To</label>
              <input
                type="text"
                name="recipient"
                className="flex-1 border-b border-gray-300 focus:outline-none"
                placeholder="Recipient email"
                value={formData.recipient}
                onChange={handleInputChange}
              />
              <button
                className="text-xs text-blue-600"
                onClick={() => setShowCcBcc(!showCcBcc)}
              >
                Cc Bcc
              </button>
            </div>

            {showCcBcc && (
              <div className="flex flex-col space-y-2 mb-2">
                <input
                  type="text"
                  className="border-b border-gray-300 focus:outline-none"
                  placeholder="Cc"
                />
                <input
                  type="text"
                  className="border-b border-gray-300 focus:outline-none"
                  placeholder="Bcc"
                />
              </div>
            )}

            <input
              type="text"
              name="subject"
              className="w-full border-b border-gray-300 mb-2 focus:outline-none"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
            />

            <textarea
              name="messageBody"
              className="w-full h-32 border border-gray-200 p-2 focus:outline-none resize-none"
              placeholder="Message body"
              value={formData.messageBody}
              onChange={handleInputChange}
            />

            {attachedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="font-medium">Attached:</div>
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm bg-gray-50 px-2 py-1 rounded"
                  >
                    <span>{file.name}</span>
                    <button
                      className="text-red-500 hover:underline text-xs"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-2 border-t">
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Send
            </button>

            <div className="flex items-center space-x-3 text-gray-600">
              <button
                className="hover:bg-gray-100 p-1 rounded-full"
                onClick={handleAttachClick}
              >
                📎
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                className="hover:bg-gray-100 p-1 rounded-full"
                onClick={handleSaveDraft}
              >
                💾
              </button>

              <button
                className="hover:bg-gray-100 p-1 rounded-full"
                onClick={handleDiscardDraft}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComposeWindow;
