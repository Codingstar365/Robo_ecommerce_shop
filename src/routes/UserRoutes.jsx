import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../pages/Layouts/MainLayout';
import LandingScreen from '../pages/LandingScreen';
import CollectionRoutes from './CollectionRoute';
import UserOrder from '../pages/UserOrder';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/SignUp';
//import Home from '../pages/auth/LogOut';
import LogOut from '../pages/auth/LogOut';
import Academy from '../pages/Academy';
import CheckOut from '../pages/CheckOut';
import AdminLayout from '../pages/Layouts/AdminLayout';

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/collection/*" element={<CollectionRoutes />} />
        <Route path="/track-order" element={<UserOrder />} />
              <Route path="/checkout" element={<CheckOut/>}/> 
      </Route>
      <Route element={<AdminLayout/>}>

      </Route>
      <Route path='*' element={<NotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/logout' element={<LogOut />} />


    </Routes>
  );
};

export default UserRoutes;
