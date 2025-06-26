import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CollectionPages from '../pages/collectionPages';
import CollectionPageSecond from '../pages/CollectionPageSecond';
import CollectionPageThird from '../pages/CollectionPageThird';

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
