import React from 'react';
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
  newTaskTitle,
  setNewTaskTitle,
  addNewTask,
  viewMode,
  setViewMode
}) {
  const filteredTasks = filterTasks(tasks, selectedCategory, searchQuery);

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
        <div className={`mb-6 flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-3`}>
          <i className="fas fa-plus text-blue-500 mx-3"></i>
          <input
            id="add-task-input"
            type="text"
            placeholder="Add a new task..."
            className={`flex-1 border-none focus:outline-none text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addNewTask(newTaskTitle);
              }
            }}
          />
          <button
            onClick={() => addNewTask(newTaskTitle)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Task
          </button>
        </div>

        <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
          {filteredTasks.length > 0 ? (
            <ul>
              {filteredTasks.map((task, index) => (
                <TaskItem
                  key={task.id}
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