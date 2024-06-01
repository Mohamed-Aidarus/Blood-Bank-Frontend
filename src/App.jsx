// App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Request_History from "./pages/Request_History.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/Login.jsx";
import EmailSent from "./pages/EmailSent.jsx";
import PasswordResetConfirmation from "./pages/PasswordConfirm.jsx";
import { AuthProvider } from './Component/AuthProvider.jsx';
import ProtectedRoute from './Component/ProtectedRoute.jsx';
import UserManagement from "./pages/UserManagement.jsx";
import BloodManagement from "./pages/BloodManagement.jsx";
import DonationHistory from "./pages/DonationHistory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotAuthorized from "./pages/NotAuthorized.jsx";
import { NavLink, Link } from "react-router-dom";
 // A page to show when access is denied
 import { FaHome, FaUserPlus, FaProcedures, FaFileMedical, FaHistory, FaWarehouse, FaLogin, FaSignOutAlt, FaHeart } from "react-icons/fa";

function App() {
  const MenuItem = [
    { path: "/home", name: "Home",
     icon: <FaHome /> },
    { path: "/UserManagement", name: "User Management", icon: <FaUserPlus /> },
    { path: "/BloodManagement", name: "Blood Management", icon: <FaHeart /> },
    { path: "/donationHistory", name: "Donation History", icon: <FaHistory /> },
    { path: "/requestHistory", name: "Request History", icon: <FaHistory /> },
    { path: "/", name: "Logout", icon: <FaSignOutAlt /> },
  ];
  return (
    <>
    <header>
    <nav className="bg-red-500 text-white flex items-center justify-between p-2 shadow-md ">
    <div className="flex items-center">
      <Link to="/home" className="text-1xl font-bold flex items-center space-x-2">
        <span>Blood Bank System</span>
      </Link>
      <div className="flex space-x-4 ml-8">
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
            <div className="ml-1 ">{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
    <div>

    </div>
  </nav>

    </header>
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/EmailSent" element={<EmailSent />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/PasswordResetConfirmation" element={<PasswordResetConfirmation />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />  {/* Fallback for unauthorized access */}
          <Route path="/home" element={<Home />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/donationHistory" element={<DonationHistory />} />
          <Route path="/requestHistory" element={<Request_History />} />

          <Route path="/BloodManagement" element={<BloodManagement />} />




        </Routes>
      </AuthProvider>
    </div>
    </>
  );
}

export default App;
