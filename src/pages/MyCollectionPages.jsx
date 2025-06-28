import React from 'react';
import { CollectionCardData } from '../constants/CollectionCardConstant';
import CollectionCard from '../components/CollectionCard';
import PageSidebar from '../components/PageSideBar';
import { CardData } from '../constants/CardConstant';
import PagesBData from '../components/PagesBData';
import ItemCard from '../components/ItemCard';

const MyCollectionPages = () => {
  return (
    <div className="flex flex-col w-full px-2 sm:px-6 md:px-10">
      {/* Title and Collection Cards */}
      <div className="mt-40 mb-8 border border-gray-300 rounded-lg p-4">
        <h2 className="text-center text-2xl font-bold mb-6">RASPBERRY PI</h2>

        <div className="flex flex-wrap justify-center gap-4">
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
      </div>

      {/* Product and Sidebar Section */}
      <div className="border border-gray-300 rounded-lg p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[250px]">
            <PageSidebar />
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-10 mt-5 mx-5 mb-5 ">
            {CardData.map((item, index) => (
              <ItemCard
                key={index}
                name={item.name}
                price={item.price}
                discount={item.discount}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="mb-10">
        <PagesBData />
      </div>
    </div>
  );
};

export default MyCollectionPages;
