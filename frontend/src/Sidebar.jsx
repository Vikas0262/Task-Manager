import React from 'react';
import { formatDate } from './utils';

function Sidebar({ darkMode, selectedCategory, setSelectedCategory, tasks, categories, setSelectedTask, setNewTaskTitle, isSidebarOpen, toggleSidebar }) {
  const completionPercentage = tasks.length > 0
    ? Math.round((tasks.filter(task => task.completed).length / tasks.length) * 100)
    : 0;

  return (
    <aside className={`
      fixed md:static
      inset-y-0 left-0
      w-[280px] md:w-64
      transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-md flex flex-col
      z-30
      mt-16 md:mt-0
    `}>
      <div className="p-4">
        <button
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors"
          onClick={() => {
            setSelectedTask(null);
            document.getElementById('add-task-input')?.focus();
            if (window.innerWidth < 768) toggleSidebar();
          }}
        >
          <i className="fas fa-plus"></i>
          <span>New Task</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="px-3">
          {categories.map(category => (
            <li key={category.id} className="mb-1">
              <button
                onClick={() => {
                  setSelectedCategory(category.id);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full py-2 px-3 rounded-lg flex items-center space-x-3 transition-colors ${
                  selectedCategory === category.id
                    ? `${darkMode ? 'bg-gray-700' : 'bg-blue-50'} text-blue-500`
                    : `hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-white`}>
                  <i className={`fas ${category.icon}`}></i>
                </div>
                <span>{category.name}</span>
                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                  {tasks.filter(task => category.id === 'all' || task.categoryId === category.id).length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} mx-4 mb-4 rounded-lg`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Overall Progress</h3>
          <span className="text-blue-500">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;