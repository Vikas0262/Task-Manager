export const categories = [
    { id: 'all', name: 'All Tasks', icon: 'fa-tasks', color: 'bg-blue-500' },
    { id: 'work', name: 'Work', icon: 'fa-briefcase', color: 'bg-purple-500' },
    { id: 'personal', name: 'Personal', icon: 'fa-user', color: 'bg-green-500' },
    { id: 'shopping', name: 'Shopping', icon: 'fa-shopping-cart', color: 'bg-yellow-500' },
    { id: 'health', name: 'Health', icon: 'fa-heartbeat', color: 'bg-red-500' },
    { id: 'education', name: 'Education', icon: 'fa-graduation-cap', color: 'bg-indigo-500' },
  ];
  
  export const sampleTasks = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the quarterly project proposal for the marketing team',
      completed: false,
      priority: 'high',
      categoryId: 'work',
      dueDate: '2025-04-10',
      createdAt: '2025-04-01',
      subtasks: [
        { id: 's1', title: 'Research competition', completed: true },
        { id: 's2', title: 'Create outline', completed: true },
        { id: 's3', title: 'Write first draft', completed: false },
      ],
      collaborators: ['Jane', 'Mike'],
    },
    {
      id: '2',
      title: 'Grocery shopping',
      description: 'Buy groceries for the week',
      completed: false,
      priority: 'medium',
      categoryId: 'shopping',
      dueDate: '2025-04-06',
      createdAt: '2025-04-03',
      subtasks: [
        { id: 's1', title: 'Vegetables', completed: false },
        { id: 's2', title: 'Fruits', completed: false },
        { id: 's3', title: 'Dairy products', completed: false },
      ],
      collaborators: [],
    },
    {
      id: '3',
      title: 'Morning workout',
      description: '30 minutes cardio and strength training',
      completed: true,
      priority: 'medium',
      categoryId: 'health',
      dueDate: '2025-04-04',
      createdAt: '2025-04-03',
      subtasks: [
        { id: 's1', title: 'Warm up', completed: true },
        { id: 's2', title: 'Cardio', completed: true },
        { id: 's3', title: 'Strength training', completed: true },
      ],
      collaborators: [],
    },
    {
      id: '4',
      title: 'Read chapter 5',
      description: 'Complete reading chapter 5 of "Effective Project Management"',
      completed: false,
      priority: 'low',
      categoryId: 'education',
      dueDate: '2025-04-08',
      createdAt: '2025-04-02',
      subtasks: [
        { id: 's1', title: 'Take notes', completed: false },
        { id: 's2', title: 'Summarize key points', completed: false },
      ],
      collaborators: [],
    },
    {
      id: '5',
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for the weekly team meeting',
      completed: false,
      priority: 'high',
      categoryId: 'work',
      dueDate: '2025-04-05',
      createdAt: '2025-04-02',
      subtasks: [
        { id: 's1', title: 'Create agenda', completed: true },
        { id: 's2', title: 'Prepare slides', completed: false },
        { id: 's3', title: 'Review with manager', completed: false },
      ],
      collaborators: ['Alex', 'Sarah'],
    },
    {
      id: '6',
      title: 'Call parents',
      description: 'Weekly check-in call with parents',
      completed: false,
      priority: 'medium',
      categoryId: 'personal',
      dueDate: '2025-04-07',
      createdAt: '2025-04-03',
      subtasks: [],
      collaborators: [],
    },
  ];
  
  export function filterTasks(tasks, selectedCategory, searchQuery) {
    return tasks.filter(task => {
      const matchesCategory = selectedCategory === 'all' || task.categoryId === selectedCategory;
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }
  
  export function formatDate(dateString) {
    if (!dateString) return '';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  export function getDaysLeft(dueDate) {
    if (!dueDate) return '';
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  }
  
  export function getSubtaskCompletionPercentage(subtasks) {
    if (subtasks.length === 0) return 0;
    const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / subtasks.length) * 100);
  }
  
  export function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  }
  
  export function getCategoryColor(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  }
  
  export function getCategoryIcon(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : 'fa-folder';
  }