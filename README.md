<div align="center">

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

<h1>✅ TaskFlow</h1>

<p>
<strong>A modern full-stack MERN task manager with secure JWT authentication, drag-and-drop task reordering, tags, priority system, analytics dashboard, and a beautiful glassmorphism UI with dark/light mode.</strong>
</p>

<a href="#features">Features</a> •
<a href="#quickstart">Quick Start</a> •
<a href="#api">API</a> •
<a href="#deploy">Deployment</a>

</div>

---

# 🌍 Live Demo
*(Add after deployment)*

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

## 🔐 Authentication
- Secure **JWT-based authentication**
- User **signup and login system**
- Password hashing using **bcryptjs**
- Protected routes (frontend + backend)
- Token stored securely in localStorage
- Session expiry (7 days)

---

## ✅ Task Management
- Create, update, delete tasks
- Priority system  
  - Low 🟢  
  - Medium 🟡  
  - High 🔴
- Toggle task status instantly
- Due dates with **overdue detection**
- Tag system for task categorization
- Drag-and-drop reordering
- Task order saved in database

---

## 🔍 Search & Filters
- Real-time search
- Search by:
  - Title
  - Description
  - Tags
- Filter tasks:
  - All
  - Pending
  - Completed

---

## 📊 Dashboard Analytics
- Total tasks
- Pending tasks
- Completion rate
- Overdue tasks indicator

---

## 🎨 UI / UX
- Dark and Light mode toggle
- Glassmorphism UI
- Smooth animations
- Toast notifications
- Mobile responsive
- Modern dashboard layout

---

# 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 19, Vite 7, React Router |
| Styling | CSS (Glassmorphism UI) |
| HTTP Client | Axios |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| ORM | Mongoose |
| Authentication | JWT |
| Security | bcryptjs |
| Dev Tools | Nodemon, Concurrently |

---

# 🚀 Quick Start

## 1. Clone the Repository

```bash
git clone https://github.com/rudra20-04/task-manager.git
cd task-manager
