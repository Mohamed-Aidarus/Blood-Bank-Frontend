import React from 'react';
import { useFetchUsersQuery,useDeleteUserMutation} from '../store/api/UserSlice.js';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../Component/AuthProvider.jsx'; // Adjust the import path as necessary

const columns = (handleDelete, userRole) => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'fullname', headerName: 'Full Name', width: 150 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
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

const UserManagement = () => {
  const { data, error, isLoading } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { role } = useAuth();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.status === 404) {
        toast.error(error.data.message || "User not found");
      } else {
        toast.error('Failed to delete user.');
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
        Error loading Users...
      </div>
    );
  }

  const user = data?.data ?? [];
  const rows = user.map((user, index) => ({
    id: user._id, // Ensure this matches your backend ID field
    fullname: user.fullname,
    role: user.role,
    email: user.email,
   

  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ede0d4] p-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
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

export default UserManagement;
