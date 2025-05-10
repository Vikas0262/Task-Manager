import React from 'react';

function CategoriesDistribution({ darkMode, tasks, categories }) {
  return (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Categories Distribution</h3>
        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
          <i className="fas fa-folder text-blue-500"></i>
        </div>
      </div>

      <div className="space-y-4">
        {categories.filter(cat => cat.id !== 'all').map(category => {
          const categoryTasks = tasks.filter(task => task.categoryId === category.id);
          const completedTasks = categoryTasks.filter(task => task.completed);
          const percentage = categoryTasks.length > 0
            ? Math.round((completedTasks.length / categoryTasks.length) * 100)
            : 0;

          return (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                  <span>{category.name}</span>
                </div>
                <span className="text-sm">{completedTasks.length}/{categoryTasks.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${category.color} h-2 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesDistribution; 