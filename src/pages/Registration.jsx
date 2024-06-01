import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAddUserMutation } from "../store/api/UserSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roles = ["donor"];
const medicalConditions = ["Select M.Conditions", "None", "Well"];
const bloodGroups = [
  "Select bloodGroups",
  "A+",
  "B+",
  "AB+",
  "O+",
  "A-",
  "B-",
  "AB-",
  "O-",
];

const passwordSchema = Yup.string().required("Password is required");

const validationSchema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  role: Yup.string(),
  password: passwordSchema.min(8, "Password must be at least 8 characters"),
  passwordConfirm: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      const { password } = this.parent;
      return password && password === value;
    }
  ),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .min(21, "Age must be above 20")
    .required("Age is required"),
  gender: Yup.mixed().oneOf(["Male", "Female"], "Invalid gender selected").required("Gender is required"),
  bloodGroup: Yup.string().oneOf(bloodGroups, "Invalid blood group selected").required("Blood Group is required"),
  address: Yup.string().required("Address is required"),
  medicalCondition: Yup.string().oneOf(medicalConditions, "Invalid medical condition selected").required("Medical Condition is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

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

  const handleFocus = () => {
    document.getElementById("fullname").focus();
  };

  const initialValues = {
    fullname: "",
    email: "",
    photo: "",
    role: roles[0],
    password: "",
    passwordConfirm: "",
    age: "",
    gender: "",
    bloodGroup: bloodGroups[0],
    address: "",
    medicalCondition: "",
  };

  useEffect(() => {
    handleFocus();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-500">Register</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                />
                <ErrorMessage name="fullname" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                  id="email"
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <Field
                  name="role"
                  as="select"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.role && touched.role ? "border-red-500" : ""
                  }`}
                  id="role"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                  id="password"
                  name="password"
                  type="password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.passwordConfirm && touched.passwordConfirm ? "border-red-500" : ""
                  }`}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                />
                <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
                  Age
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.age && touched.age ? "border-red-500" : ""
                  }`}
                  id="age"
                  name="age"
                  type="number"
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <Field
                  name="gender"
                  as="select"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.gender && touched.gender ? "border-red-500" : ""
                  }`}
                  id="gender"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <Field
                  name="bloodGroup"
                  as="select"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.bloodGroup && touched.bloodGroup ? "border-red-500" : ""
                  }`}
                  id="bloodGroup"
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="bloodGroup" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.address && touched.address ? "border-red-500" : ""
                  }`}
                  id="address"
                  name="address"
                  type="text"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="medicalCondition">
                  Medical Condition
                </label>
                <Field
                  name="medicalCondition"
                  as="select"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.medicalCondition && touched.medicalCondition ? "border-red-500" : ""
                  }`}
                  id="medicalCondition"
                >
                  {medicalConditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="medicalCondition" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "SIGN UP"}
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
  );
};

export default RegisterForm;
