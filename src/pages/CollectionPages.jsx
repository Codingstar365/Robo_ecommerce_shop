import React from 'react';
import { CollectionCardData } from '../constants/CollectionCardConstant';
import CollectionCard from '../components/CollectionCard';
import PageSidebar from '../components/PageSideBar';
import { CardData } from '../constants/CardConstant';
import Card from '../components/card';
import PagesBData from '../components/PagesBData';

const CollectionPages = () => {
  return (
    <div className="flex flex-col w-full px-8">

      {/* Title */}
      <div className="mt-40 mb-5 text-center">
        <h2 className="text-2xl font-bold">RASPBERRY PI</h2>
      </div>

      {/* Top Collection Cards */}
      <div className="flex flex-wrap justify-center gap-3 mb-10
      ">
        {CollectionCardData.map((item, index) => (
          <CollectionCard
            key={index}
            name={item.name}
            bgcolor="red-400"
            bordercolor="gray-400"
            discount={item.discount}
          />
        ))}
      </div>

      {/* Sidebar and Products Section */}
      <div className="flex gap-5 items-start ">

        {/* Sidebar */}
        <div className="w-[250px] h-[800px]">
          <PageSidebar />
        </div>

        {/* Product Cards */}
        <div className="flex flex-wrap gap-8 mb-4">
          {CardData.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          ))}
        </div>
        
      </div>
      <div className='mb-5'>
        <PagesBData/>
        </div>
    </div>
  );
};

export default CollectionPages;
