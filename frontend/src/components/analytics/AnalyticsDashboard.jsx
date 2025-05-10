import React from 'react';
import TaskStatusChart from './TaskStatusChart';
import CategoriesDistribution from './CategoriesDistribution';
import RecentActivity from './RecentActivity';

function AnalyticsDashboard({ darkMode, tasks, categories }) {
  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Analytics Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskStatusChart darkMode={darkMode} tasks={tasks} />
        <CategoriesDistribution darkMode={darkMode} tasks={tasks} categories={categories} />
        <RecentActivity darkMode={darkMode} tasks={tasks} />
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 