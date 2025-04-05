import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskList from './TaskList';
import TaskBoard from './TaskBoard';
import TaskDetails from './TaskDetails';
import AnalyticsDashboard from './AnalyticsDashboard';
import { categories, sampleTasks } from './utils';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Load initial tasks
    setTasks(sampleTasks);

    // Setup online/offline detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Close sidebar on window resize if screen becomes larger
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  function addNewTask(title = newTaskTitle, categoryId = selectedCategory === 'all' ? 'personal' : selectedCategory) {
    if (!title.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: '',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      categoryId,
      subtasks: [],
      collaborators: []
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  }

  function toggleTaskCompletion(taskId) {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }

  function toggleSubtaskCompletion(taskId, subtaskId) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )
        };
      }
      return task;
    }));
  }

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
      
      <div className="flex flex-1 overflow-hidden relative">
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
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                addNewTask={addNewTask}
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
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                addNewTask={addNewTask}
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
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
              toggleSubtaskCompletion={toggleSubtaskCompletion}
              categories={categories}
            />
          )}
        </main>
      </div>

      <AnalyticsDashboard darkMode={darkMode} tasks={tasks} categories={categories} />

      {/* Simple Footer */}
      <footer className={`py-3 text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p>© {new Date().getFullYear()} Task Management App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 