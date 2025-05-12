import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { categories } from './utils';
import MainLayout from './layouts/MainLayout';
import Footer from './layouts/Footer';
import { useTasks } from './hooks/useTasks';
import { useAppUI } from './hooks/useAppUI';
import Login from './components/auth/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [redirectTimer, setRedirectTimer] = useState(null);

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

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Set a timer to show login after 2 seconds if no user is found
      const timer = setTimeout(() => {
        setShowLogin(true);
      }, 4000);
      setRedirectTimer(timer);
    }

    // Cleanup timer on unmount
    return () => {
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

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
        user={user}
        setUser={setUser}
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

      {showLogin && (
        <Login 
          darkMode={darkMode} 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App; 