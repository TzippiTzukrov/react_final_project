import { apiService } from './apiService';

export const commentService = {
  getComments: () => apiService.getComments(),
  createComment: (data) => apiService.createComment(data),
  updateComment: (id, updates) => apiService.updateComment(id, updates),
  deleteComment: (id) => apiService.deleteComment(id)
};