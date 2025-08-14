import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../pages/Layouts/MainLayout';
import LandingScreen from '../pages/LandingScreen';
import CollectionRoutes from './CollectionRoute';
import UserOrder from '../pages/UserOrder';
import NotFound from '../pages/NotFound';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/SignUp';
//import LogOut from '../pages/auth/LogOut';
//import Academy from '../pages/Academy';
import CheckOut from '../pages/CheckOut';
import AdminLayout from '../pages/Layouts/AdminLayout';
import Products from '../pages/Products';
import ItemAdd from '../pages/ItemAdd';
//import AdminOrders from '../pages/AdminOrders';
import BuyNow from '../pages/BuyNow';
import PayOnline from '../components/PayOnline';
import PaymentSelection from '../pages/PaymentSelection';
import UserOrders from '../pages/UserOrderInfo';
import AdminOrderSection from '../pages/AdminOrderSection';
import UserProfile from '../pages/UserProfile';
import TrackOrderStatus from '../pages/TrackOrderStatus';
import { HomeRoute } from '../constants/RouteConstants';
import AdminDashboard from '../pages/AdminDashboard';
import AdminDeleteButton from '../pages/AdminDeleteButton';
import LogOut from '../pages/auth/LogOut';
import AdminUserSection from '../pages/AdminUserSection';
import OrderBriefInfo from '../pages/OrderBriefInfo';
import CategoryPage from '../pages/CategoryPage';


const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<LandingScreen />} />
        <Route path="/collection/*" element={<CollectionRoutes />} />
        
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/track-order" element={<UserOrders />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/product/:id" element={<OrderBriefInfo />} />
        <Route path="/track-order/:id" element={<TrackOrderStatus />} />

      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/users' element={<AdminUserSection />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/add' element={<ItemAdd />} />
        <Route path='/admin/products/delete' element={<AdminDeleteButton />} />
        <Route path='/admin/orders' element={<AdminOrderSection />} />

      </Route>

      <Route path='*' element={<NotFound/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      <Route path="/payment-method" element={<PaymentSelection />} />
      <Route path="/order-success" element={<UserOrder />} />
      <Route path='/pay-online' element={<PayOnline />} />
      {/* <Route path='/adminorder' element={<AdminOrderSection/>}/> */}
    </Routes>
  );
};

export default UserRoutes;
