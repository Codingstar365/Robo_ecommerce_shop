import React from 'react';
import droneImg from '../assets/hero/image.svg';
import boxImg from '../assets/hero/BrandOne.jpg';

import arduinoImg from '../assets/hero/drone.svg';

const PagesBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 via-purple-600 to-red-500 text-white flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-lg shadow-lg overflow-hidden">
      
      {/* Left Section */}
      <div className="md:w-1/2 space-y-4 text-center md:text-left">
        <img src={arduinoImg} alt="Arduino Board" className="w-20 rotate-[-10deg] mb-2" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">SAVE BIG</h1>
        <p className="text-xl font-semibold text-yellow-300">On Bulk Orders</p>
        <h2 className="text-3xl font-bold text-wh
        ite mt-2">
          UP TO <span className="text-red-300 text-5xl font-extrabold">30%</span> OFF
        </h2>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col items-center md:items-start">
        <img src={droneImg} alt="Drone" className="w-24 mb-4" />
        <img src={boxImg} alt="Boxes" className="w-24 mb-6" />
        <ul className="space-y-2 text-left text-sm md:text-base">
          <li>🚀 <strong>Dedicated Account Manager</strong></li>
          <li>💰 <strong>Best Price Guarantee</strong></li>
          <li>📦 <strong>Ready Stock Available</strong></li>
          <li>🧾 <strong>GST Benefits for Businesses</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default PagesBanner;
