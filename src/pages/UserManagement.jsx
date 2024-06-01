import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../store/api/UserSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roles = ["Select role", "admin", "donor"];
const medicalConditions = ["Select M.Conditions", "None", "Sick"];
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

// Validation schemas
const passwordSchema = Yup.string().required("Password is required");

const registerValidationSchema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().oneOf(roles, "Role is required").required(),
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
  .required("Age is required")
  .positive("Age must be a positive number"),
  
  gender: Yup.mixed()
    .oneOf(["Male", "Female"], "Invalid gender selected")
    .required("Gender is required"),
  bloodGroup: Yup.string()
    .oneOf(bloodGroups, "Invalid blood group selected")
    .required("Blood Group is required"),
  address: Yup.string().required("Address is required"),
  medicalCondition: Yup.string()
    .oneOf(medicalConditions, "Invalid medical condition selected")
    .required("Medical Condition is required"),
});

const updateValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fullname: Yup.string(),
  role: Yup.string().required("Role is required"),
});
const deleteValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
const UserManagement = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("register"); // State to toggle between forms

  const [addUser, { isLoading: isLoadingAdd }] = useAddUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const handleRegisterSubmit = async (values) => {
    try {
      const response = await addUser(values).unwrap();
      toast.success("Registration successfully!");
  
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdateSubmit = async (values) => {
    try {
      const response = await updateUser(values).unwrap();
      console.log(response); // Display response in console
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "Email not found");
      } else {
        toast.error("Update failed. Please check the details.");
      }
    }
  };

  const handleDeleteSubmit = async (values) => {
    try {
      const response = await deleteUser(values).unwrap();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "Email not found");
      } else {
        toast.error("Update failed. Please check the details.");
      }
    }
  };

  const handleError = (error) => {
    console.error("Error:", error);
    if (error.status === 400) {
      toast.error(error.data.message || "User already exists");
    } else {
      toast.error("Operation failed. Please try again.");
    }
  };

  const initialRegisterValues = {
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

  const initialUpdateValues = {
    email: "",
    fullname: "",
    role: "",
  };

  const initialDeleteValues = {
    email: "", // This should be filled with the user ID to delete
  };

  useEffect(() => {
    document.getElementById("fullname")?.focus();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#ede0d4]">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <button
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setFormType("register")}
          >
            Register
          </button>
          <button
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setFormType("update")}
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setFormType("delete")}
          >
            Delete
          </button>
        </div>
        {formType === "register" && (
          <Formik
            initialValues={initialRegisterValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-red-500">Register</h2>
                </div>
                <div className="grid-container">
                  {/* Fullname */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="fullname"
                    >
                      Full Name
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.fullname && touched.fullname
                          ? "border-red-500"
                          : ""
                      }`}
                      id="fullname"
                      name="fullname"
                      type="text"
                    />
                    <ErrorMessage
                      name="fullname"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Email */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="email"
                    >
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
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Role */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <Field name="role">
                      {({ field }) => (
                        <select
                          {...field}
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
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Password */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }`}
                      id="password"
                      name="password"
                      type="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Password Confirm */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="passwordConfirm"
                    >
                      Confirm Password
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.passwordConfirm && touched.passwordConfirm
                          ? "border-red-500"
                          : ""
                      }`}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Age */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="age"
                    >
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
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Gender */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <Field name="gender">
                      {({ field }) => (
                        <select
                          {...field}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.gender && touched.gender
                              ? "border-red-500"
                              : ""
                          }`}
                          id="gender"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Blood Group */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="bloodGroup"
                    >
                      Blood Group
                    </label>
                    <Field name="bloodGroup">
                      {({ field }) => (
                        <select
                          {...field}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.bloodGroup && touched.bloodGroup
                              ? "border-red-500"
                              : ""
                          }`}
                          id="bloodGroup"
                        >
                          {bloodGroups.map((group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="bloodGroup"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Address */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <Field
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.address && touched.address
                          ? "border-red-500"
                          : ""
                      }`}
                      id="address"
                      name="address"
                      type="text"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {/* Medical Condition */}
                  <div className="grid-item mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="medicalCondition"
                    >
                      Medical Condition
                    </label>
                    <Field name="medicalCondition">
                      {({ field }) => (
                        <select
                          {...field}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.medicalCondition && touched.medicalCondition
                              ? "border-red-500"
                              : ""
                          }`}
                          id="medicalCondition"
                        >
                          {medicalConditions.map((condition) => (
                            <option key={condition} value={condition}>
                              {condition}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="medicalCondition"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoadingAdd} // Disable button during loading state
                  >
                    {isLoadingAdd ? "Registering..." : "Register"}{" "}
                    {/* Button text based on loading state */}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        ;
        {formType === "update" && (
          <Formik
            initialValues={initialUpdateValues}
            validationSchema={updateValidationSchema}
            onSubmit={handleUpdateSubmit}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h1 className="text-red-500 font-bold text-2xl mb-4">
                  Update User Details
                </h1>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter the email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="fullname"
                  >
                    Full Name <span className="text-green-500">Optional</span>
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                      errors.fullname && touched.fullname
                        ? "border-red-500"
                        : ""
                    }`}
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Enter  full name"
                  />
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <Field name="role">
                      {({ field }) => (
                        <select
                          {...field}
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
                        </select>
                      )}
                    </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoadingUpdate} // Disable button during loading state
                  >
                    {isLoadingUpdate ? "Updating..." : "UPDATE"}{" "}
                    {/* Button text based on loading state */}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        ;
        {formType === "delete" && (
          <Formik
            initialValues={initialDeleteValues}
            validationSchema={deleteValidationSchema}
            onSubmit={handleDeleteSubmit}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Delete Form Fields */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-red-500">
                    Delete User
                  </h2>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="id"
                  >
                    Email
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter the email to delete"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoadingDelete}
                  >
                    {isLoadingDelete ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

      </div>
    </div>
  );
};

export default UserManagement;
