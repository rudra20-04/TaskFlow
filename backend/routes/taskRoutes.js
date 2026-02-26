const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  reorderTasks
} = require("../controllers/taskController");

// NOTE: /tasks/reorder must be defined BEFORE /tasks/:id
// so Express doesn't treat "reorder" as a dynamic :id param
router.put("/tasks/reorder", authMiddleware, reorderTasks);

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);
router.patch("/tasks/:id/status", authMiddleware, updateTaskStatus);

module.exports = router;