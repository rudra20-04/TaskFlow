const Task = require("../models/Task");

// --- Create Task ---
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: "Task title is required" });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({ error: "Title must be under 200 characters" });
    }
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ error: "Priority must be low, medium, or high" });
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ error: "Invalid due date format" });
    }

    const parsedTags = Array.isArray(tags)
      ? tags.map(t => t.trim()).filter(Boolean)
      : [];

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "medium",
      dueDate: dueDate || undefined,
      tags: parsedTags,
      order: 0,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not create task." });
  }
};

// --- Get All Tasks ---
exports.getTasks = async (req, res) => {
  try {
    const filter = { user: req.user.id };

    const validStatuses = ["pending", "completed"];
    if (req.query.status) {
      if (!validStatuses.includes(req.query.status)) {
        return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
      }
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({ order: 1, createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not fetch tasks." });
  }
};

// --- Update Task ---
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;

    if (title !== undefined && title.trim().length === 0) {
      return res.status(400).json({ message: "Task title cannot be empty" });
    }
    if (title && title.trim().length > 200) {
      return res.status(400).json({ message: "Title must be under 200 characters" });
    }
    const validPriorities = ["low", "medium", "high"];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Priority must be low, medium, or high" });
    }
    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: "Invalid due date format" });
    }

    const updates = {};
    if (title) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (priority) updates.priority = priority;
    if (dueDate !== undefined) updates.dueDate = dueDate || null;
    if (tags !== undefined) {
      updates.tags = Array.isArray(tags)
        ? tags.map(t => t.trim()).filter(Boolean)
        : [];
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not update task." });
  }
};

// --- Delete Task ---
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Could not delete task." });
  }
};

// --- Update Task Status Only ---
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not update task status." });
  }
};

// --- Reorder Tasks (drag & drop persistence) ---
exports.reorderTasks = async (req, res) => {
  try {
    const { order } = req.body;

    if (!Array.isArray(order) || order.length === 0) {
      return res.status(400).json({ error: "Order must be a non-empty array of { id, order }" });
    }

    await Promise.all(
      order.map(({ id, order: orderVal }) =>
        Task.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { order: orderVal }
        )
      )
    );

    res.json({ message: "Tasks reordered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error. Could not reorder tasks." });
  }
};