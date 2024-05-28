import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaProcedures,
  FaDonate,
  FaFileMedical,
  FaHistory,
  FaWarehouse,
} from "react-icons/fa";

function Sidebar({ children }) {
  const MenuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/donor",
      name: "Donor",
      icon: <FaUserPlus />,
    },
    {
      path: "/patient",
      name: "Patient",
      icon: <FaProcedures />,
    },
    {
      path: "/donation",
      name: "Donation",
      icon: <FaDonate />,
    },
    {
      path: "/bloodRequest",
      name: "Blood Requests",
      icon: <FaFileMedical />,
    },
    {
      path: "/requestHistory",
      name: "Request History",
      icon: <FaHistory />,
    },
    {
      path: "/bloodStock",
      name: "Blood Stock",
      icon: <FaWarehouse />,
    },
  ];

  return (
    <div>
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
      <div className="w-64 h-screen bg-blue-900 text-white">
        <div className="p-4 text-xl font-bold">Home</div>
        <nav className="mt-4">
          {MenuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="flex items-center p-4 text-white hover:bg-blue-700 transition-colors duration-200"
              activeClassName="bg-blue-700"
            >
              <div className="mr-3">{item.icon}</div>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      {/* isku xiraha */}
      <main>{children}</main>
      <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Quadrable Alliance. All rights reserved.</p>
          </div>
        </footer>
    </div>
  );
}

export default Sidebar;
