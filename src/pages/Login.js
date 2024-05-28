import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../uploads/logo.png'; // Adjust the path to your logo file

const LoginForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Function to set focus on the email field
  const handleFocus = () => {
    document.getElementById("email").focus();
  };

  useEffect(() => {
    // Automatically focus on the email field when the component mounts
    handleFocus();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#ede0d4]">
      <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h2 className="text-3xl font-bold">Login</h2>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigate('/home'); // Adjust '/home' to the actual path where your home component is rendered
        }}
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
                  errors.email && touched.email? 'border-red-500' : ''
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
                  errors.password && touched.password? 'border-red-500' : ''
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
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                SIGN IN
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
