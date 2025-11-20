// client/src/api/postApi.js (Updated)
import apiClient from './apiClient';

export const postApi = {
  // Public route
  getAllPosts: () => apiClient.get('/posts'),
  
  // Protected routes (token automatically injected by interceptor)
  getPost: (id) => apiClient.get(`/posts/${id}`),
  createPost: (postData) => apiClient.post('/posts', postData),
  updatePost: (id, postData) => apiClient.put(`/posts/${id}`, postData),
  deletePost: (id) => apiClient.delete(`/posts/${id}`),
};

export const authApi = {
    register: (userData) => apiClient.post('/auth/register', userData),
    login: (credentials) => apiClient.post('/auth/login', credentials),
    // You might add a 'logout' which just clears the token locally
};