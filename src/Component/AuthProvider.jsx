import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const login = (userRole, token) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 1 }); // Set cookie with expiration of 1 day
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');
    Cookies.remove('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { role } = decodedToken;
        setIsAuthenticated(true);
        setRole(role);
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Clear invalid token
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
