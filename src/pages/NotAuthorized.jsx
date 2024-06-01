import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Not Authorized</h1>
      <p className="text-lg text-gray-700 mb-4">You do not have permission to view this page.</p>
      <Link to="/Dashboard/home">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default NotAuthorized;
