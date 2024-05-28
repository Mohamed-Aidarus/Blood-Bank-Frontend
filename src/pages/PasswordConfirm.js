import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../uploads/logo.png'; 

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center  bg-white shadow-md rounded p-6 border  max-w-sm mx-auto ">
      <img
        src={logo}
        alt="Astronaut"
        className="w-24 mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">Your password has been reset!</h2>
      <p className="text-center mb-4">Sign in again with your new password.</p>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  onClick={() => navigate('/')} >
        Return to Sign In
      </button>
    </div>
  );
};

export default PasswordResetConfirmation;