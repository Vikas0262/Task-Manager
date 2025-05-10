import React from 'react';

function TaskItem({ task, darkMode, setSelectedTask, toggleTaskCompletion, deleteTask, categories }) {
  const category = categories.find(cat => cat.id === task.categoryId);

  return (
    <div
      className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => setSelectedTask(task)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTaskCompletion(task._id);
            }}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : darkMode
                ? 'border-gray-600'
                : 'border-gray-300'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div>
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {category && (
              <span className={`text-sm ${category.color}`}>
                {category.name}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task._id);
          }}
          className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TaskItem; 