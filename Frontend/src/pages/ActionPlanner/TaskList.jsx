import React, { useEffect, useState, useRef } from "react";
import TaskCard from "./TaskCard";
import EditTask from "./EditTask"; // Make sure this is correctly imported
import { fetchTasks, createTasks, updateTask } from "./util/Task";

export default function TaskList({ darkMode }) {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null); // ✅ for edit modal

  const formRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
    reminder: "",
    reminder_email: "",
    reminder_enabled: false,
    subtasks: [],
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks", err);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      await createTasks(formData);
      setFormData({
        title: "",
        description: "",
        completed: false,
        reminder: "",
        reminder_email: "",
        reminder_enabled: false,
        subtasks: [],
      });
      setShowForm(false);
      await loadTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to add task.");
    }
  };

  const handleAddSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "", completed: false }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...formData.subtasks];
    updatedSubtasks[index].title = value;
    setFormData({ ...formData, subtasks: updatedSubtasks });
  };

  // ✅ EDIT HANDLERS
  const handleEdit = (task) => {
    setShowForm(false); // Hide add form
    setEditTask(task);
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setEditTask(null);
      await loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Failed to save task changes.");
    }
  };

  return (
    <div
      className={`p-4 flex flex-col items-center min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-black text-gray-100" : "bg-light-gradient text-gray-900"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      <button
        onClick={() => {
          setEditTask(null); // Hide edit modal
          setShowForm(!showForm); // Toggle add form
        }}
        className={`font-semibold mb-4 px-6 py-2 rounded-xl shadow-lg transition duration-300 hover:scale-[1.03] ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
            : "bg-light-gradient text-black"
        }`}
      >
        {showForm ? "Cancel" : "Add Task"}
      </button>

      {showForm && (
        <form
          ref={formRef}
          onSubmit={handleAddTask}
          className={`p-5 rounded-xl shadow-inner space-y-4 text-sm mb-8 w-full max-w-md
    ${
      darkMode
        ? "bg-gray-800 text-gray-300"
        : "bg-white text-gray-800 border border-gray-200"
    }`}
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <input
            type="datetime-local"
            value={formData.reminder}
            onChange={(e) =>
              setFormData({ ...formData, reminder: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Reminder Email"
            required
            value={formData.reminder_email}
            onChange={(e) =>
              setFormData({ ...formData, reminder_email: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.reminder_enabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reminder_enabled: e.target.checked,
                })
              }
            />
            Enable Reminder
          </label>

          {/* Subtasks Section */}
          <div>
            <h2 className="font-semibold mb-2">Subtasks</h2>
            {formData.subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Subtask ${index + 1}`}
                  value={subtask.title}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                  className="text-gray-400 hover:text-gray-500 font-semibold ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubtask}
              className="text-gray-400 hover:text-gray-500 font-semibold"
            >
              + Add Subtask
            </button>
          </div>

          <button
            type="submit"
            className="text-gray-400 hover:text-gray-500 font-semibold"
          >
            Add Task
          </button>
        </form>
      )}

      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 w-full max-w-md text-center">
          {error}
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-gray-500">No tasks available.</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={loadTasks}
              onEdit={handleEdit} // ✅ pass handler
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      {/* ✅ Render edit modal globally to prevent overlap flicker */}
      {editTask && (
        <EditTask
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}
