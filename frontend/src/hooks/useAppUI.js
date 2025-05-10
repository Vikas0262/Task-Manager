import { useState, useEffect } from 'react';

export function useAppUI() {
  const [darkMode, setDarkMode] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
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

  return {
    darkMode,
    setDarkMode,
    isOffline,
    setIsOffline,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleDarkMode,
    toggleSidebar
  };
} 