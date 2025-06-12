# Task Manager

A full-stack task management application with a modern React frontend and Node.js/Express backend. This application helps users efficiently manage their tasks with a clean, responsive interface and robust backend functionality.

## ✨ Features

### Frontend
- **User Authentication**
  - Secure login/signup system
  - JWT-based authentication
  - Protected routes

- **Task Management**
  - Create, view, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Add subtasks with completion tracking
  - Categorize tasks
  - Due date management

- **UI/UX**
  - Dark/Light mode toggle
  - Responsive design
  - Interactive task board and list views
  - Real-time updates

- **Advanced Features**
  - Search and filter tasks
  - Task prioritization
  - Analytics dashboard
  - Offline support

### Backend
- **RESTful API**
  - User authentication/authorization
  - CRUD operations for tasks
  - Data validation

- **Database**
  - MongoDB for data storage
  - Mongoose ODM
  - Data models for Users and Tasks

- **Security**
  - Password hashing with bcrypt
  - JWT authentication
  - Input sanitization
  - Rate limiting

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API calls
- ECharts for analytics
- date-fns for date manipulation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- CORS
- dotenv for environment variables

## 🛠️ Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 📂 Project Structure

```
backend/
├── config/           # Configuration files
│   └── db.js        # Database configuration
├── controllers/      # Request handlers
│   ├── authController.js
│   └── taskController.js
├── middleware/       # Custom middleware
│   └── auth.js      # Authentication middleware
├── models/           # Database models
│   ├── Task.js
│   └── User.js
├── routes/           # API routes
│   ├── auth.js
│   └── tasks.js
├── server.js         # Main server file
└── package.json

frontend/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   │   ├── analytics/    # Analytics components
│   │   ├── auth/         # Authentication components
│   │   └── tasks/        # Task components
│   ├── handleOperations/ # Core task operations
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   └── utils.js          # Utility functions
├── public/              # Public assets
├── .env                 # Environment variables
├── index.html           # Main HTML template
└── package.json
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks for the user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built  by [Vikas Vishwakarma](https://github.com/Vikas0262)
