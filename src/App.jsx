// App.jsx
import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import RequestHistory from "./pages/Request_History.jsx";
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


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/EmailSent" element={<EmailSent />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/PasswordResetConfirmation" element={<PasswordResetConfirmation />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/Dashboard/*"element={
              <ProtectedRoute allowedRoles={['admin', 'donor']}>
                <Dashboard />
              </ProtectedRoute>}>
            <Route path="home"element={
                <ProtectedRoute allowedRoles={['admin', 'donor']}>
                  <Home />
                </ProtectedRoute>
              } />
            <Route path="UserManagement" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
            <Route path="donationHistory" element={
                <ProtectedRoute allowedRoles={['admin', 'donor']}>
                  <DonationHistory />
                </ProtectedRoute>
              }/>
            <Route path="requestHistory" element={
                <ProtectedRoute allowedRoles={['admin', 'donor']}>
                  <RequestHistory />
                </ProtectedRoute>} />
            <Route path="BloodManagement" element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <BloodManagement />
                </ProtectedRoute>
              } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
