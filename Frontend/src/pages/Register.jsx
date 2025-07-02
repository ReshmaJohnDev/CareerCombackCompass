import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AppContext } from "../context/AppContext";

export default function Register() {
  const { darkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      alert(response.data.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div
        className={`p-4 flex flex-col items-center justify-center px-4  min-h-screen transition-colors duration-500 ${
          darkMode
            ? "bg-black text-gray-100"
            : "bg-light-gradient text-gray-900"
        }`}
      >
        <div
          className={`w-full flex items-center max-w-xl bg-gray-800 p-8 rounded-xl shadow-md ${
            darkMode
              ? "bg-black text-gray-100"
              : "bg-light-gradient text-gray-900"
          }`}
        >
          <h3
            className={`text-2xl font-extrabold tracking-tight ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Create an Account
          </h3>
          <form onSubmit={handleRegister} className="space-y-5">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs  text-black border p-6">
              <label className="floating-label">
                <span>Your Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email"
                />
              </label>
              <label className="floating-label">
                <span>Username</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Username"
                />
              </label>
              <label className="floating-label">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Password"
                />
              </label>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button className="btn btn-neutral mt-4">Register</button>

              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
