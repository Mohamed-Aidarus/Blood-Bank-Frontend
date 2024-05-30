import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="max-w-xs bg-white shadow-md rounded px-8 py-6 text-center">
        <h2 className="text-lg font-medium mb-4">Email Sent</h2>
        <p className="text-gray-500 mb-6">
          A link to reset your password has been sent to {email || 'your email address'}.
          or you can use this link below instead !! 
        </p>
        <p>
          <a href={`/ResetPassword?email=${encodeURIComponent(email)}`} className="text-blue-500 underline">
            Reset Password
          </a>
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="button"
          onClick={() => navigate('/')}
        >
          Return to Sign In
        </button>
      </div>
    </div>
  );
};

export default EmailSent;
