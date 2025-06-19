import React from "react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Start Your Comeback Journey</h2>
      <p className="mt-2 text-gray-600">
        Track applications, plan actions, reflect on interviews, and more.
      </p>
      <div className="mt-6 space-x-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
