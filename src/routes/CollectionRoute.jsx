import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CollectionPages from '../pages/collectionPages';

const CollectionRoutes = () => {
  return (
      <Routes >
        <Route path="/resberi" element={<CollectionPages/>}/> 
      </Routes>
     
  );
};

export default CollectionRoutes;
