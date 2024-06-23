import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../uploads/logo.png'; // Adjust the path to your logo file
import { useLoginUserMutation } from '../store/api/UserSlice.js'; // Adjust the path to your user slice
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Component/AuthProvider.jsx'; // Adjust the import path
import { ClipLoader } from 'react-spinners'; // Import spinner component

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleFocus = () => {
    document.getElementById("email").focus();
  };

  const initialValues = { email: '', password: '' }
  useEffect(() => {
    handleFocus();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      const { token, user_data } = response;
      console.log(response); // Display response in console
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify(user_data)); 
      login(user_data.role, token); // Pass the user role and token to the login function
      navigate('/Dashboard/home'); // Adjust '/dashboard' to the actual path where your dashboard component is rendered
    } catch (error) {
      console.error("Error during login:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "Email not found");
      } else if (error.status === 400) {
        toast.error(error.data.message || "Invalid password");
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4] p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
          <h2 className="text-2xl sm:text-3xl font-bold">Login</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-red-500 font-bold text-xl sm:text-2xl mb-4">Sign in to your account</h1>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email address
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email && touched.email ? 'border-red-500' : ''
                  }`}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password && touched.password ? 'border-red-500' : ''
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 lg:px-20 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader size={20} color={"#fff"} loading={isLoading} />
                  ) : (
                    'SIGN IN'
                  )}
                </button>
                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/ForgotPassword"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">Don't have an account? <Link className="text-blue-500 hover:text-blue-800" to="/Register">Register</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
