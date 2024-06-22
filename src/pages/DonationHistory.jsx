import React from 'react';
import { useFetchDonationsQuery, useDeleteDonationMutation } from '../store/api/DonationSlice.js';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../Component/AuthProvider.jsx'; // Adjust the import path as necessary

const columns = (handleDelete, userRole) => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  { field: 'bloodGroup', headerName: 'Blood Group', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'disease', headerName: 'Disease', width: 150 },
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

const DonationHistory = () => {
  const { data, error, isLoading } = useFetchDonationsQuery();
  const [deleteDonation] = useDeleteDonationMutation();
  const { role } = useAuth();

  const handleDelete = async (id) => {
    try {
      await deleteDonation(id).unwrap();
      toast.success('Donation History is deleted successfully!');
    } catch (error) {
      console.error("Error deleting donation:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "Donation History not found");
      } else {
        toast.error('Failed to delete donation history.');
      }
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
        Error loading donations...
      </div>
    );
  }

  const donations = data?.data ?? [];
  const rows = donations.map((donation, index) => ({
    id: donation._id, // Ensure this matches your backend ID field
    fullname: donation.fullname,
    age: donation.age,
    disease: donation.disease,
    bloodGroup: donation.bloodGroup,
    unit: donation.unit,
    requestTimestamp: donation.requestTimestamp,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ede0d4] p-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Donation History</h1>
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

export default DonationHistory;
