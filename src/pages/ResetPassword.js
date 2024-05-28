import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../uploads/logo.png'; // Adjust the path to your logo file

const ResetPassword = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string()
     .required('Password is required')
     .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
     .required('Confirm Password is required'),
  });

  // Function to set focus on the password field
  const handleFocus = () => {
    document.getElementById("password").focus();
  };

  useEffect(() => {
    // Automatically focus on the password field when the component mounts
    handleFocus();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#ede0d4]">
      {/* <div className="text-center mb-8">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32 h-32" />
        <h2 className="text-3xl font-bold">Reset Password</h2>
      </div> */}
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navigate("/PasswordResetConfirmation"); // Adjust '/home' to the actual path where your home component is rendered
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <h1 className="text-red-500 font-bold text-2xl mb-4">Reset Your Password</h1>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                New Password
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && touched.password? 'border-red-500' : ''
                }`}
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword && touched.confirmPassword? 'border-red-500' : ''
                }`}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your new password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                RESET PASSWORD
              </button>

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
