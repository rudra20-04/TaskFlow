import React, { useState, useEffect } from 'react';
import api from '../api/api';
import {
  Plus, Trash2, CheckCircle2, Circle, Clock, Search, Loader2,
  Edit2, Calendar, AlertCircle, CheckCircle, Tag, GripVertical,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: '', description: '', priority: 'medium', dueDate: '', tags: ''
  });

  // Drag & drop state
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => { fetchTasks(); }, [statusFilter]);

  // ── Toasts ──────────────────────────────────────────────────────────────────
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // ── API calls ────────────────────────────────────────────────────────────────
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' ? '/tasks' : `/tasks?status=${statusFilter}`;
      const { data } = await api.get(url);
      setTasks(data);
    } catch {
      addToast('Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = currentTask.tags
      ? currentTask.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    const payload = { ...currentTask, tags: tagsArray };

    try {
      if (isEditing) {
        const { data } = await api.put(`/tasks/${currentTask._id}`, payload);
        setTasks(tasks.map(t => t._id === currentTask._id ? data : t));
        addToast('Task updated successfully ✓');
      } else {
        const { data } = await api.post('/tasks', payload);
        setTasks([data, ...tasks]);
        addToast('Task created successfully ✓');
      }
      setIsModalOpen(false);
    } catch (err) {
      addToast(err.response?.data?.error || 'Error saving task', 'error');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const { data } = await api.patch(`/tasks/${id}/status`, { status: newStatus });
      setTasks(tasks.map(t => t._id === id ? data : t));
      addToast(`Marked as ${newStatus}`);
    } catch {
      addToast('Error updating status', 'error');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      addToast('Task deleted');
    } catch {
      addToast('Error deleting task', 'error');
    }
  };

  // ── Modal helpers ────────────────────────────────────────────────────────────
  const openAddModal = () => {
    setIsEditing(false);
    setCurrentTask({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setIsEditing(true);
    setCurrentTask({
      _id: task._id,
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      tags: (task.tags || []).join(', '),
    });
    setIsModalOpen(true);
  };

  // ── Drag & Drop ──────────────────────────────────────────────────────────────
  const canDrag = !search && statusFilter === 'all';

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== dragOverId) setDragOverId(id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const reordered = [...tasks];
    const fromIdx = reordered.findIndex(t => t._id === draggedId);
    const toIdx = reordered.findIndex(t => t._id === targetId);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);

    setTasks(reordered);
    setDraggedId(null);
    setDragOverId(null);

    // Persist to backend
    api.put('/tasks/reorder', {
      order: reordered.map((t, i) => ({ id: t._id, order: i }))
    }).catch(() => addToast('Could not save order', 'error'));
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const isOverdue = (task) =>
    task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date();

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.description && t.description.toLowerCase().includes(search.toLowerCase())) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  // ── Stats ────────────────────────────────────────────────────────────────────
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(isOverdue).length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="dashboard-page animate-fade">

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="title-gradient">Dashboard</h1>
          <p className="text-muted">Welcome back! Here's your progress.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card glass-card">
          <span className="stat-value" style={{ color: 'var(--success)' }}>{completionRate}%</span>
          <span className="stat-label">Completion</span>
        </div>
        <div className="stat-card glass-card">
          <span
            className="stat-value"
            style={{ color: overdueTasks > 0 ? 'var(--danger)' : 'inherit' }}
          >
            {overdueTasks}
          </span>
          <span className="stat-label">Overdue</span>
        </div>
      </div>

      {/* Controls */}
      <div className="controls glass-card">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >All</button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >Pending</button>
          <button
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >Completed</button>
        </div>
      </div>

      {canDrag && tasks.length > 1 && (
        <p className="drag-hint">
          <GripVertical size={14} /> Drag cards to reorder — order is saved automatically
        </p>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content glass-card animate-fade" onClick={e => e.stopPropagation()}>
            <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task Title *"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                required
                autoFocus
              />
              <textarea
                placeholder="Description (optional)"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                rows="3"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Priority</label>
                  <select
                    value={currentTask.priority}
                    onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
                    style={{ width: '100%' }}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    value={currentTask.dueDate}
                    onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">
                  <Tag size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Tags <span style={{ fontWeight: 400, opacity: 0.7 }}>(comma separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. work, design, urgent"
                  value={currentTask.tags}
                  onChange={(e) => setCurrentTask({ ...currentTask, tags: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Grid */}
      <div className="task-grid">
        {loading ? (
          <div className="loading-state">
            <Loader2 className="animate-spin" size={40} />
            <p>Gathering your tasks...</p>
          </div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map(task => {
            const overdue = isOverdue(task);
            return (
              <div
                key={task._id}
                className={[
                  'task-card glass-card',
                  task.status === 'completed' ? 'completed' : '',
                  overdue ? 'overdue' : '',
                  draggedId === task._id ? 'dragging' : '',
                  dragOverId === task._id && draggedId !== task._id ? 'drag-over' : '',
                ].filter(Boolean).join(' ')}
                draggable={canDrag}
                onDragStart={(e) => handleDragStart(e, task._id)}
                onDragOver={(e) => handleDragOver(e, task._id)}
                onDrop={(e) => handleDrop(e, task._id)}
                onDragEnd={handleDragEnd}
              >
                {/* Overdue banner */}
                {overdue && (
                  <div className="overdue-banner">
                    <AlertTriangle size={11} />
                    OVERDUE
                  </div>
                )}

                <div className="task-header">
                  {canDrag && (
                    <div className="drag-handle" title="Drag to reorder">
                      <GripVertical size={16} />
                    </div>
                  )}

                  <button className="status-btn" onClick={() => toggleStatus(task._id, task.status)}>
                    {task.status === 'completed'
                      ? <CheckCircle2 className="text-success" size={22} />
                      : <Circle size={22} />
                    }
                  </button>

                  <div className="task-info">
                    <div className="task-title-row">
                      <span className={`priority-badge priority-${task.priority || 'medium'}`}>
                        {task.priority || 'medium'}
                      </span>
                      <h3>{task.title}</h3>
                    </div>
                    {task.description && <p className="task-desc">{task.description}</p>}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="tags-row">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="tag-chip">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="task-actions">
                    <button className="icon-btn edit-btn" onClick={() => openEditModal(task)} title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => deleteTask(task._id)} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="task-footer">
                  <div className="task-meta">
                    <Clock size={13} />
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    {task.dueDate && (
                      <>
                        <Calendar size={13} />
                        <span style={{
                          color: overdue ? 'var(--danger)' : 'inherit',
                          fontWeight: overdue ? '700' : 'normal',
                        }}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                  <span className={`status-badge ${task.status}`}>{task.status}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state glass-card">
            <CheckCircle2 size={52} className="text-muted" />
            <p>No tasks found. Start by adding one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
