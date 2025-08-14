import React from 'react';
import { Route, Routes } from 'react-router-dom';


import CollectionPageThird from '../pages/CollectionPageThird';

import CollectionPageSecond from '../pages/CollectionPageSecond';
import MyCollectionPages from '../pages/MyCollectionPages';

const CollectionRoutes = () => {
  return (
    <Routes >
      <Route path="/:subcategoryHref" element={<MyCollectionPages/>} />

      <Route path="/:subcategoryRef" element={<CollectionPageSecond/>} />

      <Route path="/:subcategoryRef" element={<CollectionPageThird />} />

    </Routes>

  );
};

export default CollectionRoutes;
