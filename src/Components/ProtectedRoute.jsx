// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
i// In src/Components/ProtectedRoute.jsx

import { useAuth } from "../context/AuthContext";
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>; // Or a proper spinner
  }

  // If authenticated, render the child route content (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;