import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmailSent = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded px-8 pb-6 text-center">
      <h2 className="text-lg font-medium mb-4">Email sent</h2>
      <p className="text-gray-500 mb-4">
        A link to reset your password has been sent to you on your Email.
      </p>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  onClick={() => navigate('/')} >
        Return to Sign In
      </button>
    </div>
  );
};

export default EmailSent;