import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../pages/Layouts/MainLayout';
import LandingScreen from '../pages/LandingScreen';
import Mainsidebar from '../components/Mainsidebar';
import Card from '../components/card';
// import Stempages from '../pages/Stempages';
import CollectionRoutes from './CollectionRoute';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/collection/*" element={<CollectionRoutes/>}/> 
      </Route>
     
    </Routes>
  );
};

export default UserRoutes;
