import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { useToast } from '../Context/ToastContext';
import { todoService } from '../Services/todoService';
import { useSearch } from '../Hooks/useSearch';
import GenericFormModal from '../Components/GenericFormModal';
import '../styles/GenericFormModal.css';
import Header from '../Common/Header';
import '../styles/TodosPage.css';

function TodosPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { showToast } = useToast();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('id');
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    filteredItems: filteredTodos,
    currentSortBy,
    handleSearch,
    handleSort
  } = useSearch(todos, ['title', 'id', 'completed'], sortBy);

  const isCurrentUser = user && user.id == userId;

  useEffect(() => {
    loadUserAndTodos();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSortMenu && !e.target.closest('.sort-container')) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSortMenu]);

  const loadUserAndTodos = async () => {
    if (!isCurrentUser) {
      navigate("/403");
      return;
    }

    setLoading(true);
    try {
      const data = await todoService.getTodos(userId);
      setTodos(data);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    if (!newTodo.title.trim()) return;
    const todoData = { ...newTodo, userId: user.id };
    const createdTodo = await todoService.createTodo(todoData);
    setTodos(prev => [...prev, createdTodo]);
    setNewTodo({ title: '', completed: false });
    setShowAddForm(false);
    showToast("Todo added successfully", "success");
  };

  const handleUpdateTodo = async (todoId, updates) => {
    const updatedTodo = await todoService.updateTodo(todoId, updates);
    setTodos(prev => prev.map(t => t.id === todoId ? updatedTodo : t));
    setEditingTodo(null);
    showToast("Todo updated successfully", "success");
  };

  const handleDeleteTodo = (todoId) => {
    setDeleteConfirm(todoId);
  };

  const confirmDelete = async () => {
    await todoService.deleteTodo(deleteConfirm);
    setTodos(prev => prev.filter(t => t.id !== deleteConfirm));
    showToast("Todo deleted successfully", "success");
    setDeleteConfirm(null);
  };

  const handleToggleComplete = async (todo) => {
    await handleUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div className="todos-page">
      <Header 
        onSearch={handleSearch}
        searchOptions={[
          { value: 'title', label: 'Search by Title' },
          { value: 'id', label: 'Search by ID' }
        ]}
      />

      <div className="todos-content">
        <div className="todos-layout">
          <div className="todos-list-container">
            <div className="todos-header">
              <button 
                className="back-btn-avatar"
                onClick={handleBackToHome}
                title="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <h2 className="todos-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
                  <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5 1.41-1.41L12 15.17l6.59-6.59L20 10l-8 8z"/>
                </svg>
                TODOS
              </h2>
              <div className="header-right-controls">
                <div className="sort-container">
                  <button 
                    className="sort-btn-avatar"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    title="Sort"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/>
                    </svg>
                  </button>
                  {showSortMenu && (
                    <div className="sort-dropdown">
                      <div 
                        className={`sort-option ${currentSortBy === 'id' ? 'active' : ''}`}
                        onClick={() => {
                          setSortBy('id');
                          handleSort('id');
                          setTimeout(() => setShowSortMenu(false), 300);
                        }}
                      >
                        Sort by ID
                      </div>
                      <div 
                        className={`sort-option ${currentSortBy === 'title' ? 'active' : ''}`}
                        onClick={() => {
                          setSortBy('title');
                          handleSort('title');
                          setTimeout(() => setShowSortMenu(false), 400);
                        }}
                      >
                        Sort by Title
                      </div>
                      <div 
                        className={`sort-option ${currentSortBy === 'completed' ? 'active' : ''}`}
                        onClick={() => {
                          setSortBy('completed');
                          handleSort('completed');
                          setTimeout(() => setShowSortMenu(false), 400);
                        }}
                      >
                        Sort by Status
                      </div>
                    </div>
                  )}
                </div>
                {isCurrentUser && (
                  <button 
                    className="add-btn-avatar"
                    onClick={() => setShowAddForm(true)}
                    title="Add Todo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="todos-grid">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">No todos found</div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-id">#{todo.id}</div>
                <div className="todo-info">
                  {editingTodo === todo.id ? (
                    <input
                      type="text"
                      className="todo-edit-input"
                      value={todo.title}
                      onChange={(e) => setTodos(prev => 
                        prev.map(t => t.id === todo.id ? { ...t, title: e.target.value } : t)
                      )}
                      onBlur={() => handleUpdateTodo(todo.id, { title: todo.title })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateTodo(todo.id, { title: todo.title });
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <span className="todo-title">{todo.title}</span>
                  )}
                </div>
                {isCurrentUser && (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                      className="todo-checkbox"
                    />
                    <button 
                      className="delete-icon-btn"
                      onClick={() => setEditingTodo(todo.id)}
                      title="Edit Todo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                    <button 
                      className="delete-icon-btn"
                      onClick={() => handleDeleteTodo(todo.id)}
                      title="Delete Todo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))
          )}
            </div>
          </div>
        </div>
      </div>

      <GenericFormModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Todo"
        onSubmit={handleAddTodo}
      >
        <input
          type="text"
          placeholder="Todo title"
          value={newTodo.title}
          onChange={(e) => setNewTodo(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={newTodo.completed}
            onChange={(e) => setNewTodo(prev => ({ ...prev, completed: e.target.checked }))}
          />
          Completed
        </label>
      </GenericFormModal>

      <GenericFormModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Todo"
        onSubmit={(e) => { e.preventDefault(); confirmDelete(); }}
        submitText="Delete"
      >
        <p style={{ margin: 0, fontSize: '15px', color: 'rgba(0,0,0,0.9)' }}>
          Are you sure you want to delete this todo? This action cannot be undone.
        </p>
      </GenericFormModal>
    </div>
  );
}

export default TodosPage;
