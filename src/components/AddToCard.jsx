import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import productImage from '../assets/hero/download.jpg';

const AddToCartHover = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Arduino Uno R3',
      price: 1849,
      quantity: 1,
      image: productImage
    },
    {
      id: 2,
      name: 'Raspberry Pi 5',
      price: 8209,
      quantity: 2,
      image: productImage
    },
    {
      id: 3,
      name: 'NodeMCU ESP8266',
      price: 499,
      quantity: 1,
      image: productImage
    }
  ]);

  const handleIncrement = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative inline-block text-left group">
      {/* Cart Icon */}
      <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
        <ShoppingCart className="w-6 h-6 text-gray-800" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Hover Dropdown */}
      <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-50">
        
        {/* Items List */}
        <div className="p-4 max-h-52 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Total & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t px-4 py-3">
            <div className="flex justify-between mb-3 text-sm font-medium">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartHover;
