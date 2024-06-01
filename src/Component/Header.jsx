import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaHeart, FaHistory, FaSignOutAlt, FaBars } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuItem = [
    { path: "home", name: "Home", icon: <FaHome /> },
    { path: "UserManagement", name: "User Management", icon: <FaUserPlus /> },
    { path: "BloodManagement", name: "Blood Management", icon: <FaHeart /> },
    { path: "donationHistory", name: "Donation History", icon: <FaHistory /> },
    { path: "requestHistory", name: "Request History", icon: <FaHistory /> },
    { path: "/", name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <header>
      <nav className="bg-red-500 text-white flex items-center justify-between p-2 shadow-md">
        <div className="flex items-center">
          <Link to="home" className="text-1xl font-bold flex items-center space-x-2">
            <span>Blood Bank System</span>
          </Link>
          <div className="hidden md:flex space-x-4 ml-8">
            {MenuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-white"
                  }`
                }
              >
                <div className="text-1xl">{item.icon}</div>
                <div className="ml-1">{item.name}</div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-red-500 text-white flex flex-col items-center p-2 shadow-md">
          {MenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-white"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              <div className="text-1xl">{item.icon}</div>
              <div className="ml-1">{item.name}</div>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
