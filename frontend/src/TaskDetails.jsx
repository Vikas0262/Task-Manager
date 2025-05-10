import React from 'react';
import { formatDate, getPriorityColor, getCategoryIcon, getCategoryColor } from './utils';

function TaskDetails({ darkMode, selectedTask, setSelectedTask, toggleTaskCompletion, deleteTask, toggleSubtaskCompletion, categories }) {
  if (!selectedTask) return null;

  const category = categories.find(cat => cat.id === selectedTask.categoryId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <aside className={`w-[500px] max-h-[90vh] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-xl font-bold">Task Details</h3>
          <button
            className={`w-10 h-10 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center transition-colors duration-200`}
            onClick={() => setSelectedTask(null)}
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                selectedTask.completed
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
              onClick={() => toggleTaskCompletion(selectedTask._id)}
            >
              {selectedTask.completed && <i className="fas fa-check text-sm"></i>}
            </button>

            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(selectedTask.priority)} text-white shadow-sm`}>
              {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
            </div>
          </div>

          <h2 className={`text-2xl font-bold mb-4 ${selectedTask.completed ? 'line-through text-gray-500' : ''}`}>
            {selectedTask.title}
          </h2>

          <div className="mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(selectedTask.categoryId)} bg-opacity-20 shadow-sm`}>
              <i className={`fas ${getCategoryIcon(selectedTask.categoryId)} mr-2`}></i>
              <span>{category?.name || 'Uncategorized'}</span>
            </div>
          </div>

          <div className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedTask.description || 'No description provided.'}
            </p>
          </div>

          <div className="mb-8">
            <h4 className="font-medium mb-3 text-lg">Due Date</h4>
            <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <i className="far fa-calendar-alt mr-3 text-xl"></i>
              <span className="text-lg">{formatDate(selectedTask.dueDate)}</span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-medium mb-3 text-lg">Subtasks</h4>
            {selectedTask?.subtasks?.length > 0 ? (
              <ul className="space-y-3">
                {selectedTask?.subtasks?.map(subtask => (
                  <li key={subtask.id} className="flex items-center p-3 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-colors duration-200">
                    <button
                      className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 transition-all duration-200 ${
                        subtask.completed
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
                      }`}
                      onClick={() => toggleSubtaskCompletion(selectedTask._id, subtask.id)}
                    >
                      {subtask.completed && <i className="fas fa-check text-xs"></i>}
                    </button>
                    <span className={`text-lg ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subtask.title}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>No subtasks added.</p>
            )}
          </div>

          {selectedTask?.collaborators?.length > 0 && (
            <div className="mb-8">
              <h4 className="font-medium mb-3 text-lg">Collaborators</h4>
              <div className="flex -space-x-3">
                {selectedTask.collaborators.map((collaborator, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white border-2 border-white shadow-md"
                    title={collaborator}
                  >
                    {collaborator.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-[1.02] shadow-md"
            onClick={() => {
              deleteTask(selectedTask._id);
              setSelectedTask(null);
            }}
          >
            <i className="fas fa-trash"></i>
            <span className="font-medium">Delete Task</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default TaskDetails;