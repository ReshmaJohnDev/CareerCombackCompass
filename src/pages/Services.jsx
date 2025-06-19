import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Services() {
  const features = [
    {
      title: "Gap Story Builder",
      description: "Craft a compelling narrative of your career gap.",
      path: "/gap-story",
      img: "/career_gap.png",
    },
    {
      title: "Action Planner",
      description: "Set goals, track progress, and receive reminders.",
      path: "/planner",
      img: "/action_plan.png",
    },
    {
      title: "Job Application Tracker",
      description: "Track jobs, statuses, and follow-ups easily.",
      path: "/job-tracker",
      img: "/job_tracker.png",
    },
    {
      title: "Interview Reflection Log",
      description: "Capture lessons and feedback from interviews.",
      path: "/interview-log",
      img: "/reflection.png",
    },
    {
      title: "Career Advice Chatbot",
      description: "Get career advice and prep support in real time.",
      path: "/chatbot",
      img: "/chatbot.png",
    },
    {
      title: "Career Returnee Resources",
      description: "Browse events, returnships, and curated links.",
      path: "/resources",
      img: "/resources.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen p-6 text-white bg-gradient-to-br from-black to-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

        <div className="carousel w-full max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const prev = (idx - 1 + features.length) % features.length;
            const next = (idx + 1) % features.length;
            return (
              <div
                key={idx}
                id={`slide${idx}`}
                className="carousel-item relative w-full"
              >
                {/* Image with overlay */}
                <Link to={feature.path}>
                  <div className="relative w-full   flex justify-between">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="bg-opacity-50 flex flex-col  bg-white justify-center p-6 text-black">
                      <h2 className="text-2xl font-bold">{feature.title}</h2>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                  </div>
                </Link>

                {/* Navigation Arrows */}
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={() =>
                      document.getElementById(`slide${prev}`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      })
                    }
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() =>
                      document.getElementById(`slide${next}`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      })
                    }
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
