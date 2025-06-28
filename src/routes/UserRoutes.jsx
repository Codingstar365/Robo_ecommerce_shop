import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../pages/Layouts/MainLayout';
import LandingScreen from '../pages/LandingScreen';
import CollectionRoutes from './CollectionRoute';
import UserOrder from '../pages/UserOrder';
import NotFound from '../pages/NotFound';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/collection/*" element={<CollectionRoutes />} />
        <Route path="/track-order" element={<UserOrder />} />
      </Route>
       <Route path='*'    element={<NotFound/>}/>

    </Routes>
  );
};

export default UserRoutes;
