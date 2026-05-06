import { get, post, patch, del } from './apiService';

export const getPosts = (start = 0, limit = 10) =>
  get(`/posts?_start=${start}&_end=${start + limit}`);

export const getPostsByUserId = (userId) => get(`/posts?userId=${userId}`);

export const getPostById = (postId) => get(`/posts/${postId}`);

export const createPost = (data) => post('/posts', data);

export const updatePost = (id, updates) => patch(`/posts/${id}`, updates);

export const deletePost = (id) => del(`/posts/${id}`);
