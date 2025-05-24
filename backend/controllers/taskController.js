const Task = require('../models/Task');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    console.log('Received task data:', req.body);
    const { title, description, priority, category, dueDate, dueTime } = req.body;
    
    // Create task object with basic fields
    const taskData = {
      title,
      description: description || '',
      priority: priority || 'medium',
      categoryId: category,
      userId: req.user.userId
    };
    
    // Add due date if provided
    if (dueDate) {
      try {
        // Parse the date string (expected format: YYYY-MM-DD)
        const [year, month, day] = dueDate.split('-').map(Number);
        
        // Validate date components
        if (isNaN(year) || isNaN(month) || isNaN(day) || 
            month < 1 || month > 12 || day < 1 || day > 31) {
          throw new Error('Invalid date format. Expected YYYY-MM-DD');
        }
        
        // Create date object in UTC to avoid timezone issues
        const utcDate = new Date(Date.UTC(year, month - 1, day));
        
        // If time is provided, add it to the date
        if (dueTime) {
          const [hours, minutes] = dueTime.split(':').map(Number);
          
          // Validate time components
          if (!isNaN(hours) && !isNaN(minutes) && 
              hours >= 0 && hours <= 23 && 
              minutes >= 0 && minutes <= 59) {
            utcDate.setUTCHours(hours, minutes, 0, 0);
            taskData.dueTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          } else {
            console.warn('Invalid time format, using date only');
          }
        }
        
        taskData.dueDate = utcDate;
        
      } catch (error) {
        console.error('Error processing date/time:', error);
        // Don't fail the request, just log the error and continue without date
      }
    }
    
    console.log('Creating task with data:', taskData);
    const task = new Task(taskData);
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
}; 