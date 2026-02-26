cat > README.md << 'EOF'
<div align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<h1>TaskFlow</h1>

<p>
A modern full-stack MERN Task Manager built with scalable architecture, secure authentication,
drag-and-drop task organization, analytics dashboard, and a clean glassmorphism UI.
</p>

</div>

---

## Overview

TaskFlow is a production-ready MERN stack application designed to help users manage tasks efficiently.  
It includes secure authentication, real-time filtering, priority management, analytics insights, and a smooth modern interface.

This project demonstrates full-stack development practices including API design, authentication systems, database modeling, and deployment workflows.

---

## Key Features

### Authentication & Security
- JWT-based authentication system
- Secure password hashing using bcrypt
- Protected API routes
- Token-based session handling
- Environment variable protection

### Task Management
- Create, edit, delete tasks
- Priority levels (Low, Medium, High)
- Task completion tracking
- Due date management
- Tag-based organization
- Persistent drag-and-drop reordering

### Search & Filtering
- Real-time task search
- Filter by task status
- Tag-based filtering

### Dashboard Insights
- Total tasks overview
- Pending tasks tracking
- Completion analytics
- Overdue task indicators

### User Experience
- Dark and Light mode
- Glassmorphism interface
- Responsive design
- Smooth UI interactions
- Notification feedback

---

## Tech Stack

Frontend
- React
- Vite
- React Router
- Axios

Backend
- Node.js
- Express.js

Database
- MongoDB Atlas
- Mongoose

Authentication
- JSON Web Tokens (JWT)
- bcrypt

Development Tools
- Nodemon
- Concurrently

---

## Project Structure

task-manager
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server entry
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   └── application entry
│
├── package.json
└── README.md

---

## Installation & Setup

Clone the repository

git clone https://github.com/rudra20-04/task-manager.git

Move into the project

cd task-manager

Install dependencies

npm install

Install backend dependencies

cd backend
npm install

Install frontend dependencies

cd ../frontend
npm install

---

## Environment Configuration

Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secure_secret_key  
PORT=5000

---

## Running the Application

From the root directory run:

npm run dev

Application will start on:

Frontend  
http://localhost:5173

Backend  
http://localhost:5000

API  
http://localhost:5000/api

---

## API Endpoints

Authentication

POST /api/auth/signup  
POST /api/auth/login

Tasks

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  
PATCH /api/tasks/:id/status  
PUT /api/tasks/reorder

---

## Deployment

Backend Deployment
- Platform: Render
- Root directory: backend
- Build command: npm install
- Start command: node index.js

Frontend Deployment
- Platform: Vercel
- Root directory: frontend
- Build command: npm run build
- Output directory: dist

Environment variable required for frontend:

VITE_API_URL=your_backend_api_url

---

## Security Practices Implemented

- Password hashing before storage
- Token-based authentication
- User-specific data isolation
- Environment variable management
- Input validation

---

## What This Project Demonstrates

- Full-stack MERN architecture
- Authentication system design
- REST API development
- Database schema design
- Frontend state management
- Production deployment workflow
- Clean project documentation

---

## Future Enhancements

- Team collaboration
- Task sharing
- Activity logs
- Notifications system
- Mobile application version

---

## License

MIT License

---

## Author
GitHub: https://github.com/rudra20-04


GitHub: https://github.com/rudra20-04

EOF
