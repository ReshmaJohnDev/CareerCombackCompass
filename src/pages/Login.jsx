import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { access_token, name } = response.data;
      localStorage.setItem("token", access_token); // save token in browser
      localStorage.setItem("user_name", name);

      navigate("/"); // redirect after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full flex items-center max-w-xl bg-gray-800 p-8 rounded-xl shadow-md">
          <h3 className="text-3xl font-bold text-center text-white mb-6">
            Login to Your Account
          </h3>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Daisy UI */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs  text-black border p-6">
              <label className="floating-label">
                <span>Your Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-md"
                  placeholder="mail@site.com"
                />
              </label>

              <label className="floating-label">
                <span>Password</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Password"
                />
              </label>

              <button className="btn btn-neutral mt-4">Login</button>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register
                </a>
              </p>
            </fieldset>
            {/* Daisy UI */}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
