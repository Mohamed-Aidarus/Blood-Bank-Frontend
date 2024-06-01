import React from 'react';
import { useFetchDonationsQuery } from '../store/api/DonationSlice.js';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  { field: 'bloodGroup', headerName: 'Blood Group', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'disease', headerName: 'Disease', width: 150 },
  { field: 'unit', headerName: 'Unit', type: 'number', width: 90 },
  { field: 'requestTimestamp', headerName: 'Request Timestamp', width: 200 },
];

const DonationHistory = () => {
  const { data, error, isLoading } = useFetchDonationsQuery();
  console.log(data);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading donations...</div>;

  // Ensure data is an array before mapping
  const donations = data?.data ?? [];
  const rows = donations.map((donation, index) => ({
    id: index + 1,
    fullname: donation.fullname,
    age: donation.age,
    disease: donation.disease,
    bloodGroup: donation.bloodGroup,
    unit: donation.unit,
    requestTimestamp: donation.requestTimestamp,
  }));

  // Log the processed rows to verify the structure
  console.log(rows);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default DonationHistory;
