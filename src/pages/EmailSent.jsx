import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import spinner component

const EmailSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg bg-white shadow-md rounded px-8 py-6 text-center">
        <h2 className="text-xl sm:text-2xl font-medium mb-4">Email Sent</h2>
        <p className="text-gray-500 mb-6">
          A link to reset your password has been sent to {email || 'your email address'}.
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="button"
          onClick={handleNavigation}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader size={20} color={"#fff"} loading={isLoading} /> : 'Return to Sign In'}
        </button>
      </div>
    </div>
  );
};

export default EmailSent;
