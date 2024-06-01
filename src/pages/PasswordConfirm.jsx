import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../uploads/logo.png'; 
import { ClipLoader } from 'react-spinners'; // Import spinner component

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Set initial countdown time to 5 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear interval when component unmounts
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center bg-white shadow-md rounded p-6 border max-w-sm mx-auto">
        <img
          src={logo}
          alt="Logo"
          className="w-20 sm:w-24 mb-4"
        />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Your password has been reset!</h2>
        <p className="text-center mb-4">
          You will be redirected to the sign-in page in <span className="text-red-500 font-bold">{countdown}</span> seconds.
        </p>
        <ClipLoader size={35} color={"#ff0000"} loading={true} />
      </div>
    </div>
  );
};

export default PasswordResetConfirmation;
