import React, { useState } from 'react';
import { getCategoryIcon } from './utils';

function TaskItem({ task, index, darkMode, filteredTasks, setSelectedTask, toggleTaskCompletion, deleteTask, categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const category = categories.find(cat => cat.id === task.categoryId);
  
  // Format the due date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format the due time for display
  const formatDisplayTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  // Priority display configuration
  const _PRIORITY_CONFIG = {
    high: { 
      class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      icon: 'fas fa-arrow-up'
    },
    medium: { 
      class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      icon: 'fas fa-equals'
    },
    low: { 
      class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      icon: 'fas fa-arrow-down'
    }
  };
  
  const priorityConfig = _PRIORITY_CONFIG[task.priority] || _PRIORITY_CONFIG.medium;
  const displayDate = formatDisplayDate(task.dueDate);
  const displayTime = formatDisplayTime(task.dueTime);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <li
      className={`relative p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
      } transition-colors cursor-pointer ${
        index !== filteredTasks?.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
      }`}
      onClick={() => setSelectedTask(task)}
    >
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 right-4 sm:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        onClick={toggleMenu}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>

      {/* Task Completion Button */}
      <div className="flex items-center">
        <button
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transform hover:scale-110 transition-transform ${
            task?.completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : darkMode ? 'border-gray-600' : 'border-gray-300'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task._id);
          }}
        >
          {task.completed && <i className="fas fa-check text-xs"></i>}
        </button>
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-medium text-base truncate pr-2 ${
            task.completed ? 'line-through text-gray-500' : darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.priority && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.class}`}>
              <i className={`${priorityConfig.icon} mr-1`}></i>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
        
        {task.description && (
          <p className={`text-sm mb-2 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {displayDate && (
            <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <i className="far fa-calendar-alt mr-1.5"></i>
              <span className="text-xs">
                {displayDate}
                {displayTime && ` • ${displayTime}`}
              </span>
            </div>
          )}

          {category && (
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-opacity-20 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
              <i className={`fas ${getCategoryIcon(task.categoryId)} mr-1.5`}></i>
              <span className="truncate max-w-[100px]">{category.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Task Actions */}
      <div className={`flex items-center gap-3 ${isMenuOpen ? 'flex' : 'hidden sm:flex'} ${
        isMenuOpen ? 'w-full justify-end sm:w-auto' : ''
      }`}>
        <button
          className={`w-8 h-8 rounded-full ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } flex items-center justify-center group transition-colors`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task._id);
          }}
        >
          <i className="fas fa-trash text-red-500 group-hover:scale-110 transition-transform"></i>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;