export function toggleSubtaskCompletion(taskId, subtaskId, setTasks) {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task._id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask =>
            subtask._id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )
        };
      }
      return task;
    }));
} 