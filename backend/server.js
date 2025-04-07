const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', req.body);
    }
    next();
});

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('Database URL:', process.env.MONGODB_URI);
})
.catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});

// Todo Schema
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        console.log('GET /api/todos - Fetching all todos');
        const todos = await Todo.find().sort({ createdAt: -1 });
        console.log(`Found ${todos.length} todos`);
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ 
            message: 'Error fetching todos',
            error: error.message 
        });
    }
});

// Add new todo
app.post('/api/todos', async (req, res) => {
    try {
        console.log('POST /api/todos - Received todo data:', req.body);
        
        if (!req.body.text) {
            console.log('Error: Todo text is required');
            return res.status(400).json({ message: 'Todo text is required' });
        }

        const newTodo = new Todo({
            text: req.body.text
        });
        
        console.log('Creating new todo:', newTodo);
        const savedTodo = await newTodo.save();
        console.log('Todo saved successfully:', savedTodo);
        
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).json({ 
            message: 'Error adding todo',
            error: error.message 
        });
    }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        console.log(`DELETE /api/todos/${req.params.id} - Attempting to delete todo`);
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            console.log(`Todo with id ${req.params.id} not found`);
            return res.status(404).json({ message: 'Todo not found' });
        }
        console.log('Todo deleted successfully:', deletedTodo);
        res.json({ message: 'Todo deleted successfully', deletedTodo });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ 
            message: 'Error deleting todo',
            error: error.message 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/api`);
}); 