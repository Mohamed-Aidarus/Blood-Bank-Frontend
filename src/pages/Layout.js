// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
        <header className="bg-[#CDDBE6] shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <div className="header-logo">
            <Link to="/" className="text-2xl font-bold text-red-500">
              Blood Bank System
            </Link>
          </div>
          <div className="header-logout">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;