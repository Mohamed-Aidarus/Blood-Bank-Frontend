import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../store/api/UserSlice.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
      toast.success('Password reset email sent successfully!');
      navigate('/EmailSent', { state: { email } });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      if (error.status === 404) {
        toast.error(error.data.message || 'User not found');
      } else {
        toast.error('Failed to send password reset email. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-red-500 font-bold text-2xl mb-4">Forgot Password</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <Link className="text-blue-500 hover:text-blue-800" to="/">
                  Back to Login{" "}
                </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
