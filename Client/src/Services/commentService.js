import { get, post, patch, del } from './apiService';

export const getComments = () => get('/comments');

export const getCommentsByPost = (postId) => get(`/comments?postId=${postId}`);

export const createComment = (data) => post('/comments', data);

export const updateComment = (id, updates) => patch(`/comments/${id}`, updates);

export const deleteComment = (id) => del(`/comments/${id}`);
