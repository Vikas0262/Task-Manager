import React from 'react';
import { filterTasks, formatDate, getDaysLeft, getSubtaskCompletionPercentage, getPriorityColor, getCategoryColor, getCategoryIcon } from './utils';

function TaskBoard({
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
  const [filters, setFilters] = React.useState({
    priority: '',
    dueDate: '',
    completed: '',
  });
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [showSortMenu, setShowSortMenu] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('dueDate');
  const [sortOrder, setSortOrder] = React.useState('asc');
  
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div
                key={task._id}
                className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setSelectedTask(task)}
              >
                <div className={`h-1 ${getPriorityColor(task.priority)}`}></div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : `${darkMode ? 'border-gray-600' : 'border-gray-300'}`
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskCompletion(task._id);
                      }}
                    >
                      {task.completed && <i className="fas fa-check text-xs"></i>}
                    </button>

                    <div className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(task.categoryId)} bg-opacity-20`}>
                      <i className={`fas ${getCategoryIcon(task.categoryId)} mr-1`}></i>
                      {categories.find(cat => cat.id === task.categoryId)?.name || 'Uncategorized'}
                    </div>
                  </div>

                  <h3 className={`font-medium mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>

                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>

                  {task?.subtasks?.length > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks</span>
                        <span>{getSubtaskCompletionPercentage(task.subtasks)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${getSubtaskCompletionPercentage(task.subtasks)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 text-sm">
                    <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <i className="far fa-calendar-alt mr-1"></i>
                      {formatDate(task.dueDate)}
                    </div>

                    <div className={`text-xs ${
                      getDaysLeft(task.dueDate) === 'Overdue'
                        ? 'text-red-500'
                        : getDaysLeft(task.dueDate) === 'Due today'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                    }`}>
                      {getDaysLeft(task.dueDate)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {task?.collaborators?.length > 0 ? (
                      <div className="flex -space-x-2">
                        {task?.collaborators?.map((collaborator, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium border-2 border-white"
                            title={collaborator}
                          >
                            {collaborator.charAt(0)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <button
                      className={`w-8 h-8 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center justify-center`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                      }}
                    >
                      <i className="fas fa-trash text-red-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-span-3 p-8 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
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

export default TaskBoard;