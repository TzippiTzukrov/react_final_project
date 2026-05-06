import { get, post, postPublic, patch } from './apiService';

export const getUserByUsername = async (username) => {
  const users = await get(`/users?username=${username}`);
  return users[0] || null;
};

export const getUserById = async (userId) => {
  try {
    return await get(`/users/${userId}`);
  } catch (error) {
    if (error.message.includes('404')) return null;
    throw error;
  }
};

export const getUsers = () => get('/users');

export const getUsersPaginated = (start = 0, limit = 6) =>
  get(`/users?_start=${start}&_end=${start + limit}`);

export const registerUser = async (userData) => {
  const { id, ...userDataWithoutId } = userData;
  const response = await postPublic('/users', userDataWithoutId);
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  return response.user || response;
};

export const loginUser = async (formData) => {
  const response = await postPublic('/users/login', formData);
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  return response.user || response;
};

export const updateUser = (userId, userData) => patch(`/users/${userId}`, userData);
