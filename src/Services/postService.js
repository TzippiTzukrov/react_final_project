import { apiService } from './apiService';

export const postService = {
  getPosts: (start = 0, limit = 10) => apiService.getPosts(start, limit),
  getPostById: (postId) => apiService.getPostById(postId),
  getPostsByUserId: (userId) => apiService.getPostsByUserId(userId),
  createPost: (data) => apiService.createPost(data),
  updatePost: (id, updates) => apiService.updatePost(id, updates),
  deletePost: (id) => apiService.deletePost(id),

  excludeUserPosts(posts, userId) {
    if (!userId) return posts;
    return posts.filter(post => post.userId != userId);
  },

  filterMyPosts(posts, userId) {
    if (!userId) return [];
    return posts.filter(post => post.userId == userId);
  },

  shufflePosts(posts) {
    return [...posts].sort(() => Math.random() - 0.5);
  }
};