const API_BASE_URL = "http://localhost:3000";

class APIService {

  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Failed to create ${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error);
      throw error;
    }
  }

  async patch(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Failed to update ${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error(`PATCH ${endpoint} error:`, error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error(`Failed to delete ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error);
      throw error;
    }
  }

  getUserByUsername = (username) => this.get(`/users?username=${username}`).then(users => {
    const user = users[0] || null;
    return user;
  });

  getUserById = async (userId) => {
    try {
      const user = await this.get(`/users/${userId}`);
      return user;
    } catch (error) {
      if (error.message.includes('404')) return null; 
      throw error;
    }
  };

  getUsers = () => this.get('/users');

  getUsersPaginated = (start = 0, limit = 6) => this.get(`/users?_start=${start}&_end=${start + limit}`);

  registerUser = (userData) => {
    const { id, ...userDataWithoutId } = userData;
    return this.post('/users', userDataWithoutId).then(user => {
      return user;
    });
  };

  loginUser = async (formData) => {
    const users = await this.get(`/users?username=${formData.username}`);
    if (users.length === 0 || users[0].website !== formData.password) {
      throw new Error("Invalid username or password");
    }
    const { website, ...userWithoutPassword } = users[0];
    return userWithoutPassword;
  };

  getPosts = (start = 0, limit = 10) => this.get(`/posts?_start=${start}&_end=${start + limit}`);
  getPostsByUserId = (userId) => this.get(`/posts?userId=${userId}`);
  getPostById = (postId) => this.get(`/posts/${postId}`);
  createPost = (data) => this.post('/posts', data);
  updatePost = (id, updates) => this.patch(`/posts/${id}`, updates);
  deletePost = (id) => this.delete(`/posts/${id}`);

  getComments = () => this.get('/comments');
  getCommentsByPost = (postId) => this.get(`/comments?postId=${postId}`);
  createComment = (data) => this.post('/comments', data);
  updateComment = (id, updates) => this.patch(`/comments/${id}`, updates);
  deleteComment = (id) => this.delete(`/comments/${id}`);

  getTodos = (userId) => this.get(`/todos?userId=${userId}`);
  createTodo = (data) => this.post('/todos', { ...data, id: Date.now().toString() });
  updateTodo = (id, updates) => this.patch(`/todos/${id}`, updates);
  deleteTodo = (id) => this.delete(`/todos/${id}`);

  getAlbums = (userId) => this.get(`/albums?userId=${userId}`);
  createAlbum = (data) => this.post('/albums', data);
  updateAlbum = (id, updates) => this.patch(`/albums/${id}`, updates);
  deleteAlbum = (id) => this.delete(`/albums/${id}`);

  getPhotos = (albumId) => this.get(`/photos?albumId=${albumId}`);
  getPhotosPaginated = (albumId, start = 0, limit = 15) => this.get(`/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`);
  createPhoto = (data) => this.post('/photos', data);
  updatePhoto = (id, updates) => this.patch(`/photos/${id}`, updates);
  deletePhoto = (id) => this.delete(`/photos/${id}`);
}

export const apiService = new APIService();