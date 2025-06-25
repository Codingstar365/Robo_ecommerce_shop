import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      

      <main className="">
        {/* Optional static content */}
       
        <Outlet/>
        {/* Dynamic content */}
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
