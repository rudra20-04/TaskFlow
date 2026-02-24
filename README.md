<div align="center">

  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" />

  <h1>✅ TaskFlow</h1>
  <p><strong>A full-stack MERN task manager with JWT authentication, drag-and-drop reordering, tags, priority system, and a beautiful dark/light glassmorphism UI.</strong></p>

  <a href="#demo">View Demo</a> •
  <a href="#features">Features</a> •
  <a href="#quickstart">Quick Start</a> •
  <a href="#api">API Docs</a> •
  <a href="#deploy">Deploy</a>

</div>

---

## 📸 Screenshots

> **Dashboard — Dark Mode**
> *(Add a screenshot here once the app is running)*

> **Dashboard — Light Mode**
> *(Add a screenshot here once the app is running)*

---

## ✨ Features

### 🔐 Authentication
- Secure **JWT-based** signup and login
- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Protected routes on both frontend and backend
- Auth token persisted in `localStorage` with 7-day expiry

### ✅ Task Management
- **Create, Read, Update, Delete** tasks
- **Priority levels** — Low 🟢 / Medium 🟡 / High 🔴
- **Status toggle** — Pending ↔ Completed (one click)
- **Due dates** with automatic **overdue detection** and red visual indicators
- **Tags** — add comma-separated tags to tasks; fully searchable
- **Drag-and-drop reordering** — order is saved to the database and persists across sessions

### 🔍 Search & Filter
- Real-time search across task titles, descriptions, and tags
- Filter by **All / Pending / Completed**

### 📊 Dashboard Stats
- Total tasks count
- Pending tasks count
- Completion rate (%)
- Overdue tasks count — highlights in red when > 0

### 🎨 UI / UX
- **Dark & Light mode** toggle with smooth transitions (persisted per user)
- **Glassmorphism** design with backdrop blur
- Smooth card hover animations and micro-interactions
- Toast notifications for all actions
- Responsive layout for mobile and desktop

---

## 🛠️ Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React 19, Vite 7, React Router 7 |
| Styling    | Vanilla CSS (glassmorphism)      |
| HTTP       | Axios with request interceptors  |
| Icons      | Lucide React                     |
| Backend    | Node.js, Express 5               |
| Database   | MongoDB Atlas + Mongoose 9       |
| Auth       | JWT + bcryptjs                   |
| Dev Tools  | Nodemon, Concurrently            |

---

## 🚀 Quick Start <a id="quickstart"></a>

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

### 2. Configure the Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmanager
JWT_SECRET=your_strong_random_secret_here_min_32_chars
PORT=5000
```

### 3. Install Dependencies
```bash
# From the root directory
npm install          # installs concurrently

cd backend
npm install          # installs express, mongoose, jwt, bcrypt, etc.

cd ../frontend
npm install          # installs react, vite, axios, lucide-react, etc.
```

### 4. Run the Full App
```bash
# From the root directory — starts both backend and frontend simultaneously
npm run dev
```

| Service  | URL                         |
|----------|-----------------------------|
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:5000        |
| API Root | http://localhost:5000/api    |

---

## 📡 API Reference <a id="api"></a>

### Auth Endpoints
| Method | Endpoint          | Description              | Auth |
|--------|-------------------|--------------------------|------|
| POST   | `/api/auth/signup` | Register a new user      | ❌   |
| POST   | `/api/auth/login`  | Login, returns JWT token | ❌   |

**Signup request body:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "securepass" }
```

**Login response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

---

### Task Endpoints
> All task endpoints require `Authorization: Bearer <token>` header

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/api/tasks`            | Get all tasks (supports `?status=`)  |
| POST   | `/api/tasks`            | Create a new task                    |
| PUT    | `/api/tasks/:id`        | Update a task (full update)          |
| DELETE | `/api/tasks/:id`        | Delete a task                        |
| PATCH  | `/api/tasks/:id/status` | Toggle task status only              |
| PUT    | `/api/tasks/reorder`    | Reorder tasks (drag & drop persist)  |

**Create task request body:**
```json
{
  "title": "Design landing page",
  "description": "Wireframe and prototype",
  "priority": "high",
  "dueDate": "2026-03-01",
  "tags": ["design", "frontend"]
}
```

**Task response object:**
```json
{
  "_id": "...",
  "title": "Design landing page",
  "description": "Wireframe and prototype",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-03-01T00:00:00.000Z",
  "tags": ["design", "frontend"],
  "order": 0,
  "user": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🌐 Deployment <a id="deploy"></a>

### Backend → [Render](https://render.com)
1. Push your code to GitHub
2. Create a new **Web Service** on Render
3. Set **Root Directory** to `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node index.js`
6. Add your environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`)

### Frontend → [Vercel](https://vercel.com)
1. Import your GitHub repo into Vercel
2. Set **Root Directory** to `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add env variable: `VITE_API_URL=https://your-render-backend.onrender.com/api`

> ⚠️ Update `frontend/src/api/api.js` to use `import.meta.env.VITE_API_URL` as the `baseURL` for production.

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Signup, login logic
│   │   └── taskController.js   # Task CRUD + reorder
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Task.js             # Task schema (tags, order, priority)
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth/*
│   │   └── taskRoutes.js       # /api/tasks/*
│   ├── .env                    # Environment variables (not committed)
│   ├── .env.example            # Template for env setup
│   └── index.js                # Express app entry point
│
├── frontend/
│   └── src/
│       ├── api/
│       │   └── api.js          # Axios instance with auth interceptor
│       ├── components/
│       │   └── Navbar.jsx      # Nav with auth state + theme toggle
│       ├── pages/
│       │   ├── Login.jsx       # Login page
│       │   ├── Signup.jsx      # Signup page
│       │   └── Dashboard.jsx   # Main app: tasks, drag & drop, stats
│       ├── App.jsx             # Routes + protected route guard
│       ├── main.jsx            # Entry point + theme initialization
│       └── index.css           # Full design system (dark + light mode)
│
├── .gitignore                  # Root gitignore (protects .env, node_modules)
└── package.json                # Root scripts: npm run dev starts everything
```

---

## 🔒 Security Notes
- `.env` is in `.gitignore` — credentials are never committed
- Passwords are hashed (bcryptjs, 10 salt rounds) before storage
- JWT tokens expire after 7 days
- All task endpoints verify ownership (`user: req.user.id`) — users can only access their own data
- Input validation on all endpoints (length, format, enum values)

---

## 📄 License

MIT © 2026 — feel free to use this project as a template or reference for your own work.

---

<div align="center">
  <p>Built with ❤️ using the MERN Stack</p>
  <p>
    <a href="https://github.com/YOUR_USERNAME">GitHub</a> •
    <a href="https://linkedin.com/in/YOUR_USERNAME">LinkedIn</a>
  </p>
</div>
#   T a s k F l o w  
 