import { findAllTodos, findTodoById, insertTodo, updateTodoById, deleteTodoById } from '../services/todosService.js';

export const getAllTodos = async (req, res) => {
  try {
    const query = { ...req.query, userId: req.user.id };
    res.json(await findAllTodos(query));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await findTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    
    if (todo.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only access your own todos.' });
    
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todoData = { ...req.body, user_id: req.user.id };
    res.status(201).json(await insertTodo(todoData));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const existing = await findTodoById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Todo not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only edit your own todos.' });
    
    const updated = await updateTodoById(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const existing = await findTodoById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Todo not found' });
    
    if (existing.user_id !== req.user.id)
      return res.status(403).json({ error: 'Access denied. You can only delete your own todos.' });
    
    await deleteTodoById(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};