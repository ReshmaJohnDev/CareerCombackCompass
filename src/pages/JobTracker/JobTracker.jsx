// import React, { useState, useEffect } from "react";
// import { DndContext, closestCenter } from "@dnd-kit/core";
// import api from "../../api";
// import NavBar from "../Navbar";
// import { KanbanColumn } from "./KanbanColumn";
// import Footer from "../Footer";
// const columnsOrder = [
//   "Wish List",
//   "Applied",
//   "Interviewing",
//   "Offer",
//   "Rejected",
// ];

// export default function JobTracker() {
//   const [jobs, setJobs] = useState([]);
//   const [filter, setFilter] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     const fetchJobs = async () => {
//       try {
//         const res = await api.get("/jobs/jobs");
//         setJobs(res.data);
//       } catch (error) {
//         console.error("Failed to fetch jobs:", error);
//         setJobs([]); // Fallback to empty state on error
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const jobId = active.id;
//     const newStatus = over.id;
//     setJobs((prev) =>
//       prev.map((job) =>
//         job.id === jobId ? { ...job, status: newStatus } : job
//       )
//     );
//   };

//   const filteredJobs = jobs.filter((job) =>
//     `${job.title || ""} ${job.company || ""}`
//       .toLowerCase()
//       .includes(filter.toLowerCase().trim())
//   );

//   // Parent component
//   const handleUpdateJob = async (job_id, updatedData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.put(`/jobs/jobs/${job_id}`, updatedData);
//       const updatedJob = response.data;

//       setJobs((prevJobs) =>
//         prevJobs.map((job) => (job.id === job_id ? updatedJob : job))
//       );
//     } catch (error) {
//       console.error("Error updating job:", error);
//       setError(error.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNewJob = async (newJob) => {
//     try {
//       const response = await api.post("/jobs/jobs/", newJob);
//       const createdJob = response.data;
//       setJobs((prevJobs) => [...prevJobs, createdJob]);
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   const handleDeleteJob = async (job_id) => {
//     try {
//       await api.delete(`/jobs/jobs/${job_id}`);

//       setJobs((prevJobs) => prevJobs.filter((job) => job.id !== job_id));
//     } catch (error) {
//       console.error("Error deleting job:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <NavBar />
//       <div className="min-h-screen p-6 text-white bg-gradient-to-br from-black to-gray-700">
//         <div className="flex justify-between items-center p-4">
//           <h1 className="text-2xl font-bold">Job Hunt</h1>
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="Search saved jobs"
//               className="px-3 py-1 border rounded"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//           </div>
//         </div>

//         <DndContext
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <div className="flex overflow-auto gap-4 p-4">
//             {columnsOrder.map((column) => (
//               <KanbanColumn
//                 key={column}
//                 id={column}
//                 title={column}
//                 jobs={filteredJobs.filter((job) => job.status === column)}
//                 onAddJob={handleAddNewJob}
//                 onUpdateJob={handleUpdateJob}
//                 onDeleteJob={handleDeleteJob}
//               />
//             ))}
//           </div>
//         </DndContext>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import api from "../../api";
import NavBar from "../Navbar";
import { KanbanColumn } from "./KanbanColumn";
import Footer from "../Footer";

const columnsOrder = [
  "Wish List",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
        setError(error.message || "Failed to load jobs");
        // fallback to empty on error
      } finally {
        setLoading(false); // hide loading message
      }
    };
    fetchJobs();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id;
    const newStatus = over.id;
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title || ""} ${job.company || ""}`
      .toLowerCase()
      .includes(filter.toLowerCase().trim())
  );

  const handleUpdateJob = async (job_id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/jobs/jobs/${job_id}`, updatedData);
      const updatedJob = response.data;
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === job_id ? updatedJob : job))
      );
    } catch (error) {
      console.error("Error updating job:", error);
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewJob = async (newJob) => {
    try {
      const response = await api.post("/jobs/jobs/", newJob);
      const createdJob = response.data;
      setJobs((prevJobs) => [...prevJobs, createdJob]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleDeleteJob = async (job_id) => {
    try {
      await api.delete(`/jobs/jobs/${job_id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== job_id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black to-gray-800 text-white">
      <NavBar />
      <main className="flex-1 p-6 max-w-full overflow-x-auto">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Job Hunt Tracker
          </h1>
          <input
            type="text"
            placeholder="Search jobs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-64 px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition"
          />
        </header>

        {loading && (
          <p className="text-center text-gray-400 mb-4">Loading jobs...</p>
        )}
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
            {columnsOrder.map((column) => (
              <KanbanColumn
                key={column}
                id={column}
                title={column}
                jobs={filteredJobs.filter((job) => job.status === column)}
                onAddJob={handleAddNewJob}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
                loading={loading}
              />
            ))}
          </div>
        </DndContext>
      </main>
      <Footer />
    </div>
  );
}
