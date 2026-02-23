import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://127.0.0.1:8000/api/todo/'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [menuOpen, setMenuOpen] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    try {
      await axios.post(API_URL, {
        title,
        description,
        completed: false
      })
      setTitle('')
      setDescription('')
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      await axios.patch(`${API_URL}${id}/`, { completed: !completed })
      fetchTodos()
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`)
      setDeleteId(null)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
  }

  const saveEdit = async () => {
    try {
      await axios.patch(`${API_URL}${editingId}/`, {
        title: editTitle,
        description: editDescription
      })
      setEditingId(null)
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const clearAll = async () => {
    try {
      const deletePromises = todos.map(todo => axios.delete(`${API_URL}${todo.id}/`))
      await Promise.all(deletePromises)
      fetchTodos()
    } catch (error) {
      console.error('Error clearing todos:', error)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="todo-container">
      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="add-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description (optional)"
          className="add-textarea"
          rows="1"
        />
      </form>

      <div className="filter-bar">
        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        {todos.length > 0 && (
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
              className="todo-checkbox"
            />
            <div className="todo-content">
              <div className="todo-title">{todo.title}</div>
              {todo.description && (
                <div className="todo-description">{todo.description}</div>
              )}
              <div className="todo-date">{formatDate(todo.created_at)}</div>
            </div>
            <div className="todo-menu">
              <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === todo.id ? null : todo.id)}>
                ⋯
              </button>
              {menuOpen === todo.id && (
                <div className="menu-dropdown active">
                  <button onClick={() => { startEdit(todo); setMenuOpen(null); }}>Edit</button>
                  <button onClick={() => { setDeleteId(todo.id); setMenuOpen(null); }}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <p className="empty-message">No todos yet. Add one above!</p>
        )}
      </div>

      {editingId && (
        <div className="modal active">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="modal-input"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
              rows="3"
              className="modal-textarea"
            />
            <div className="modal-buttons">
              <button onClick={saveEdit} className="btn-primary">
                Save
              </button>
              <button onClick={() => setEditingId(null)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal active">
          <div className="modal-content">
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button onClick={() => deleteTodo(deleteId)} className="btn-danger">
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
