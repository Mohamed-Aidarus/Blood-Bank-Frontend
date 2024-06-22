import React from 'react';
import { useFetchBloodRequestsQuery, useDeleteBloodRequestMutation } from '../store/api/BloodRequestSlicer.js';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Component/AuthProvider.jsx'; // Adjust the import path as necessary

const columns = (handleDelete, userRole) => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'gender', headerName: 'Gender', width: 90 },
  { field: 'bloodGroup', headerName: 'Blood Group', width: 130 },
  { field: 'medicalCondition', headerName: 'Medical Condition', width: 160 },
  { field: 'unit', headerName: 'Unit', type: 'number', width: 90 },
  { field: 'requestTimestamp', headerName: 'Request Timestamp', width: 200 },
  userRole === 'admin' && {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <GridActionsCellItem
        icon={<FaTrash />}
        label="Delete"
        onClick={() => handleDelete(params.row.id)}
        color="inherit"
      />
    ),
  },
].filter(Boolean);

const RequestHistory = () => {
  const { data, error, isLoading } = useFetchBloodRequestsQuery();
  const [deleteBloodRequest] = useDeleteBloodRequestMutation();
  const { role } = useAuth();

  const handleDelete = async (id) => {
    try {
      await deleteBloodRequest(id).unwrap();
      toast.success('Blood Request deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete Blood Request.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading blood requests...
      </div>
    );
  }

  const requests = data?.data ?? [];
  const rows = requests.map((request, index) => ({
    id: request._id, // Ensure this matches your backend ID field
    fullname: request.fullname,
    age: request.age,
    gender: request.gender,
    bloodGroup: request.bloodGroup,
    medicalCondition: request.medicalCondition,
    unit: request.unit,
    requestTimestamp: request.requestTimestamp,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ede0d4] p-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Blood Request History</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns(handleDelete, role)}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default RequestHistory;
