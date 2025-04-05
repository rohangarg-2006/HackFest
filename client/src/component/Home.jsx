import clsx from "clsx";
import { useState } from "react";
import ComposeWindow from "./composemess";

function Home({ isOpen, onSelect }) {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const handleComposeClick = () => {
    setIsComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setIsComposeOpen(false);
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
              onClick={() =>{window.open('/','_self');}}
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
            onClick={() =>window.open('/sent','_self')}
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

          </nav>
        </div>
      </aside>

      {isComposeOpen && <ComposeWindow onClose={handleCloseCompose} />}
    </>
  );
}

export default Home;