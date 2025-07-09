import React, { useState, useRef, useEffect } from "react";

export default function EditTask({ task, onClose, onSave }) {
  const [editedTitle, setEditedTitle] = useState(task.title || "");
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );
  const [editedReminderEnabled, setEditedReminderEnabled] = useState(
    task.reminder_enabled || false
  );
  const [editedReminder, setEditedReminder] = useState(
    task.reminder ? task.reminder.slice(0, 16) : ""
  );
  const [editedSubtasks, setEditedSubtasks] = useState(task.subtasks || []);

  const inputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title || "");
      setEditedDescription(task.description || "");
      setEditedReminderEnabled(task.reminder_enabled || false);
      setEditedReminder(task.reminder ? task.reminder.slice(0, 16) : "");
      setEditedSubtasks(task.subtasks || []);
      inputRef.current?.focus();
    }
  }, [task]);

  const handleSubtaskChange = (index, newTitle) => {
    const updatedSubtasks = [...editedSubtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], title: newTitle };
    setEditedSubtasks(updatedSubtasks);
  };

  const handleSubtaskCompletedToggle = (index, completed) => {
    const updatedSubtasks = [...editedSubtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], completed };
    setEditedSubtasks(updatedSubtasks);
  };

  const handleDeleteSubtask = (index) => {
    setEditedSubtasks(editedSubtasks.filter((_, i) => i !== index));
  };

  const addNewSubtask = () => {
    setEditedSubtasks([...editedSubtasks, { id: null,title: "", completed: false }]);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert("Task title cannot be empty");
      return;
    }

    const updatedTask = {
      ...task,
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      reminder_enabled: editedReminderEnabled,
      reminder:
        editedReminderEnabled && editedReminder
          ? new Date(editedReminder).toISOString()
          : null,
      subtasks: editedSubtasks
        .filter((st) => st.title.trim() !== "")
        .map((st) => ({
          ...st,
          title: st.title.trim(),
        })),
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-lg text-gray-800 space-y-4 min-h-[400px] transition-transform transform scale-100 duration-300">
        <h2 className="text-lg font-semibold">Edit Task</h2>

        <label className="flex flex-col">
          <span>Title</span>
          <input
            ref={inputRef}
            className="border px-2 py-1 rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col">
          <span>Description</span>
          <textarea
            className="border px-2 py-1 rounded"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={editedReminderEnabled}
            onChange={(e) => setEditedReminderEnabled(e.target.checked)}
          />
          <span>Enable Reminder</span>
        </label>

        <label className="flex flex-col">
          <span>Reminder</span>
          <input
            type="datetime-local"
            className="border px-2 py-1 rounded"
            value={editedReminder}
            onChange={(e) => setEditedReminder(e.target.value)}
            disabled={!editedReminderEnabled}
          />
        </label>

        <div className="flex flex-col space-y-2">
          <span className="font-medium">Subtasks</span>
          {editedSubtasks.map((sub, i) => (
            <div key={i} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={sub.completed || false}
                onChange={(e) =>
                  handleSubtaskCompletedToggle(i, e.target.checked)
                }
                className="accent-gray-600"
              />
              <input
                className="border px-2 py-1 rounded flex-grow"
                value={sub.title}
                onChange={(e) => handleSubtaskChange(i, e.target.value)}
              />
              <button
                onClick={() => handleDeleteSubtask(i)}
                className="text-red-600 font-bold"
                title="Delete Subtask"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addNewSubtask}
            className="text-blue-600 text-sm hover:underline self-start"
          >
            + Add Subtask
          </button>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSaveEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
