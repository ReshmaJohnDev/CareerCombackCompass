import React, { useState } from "react";

const stages = ["Wishlist", "Applied", "Interviewing", "Offer", "Rejected"];

export default function EditModal({ job, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...job });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(job.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="w-full border p-2 rounded"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="application_link"
            placeholder="Application Link"
            className="w-full border p-2 rounded"
            value={formData.application_link}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full border p-2 rounded"
            value={formData.status}
            onChange={handleChange}
          >
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            name="notes"
            placeholder="Notes"
            className="w-full border p-2 rounded"
            value={formData.notes}
            onChange={handleChange}
          />
          <input
            type="date"
            name="follow_up_date"
            className="w-full border p-2 rounded"
            value={formData.follow_up_date || ""}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button onClick={onClose} className="text-gray-500 px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
