// TaskCard.jsx
import React from "react";
import { Trash2 } from "lucide-react";
import {
  updateSubTaskStatus,
  updateTaskStatus,
  fetchTaskById,
  deleteTask,
} from "./util/Task";

const TaskCard = ({ task, onUpdate, onEdit, darkMode }) => {
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

  return (
    <div
      className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-xl shadow-lg cursor-pointer transition duration-300 hover:scale-[1.03] p-5 flex flex-col border border-gray-700 ${
        darkMode ? "bg-black text-gray-100" : "bg-light-gradient text-gray-900"
      }`}
    >
      <div className="flex justify-end space-x-2 relative">
        <button
          className="text-white-500 hover:text-red-500"
          onClick={() => onEdit(task)} // Just call onEdit passed from parent
          title="Edit Task"
        >
          ✏️
        </button>
        <button
          className="text-white hover:text-red-500"
          onClick={() => handleDeleteSubtask(task.id)}
          title="Delete Task"
        >
          <Trash2 className="w-5 h-5" />
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
    </div>
  );
};

export default TaskCard;
