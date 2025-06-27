import React from 'react';
import { Drone, PackageCheck, ShoppingCart, BadgePercent, UserRoundCheck } from 'lucide-react';

const PagesBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Content */}
        <div className="flex-1 space-y-3">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">SAVINGS</h1>
          <h2 className="text-2xl text-yellow-300 font-semibold">IN BULK</h2>
          <p className="mt-4 text-lg">Grab unbeatable deals when you buy in volume!</p>
        </div>

        {/* Center Content */}
        <div className="flex-1 text-center space-y-3">
          <Drone className="mx-auto w-20 h-20 animate-bounce" />
          <div className="text-white">
            <p className="text-xl font-semibold">UPTO</p>
            <p className="text-6xl font-bold text-red-400">30% OFF</p>
          </div>
          <PackageCheck className="mx-auto w-12 h-12 text-yellow-300" />
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white text-blue-900 rounded-xl p-6 shadow-md">
          <ul className="space-y-4 text-sm font-semibold">
            <li className="flex items-center gap-2">
              <UserRoundCheck className="text-fuchsia-700" /> DEDICATED ACCOUNT MANAGER
            </li>
            <li className="flex items-center gap-2">
              <BadgePercent className="text-fuchsia-700" /> BEST PRICE GUARANTEE
            </li>
            <li className="flex items-center gap-2">
              <PackageCheck className="text-fuchsia-700" /> READY STOCK
            </li>
            <li className="flex items-center gap-2">
              <ShoppingCart className="text-fuchsia-700" /> GST BENEFIT
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PagesBanner