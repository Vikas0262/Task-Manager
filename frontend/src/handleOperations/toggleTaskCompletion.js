export function toggleTaskCompletion(taskId, setTasks) {
    setTasks(prevTasks => prevTasks.map(task =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    ));
} 