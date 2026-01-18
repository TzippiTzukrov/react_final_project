import { apiService } from './apiService';

export const todoService = {
  getTodos: (userId) => apiService.getTodos(userId),
  createTodo: (data) => apiService.createTodo(data),
  updateTodo: (id, updates) => apiService.updateTodo(id, updates),
  deleteTodo: (id) => apiService.deleteTodo(id)
};