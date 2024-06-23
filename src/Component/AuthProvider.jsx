import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode'; // Correct import path

// Create a context to manage authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Function to handle user login
  const login = (userRole, token) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('token', token);  // Store token in localStorage for persistence
    Cookies.set('token', token, { expires: 1 }); // Set cookie with expiration of 1 day
  };

  // Function to handle user logout
  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');  // Remove token from localStorage
    Cookies.remove('token');  // Remove token cookie
  };

  // Effect to check for token on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const { role } = decodedToken;
        setIsAuthenticated(true);
        setRole(role);
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Clear invalid token
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Provide the authentication context to the rest of the application
  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext anywhere in your application
export const useAuth = () => useContext(AuthContext);
