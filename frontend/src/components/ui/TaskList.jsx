import React from 'react';
import TaskItem from './TaskItem';

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
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.categoryId === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tasks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`px-3 py-1 rounded ${viewMode === 'board' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Board
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            placeholder="Add a new task..."
            className={`flex-1 p-2 rounded-l border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
          />
          <button
            onClick={() => addNewTask()}
            className={`px-4 py-2 rounded-r ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index+1}
            task={task}
            darkMode={darkMode}
            setSelectedTask={setSelectedTask}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList; 