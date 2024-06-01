import React from 'react';

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Not Authorized</h1>
      <p className="text-lg text-gray-700 mb-4">You do not have permission to view this page.</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotAuthorized;
