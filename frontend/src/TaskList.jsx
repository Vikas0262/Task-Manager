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
  const filteredTasks = filterTasks(tasks, selectedCategory, searchQuery);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: categories[0]?.id || '',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
  });

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

  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {categories.find(cat => cat.id === selectedCategory)?.name || 'All Tasks'}
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(new Date())}
          </p>
        </div>

        <div className="flex space-x-4">
          <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg flex`}>
            <button
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i>
            </button>
            <button
              className={`px-3 py-2 ${viewMode === 'board' ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => setViewMode('board')}
            >
              <i className="fas fa-th-large"></i>
            </button>
          </div>

          <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
            <button className="px-4 py-2 flex items-center space-x-2">
              <i className="fas fa-filter text-blue-500"></i>
              <span>Filter</span>
              <i className="fas fa-chevron-down text-sm"></i>
            </button>
          </div>

          {/* <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
            <button className="px-4 py-2 flex items-center space-x-2">
              <i className="fas fa-sort text-blue-500"></i>
              <span>Sort</span>
              <i className="fas fa-chevron-down text-sm"></i>
            </button>
          </div> */}
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="mb-6">
          <button
            onClick={() => setShowTaskForm(true)}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-xl ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
          >
            <i className="fas fa-plus text-lg"></i>
            <span>Add New Task</span>
          </button>
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
                      <label className="block text-sm font-medium mb-1">Due Time</label>
                      <input
                        type="time"
                        name="dueTime"
                        value={newTask.dueTime}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
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
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Click the "New Task" button to create your first task'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskList;