import React, { useEffect, useState } from "react";
import { useCreateDonationMutation } from "../store/api/DonationSlice.js";
// import {useCreateBloodRequestMutation } from "../store/api/BloodRequestSlice.js"; // Corrected import statement
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const medicalConditions = [
  "Select M.Conditions",
  "None",
  "Sick",
  "Well",
  "Diabetes",
  "Covid-19",
];

const disease = [
  "Select disease",
  "Well",
  "None",
  "Covid-19",
  "Hepatitis",
  "Diabetes",
];

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

const BloodManagement = ({ refetchBloodCounts }) => {
  const [formType, setFormType] = useState("Donation");

  const [createDonation, { isLoading: isLoadingDonation }] = useCreateDonationMutation();
  const [createBloodRequest, { isLoading: isLoadingRequest }] = useCreateBloodRequestMutation();

  const handleDonationSubmit = async (values) => {
    try {
      await createDonation(values).unwrap();
      toast.success("Donation created successfully!");
      refetchBloodCounts(); // Refetch blood counts after donation
    } catch (error) {
      console.error("Error Creating Donation:", error);
      toast.error(error.data.message || "Donation creation failed. Please check the details.");
    }
  };

  const handleRequestSubmit = async (values) => {
    try {
      await createBloodRequest(values).unwrap();
      toast.success("Blood request created successfully!");
    } catch (error) {
      console.error("Error Requesting Blood:", error);
      toast.error(error.data.message || "Blood request failed. Please check the details.");
    }
  };

  useEffect(() => {
    document.getElementById("fullname")?.focus();
  }, []);

  const initialValuesDonation = {
    fullname: "",
    bloodGroup: bloodGroups[0],
    age: "",
    unit: "",
    disease: disease[0],
  };

  const initialValuesBloodRequest = {
    fullname: "",
    age: "",
    gender: "",
    bloodGroup: bloodGroups[0],
    medicalCondition: medicalConditions[0],
    unit: "",
  };

  const validationSchemaDonation = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    bloodGroup: Yup.string()
      .oneOf(bloodGroups.slice(1), "Invalid blood group selected")
      .required("Blood Group is required"),
    unit: Yup.number()
      .required("Unit is required")
      .positive("Unit must be a positive number"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .min(20, "Age must be above 20")
      .required("Age is required"),
    disease: Yup.string()
      .oneOf(disease.slice(1), "Invalid disease selected")
      .required("Disease is required"),
  });

  const validationSchemaBloodRequest = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender selected")
      .required("Gender is required"),
    bloodGroup: Yup.string()
      .oneOf(bloodGroups.slice(1), "Invalid blood group selected")
      .required("Blood Group is required"),
    medicalCondition: Yup.string()
      .oneOf(medicalConditions.slice(1), "Invalid medical condition selected")
      .required("Medical Condition is required"),
    unit: Yup.number()
      .required("Unit is required")
      .positive("Unit must be a positive number"),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ede0d4] p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${formType === "Donation" ? "bg-blue-700" : "bg-blue-500"} text-white`}
            onClick={() => setFormType("Donation")}
          >
            Donation
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded ${formType === "request" ? "bg-green-700" : "bg-green-500"} text-white`}
            onClick={() => setFormType("request")}
          >
            Blood Request
          </button>
        </div>
        {formType === "Donation" && (
          <Formik
            initialValues={initialValuesDonation}
            validationSchema={validationSchemaDonation}
            onSubmit={handleDonationSubmit}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="bloodGroup">
                    Blood Group
                  </label>
                  <Field name="bloodGroup" as="select"
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
                  <ErrorMessage name="bloodGroup" component="div" className="text-red-500 text-xs italic" />
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
                    placeholder="Enter your age"
                  />
                  <ErrorMessage name="age" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">
                    Unit
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.unit && touched.unit ? "border-red-500" : ""
                    }`}
                    id="unit"
                    name="unit"
                    type="number"
                    placeholder="Enter the unit"
                  />
                  <ErrorMessage name="unit" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="disease">
                    Disease
                  </label>
                  <Field name="disease" as="select"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.disease && touched.disease ? "border-red-500" : ""
                    }`}
                    id="disease"
                  >
                    {disease.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="disease" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 lg:px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoadingDonation} // Disable button during loading state
                  >
                    {isLoadingDonation ? <ClipLoader size={20} color={"#fff"} loading={isLoadingDonation} /> : "DONATE"}{" "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {formType === "request" && (
          <Formik
            initialValues={initialValuesBloodRequest}
            validationSchema={validationSchemaBloodRequest}
            onSubmit={handleRequestSubmit}
          >
            {({ errors, touched }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    placeholder="Enter your age"
                  />
                  <ErrorMessage name="age" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                    Gender
                  </label>
                  <Field name="gender" as="select"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.gender && touched.gender ? "border-red-500" : ""
                    }`}
                    id="gender"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="bloodGroup">
                    Blood Group
                  </label>
                  <Field name="bloodGroup" as="select"
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
                  <ErrorMessage name="bloodGroup" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="medicalCondition">
                    Medical Condition
                  </label>
                  <Field name="medicalCondition" as="select"
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
                  <ErrorMessage name="medicalCondition" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="unit">
                    Unit
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.unit && touched.unit ? "border-red-500" : ""
                    }`}
                    id="unit"
                    name="unit"
                    type="number"
                    placeholder="Enter the unit"
                  />
                  <ErrorMessage name="unit" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 sm:px-8 lg:px-20 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoadingRequest} // Disable button during loading state
                  >
                    {isLoadingRequest ? <ClipLoader size={20} color={"#fff"} loading={isLoadingRequest} /> : "REQUEST"}{" "}
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

export default BloodManagement;
