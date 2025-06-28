import React from 'react';
import { Route, Routes } from 'react-router-dom';


import CollectionPageThird from '../pages/CollectionPageThird';
//import UserOrder from '../pages/UserOrder';
 import CollectionPages from '../pages/CollectionPages';
import CollectionPageSecond from '../pages/CollectionPageSecond';

const CollectionRoutes = () => {
  return (
      <Routes >
         <Route path="/allcategories" element={<CollectionPages/>}/>  
        <Route path="/shopbybrand" element={<CollectionPageSecond/>}/> 
        <Route path="/bulkorders" element={<CollectionPageThird/>}/> 
      </Routes>
     
  );
};

export default CollectionRoutes;
