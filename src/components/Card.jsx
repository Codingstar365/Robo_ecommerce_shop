import React from 'react';
import { Star } from 'lucide-react';
import image from '../../src/assets/hero/download.jpg';

const Card = ({ name, price, discount }) => {
  const finalPrice = Math.round(price * (1 - discount / 100));

  return (
    
    <div className="mt-5  bg-white rounded-lg shadow-md p-4 relative border border-gray-400">
      
      {/* Discount Tag */}
      <div className="absolute top-2 left-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
        -{discount}%
      </div>

      {/* Wishlist Heart */}
      <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-secondary">
        ❤️
      </div>

      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain mb-4"
      />

      {/* Title */}
      <h2 className="text-sm font-semibold truncate hover:underline leading-snug mb-2 w-48">

        {name}
      </h2>

      {/* Rating */}
      <div className="flex space-x-1 text-yellow-500 text-sm mb-2">
        {Array(5).fill().map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500" />
        ))}
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="line-through text-gray-500 text-sm">Rs. {price}</span>{' '}
        <span className="text-xl font-bold text-secondary">Rs. {finalPrice}</span>
        <p className="text-sm text-gray-700 mt-1">
          or ₹1208 + <span className="text-secondary font-medium">64 rc coins</span>
        </p>
        <p className="text-xs text-gray-500">Incl. GST (No Hidden Charges)</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800">
          Add To Cart
        </button>
        <button className="flex-1 border border-black text-sm px-4 py-2 rounded hover:bg-gray-100">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
