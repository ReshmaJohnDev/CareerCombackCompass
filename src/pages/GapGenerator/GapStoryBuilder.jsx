// import React, { useState } from "react";
// import Navbar from "../Navbar";

// export default function GapStoryBuilder() {
//   const [showForm, setShowForm] = useState(true);
//   const [formData, setFormData] = useState({
//     reason: "",
//     duration: "",
//     activities: "",
//     skills: "",
//     career_goals: "",
//   });
//   const [gapStory, setGapStory] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGenerateGapHistory = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);
//     setGapStory("");

//     const prompt = `Write a professional and confident career gap summary based on the following info:
// - Reason: ${formData.reason}
// - Duration: ${formData.duration}
// - Activities during the gap: ${formData.activities}
// - Skills learned: ${formData.skills}
// - Career goals: ${formData.career_goals}`;

//     if (prompt.length < 250) {
//       setError(
//         "Please provide more detailed information (at least 250 characters)."
//       );
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("https://api.cohere.ai/v1/summarize", {
//         method: "POST",
//         headers: {
//           Authorization: "Bearer Sb0rtgyrTkozVTLu2AXHDcq9sizjGdkO3dtqjM8s", // replace with your real key
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: prompt,
//           length: "medium",
//           format: "paragraph",
//           model: "summarize-xlarge",
//           extractiveness: "auto",
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("API Error:", errorData);
//         setError(errorData.message || "Unknown API error");
//       } else {
//         const data = await res.json();
//         setGapStory(data.summary || "No summary returned.");
//         setShowForm(false); // switch view to show generated story
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setError(error.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center bg-black-100 bg-black dark:bg-gray-900 px-4">
//         <div className="w-80 bg-gradient-to-r from-gray-600 to-gray-400  rounded-2xl shadow-lg p-4 flex flex-col items-center dark:bg-gray-900 border mt-8 border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
//             Generate your Gap History
//           </h2>

//           {showForm ? (
//             <form
//               onSubmit={handleGenerateGapHistory}
//               className="bg-black p-4 rounded-xl shadow-sm space-y-3 text-sm"
//             >
//               <input
//                 type="text"
//                 value={formData.reason}
//                 onChange={(e) =>
//                   setFormData({ ...formData, reason: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Reason for career gap"
//                 required
//               />
//               <input
//                 type="text"
//                 value={formData.duration}
//                 onChange={(e) =>
//                   setFormData({ ...formData, duration: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Duration of the gap"
//                 required
//               />

//               <textarea
//                 value={formData.activities}
//                 onChange={(e) =>
//                   setFormData({ ...formData, activities: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Activities during the gap"
//                 required
//               />

//               <textarea
//                 value={formData.skills}
//                 onChange={(e) =>
//                   setFormData({ ...formData, skills: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Skills learned"
//                 required
//               />

//               <textarea
//                 value={formData.career_goals}
//                 onChange={(e) =>
//                   setFormData({ ...formData, career_goals: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Career goals"
//                 required
//               />
//               <div className="flex justify-center pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="btn bg-gray-800 text-white hover:bg-gray-700"
//                 >
//                   {loading ? (
//                     <>
//                       <span className="loading loading-spinner text-white mr-2"></span>
//                       <span className="text-white">Generating...</span>
//                     </>
//                   ) : (
//                     "Generate Gap History"
//                   )}
//                 </button>
//               </div>

//               {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//           ) : (
//             <div className="bg-gradient-to-r from-gray-600 to-gray-400 flex space-x-4">
//               <textarea
//                 className="
//     w-full
//     h-80
//     bg-black
//     text-white
//     px-8 py-2
//     border border-gray-300
//     rounded-lg
//     placeholder-gray-300
//     resize-none
//     focus:outline-none
//   "
//                 value={gapStory}
//                 onChange={(e) => setGapStory(e.target.value)}
//               />

//               <button
//                 onClick={() => setShowForm(true)}
//                 className="btn btn-soft"
//               >
//                 Edit Inputs
//               </button>
//               <button
//                 onClick={() => {
//                   const element = document.createElement("a");
//                   const file = new Blob([gapStory], { type: "text/plain" });
//                   element.href = URL.createObjectURL(file);
//                   element.download = "gap_story.txt";
//                   document.body.appendChild(element);
//                   element.click();
//                   document.body.removeChild(element);
//                 }}
//                 className="btn btn-soft"
//               >
//                 Download
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import Navbar from "../Navbar";
import { FiDownload, FiEdit } from "react-icons/fi";

export default function GapStoryBuilder() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    reason: "",
    duration: "",
    activities: "",
    skills: "",
    career_goals: "",
    past_experience: "",
    additional_info: "",
  });
  const [gapStory, setGapStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateGapHistory = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setGapStory("");

    const prompt = `Write a professional and confident career gap summary based on the following info:
- Reason: ${formData.reason}
- Duration: ${formData.duration}
- Activities during the gap: ${formData.activities}
- Skills learned: ${formData.skills}
- Career goals: ${formData.career_goals}
- Past experience: ${formData.past_experience}
- Additional information:${formData.additional_info}`;

    if (prompt.length < 250) {
      setError(
        "Please provide more detailed information (at least 250 characters)."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.cohere.ai/v1/summarize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: prompt,
          length: "medium",
          format: "paragraph",
          model: "summarize-xlarge",
          extractiveness: "auto",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        setError(errorData.message || "Unknown API error");
      } else {
        const data = await res.json();
        setGapStory(data.summary || "No summary returned.");
        setShowForm(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center">
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2">Career Gap Story Builder</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Generate a professional, confident summary to explain your career
            gap in interviews or resumes.
          </p>
        </div>

        <div className="w-full max-w-3xl bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl shadow-lg p-6">
          {showForm ? (
            <form
              onSubmit={handleGenerateGapHistory}
              className="space-y-4 animate-fade-in"
            >
              <input
                type="text"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Reason for career gap"
                required
              />
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Duration of the gap"
                required
              />
              <textarea
                value={formData.activities}
                onChange={(e) =>
                  setFormData({ ...formData, activities: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Activities during the gap"
                required
              />
              <textarea
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Skills learned"
                required
              />
              <textarea
                value={formData.career_goals}
                onChange={(e) =>
                  setFormData({ ...formData, career_goals: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Career goals"
                required
              />
              <textarea
                value={formData.past_experience}
                onChange={(e) =>
                  setFormData({ ...formData, past_experience: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Past experiences"
                required
              />
              <textarea
                value={formData.additional_inf}
                onChange={(e) =>
                  setFormData({ ...formData, additional_inf: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-black-500"
                placeholder="Additional information if any"
                required
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-gradient-to-r from-gray-600 to-black hover:from-black hover:to-gray text-white"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner text-white mr-2"></span>
                      Generating...
                    </>
                  ) : (
                    "Generate Gap History"
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-200 text-center mt-2">{error}</p>
              )}
            </form>
          ) : (
            <div className="animate-fade-in space-y-4">
              <textarea
                className="w-full h-80 bg-black text-white px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-300 resize-none"
                value={gapStory}
                onChange={(e) => setGapStory(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setShowForm(true)}
                  className="btn flex items-center gap-2 bg-gray-800  text-white  hover:bg-gray-700"
                >
                  <FiEdit /> Edit Inputs
                </button>
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([gapStory], { type: "text/plain" });
                    element.href = URL.createObjectURL(file);
                    element.download = "gap_story.txt";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="btn flex items-center gap-2 text-white  bg-gray-800 hover:bg-gray-700"
                >
                  <FiDownload /> Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
