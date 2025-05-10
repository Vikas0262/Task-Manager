export function deleteTask(taskId, setTasks, setSelectedTask) {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    setSelectedTask(prevTask => prevTask && prevTask._id === taskId ? null : prevTask);
} 