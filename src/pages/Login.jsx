import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../uploads/logo.png'; // Adjust the path to your logo file
import { useLoginUserMutation } from '../store/api/UserSlice.js'; // Adjust the path to your user slice
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Component/AuthProvider.jsx'; // Adjust the import path

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
      console.log(response); // Display response in console
      toast.success('Login successful!');
      login(response.data.role); // Pass the user role to the login function
      navigate('/home'); // Adjust '/dashboard' to the actual path where your dashboard component is rendered
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
    <div className="flex justify-center items-center h-screen bg-[#ede0d4]">
      <ToastContainer />
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h2 className="text-3xl font-bold">Login</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <h1 className="text-red-500 font-bold text-2xl mb-4">Sign in to your account</h1>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                  errors.email && touched.email ? 'border-red-500' : ''
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
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
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing IN...' : 'SIGN IN'}
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
  );
};

export default LoginForm;
