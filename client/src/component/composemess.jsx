import React, { useState, useRef, useEffect } from "react";

function ComposeWindow({ onClose }) {
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedDraft = localStorage.getItem("emailDraft");
    if (savedDraft) {
      const { recipient, subject, messageBody } = JSON.parse(savedDraft);
      setRecipient(recipient);
      setSubject(subject);
      setMessageBody(messageBody);
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

  const handleSaveDraft = () => {
    localStorage.setItem(
      "emailDraft",
      JSON.stringify({ recipient, subject, messageBody })
    );
    showTempNotification("Draft saved!", "warning");
  };

  const handleDiscardDraft = () => {
    setRecipient("");
    setSubject("");
    setMessageBody("");
    setAttachedFiles([]);
    localStorage.removeItem("emailDraft");
    showTempNotification("Draft discarded!", "error");
    onClose();
  };

  const handleSend = () => {
    if (!recipient.trim() || !subject.trim()) {
      showTempNotification("Recipient and Subject are required!", "error");
      return;
    }

    const mail = {
      to: recipient,
      subject: subject,
      body: messageBody,
      attachments: attachedFiles.map((file) => file.name),
    };

    console.log("Sending mail:", mail);

    showTempNotification("Message sent successfully!", "success");
    localStorage.removeItem("emailDraft");

    setTimeout(() => {
      setRecipient("");
      setSubject("");
      setMessageBody("");
      setAttachedFiles([]);
      onClose();
    }, 1000);
  };

  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-400 text-black",
  };

  const [vis,setvis]=useState(true)

  return (
    <>
    {vis && 
    <div className="fixed bottom-0 right-4 w-full max-w-md bg-white shadow-xl border rounded-t-lg flex flex-col z-50">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-medium tracking-wide transition-all duration-500 transform ${
            alertStyles[notification.type]
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b bg-gray-50">
        <span className="font-semibold text-sm">New Message</span>
        <button className="p-1 rounded-full hover:bg-gray-200" onClick={()=>{
            setvis(false)
        }}>
          ✖
        </button>
      </div>

      {/* Body */}
      <div className="p-2 flex-1 overflow-auto text-sm">
        {/* To */}
        <div className="flex items-center space-x-2 mb-2">
          <label className="w-10 text-gray-600">To</label>
          <input
            type="text"
            className="flex-1 border-b border-gray-300 focus:outline-none"
            placeholder="Recipient email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <button
            className="text-xs text-blue-600"
            onClick={() => setShowCcBcc(!showCcBcc)}
          >
            Cc Bcc
          </button>
        </div>

        {/* CC/BCC */}
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

        {/* Subject */}
        <input
          type="text"
          className="w-full border-b border-gray-300 mb-2 focus:outline-none"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* Body */}
        <textarea
          className="w-full h-32 border border-gray-200 p-2 focus:outline-none resize-none"
          placeholder="Message body"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />

        {/* Attachments */}
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

      {/* Footer */}
      <div className="flex items-center justify-between p-2 border-t">
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Send
        </button>

        <div className="flex items-center space-x-3 text-gray-600">
          {/* Attach */}
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

          {/* Save Draft */}
          <button
            className="hover:bg-gray-100 p-1 rounded-full"
            onClick={handleSaveDraft}
          >
            💾
          </button>

          {/* Discard Draft */}
          <button
            className="hover:bg-gray-100 p-1 rounded-full"
            onClick={handleDiscardDraft}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default ComposeWindow;