import React from 'react';
import { formatDate } from '../../utils';

function RecentActivity({ darkMode, tasks }) {
  return (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Recent Activity</h3>
        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
          <i className="fas fa-history text-blue-500"></i>
        </div>
      </div>

      <div className="space-y-4">
        {tasks
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3)
          .map((task, index) => (
            <div key={index} className="flex">
              <div className="mr-3">
                <div className={`w-8 h-8 rounded-full ${task.completed ? 'bg-green-500' : 'bg-blue-500'} flex items-center justify-center text-white`}>
                  <i className={`fas ${task.completed ? 'fa-check' : 'fa-plus'}`}></i>
                </div>
                <div className="h-full w-0.5 bg-gray-200 mx-auto mt-1"></div>
              </div>
              <div>
                <p className="font-medium">{task.completed ? 'Task Completed' : 'New Task Added'}</p>
                <p className="text-sm text-gray-500">{task.title}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(task.createdAt)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentActivity; 