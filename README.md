cat > README.md << 'EOF'
# ✅ TaskFlow

A modern full-stack **MERN Task Manager** with JWT authentication, drag-and-drop task reordering, tags, priority system, analytics dashboard, and glassmorphism UI with dark/light mode.

---

# 🌍 Live Demo
(Add after deployment)

Frontend: https://your-frontend-link.vercel.app  
Backend API: https://your-backend-link.onrender.com/api

---

# 📸 Screenshots

### Dashboard — Dark Mode
![Dashboard Dark](./screenshots/dashboard-dark.png)

### Dashboard — Light Mode
![Dashboard Light](./screenshots/dashboard-light.png)

---

# ✨ Features

## Authentication
- JWT based login & signup
- Password hashing using bcryptjs
- Protected routes
- Token stored in localStorage
- Session expiry

## Task Management
- Create, update, delete tasks
- Priority levels (Low / Medium / High)
- Task completion toggle
- Due dates with overdue detection
- Tags support
- Drag and drop task reordering

## Search & Filters
- Real-time search
- Filter tasks (All / Pending / Completed)

## Dashboard Stats
- Total tasks
- Pending tasks
- Completion rate
- Overdue tasks

## UI
- Dark & Light mode
- Glassmorphism design
- Smooth animations
- Responsive layout

---

# 🛠 Tech Stack

Frontend:
React, Vite, React Router

Backend:
Node.js, Express

Database:
MongoDB Atlas, Mongoose

Authentication:
JWT, bcryptjs

Tools:
Axios, Nodemon, Concurrently

---

# 🚀 Quick Start

Clone the repo

git clone https://github.com/rudra20-04/task-manager.git
cd task-manager

Install dependencies

npm install
cd backend && npm install
cd ../frontend && npm install

Run project

npm run dev

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

API:
http://localhost:5000/api

---

# 📡 API

Auth

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

# 🌐 Deployment

Backend → Render  
Frontend → Vercel

Add environment variables:

MONGO_URI  
JWT_SECRET  
PORT  
VITE_API_URL

---

# 📁 Project Structure

task-manager
backend
controllers
models
routes
middleware
frontend
components
pages
api

---

# 🔒 Security

- Password hashing
- JWT authentication
- Protected routes
- User-based access control
- Environment variables secured

---

# 🧠 What I Learned

- Building a full MERN stack application
- Implementing authentication
- Creating REST APIs
- Database design with MongoDB
- Deploying full-stack apps
- Writing professional README files

---

# 📈 Future Improvements

- Team collaboration
- Notifications
- Task sharing
- Mobile app version

---

# 📄 License

MIT License

Built with ❤️ using MERN Stack

EOF
