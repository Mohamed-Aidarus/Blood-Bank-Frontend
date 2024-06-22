// ResetPassword.jsx
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useResetPasswordMutation } from '../store/api/UserSlice.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      console.log('Submitting values:', values);
      const response = await resetPassword({ token, password: values.password, passwordConfirm: values.passwordConfirm }).unwrap();
      console.log('API Response:', response);
      toast.success('Password reset successfully!');
      navigate('/PasswordResetConfirmation');
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "Invalid or expired token");
      } else if (error.status === 400) {
        toast.error(error.data.message || "Password and confirm password do not match");
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4] p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <Formik
          initialValues={{ password: '', passwordConfirm: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-red-500 font-bold text-xl sm:text-2xl mb-4">Reset Password</h1>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  New Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password && touched.password ? 'border-red-500' : ''
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="passwordConfirm">
                  Confirm New Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.passwordConfirm && touched.passwordConfirm ? 'border-red-500' : ''
                  }`}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Re-enter your new password"
                  disabled={isLoading}
                />
                <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 lg:px-20 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader size={20} color={"#fff"} loading={isLoading} /> : 'Reset Password'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
