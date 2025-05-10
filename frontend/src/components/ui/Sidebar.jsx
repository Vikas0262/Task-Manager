import React from 'react';

function Sidebar({ darkMode, selectedCategory, setSelectedCategory, tasks, categories, setSelectedTask, setNewTaskTitle, isSidebarOpen, toggleSidebar }) {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30 transition-transform duration-200 ease-in-out ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } w-64 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedTask(null);
                  setNewTaskTitle('');
                }}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                  selectedCategory === category.id
                    ? darkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-100 text-blue-700'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                <span>{category.name}</span>
                <span className="ml-auto text-sm">
                  {tasks.filter(task => task.categoryId === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-sm text-gray-500">Total Tasks</div>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-2xl font-bold text-green-500">
                {tasks.filter(task => task.completed).length}
              </div>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-sm text-gray-500">Pending</div>
              <div className="text-2xl font-bold text-blue-500">
                {tasks.filter(task => !task.completed).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 