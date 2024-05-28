import React, { useEffect, }from 'react';
import { Formik, Form, Field } from 'formik';
import { Link,useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup

function ForgotPasswordForm() {
  // Define the validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
     .email('Invalid email address')
     .required('Email is required'),
  });
  const navigate = useNavigate();

  const handleFocus = () => {
    document.getElementById("email").focus();
  };

  useEffect(() => {
    // Automatically focus on the email field when the component mounts
    handleFocus();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema} // Add the validation schema here
        onSubmit={(values) => {
          console.log('Submitted values:', values);
          navigate("/EmailSent");
          // Here, you can add the logic to send an email to the user to reset their password
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <h1 className="text-red-500 font-bold text-2xl mb-4">Forgot Password</h1>
            <h3 className="text-gray-700 font-bold mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && touched.email? 'border-red-500' : ''
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs italic">{errors.email}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
              <Link
                to="/"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Back to Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPasswordForm;
