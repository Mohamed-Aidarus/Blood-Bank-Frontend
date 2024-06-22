import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAddUserMutation } from "../store/api/UserSlice.js";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';


const RegisterForm = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),

  });
  const handleFocus = () => {
    document.getElementById("fullname").focus();
  };
  useEffect(() => {
    handleFocus();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await addUser(values).unwrap();
      console.log(response);
      toast.success("Registration successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.status === 400) {
        toast.error(error.data.message || "User already exists");
      } else {
        toast.error("Registration failed. Please try again.");
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-500">Register</h2>
            </div>
            <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="fullname">
                    Full Name
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.fullname && touched.fullname ? "border-red-500" : ""
                    }`}
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="fullname" component="div" className="text-red-500 text-xs italic" />
                </div>
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
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                 Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.passwordConfirm && touched.passwordConfirm ? 'border-red-500' : ''
                  }`}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  placeholder="Re-enter your password"
                  disabled={isLoading}
                />
                <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-xs italic" />
              </div>
              <div className="flex items-center justify-between mt-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "SIGN UP"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                I already have an account?{" "}
                <Link className="text-blue-500 hover:text-blue-800" to="/">
                  Back to Login{" "}
                </Link>
              </p>
            </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
