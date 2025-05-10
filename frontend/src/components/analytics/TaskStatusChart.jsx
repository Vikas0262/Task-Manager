import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function TaskStatusChart({ darkMode, tasks }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = document.getElementById('analytics-chart');
    if (!chartDom) return;

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
              itemStyle: { color: '#10B981' }
            },
            { 
              value: tasks.filter(t => !t.completed).length, 
              name: 'Pending',
              itemStyle: { color: '#3B82F6' }
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
    <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Task Status</h3>
        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
          <i className="fas fa-chart-pie text-blue-500"></i>
        </div>
      </div>
      <div id="analytics-chart" className="h-64"></div>
    </div>
  );
}

export default TaskStatusChart; 