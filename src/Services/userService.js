import { apiService } from './apiService';

export const getUserByUsername = (username) => apiService.getUserByUsername(username);
export const registerUser = (userData) => apiService.registerUser(userData);
export const loginUser = (formData) => apiService.loginUser(formData);
export const getUserById = (userId) => apiService.getUserById(userId);
export const getUsers = () => apiService.getUsers();