import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Adjust the import path

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
