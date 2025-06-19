import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function NavBar({ darkMode, setDarkMode }) {
  const [username, setUsername] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("user_name");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    setUsername(null);
    setShowMenu(false);
    navigate("/");
  };

  return (
    <div className="h-20 bg-gradient-to-r from-gray-600 to-gray-400 flex items-center justify-end px-8 text-white space-x-8">
      <nav className="flex space-x-6 font-semibold">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/services" className="hover:text-gray-300">
          Services
        </Link>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white hover:text-gray-300"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
      <div className="relative">
        {!username ? (
          <Link to="/login" className="hover:text-gray-300 font-semibold">
            Login
          </Link>
        ) : (
          <>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="font-semibold focus:outline-none"
            >
              {username} ▼
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-900 rounded shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
