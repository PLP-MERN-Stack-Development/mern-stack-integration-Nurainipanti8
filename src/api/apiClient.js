// client/src/api/apiClient.js
import axios from 'axios';

// Create a reusable Axios instance for all authenticated requests
const apiClient = axios.create({
  baseURL: '/api', // Handles both posts and auth routes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject the token into every request
apiClient.interceptors.request.use(config => {
  // Get token from localStorage (or other secure storage)
  const token = localStorage.getItem('authToken'); 
  
  if (token) {
    // Add the token to the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;