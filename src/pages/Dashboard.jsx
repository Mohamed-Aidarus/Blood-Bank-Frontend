import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Header from '../Component/Header.jsx';

export default function Dashboard ()  {
  return (
    <div>
    <Header />
    <Outlet />
  </div>
  );
};



