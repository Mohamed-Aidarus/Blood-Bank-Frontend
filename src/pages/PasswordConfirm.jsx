import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../uploads/logo.png'; 

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Set initial countdown time to 3 seconds

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Navigate back to login page when countdown reaches 0
    if (countdown === 0) {
      navigate('/');
    }

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded p-6 border max-w-sm mx-auto">
      <img
        src={logo}
        alt="Logo"
        className="w-24 mb-4"
      />
      <h2 className="text-2xl font-semibold mb-2">Your password has been reset!</h2>
      <p className="text-center mb-4">
        You will be redirected to the sign-in page in 5 seconds.
      </p>
      <span className="text-red-500  font-bold"> {countdown} </span>
    </div>
  );
};

export default PasswordResetConfirmation;
