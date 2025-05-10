import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTasks([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue) {
          // User logged in, fetch tasks
          fetchTasks();
        } else {
          // User logged out, clear tasks
          setTasks([]);
          setSelectedTask(null);
        }
      }
    };

    // Check initial auth state and fetch tasks if logged in
    const token = localStorage.getItem('token');
    if (token) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add new task
  const handleAddNewTask = async (title) => {
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to add tasks');
        return;
      }

      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          
        },

        body: JSON.stringify({
          title,
          categoryId: selectedCategory === 'all' ? null : selectedCategory
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle task completion
  const handleToggleTaskCompletion = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to update tasks');
        return;
      }

      const task = tasks.find(t => t._id === taskId);
      if (!task) return;

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          completed: !task.completed
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to delete tasks');
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(t => t._id !== taskId));
      if (selectedTask?._id === taskId) {
        setSelectedTask(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter tasks based on selected category and search query
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.categoryId === selectedCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return {
    tasks,
    filteredTasks,
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
    loading,
    error,
    handleAddNewTask,
    handleToggleTaskCompletion,
    handleDeleteTask,
    fetchTasks // Expose fetchTasks to refresh tasks when needed
  };
}; 