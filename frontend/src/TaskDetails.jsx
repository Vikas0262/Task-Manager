import React from 'react';
import { format } from 'date-fns';

// Priority configuration with colors and icons
const PRIORITY_CONFIG = {
  high: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-200',
    icon: 'fas fa-arrow-up',
    border: 'border-red-200 dark:border-red-800'
  },
  medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: 'fas fa-equals',
    border: 'border-yellow-200 dark:border-yellow-800'
  },
  low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    icon: 'fas fa-arrow-down',
    border: 'border-green-200 dark:border-green-800'
  }
};

// Category configuration with icons
const CATEGORY_ICONS = {
  work: 'fa-briefcase',
  personal: 'fa-user',
  shopping: 'fa-shopping-cart',
  health: 'fa-heartbeat',
  education: 'fa-graduation-cap',
  other: 'fa-tag'
};

function TaskDetails({ darkMode, selectedTask, setSelectedTask, toggleTaskCompletion, deleteTask, categories }) {
  if (!selectedTask) return null;

  const category = categories.find(cat => cat.id === selectedTask.categoryId);
  const priority = selectedTask.priority?.toLowerCase() || 'medium';
  const priorityConfig = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  const categoryIcon = category?.icon || 'tag';
  
  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return null;
    try {
      // Handle both Date objects and YYYY-MM-DD strings
      const date = typeof dateString === 'string' 
        ? new Date(dateString) 
        : new Date(dateString);
      
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return null;
      }
      
      return format(date, 'EEE, MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error, 'Input:', dateString);
      return null;
    }
  };
  
  // Format time for display (HH:MM -> h:mm a)
  const formatDisplayTime = (timeString) => {
    if (!timeString) return null;
    try {
      // If it's a Date object, format it directly
      if (timeString instanceof Date) {
        return format(timeString, 'h:mm a');
      }
      
      // Otherwise, parse the time string (HH:MM)
      const [hours, minutes] = timeString.split(':');
      if (hours && minutes) {
        const date = new Date();
        date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
        return format(date, 'h:mm a');
      }
      return null;
    } catch (error) {
      console.error('Error formatting time:', error, 'Input:', timeString);
      return null;
    }
  };
  
  // Get formatted date and time for display
  const displayDate = formatDisplayDate(selectedTask.dueDate);
  const displayTime = selectedTask.dueTime ? formatDisplayTime(selectedTask.dueTime) : null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="p-5 border-b border-opacity-10 flex justify-between items-center">
          <h2 className="text-xl font-bold">Task Details</h2>
          <button
            onClick={() => setSelectedTask(null)}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Task title and completion */}
          <div className="flex items-start gap-4 mb-6">
            <button
              onClick={() => toggleTaskCompletion(selectedTask._id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors mt-1 ${
                selectedTask.completed 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
            >
              {selectedTask.completed && <i className="fas fa-check text-xs"></i>}
            </button>
            <div className="flex-1">
              <h1 className={`text-2xl font-bold ${selectedTask.completed ? 'line-through text-gray-500' : ''}`}>
                {selectedTask.title}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
                  <i className={`${priorityConfig.icon} mr-1.5`}></i>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </span>
                {category && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-gray-700/50 text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <i className={`fas ${CATEGORY_ICONS[categoryIcon] || 'fa-tag'} mr-1.5`}></i>
                    {category.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <h3 className="text-sm font-medium mb-2 opacity-70">Description</h3>
            <p className={`whitespace-pre-line ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {selectedTask.description || 'No description provided.'}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-5">
            {/* Due Date & Time */}
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-600'}`}>
                  <i className="far fa-calendar-alt text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-medium opacity-70 mb-0.5">Due Date</h3>
                  <p className="text-base">
                    {displayDate || (selectedTask.dueDate ? `Raw date: ${selectedTask.dueDate}` : 'No due date')}
                  </p>
                </div>
              </div>
              
              {displayTime && (
                <div className="flex items-start gap-4 ml-2">
                  <div className="p-3 opacity-0">
                    <i className="far fa-clock text-lg"></i>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className={`far fa-clock text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                    <span className="text-base">
                      {displayTime}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Created At */}
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-purple-900/20 text-purple-300' : 'bg-purple-50 text-purple-600'}`}>
                <i className="far fa-clock text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-medium opacity-70 mb-0.5">Created</h3>
                <p className="text-base">
                  {selectedTask.createdAt ? format(new Date(selectedTask.createdAt), 'MMM d, yyyy') : 'N/A'}
                </p>
              </div>
            </div>

            {/* Last Updated */}
            {selectedTask.updatedAt && (
              <div className="flex items-start gap-4 opacity-70">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700/30 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                  <i className="fas fa-sync-alt text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-0.5">Last Updated</h3>
                  <p className="text-sm">
                    {format(new Date(selectedTask.updatedAt), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-opacity-10 flex justify-end gap-3">
          <button
            onClick={() => setSelectedTask(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Close
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) {
                deleteTask(selectedTask._id);
                setSelectedTask(null);
              }
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <i className="fas fa-trash"></i>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;