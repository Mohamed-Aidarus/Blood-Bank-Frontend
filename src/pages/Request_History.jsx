import React from 'react';
import { useFetchBloodRequestsQuery } from '../store/api/BloodRequestSlicer.js';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'gender', headerName: 'Gender', width: 90 },
  { field: 'bloodGroup', headerName: 'Blood Group', width: 130 },
  { field: 'medicalCondition', headerName: 'Medical Condition', width: 160 },
  { field: 'unit', headerName: 'Unit', type: 'number', width: 90 },
  { field: 'requestTimestamp', headerName: 'Request Timestamp', width: 200 },
];

const RequestHistory = () => {
  const { data, error, isLoading } = useFetchBloodRequestsQuery();
  console.log(data);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading donations...</div>;

  // Ensure data is an array before mapping
  const Requests = data?.data ?? [];
  const rows = Requests.map((donation, index) => ({
    id: index + 1,
    fullname: donation.fullname,
    age: donation.age,
    gender: donation.gender,
    bloodGroup: donation.bloodGroup,
    medicalCondition: donation.medicalCondition,
    unit: donation.unit,
  }));

  // Log the processed rows to verify the structure
  console.log(rows);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default RequestHistory;
