import React from 'react';

function TaskDetails({
  selectedTask,
  setSelectedTask,
  darkMode,
  categories,
  toggleSubtaskCompletion,
  deleteTask
}) {
  if (!selectedTask) return null;

  const category = categories.find(cat => cat.id === selectedTask.categoryId);

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{selectedTask.title}</h2>
        <button
          onClick={() => setSelectedTask(null)}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          ✕
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Category</p>
        <p className="font-medium">{category?.name || 'Uncategorized'}</p>
      </div>

      {selectedTask.description && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Description</p>
          <p>{selectedTask.description}</p>
        </div>
      )}

      {selectedTask.subtasks && selectedTask.subtasks.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Subtasks</p>
          <div className="space-y-2">
            {selectedTask.subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => toggleSubtaskCompletion(selectedTask.id, index)}
                  className="rounded"
                />
                <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => deleteTask(selectedTask.id)}
          className={`px-4 py-2 rounded ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default TaskDetails; 