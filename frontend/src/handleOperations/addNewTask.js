export function addNewTask(title, categoryId, setTasks, setNewTaskTitle) {
    if (!title.trim()) return;
    
    const newTask = {
      title: title.trim(),
      description: '',
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'medium',
      categoryId,
      subtasks: [],
      collaborators: []
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskTitle('');
} 