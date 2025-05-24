import React, { useState } from 'react';
import TaskList from '../TaskList';
import TaskBoard from '../TaskBoard';
import TaskDetails from '../TaskDetails';
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';
import CreateTaskModal from '../components/tasks/CreateTaskModal';

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
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const handleCreateTask = (taskData) => {
    handleAddNewTask(taskData);
  };

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

      {/* New Task Button */}
      {/* <button
        onClick={() => setShowCreateTaskModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <i className="fas fa-plus text-xl"></i>
      </button> */}

      {/* Create Task Modal */}
      {showCreateTaskModal && (
        <CreateTaskModal
          darkMode={darkMode}
          onClose={() => setShowCreateTaskModal(false)}
          onTaskCreate={handleCreateTask}
          categories={categories}
        />
      )}
    </div>
  );
}

export default MainLayout; 