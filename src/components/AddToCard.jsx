import React, { useRef, useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import productImage from '../assets/hero/download.jpg';
import useCartStore from '../data/stores/cartStore';
import { useNavigate } from 'react-router-dom';

const AddToCartHover = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    incrementQty,
    decrementQty,
    clearBuyNowItem,
    clearCart,
  } = useCartStore();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkOrderConfirmed = () => {
      if (localStorage.getItem("orderConfirmed") === "true") {
        clearCart();
        localStorage.removeItem("orderConfirmed");
      }
    };
    checkOrderConfirmed();
  }, [clearCart]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <ShoppingCart className="w-6 h-6 text-gray-800" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="p-4 max-h-52 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 mb-4 last:mb-0">
                  <img
                    src={item.image || productImage}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        onClick={() => decrementQty(item.id)}
                        className="p-1 rounded border border-gray-300 bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className="p-1 rounded border border-gray-300 bg-gray-200 hover:bg-gray-300"
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

          {cartItems.length > 0 && (
            <div className="border-t border-gray-300 px-4 py-3">
              <div className="flex justify-between mb-3 text-sm font-medium">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  clearBuyNowItem();
                  navigate("/checkout");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              >
                Go to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddToCartHover;
