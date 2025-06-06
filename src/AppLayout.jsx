// src/AppLayout.jsx
import React from 'react';
import NavBar from '@components/Nav/NavBar';
import { Outlet } from 'react-router-dom';
import { useFetchData } from './hooks/useFetchData';

const AppLayout = () => {
  useFetchData(); // Fetch data on initial render
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />
      
      {/* Main Content */}
      <main className="flex justify-center mt-6 flex-1">
        <div className="w-[90%]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
