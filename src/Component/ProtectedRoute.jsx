import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Component/AuthProvider.jsx';
import NotAuthorized from '../pages/NotAuthorized.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(role)) {
    return <NotAuthorized />;
  }

  return children;
};

export default ProtectedRoute;