import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';

function Header({ darkMode, toggleDarkMode, isOffline, searchQuery, setSearchQuery, isSidebarOpen, toggleSidebar, user, setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'token',
      newValue: null,
      oldValue: localStorage.getItem('token'),
      storageArea: localStorage
    }));
    setUser(null);
    setShowDropdown(false);
    setShowLogin(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      <header className={`h-16 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex items-center justify-between px-4 md:px-6`}>
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 rounded-full transform transition-transform ${
              darkMode ? 'bg-white' : 'bg-gray-800'
            } ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 rounded-full transition-opacity ${
              darkMode ? 'bg-white' : 'bg-gray-800'
            } ${isSidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 rounded-full transform transition-transform ${
              darkMode ? 'bg-white' : 'bg-gray-800'
            } ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className="flex items-center flex-1 max-w-2xl ml-4 md:ml-0">
          <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-3 py-2 flex-1 mr-4`}>
            <i className="fas fa-search text-gray-400 mr-2"></i>
            <input
              type="text"
              placeholder="Search tasks..."
              className={`bg-transparent border-none w-full focus:outline-none ${
                darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden sm:flex items-center">
            <span className="mr-2 text-sm">{darkMode ? 'Dark' : 'Light'}</span>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className={`hidden sm:flex relative ${isOffline ? 'text-red-500' : 'text-green-500'}`}>
            <i className={`fas ${isOffline ? 'fa-wifi-slash' : 'fa-wifi'}`}></i>
            <span className="ml-1 text-xs">{isOffline ? 'Offline' : 'Online'}</span>
          </div>

          {user ? (
            <div className="relative user-profile-dropdown">
              <div 
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-sm font-medium">
                  {user.fullName
                    .split(' ')
                    .map(n => n ? n[0].toUpperCase() : '')
                    .join('')}
                </span>
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors relative z-50"
              onClick={() => setShowLogin(true)}
            >
              <span className="text-sm font-medium">JD</span>
            </div>
          )}
        </div>
      </header>

      {showLogin && (
        <Login 
          darkMode={darkMode} 
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Header;