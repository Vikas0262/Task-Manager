import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { categories } from './utils';
import MainLayout from './layouts/MainLayout';
import Footer from './layouts/Footer';
import { useTasks } from './hooks/useTasks';
import { useAppUI } from './hooks/useAppUI';

function App() {
  const {
    darkMode,
    isOffline,
    isSidebarOpen,
    toggleDarkMode,
    toggleSidebar
  } = useAppUI();

  const {
    tasks,
    selectedCategory,
    setSelectedCategory,
    selectedTask,
    setSelectedTask,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    handleAddNewTask,
    handleToggleTaskCompletion,
    handleDeleteTask,
    handleToggleSubtaskCompletion
  } = useTasks();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isOffline={isOffline} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <Sidebar 
          darkMode={darkMode} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          tasks={tasks} 
          categories={categories}
          setSelectedTask={setSelectedTask}
          setNewTaskTitle={setNewTaskTitle}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        <MainLayout
          darkMode={darkMode}
          tasks={tasks}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          categories={categories}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
          handleDeleteTask={handleDeleteTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          handleAddNewTask={handleAddNewTask}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleToggleSubtaskCompletion={handleToggleSubtaskCompletion}
        />
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App; 