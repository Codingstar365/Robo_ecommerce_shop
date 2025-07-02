import React from 'react';
import { Route, Routes } from 'react-router-dom';


import CollectionPageThird from '../pages/CollectionPageThird';
//import UserOrder from '../pages/UserOrder';
import CollectionPageSecond from '../pages/CollectionPageSecond';
import MyCollectionPages from '../pages/MyCollectionPages';

const CollectionRoutes = () => {
  return (
      <Routes >
         <Route path="/allcategories" element={<MyCollectionPages/>}/>  
        <Route path="/shopbybrand" element={<CollectionPageSecond/>}/> 
        <Route path="/bulkorders" element={<CollectionPageThird/>}/> 
        
      </Routes>
     
  );
};

export default CollectionRoutes;
