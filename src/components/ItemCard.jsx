// src/components/ItemCard.jsx
import React from 'react';
import { Star } from 'lucide-react';
import image from '../../src/assets/hero/download.jpg';
import useCartStore from '../data/stores/cartStore';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({
  id,
  name,
  price,
  discount,
  image: img,
  rating,
  isAdmin = false,
}) => {
  const finalPrice = Math.round(price * (1 - discount / 100));
  const addToCart = useCartStore((state) => state.addToCart);
  const setBuyNowItem = useCartStore((state) => state.setBuyNowItem);
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log(`Delete product with ID: ${id}`);
    // Add delete logic here if needed
  };

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price: finalPrice,
      image: img || image,
    });
  };

  const handleBuyNow = () => {
    // ✅ Set only the buyNowItem, not cart
    setBuyNowItem({
      id,
      name,
      price: finalPrice,
      image: img || image,
      discount,
    });

    // ✅ Navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 relative border border-gray-400 transform transition duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="absolute top-2 left-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
        -{discount}%
      </div>

      <div className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-secondary transition-colors duration-300">
        ❤️
      </div>

      <img
        src={img || image}
        alt={name}
        className="w-full h-40 object-contain mb-4"
      />

      <h2 className="text-sm font-semibold truncate hover:underline leading-snug mb-2 w-48">
        {name}
      </h2>

      <div className="flex space-x-1 text-yellow-500 text-sm mb-2">
        {Array(5)
          .fill()
          .map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500" />
          ))}
      </div>

      <div className="mb-2">
        <span className="line-through text-gray-500 text-sm">Rs. {price}</span>{' '}
        <span className="text-xl font-bold text-secondary">
          Rs. {finalPrice}
        </span>
        <p className="text-sm text-gray-700 mt-1">
          or ₹1208 +{' '}
          <span className="text-secondary font-medium">64 rc coins</span>
        </p>
        <p className="text-xs text-gray-500">
          Incl. GST (No Hidden Charges)
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        {isAdmin ? (
          <>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition-transform duration-150 active:scale-95"
            >
              Delete
            </button>
            <button
              onClick={handleEdit}
              className="flex-1 border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-50 transition-transform duration-150 active:scale-95"
            >
              Edit
            </button>
          </>
        ) : (
          <>
            {/* ✅ Add to Cart Button */}
            <button
              className="flex-1 bg-black text-white text-sm px-4 py-2 rounded transition-transform duration-150 active:scale-95 hover:bg-gray-800 cursor-pointer hover:shadow-md"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            {/* ✅ Buy Now Button */}
            <button
              className="flex-1 border border-black text-sm px-4 py-2 rounded transition-transform duration-150 active:scale-95 hover:bg-gray-100 cursor-pointer hover:shadow-md hover:border-secondary"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
