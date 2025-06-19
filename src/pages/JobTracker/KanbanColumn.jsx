// import React, { useState } from "react";

// const statusOptions = [
//   "Wish List",
//   "Applied",
//   "Interviewing",
//   "Offer",
//   "Rejected",
// ];

// export const KanbanColumn = ({
//   id,
//   title,
//   jobs = [],
//   onAddJob,
//   onUpdateJob,
//   onDeleteJob,
// }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     applied_date: "",
//     application_link: "",
//     notes: "",
//     follow_up_date: "",
//   });
//   const [editingJobId, setEditingJobId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [expandedJobId, setExpandedJobId] = useState(null);
//   const [jobToDelete, setJobToDelete] = useState(null);
//   const [showDeleteAlert, setShowDeleteAlert] = useState(false);

//   const handleAddSubmit = (event, status) => {
//     event.preventDefault();
//     const newJob = {
//       ...formData,
//       status: id,
//       application_link: formData.application_link || null,
//       notes: formData.notes || null,
//       follow_up_date: formData.follow_up_date || null,
//     };
//     onAddJob(newJob);
//     setFormData({
//       title: "",
//       company: "",
//       applied_date: "",
//       application_link: "",
//       notes: "",
//       follow_up_date: "",
//     });
//     setShowForm(false);
//   };

//   const handleEditSubmit = (event, status) => {
//     event.preventDefault();
//     const updatedData = {
//       ...editFormData,
//       application_link: editFormData.application_link || null,
//       notes: editFormData.notes || null,
//       follow_up_date: editFormData.follow_up_date || null,
//     };
//     onUpdateJob(editingJobId, updatedData);
//     setEditingJobId(null);
//     setEditFormData({});
//   };

//   return (
//     <div className="w-80 bg-white rounded-2xl shadow-lg p-4 flex flex-col dark:bg-gray-900 border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
//         {title}
//       </h2>

//       <div className="flex flex-col gap-4 flex-1">
//         {jobs.map((job) =>
//           editingJobId === job.id ? (
//             <form
//               key={job.id}
//               onSubmit={(event) => handleEditSubmit(event, job.status)}
//               className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-3 text-sm"
//             >
//               <input
//                 type="text"
//                 value={editFormData.title}
//                 onChange={(e) =>
//                   setEditFormData({ ...editFormData, title: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none placeholder-gray-500"
//                 placeholder="Title"
//                 required
//               />
//               <input
//                 type="text"
//                 value={editFormData.company}
//                 onChange={(e) =>
//                   setEditFormData({ ...editFormData, company: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-500"
//                 placeholder="Company"
//                 required
//               />
//               <select
//                 value={editFormData.status}
//                 onChange={(e) =>
//                   setEditFormData({ ...editFormData, status: e.target.value })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300"
//                 required
//               >
//                 <option value="" disabled>
//                   Select status
//                 </option>
//                 {statusOptions.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="date"
//                 value={editFormData.applied_date}
//                 placeholder="Applied Data"
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     applied_date: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-500"
//                 required
//               />
//               <input
//                 type="url"
//                 value={editFormData.application_link}
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     application_link: e.target.value,
//                   })
//                 }
//                 placeholder="Application Link"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-500"
//               />
//               <textarea
//                 value={editFormData.notes}
//                 onChange={(e) =>
//                   setEditFormData({ ...editFormData, notes: e.target.value })
//                 }
//                 placeholder="Notes"
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-500"
//               />
//               <input
//                 type="date"
//                 value={editFormData.follow_up_date}
//                 placeholder="Followup Data"
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     follow_up_date: e.target.value,
//                   })
//                 }
//                 className="w-full px-3 py-2 rounded-lg border border-gray-300 placeholder-gray-500"
//               />
//               <div className="flex justify-between pt-2">
//                 <button type="submit" className="text-blue-600 hover:underline">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="text-red-500 hover:underline"
//                   onClick={() => setEditingJobId(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div
//               key={job.id}
//               className="bg-gray-900 text-white p-3 rounded-xl shadow-md cursor-pointer transition-colors duration-200 hover:bg-gray-800"
//               onClick={() =>
//                 setExpandedJobId(expandedJobId === job.id ? null : job.id)
//               }
//             >
//               <h3 className="font-semibold text-white-800 dark:text-white">
//                 {job.title}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-300">
//                 {job.company}
//               </p>
//               <p className="text-xs text-gray-400">
//                 Applied Date: {job.applied_date}
//               </p>

//               {expandedJobId === job.id && (
//                 <div className="mt-2 text-sm space-y-1 text-gray-700 dark:text-gray-300">
//                   {job.application_link && (
//                     <p>
//                       <strong>Link:</strong>{" "}
//                       <a
//                         href={job.application_link}
//                         className="text-blue-500 underline"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {job.application_link}
//                       </a>
//                     </p>
//                   )}
//                   {job.notes && (
//                     <p>
//                       <strong>Notes:</strong> {job.notes}
//                     </p>
//                   )}
//                   {job.follow_up_date && (
//                     <p>
//                       <strong>Follow Up:</strong> {job.follow_up_date}
//                     </p>
//                   )}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setEditingJobId(job.id);
//                       setEditFormData({
//                         title: job.title,
//                         company: job.company,
//                         status: job.status,
//                         applied_date: job.applied_date || "",
//                         application_link: job.application_link || "",
//                         notes: job.notes || "",
//                         follow_up_date: job.follow_up_date || "",
//                       });
//                     }}
//                     className="text-blue-500 hover:underline pt-2"
//                   >
//                     ✎ Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setJobToDelete(job.id);
//                       setShowDeleteAlert(true);
//                     }}
//                     className="text-red-500 hover:underline ml-4"
//                   >
//                     🗑 Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           )
//         )}
//       </div>

//       {showForm ? (
//         <form className="mt-4 space-y-3 text-sm">
//           <input
//             type="text"
//             placeholder="Job Title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Company"
//             value={formData.company}
//             onChange={(e) =>
//               setFormData({ ...formData, company: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//             required
//           />
//           <input
//             type="date"
//             placeholder="Applied Date"
//             value={formData.applied_date}
//             onChange={(e) =>
//               setFormData({ ...formData, applied_date: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//             required
//           />
//           <input
//             type="url"
//             placeholder="Application Link"
//             value={formData.application_link}
//             onChange={(e) =>
//               setFormData({ ...formData, application_link: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//           />
//           <textarea
//             placeholder="Notes"
//             value={formData.notes}
//             onChange={(e) =>
//               setFormData({ ...formData, notes: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//           />
//           <input
//             type="date"
//             placeholder="Follow Up Date"
//             value={formData.follow_up_date}
//             onChange={(e) =>
//               setFormData({ ...formData, follow_up_date: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500"
//           />
//           <div className="flex justify-between">
//             <button
//               onClick={(event) => handleAddSubmit(event, id)}
//               type="submit"
//               className="text-blue-600 hover:underline"
//             >
//               Add
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="text-red-500 hover:underline"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <button
//           onClick={() => setShowForm(true)}
//           className="btn text-white bg-gray-500 hover:bg-gray-600 mt-4"
//         >
//           Add Job
//         </button>
//       )}
//       {showDeleteAlert && (
//         <>
//           <div role="alert" className="alert alert-success alert-soft">
//             <span>Your Job has been deleted!</span>
//           </div>
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Confirm Delete
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//                 Are you sure you want to delete this job?
//               </p>
//               <div className="flex justify-end mt-4 gap-4">
//                 <button
//                   onClick={() => {
//                     onDeleteJob(jobToDelete);
//                     setShowDeleteAlert(false);
//                   }}
//                   className="text-red-600 hover:underline font-medium"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteAlert(false)}
//                   className="text-gray-600 hover:underline font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";

const statusOptions = [
  "Wish List",
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

export const KanbanColumn = ({
  id,
  title,
  jobs = [],
  onAddJob,
  onUpdateJob,
  onDeleteJob,
  loading,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    applied_date: "",
    application_link: "",
    notes: "",
    follow_up_date: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleAddSubmit = (event) => {
    event.preventDefault();
    // Required fields validation handled by HTML required attr
    const newJob = {
      ...formData,
      status: id,
      application_link: formData.application_link || null,
      notes: formData.notes || null,
      follow_up_date: formData.follow_up_date || null,
    };
    onAddJob(newJob);
    setFormData({
      title: "",
      company: "",
      applied_date: "",
      application_link: "",
      notes: "",
      follow_up_date: "",
    });
    setShowForm(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      ...editFormData,
      application_link: editFormData.application_link || null,
      notes: editFormData.notes || null,
      follow_up_date: editFormData.follow_up_date || null,
    };
    onUpdateJob(editingJobId, updatedData);
    setEditingJobId(null);
    setEditFormData({});
  };

  return (
    <div className="w-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 flex flex-col border border-gray-700">
      <h2 className="text-xl font-extrabold text-white text-center mb-5">
        {title}
      </h2>
      {loading ? (
        <div className="text-white text-center py-10">Loading...</div>
      ) : (
        <div className="flex flex-col gap-5 flex-1 overflow-auto max-h-[70vh]">
          {jobs.map((job) =>
            editingJobId === job.id ? (
              <form
                key={job.id}
                onSubmit={handleEditSubmit}
                className="bg-gray-800 p-5 rounded-xl shadow-inner space-y-4 text-sm text-gray-300"
              >
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                  placeholder="Job Title"
                  required
                />
                <input
                  type="text"
                  value={editFormData.company}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      company: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                  placeholder="Company"
                  required
                />
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600"
                  required
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={editFormData.applied_date}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      applied_date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                  required
                />
                <input
                  type="url"
                  value={editFormData.application_link}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      application_link: e.target.value,
                    })
                  }
                  placeholder="Application Link"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                />
                <textarea
                  value={editFormData.notes}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, notes: e.target.value })
                  }
                  placeholder="Notes"
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                />
                <input
                  type="date"
                  value={editFormData.follow_up_date}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      follow_up_date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                />
                <div className="flex justify-between pt-3">
                  <button
                    type="submit"
                    className="text-blue-400 hover:text-blue-500 font-semibold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-600 font-semibold"
                    onClick={() => setEditingJobId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div
                key={job.id}
                className="bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4 rounded-xl shadow-lg cursor-pointer transition duration-300 hover:scale-[1.03]"
                onClick={() =>
                  setExpandedJobId(expandedJobId === job.id ? null : job.id)
                }
              >
                <h3 className="font-semibold text-lg text-white truncate">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">{job.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Applied: {job.applied_date}
                </p>

                {expandedJobId === job.id && (
                  <div className="mt-3 text-sm space-y-1 text-gray-300">
                    {job.application_link && (
                      <p>
                        <strong>Link: </strong>
                        <a
                          href={job.application_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline break-all"
                        >
                          {job.application_link}
                        </a>
                      </p>
                    )}
                    {job.notes && (
                      <p>
                        <strong>Notes: </strong>
                        {job.notes}
                      </p>
                    )}
                    {job.follow_up_date && (
                      <p>
                        <strong>Follow Up: </strong>
                        {job.follow_up_date}
                      </p>
                    )}
                    <div className="pt-2 flex gap-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingJobId(job.id);
                          setEditFormData({
                            title: job.title,
                            company: job.company,
                            status: job.status,
                            applied_date: job.applied_date || "",
                            application_link: job.application_link || "",
                            notes: job.notes || "",
                            follow_up_date: job.follow_up_date || "",
                          });
                        }}
                        className="text-blue-400 hover:text-blue-500 font-semibold"
                      >
                        ✎ Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setJobToDelete(job.id);
                          setShowDeleteAlert(true);
                        }}
                        className="text-red-500 hover:text-red-600 font-semibold"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

      {showForm ? (
        <form
          onSubmit={handleAddSubmit}
          className="mt-6 space-y-4 text-sm bg-gray-800 p-5 rounded-xl shadow-inner"
        >
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
            required
          />
          <input
            type="date"
            placeholder="Applied Date"
            value={formData.applied_date}
            onChange={(e) =>
              setFormData({ ...formData, applied_date: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
            required
          />
          <input
            type="url"
            placeholder="Application Link"
            value={formData.application_link}
            onChange={(e) =>
              setFormData({ ...formData, application_link: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <input
            type="date"
            placeholder="Follow Up Date"
            value={formData.follow_up_date}
            onChange={(e) =>
              setFormData({ ...formData, follow_up_date: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <div className="flex justify-between pt-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold"
            >
              Add Job
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 bg-gradient-to-r from-white-600 to-gray-600 hover:from-gray-600 hover:to-white-600 text-white py-2 rounded-xl font-bold shadow-md transition duration-300"
        >
          + Add Job
        </button>
      )}

      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full shadow-lg text-white">
            <p className="mb-4">Are you sure you want to delete this job?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  onDeleteJob(jobToDelete);
                  setShowDeleteAlert(false);
                  setJobToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
