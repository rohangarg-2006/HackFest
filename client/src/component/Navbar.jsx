import React, { useState, useRef, useEffect } from "react";

// Hook to detect clicks outside a component
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

// Profile dropdown component
function ProfileDropdown({ onClose, email }) {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 bg-gray-50 rounded-lg shadow-lg border p-4 z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        title="Close"
        aria-label="Close Profile Dropdown"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex flex-col items-center mt-2 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
          <img
            src="https://via.placeholder.com/64"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-medium text-gray-700">{email}</div>
      </div>
      <div className="text-center mb-4">
        <div className="text-xl font-semibold text-gray-800">
          Hi, {email.charAt(0).toUpperCase()}!
        </div>
        <button className="mt-2 bg-white border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50 transition">
          Manage your Google Account
        </button>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col space-y-2 mb-4">
        <button className="flex items-center justify-center bg-white border rounded-md py-2 hover:bg-gray-100 transition">
          <span className="text-gray-700">Add account</span>
        </button>
        <button className="flex items-center justify-center bg-white border rounded-md py-2 hover:bg-gray-100 transition">
          <span className="text-gray-700">Sign out</span>
        </button>
      </div>
    </div>
  );
}

// Apps dropdown component
function AppsDropdown({ onClose }) {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, onClose);

  const apps = [
    { name: "Gmail", icon: "📧", link: "https://mail.google.com" },
    { name: "Drive", icon: "📁", link: "https://drive.google.com" },
    { name: "Docs", icon: "📄", link: "https://docs.google.com" },
    { name: "Sheets", icon: "📊", link: "https://sheets.google.com" },
    { name: "Calendar", icon: "📆", link: "https://calendar.google.com" },
    { name: "Meet", icon: "🎥", link: "https://meet.google.com" },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute right-12 top-12 w-64 bg-white rounded-xl shadow-lg border z-50 p-4 grid grid-cols-3 gap-4"
    >
      {apps.map((app) => (
        <a
          key={app.name}
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center hover:scale-105 transition-transform text-sm"
        >
          <div className="text-2xl">{app.icon}</div>
          <div className="mt-1">{app.name}</div>
        </a>
      ))}
    </div>
  );
}

// Navbar component
function Navbar({ onMenuClick }) {
  const loggedEmail = "mishramukul2006@gmail.com";
  const [profileOpen, setProfileOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none lg:hidden"
            onClick={onMenuClick}
            aria-label="Open Menu"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="/" className="text-xl font-bold text-gray-700">
            Go Flow Mail
          </a>
        </div>

        {/* Right: Apps + Profile */}
        <div className="flex items-center space-x-4">
          {/* Apps Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              title="Google Apps"
              aria-label="Open Apps Dropdown"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="5" cy="5" r="2" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
              </svg>
            </button>
            {appsOpen && <AppsDropdown onClose={() => setAppsOpen(false)} />}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
              aria-label="Open Profile Dropdown"
            >
              <span className="text-gray-600 font-semibold">
                {loggedEmail.charAt(0).toUpperCase()}
              </span>
            </div>
            {profileOpen && (
              <ProfileDropdown
                onClose={() => setProfileOpen(false)}
                email={loggedEmail}
              />
            )}
          </div>
        </div>
      </nav>

      {/* SECOND ROW: Tabs */}
      <div className="bg-white px-4 border-b border-gray-200">
        <ul className="flex space-x-10">
          {/* Primary tab */}
          <li className="flex items-center border-b-4 border-blue-600 text-blue-600 py-3 font-medium">
            <svg
              className="h-5 w-5 mr-2"
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
            <span>Primary</span>
          </li>
          {/* Personal tab */}
          <li className="group flex items-center border-b-4 border-transparent text-gray-600 py-3 hover:text-gray-800 hover:border-blue-300 cursor-pointer">
            <svg
              className="h-5 w-5 mr-2 text-gray-500 group-hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              <path d="M2 22v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H2z" />
            </svg>
            <span>Personal</span>
            <span className="ml-2 bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              83 new
            </span>
          </li>
          {/* Professional tab */}
          <li className="group flex items-center border-b-4 border-transparent text-gray-600 py-3 hover:text-gray-800 hover:border-blue-300 cursor-pointer">
            <svg
              className="h-5 w-5 mr-2 text-gray-500 group-hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 7V6a2 2 0 012-2h8a2 2 0 012 2v1" />
              <path d="M18 7v10a2 2 0 01-2 2H8a2 2 0 01-2-2V7" />
              <path d="M6 10h12" />
            </svg>
            <span>Professional</span>
            <span className="ml-2 bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              2 new
            </span>
          </li>
          {/* Spam tab */}
          <li className="group flex items-center border-b-4 border-transparent text-gray-600 py-3 hover:text-gray-800 hover:border-blue-300 cursor-pointer">
            <svg
              className="h-5 w-5 mr-2 text-gray-500 group-hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 8l8 8" />
              <path d="M8 16l8-8" />
            </svg>
            <span>Spam</span>
            <span className="ml-2 bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 text-xs font-semibold">
              5 new
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;