import React, { useState, useRef, useEffect, useContext } from "react";
import { Mycontext } from "../context/context";
import { useNavigate } from "react-router-dom";

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

function ProfileDropdown({ onClose, email, name, onSignOut }) {
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-80 bg-gray-50 rounded-lg shadow-lg border p-4 z-50 animate-fadeIn"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
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
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-semibold text-blue-600 mb-2">
          {name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="font-medium text-gray-700">{email}</div>
      </div>
      <div className="text-center mb-4">
        <div className="text-xl font-semibold text-gray-800">
          Hi, {name || "User"}!
        </div>
        <button className="mt-2 bg-white border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50 transition">
          Manage your Google Account
        </button>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col space-y-2 mb-4">
        <button
          className="flex items-center justify-center bg-white border rounded-md py-2 hover:bg-gray-100 transition"
          onClick={onSignOut}
        >
          <span className="text-gray-700">Sign out</span>
        </button>
      </div>
    </div>
  );
}

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
      className="absolute right-12 top-12 w-64 bg-white rounded-xl shadow-lg border z-50 p-4 grid grid-cols-3 gap-4 animate-fadeIn"
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

function Navbar({ onMenuClick }) {
  const { user, updateUser } = useContext(Mycontext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    updateUser(null);
    setProfileOpen(false);
    navigate("/login");
  };

  const email = user?.email || "user@example.com";
  const name = user?.name || "";

  const tabs = [
    { name: "Primary", path: "/" },
    { name: "Personal", path: "/personal", count: "83", color: "green" },
    { name: "Professional", path: "/prof", count: "2", color: "blue" },
    { name: "Spam", path: "/spam", count: "5", color: "orange" },
    { name: "Others", path: "/others" },
  ];

  return (
    <header>
      <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
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

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
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

          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition text-blue-600 font-semibold"
              aria-label="Open Profile Dropdown"
            >
              {name?.charAt(0).toUpperCase() || "U"}
            </div>
            {profileOpen && (
              <ProfileDropdown
                onClose={() => setProfileOpen(false)}
                email={email}
                name={name}
                onSignOut={handleSignOut}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-200">
        <ul className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <li
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="group flex items-center border-b-4 border-transparent text-gray-600 py-3 hover:text-blue-600 hover:border-blue-300 cursor-pointer transition"
            >
              <span>{tab.name}</span>
              {tab.count && (
                <span
                  className={`ml-2 bg-${tab.color}-100 text-${tab.color}-700 rounded-full px-2 py-0.5 text-xs font-semibold`}
                >
                  {tab.count} new
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
