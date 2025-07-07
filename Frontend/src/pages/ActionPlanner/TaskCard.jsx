import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  updateSubTaskStatus,
  updateTaskStatus,
  fetchTaskById,
  deleteTask,
  updateTask,
} from "./util/Task";
import EditTask from "./EditTask";

const TaskCard = ({ task, onUpdate, darkMode }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const completedSubtasksCount = task.subtasks.filter(
    (st) => st.completed
  ).length;

  const handleSubtaskToggle = async (subtaskId, currentStatus) => {
    try {
      await updateSubTaskStatus(subtaskId, !currentStatus);
      const updatedTask = await fetchTaskById(task.id);
      const allCompleted = updatedTask.subtasks.every((st) => st.completed);
      await updateTaskStatus(task.id, allCompleted);
      onUpdate?.();
    } catch (err) {
      console.error("Error toggling subtask:", err);
    }
  };

  const handleTaskToggle = async () => {
    try {
      const newStatus = !task.completed;
      await updateTaskStatus(task.id, newStatus);
      onUpdate?.();
    } catch (err) {
      console.error("Error toggling task status:", err);
    }
  };

  const handleDeleteSubtask = async (taskId) => {
    try {
      await deleteTask(taskId);
      onUpdate?.();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      onUpdate?.();
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div
      className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-xl shadow-lg cursor-pointer transition duration-300 hover:scale-[1.03] p-5 flex flex-col border border-gray-700 ${
        darkMode ? "bg-black text-gray-100" : "bg-light-gradient text-gray-900"
      }`}
    >
      <div className="flex justify-end space-x-2 relative">
        <button
          className="text-white-500 hover:text-red-500"
          onClick={() => setShowDeleteAlert(true)}
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          className="text-white hover:text-blue-400"
          onClick={() => setShowEditModal(true)}
          title="Edit Task"
        >
          ✏️
        </button>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h2
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {task.title}
          </h2>
          {task.subtasks.length === 0 ? (
            <button
              onClick={handleTaskToggle}
              className={`mt-1 text-xs px-2 py-1 rounded-full font-medium ${
                task.completed
                  ? "bg-green-600 text-white"
                  : "bg-yellow-400 text-gray-800 animate-pulse"
              }`}
            >
              {task.completed ? "Completed" : "Mark as Done"}
            </button>
          ) : (
            <>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full transition-all duration-300 ${
                    task.completed
                      ? "bg-green-500"
                      : "bg-yellow-400 animate-pulse"
                  }`}
                  style={{
                    width: `${
                      (completedSubtasksCount / task.subtasks.length) * 100
                    }%`,
                  }}
                />
              </div>
              <p
                className={`text-xs text-right mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {task.completed ? "Completed" : "In Progress"}
              </p>
            </>
          )}
        </div>
      </div>

      {task.description && (
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {task.description}
        </p>
      )}

      <div className="mt-4">
        <p
          className={`text-sm font-medium mb-1 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Subtasks ({completedSubtasksCount}/{task.subtasks.length})
        </p>
        <ul
          className={`space-y-2 text-sm ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {task.subtasks.map((subtask) => (
            <li key={subtask.id} className="flex items-center">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() =>
                  handleSubtaskToggle(subtask.id, subtask.completed)
                }
                className="mr-2 accent-gray-500"
              />
              <span
                className={
                  subtask.completed
                    ? `${
                        darkMode ? "text-green-300" : "text-green-800"
                      } line-through`
                    : `${darkMode ? "text-gray-200" : "text-gray-800"}`
                }
              >
                {subtask.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div
            className={`bg-${
              darkMode ? "gray-800" : "white"
            } p-6 rounded-xl max-w-sm w-full shadow-lg ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  handleDeleteSubtask(task.id);
                  setShowDeleteAlert(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteAlert(false)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  darkMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <EditTask
          task={task}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TaskCard;
