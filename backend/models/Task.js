const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  description: { 
    type: String, 
    default: '' 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  priority: { 
    type: String, 
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be either low, medium, or high'
    }, 
    default: 'medium' 
  },
  categoryId: { 
    type: String, 
    required: [true, 'Category is required'] 
  },
  dueDate: { 
    type: Date,
    validate: {
      validator: function(v) {
        // Allow null/undefined or a valid date
        return v === null || v === undefined || v instanceof Date;
      },
      message: 'Invalid due date'
    }
  },
  dueTime: { 
    type: String,
    validate: {
      validator: function(v) {
        // Allow null/undefined or a time string in HH:MM format
        if (!v) return true;
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: 'Time must be in HH:MM format (24-hour)'
    }
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Task', taskSchema);