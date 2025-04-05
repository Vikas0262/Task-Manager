import React, { useState } from 'react';
import { getPriorityColor, getCategoryColor, getCategoryIcon, formatDate } from './utils';

function TaskItem({ task, index, darkMode, filteredTasks, setSelectedTask, toggleTaskCompletion, deleteTask, categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const category = categories.find(cat => cat.id === task.categoryId);
  const categoryColor = category?.color.replace('bg-', '') || 'gray';

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <li
      className={`relative p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
      } transition-colors cursor-pointer ${
        index !== filteredTasks.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
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
            task.completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : darkMode ? 'border-gray-600' : 'border-gray-300'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
        >
          {task.completed && <i className="fas fa-check text-xs"></i>}
        </button>
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-base mb-1 truncate pr-8 sm:pr-0 ${
          task.completed ? 'line-through text-gray-500' : darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <i className="far fa-calendar-alt mr-1"></i>
            <span className="hidden xs:inline">{formatDate(task.dueDate)}</span>
          </div>

          {task.subtasks.length > 0 && (
            <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <i className="fas fa-tasks mr-1"></i>
              <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
            </div>
          )}

          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getCategoryColor(task.categoryId)} bg-opacity-20 text-${categoryColor}-700`}>
            <i className={`fas ${getCategoryIcon(task.categoryId)} mr-1`}></i>
            <span className="truncate max-w-[100px]">{category?.name || 'Uncategorized'}</span>
          </div>
        </div>
      </div>

      {/* Task Actions */}
      <div className={`flex items-center gap-3 ${isMenuOpen ? 'flex' : 'hidden sm:flex'} ${
        isMenuOpen ? 'w-full justify-end sm:w-auto' : ''
      }`}>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)} text-white shadow-sm`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </div>

        {task.collaborators.length > 0 && (
          <div className="flex -space-x-2">
            {task.collaborators.map((collaborator, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-xs font-medium border-2 ${
                  darkMode ? 'border-gray-800' : 'border-white'
                } text-white shadow-sm hover:scale-110 transition-transform`}
                title={collaborator}
              >
                {collaborator.charAt(0)}
              </div>
            ))}
          </div>
        )}

        <button
          className={`w-8 h-8 rounded-full ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } flex items-center justify-center group transition-colors`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        >
          <i className="fas fa-trash text-red-500 group-hover:scale-110 transition-transform"></i>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;