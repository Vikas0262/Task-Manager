import React from 'react';
import TaskList from '../TaskList';
import TaskBoard from '../TaskBoard';
import TaskDetails from '../TaskDetails';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

function MainLayout({
  darkMode,
  tasks,
  selectedCategory,
  searchQuery,
  categories,
  selectedTask,
  setSelectedTask,
  handleToggleTaskCompletion,
  handleDeleteTask,
  newTaskTitle,
  setNewTaskTitle,
  handleAddNewTask,
  viewMode,
  setViewMode,
  handleToggleSubtaskCompletion
}) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden relative">
      <main className={`flex-1 overflow-hidden flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex-1 overflow-auto">
          {viewMode === 'list' ? (
            <TaskList 
              darkMode={darkMode} 
              tasks={tasks} 
              selectedCategory={selectedCategory} 
              searchQuery={searchQuery} 
              categories={categories}
              setSelectedTask={setSelectedTask}
              toggleTaskCompletion={handleToggleTaskCompletion}
              deleteTask={handleDeleteTask}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              addNewTask={handleAddNewTask}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          ) : (
            <TaskBoard 
              darkMode={darkMode} 
              tasks={tasks} 
              selectedCategory={selectedCategory} 
              searchQuery={searchQuery} 
              categories={categories}
              setSelectedTask={setSelectedTask}
              toggleTaskCompletion={handleToggleTaskCompletion}
              deleteTask={handleDeleteTask}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              addNewTask={handleAddNewTask}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}
        </div>

        {selectedTask && (
          <TaskDetails 
            darkMode={darkMode} 
            selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask} 
            toggleTaskCompletion={handleToggleTaskCompletion}
            deleteTask={handleDeleteTask}
            toggleSubtaskCompletion={handleToggleSubtaskCompletion}
            categories={categories}
          />
        )}
      </main>

      <div className="mt-4">
        <AnalyticsDashboard darkMode={darkMode} tasks={tasks} categories={categories} />
      </div>
    </div>
  );
}

export default MainLayout; 