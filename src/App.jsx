import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import Landing from "./pages/Landing";
import GapStoryBuilder from "./pages/GapGenerator/GapStoryBuilder";
import ActionPlanner from "./pages/ActionPlanner";
import JobTracker from "./pages/JobTracker/JobTracker";
import InterviewLog from "./pages/InterviewLog";
import Chatbot from "./pages/Chatbot";
import Resources from "./pages/Resources";
import "./index.css";
import GetStarted from "./pages/GetStarted";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="services" element={<Services />} />
        <Route path="/gap-story" element={<GapStoryBuilder />} />
        <Route path="/planner" element={<ActionPlanner />} />
        <Route path="/job-tracker" element={<JobTracker />} />
        <Route path="/interview-log" element={<InterviewLog />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/get_started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
