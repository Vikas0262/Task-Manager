import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { formatDate } from './utils';

function AnalyticsDashboard({ darkMode, tasks, categories }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = document.getElementById('analytics-chart');
    if (!chartDom) return;

    // Initialize chart
    const myChart = echarts.init(chartDom, darkMode ? 'dark' : undefined);
    chartRef.current = myChart;

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: darkMode ? '#fff' : '#333'
        }
      },
      series: [
        {
          name: 'Task Status',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: darkMode ? '#121212' : '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { 
              value: tasks.filter(t => t.completed).length, 
              name: 'Completed',
              itemStyle: { color: '#10B981' } // green-500
            },
            { 
              value: tasks.filter(t => !t.completed).length, 
              name: 'Pending',
              itemStyle: { color: '#3B82F6' } // blue-500
            }
          ]
        }
      ]
    };

    myChart.setOption(option);

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [tasks, darkMode]);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Analytics Dashboard</h2>
        {/* <div className={`border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg flex`}>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
            Weekly
          </button>
          <button className={`px-3 py-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monthly
          </button>
          <button className={`px-3 py-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Yearly
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Task Status</h3>
            <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
              <i className="fas fa-chart-pie text-blue-500"></i>
            </div>
          </div>

          <div id="analytics-chart" className="h-64"></div>
        </div>

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
              .map(task => (
                <div key={task.id} className="flex">
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
      </div>
    </div>
  );
}

export default AnalyticsDashboard;