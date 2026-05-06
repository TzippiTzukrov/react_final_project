import { get, post, patch, del } from './apiService';

export const getTodos = (userId) => get(`/todos?userId=${userId}`);

export const createTodo = (data) => post('/todos', data);

export const updateTodo = (id, updates) => patch(`/todos/${id}`, updates);

export const deleteTodo = (id) => del(`/todos/${id}`);
