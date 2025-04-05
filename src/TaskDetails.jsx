import React from 'react';
import { formatDate, getPriorityColor, getCategoryIcon, getCategoryColor } from './utils';

function TaskDetails({ darkMode, selectedTask, setSelectedTask, toggleTaskCompletion, deleteTask, toggleSubtaskCompletion, categories }) {
  if (!selectedTask) return null;

  const category = categories.find(cat => cat.id === selectedTask.categoryId);

  return (
    <aside className={`w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex flex-col`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="font-bold">Task Details</h3>
        <button
          className={`w-8 h-8 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}
          onClick={() => setSelectedTask(null)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedTask.completed
                ? 'bg-blue-500 border-blue-500 text-white'
                : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
            }`}
            onClick={() => toggleTaskCompletion(selectedTask.id)}
          >
            {selectedTask.completed && <i className="fas fa-check text-xs"></i>}
          </button>

          <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedTask.priority)} text-white`}>
            {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
          </div>
        </div>

        <h2 className={`text-xl font-bold mb-2 ${selectedTask.completed ? 'line-through text-gray-500' : ''}`}>
          {selectedTask.title}
        </h2>

        <div className="mb-4">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getCategoryColor(selectedTask.categoryId)} bg-opacity-20`}>
            <i className={`fas ${getCategoryIcon(selectedTask.categoryId)} mr-1`}></i>
            <span>{category?.name || 'Uncategorized'}</span>
          </div>
        </div>

        <div className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>{selectedTask.description || 'No description provided.'}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Due Date</h4>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <i className="far fa-calendar-alt mr-2"></i>
            {formatDate(selectedTask.dueDate)}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Subtasks</h4>
          {selectedTask.subtasks.length > 0 ? (
            <ul className="space-y-2">
              {selectedTask.subtasks.map(subtask => (
                <li key={subtask.id} className="flex items-center">
                  <button
                    className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${
                      subtask.completed
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
                    }`}
                    onClick={() => toggleSubtaskCompletion(selectedTask.id, subtask.id)}
                  >
                    {subtask.completed && <i className="fas fa-check text-xs"></i>}
                  </button>
                  <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                    {subtask.title}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No subtasks added.</p>
          )}
        </div>

        {selectedTask.collaborators.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-2">Collaborators</h4>
            <div className="flex -space-x-2">
              {selectedTask.collaborators.map((collaborator, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium border-2 border-white"
                  title={collaborator}
                >
                  {collaborator.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors"
          onClick={() => {
            deleteTask(selectedTask.id);
            setSelectedTask(null);
          }}
        >
          <i className="fas fa-trash"></i>
          <span>Delete Task</span>
        </button>
      </div>
    </aside>
  );
}

export default TaskDetails;