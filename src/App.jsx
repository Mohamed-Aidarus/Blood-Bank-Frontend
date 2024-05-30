import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Sidebar from "./Component/Sidebar.jsx";
import Registration from "./pages/Registration.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Request_History from "./pages/Request_History.jsx";
import Donor from "./pages/Donor.jsx";
import Patient from "./pages/Patient.jsx";
import Donation from "./pages/Donation.jsx";
import Blood_Requests from "./pages/Blood_Requests.jsx";
import Blood_Stock from "./pages/Blood_Stock.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/Login.jsx";
import EmailSent from './pages/EmailSent.jsx';
import PasswordResetConfirmation from "./pages/PasswordConfirm.jsx";
import ProtectedRoute from './Component/ProtectedRoute.jsx';
import { AuthProvider } from './Component/AuthProvider.jsx'; // Adjust the import path


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/EmailSent" element={<EmailSent />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/PasswordResetConfirmation" element={<PasswordResetConfirmation />} />
          <Route path="app" element={<Sidebar />}>
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="donor" element={<ProtectedRoute><Donor /></ProtectedRoute>} />
            <Route path="patient" element={<ProtectedRoute><Patient /></ProtectedRoute>} />
            <Route path="donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
            <Route path="bloodRequest" element={<ProtectedRoute><Blood_Requests /></ProtectedRoute>} />
            <Route path="bloodStock" element={<ProtectedRoute><Blood_Stock /></ProtectedRoute>} />
            <Route path="requestHistory" element={<ProtectedRoute><Request_History /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
