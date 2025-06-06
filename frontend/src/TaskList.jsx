import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { filterTasks, formatDate } from './utils';

function TaskList({
  darkMode,
  tasks,
  selectedCategory,
  searchQuery,
  categories,
  setSelectedTask,
  toggleTaskCompletion,
  deleteTask,
  addNewTask,
  viewMode,
  setViewMode
}) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filters, setFilters] = useState({
    priority: '',
    dueDate: '',
    completed: '',
  });
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: categories[0]?.id || '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
  });

  const filteredTasks = React.useMemo(() => {
    let result = filterTasks(tasks, selectedCategory, searchQuery, filters);
    
    // Apply sorting
    return [...result].sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
          break;
        case 'dueDate':
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case 'completed':
          comparison = (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [tasks, selectedCategory, searchQuery, filters, sortBy, sortOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    // Prepare task data for the backend
    const taskData = {
      title: newTask.title,
      description: newTask.description || '',
      category: newTask.category,
      priority: newTask.priority
    };
    
    // Format and add dueDate if it exists
    if (newTask.dueDate) {
      // Format date as YYYY-MM-DD
      const date = new Date(newTask.dueDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      taskData.dueDate = `${year}-${month}-${day}`;
    }
    
    // Add dueTime if it exists
    if (newTask.dueTime) {
      taskData.dueTime = newTask.dueTime;
    }
    
    console.log('Sending task data to backend:', taskData);
    const result = await addNewTask(taskData);

    if (result.success) {
      setNewTask({
        title: '',
        description: '',
        category: categories[0]?.id || '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
      });
      setShowTaskForm(false);
    }
  };

  // Render the task form
  const renderTaskForm = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className={`w-full max-w-xl rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Task</h3>
          <button 
            onClick={() => setShowTaskForm(false)}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Close modal"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <form onSubmit={handleAddTask}>
          <div className="space-y-4">
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium mb-1">Title *</label>
              <input
                id="task-title"
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="task-description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="task-description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="task-category" className="block text-sm font-medium mb-1">Category</label>
                <select
                  id="task-category"
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="task-priority" className="block text-sm font-medium mb-1">Priority</label>
                <select
                  id="task-priority"
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="task-due-date" className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  id="task-due-date"
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              <div>
                <label htmlFor="task-due-time" className="block text-sm font-medium mb-1">Due Time</label>
                <input
                  id="task-due-time"
                  type="time"
                  name="dueTime"
                  value={newTask.dueTime}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <i className="fas fa-plus"></i>
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  // Render the add task button
  const renderAddTaskButton = () => (
    <button
      onClick={() => setShowTaskForm(true)}
      className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl mb-6 ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700 hover:bg-blue-600/90 hover:border-blue-500 text-white' 
          : 'bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-400 text-gray-700'
      } transition-colors duration-200`}
    >
      <i className="fas fa-plus text-blue-500 group-hover:text-white"></i>
      <span className="font-medium">Add new task</span>
    </button>
  );

  // Render the main component
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {categories.find(cat => cat.id === selectedCategory)?.name || 'All Tasks'}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {formatDate(new Date())}
          </p>
        </div>

        <div className="flex space-x-4">
          <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg flex`}>
            <button
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <i className="fas fa-list"></i>
            </button>
            <button
              className={`px-3 py-2 ${viewMode === 'board' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setViewMode('board')}
              aria-label="Board view"
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`px-4 py-2 flex items-center space-x-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
            >
              <i className="fas fa-filter text-blue-500"></i>
              <span>Filter</span>
              <i className={`fas fa-chevron-down text-sm transition-transform ${showFilterMenu ? 'transform rotate-180' : ''}`}></i>
            </button>
            
            {showFilterMenu && (
              <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl z-10 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      value={filters.priority}
                      onChange={(e) => setFilters({...filters, priority: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <select
                      value={filters.dueDate}
                      onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">Anytime</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="week">This Week</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.completed === 'completed'}
                        onChange={(e) => setFilters({
                          ...filters,
                          completed: e.target.checked ? 'completed' : ''
                        })}
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm">Show completed</span>
                    </label>
                  </div>
                  
                  {(filters.priority || filters.dueDate || filters.completed) && (
                    <button
                      onClick={() => setFilters({ priority: '', dueDate: '', completed: '' })}
                      className="w-full mt-2 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`px-4 py-2 flex items-center space-x-2 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
            >
              <i className="fas fa-sort text-blue-500"></i>
              <span>Sort</span>
              <i className={`fas fa-chevron-down text-sm transition-transform ${showSortMenu ? 'transform rotate-180' : ''}`}></i>
            </button>
            
            {showSortMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl z-10 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <div className="p-2 space-y-2">
                  <div className="px-3 py-1 text-sm font-medium text-gray-500">Sort By</div>
                  {['title', 'priority', 'dueDate', 'completed'].map((sortOption) => (
                    <button
                      key={sortOption}
                      onClick={() => {
                        if (sortBy === sortOption) {
                          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                        } else {
                          setSortBy(sortOption);
                          setSortOrder('asc');
                        }
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                        sortBy === sortOption 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}</span>
                      {sortBy === sortOption && (
                        <i className={`fas fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'} text-xs`}></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        {showTaskForm ? renderTaskForm() : renderAddTaskButton()}
      </div>

      {showTaskForm && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className={`w-full max-w-xl rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Task</h3>
              <button 
                onClick={() => setShowTaskForm(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddTask}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      name="category"
                      value={newTask.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="task-due-time" className="block text-sm font-medium mb-1">Due Time</label>
                    <input
                      id="task-due-time"
                      type="time"
                      name="dueTime"
                      value={newTask.dueTime}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                  >
                    <i className="fas fa-plus"></i>
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
        {filteredTasks.length > 0 ? (
          <ul>
            {filteredTasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                index={index}
                darkMode={darkMode}
                filteredTasks={filteredTasks}
                setSelectedTask={setSelectedTask}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                categories={categories}
              />
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4 text-gray-400">
              <i className="fas fa-tasks"></i>
            </div>
            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Click the "New Task" button to create your first task'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;