import React from 'react';

function Footer({ darkMode }) {
  return (
    <footer className={`py-3 text-center text-sm ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <p>© {new Date().getFullYear()} Task Management App. All rights reserved.</p>
    </footer>
  );
}

export default Footer; 