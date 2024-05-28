import React from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";


import Sidebar from "./Component/Sidebar.jsx";
import Registration from "./pages/Registration.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import Request_History from "./pages/Request_History.js";
import Donor from "./pages/Donor.js";
import Patient from "./pages/Patient.js";
import Donation from "./pages/Donation.js";
import Blood_Requests from "./pages/Blood_Requests.js";
import Blood_Stock from "./pages/Blood_Stock.js";
import ResetPassword from "./pages/ResetPassword.js";
import Login from "./pages/Login.js";
import EmailSent from './pages/EmailSent.js';
import PasswordResetConfirmation from "./pages/PasswordConfirm.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmailSent" element={<EmailSent />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/PasswordResetConfirmation" element={<PasswordResetConfirmation />} />


      </Routes>
      <Sidebar>
        <Routes>
          {/* Authentication Routes */}         
          <Route path="/home" element={<Home />} />
          
         
          <Route path="/donor" element={<Donor />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/bloodRequest" element={<Blood_Requests />} />
          <Route path="/bloodStock" element={<Blood_Stock />} />
          <Route path="/requestHistory" element={<Request_History />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
