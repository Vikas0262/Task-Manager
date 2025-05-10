import React, { useState } from 'react';
import Signup from './Signup';

const API_URL = 'http://localhost:5000/api';

function Login({ darkMode, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Trigger storage event for other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'token',
        newValue: data.token,
        oldValue: null,
        storageArea: localStorage
      }));

      // Call the success callback
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }

      // Close the modal
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showSignup) {
    return (
      <Signup
        darkMode={darkMode}
        onClose={onClose}
        onSwitchToLogin={() => setShowSignup(false)}
        onSignupSuccess={onLoginSuccess}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome Back
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember" className={`ml-2 block text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Remember me
              </label>
            </div>
            <a href="#" className={`text-sm font-medium text-blue-500 hover:text-blue-600`}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className={`text-center text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setShowSignup(true)}
              className="font-medium text-blue-500 hover:text-blue-600"
              disabled={loading}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; 