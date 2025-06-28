import React, { useState } from 'react';
import image from '../assets/hero/ordertrack.jpg'; // Ensure the path is correct
import { CardData } from '../constants/CardConstant';
import ItemCard from '../components/ItemCard';

const UserOrder = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tracking order:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 lg:p-10">
      {/* Top Section: Form and Image in one parent container */}
      <div className="flex flex-col lg:flex-row gap-6 mt-15">
        
        {/* Left: Form */}
        <div className="flex-[2] bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-2">Track Your Order</h2>
          <p className="text-center text-gray-600 mb-6">Enter your order details to track your order</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="orderId" className="block text-sm font-semibold text-gray-700 mb-1">Order ID</label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                placeholder="Enter Order ID"
                value={formData.orderId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Track Your Order
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex-[1] flex justify-center items-start mt-10 lg:mt-0">
          <img
            src={image}
            alt="Promo"
            className="rounded-lg shadow-lg w-full max-w-sm"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CardData.slice(0, 5).map((item, index) => (
          <ItemCard
            key={index}
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default UserOrder;
