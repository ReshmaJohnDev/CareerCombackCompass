import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Landing() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [username, setUsername] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 400); // Delay in milliseconds

    const storedUsername = localStorage.getItem("user_name");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    setUsername(null);
    setShowMenu(false);
    navigate("/");
  };
  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/services");
    } else navigate("/get_started");
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Navbar />
      <div
        className="relative flex-grow bg-cover bg-center flex items-start justify-start min-h-[550px]"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "100%", // or "50%", "100% auto", "200px 300px", etc.
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 "></div>

        {/* Content */}
        <div className="relative text-white max-w-xl px-6 text-left z-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Career Comeback
          </h1>
          {showParagraph && (
            <p className="mb-6 fade-in">
              Your journey to reclaim confidence, sharpen skills, and relaunch
              your career starts here.
            </p>
          )}

          <button
            onClick={handleGetStarted}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded cursor-pointer transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
