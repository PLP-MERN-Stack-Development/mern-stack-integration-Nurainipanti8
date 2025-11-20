// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/postApi'; 





const AuthContext = createContext(); 
// ...


 export const useAuth = () => useContext(AuthContext); // Custom hook for easy acces

  useEffect(() => {
    // Basic check: If token exists, assume logged in for simplicity.
    // In a production app, you'd make a call to a 'verify' or 'me' API endpoint here.
    const token = localStorage.getItem('authToken');
    if (token) {
        // Here you might decode the JWT payload to get user data if it's stored there.
        // For now, we'll set a placeholder user if a token exists.
        // The user object should contain non-sensitive info like { id, username, email }
        setUser({ username: 'Authenticated User' }); 
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const { token, data } = response.data;

    localStorage.setItem('authToken', token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    const { token, data } = response.data;
    
    localStorage.setItem('authToken', token);
    setUser(data.user);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;


