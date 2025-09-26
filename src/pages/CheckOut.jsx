// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useCartStore from "../data/stores/cartStore";
import productImage from "../assets/hero/download.jpg";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    cartItems,
    incrementQty,
    decrementQty,
    buyNowItem,
    clearBuyNowItem,
  } = useCartStore();

  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;

  useEffect(() => {
    if (!buyNowItem) clearBuyNowItem();
  }, [buyNowItem, clearBuyNowItem]);

  const totalPrice = itemsToCheckout.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const totalDiscount = itemsToCheckout.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const qty = Number(item.quantity) || 0;
    const originalPrice =
      discount > 0 ? Math.round(price / (1 - discount / 100)) : price;
    return sum + (originalPrice - price) * qty;
  }, 0);

  const coupons = 342;
  const platformFee = 4;
  const finalAmount = totalPrice - totalDiscount - coupons + platformFee;
  const youSave = totalDiscount + coupons;

  const handlePaymentClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/payment-method");
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen mt-7">
      <div className="max-w-7xl pt-10 mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left: Items */}
        <div className="flex-1 bg-white p-4 rounded-xl shadow-lg overflow-y-auto space-y-4">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>

          {itemsToCheckout.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Your cart is empty.
            </p>
          ) : (
            itemsToCheckout.map((item) => {
              const price = Number(item.price) || 0;
              const discount = Number(item.discount) || 0;
              const qty = Number(item.quantity) || 0;
              const originalPrice =
                discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-4 last:border-none hover:shadow-md rounded transition-all duration-300"
                >
                  <img
                    src={item.image || productImage}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: XL</p>
                    <p className="text-sm text-gray-600">Seller: XYZRetail</p>

                    {!buyNowItem && (
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => decrementQty(item.id)}
                          className="px-3 py-1 border border-gray-300 rounded text-lg hover:bg-gray-200 transition"
                        >
                          −
                        </button>
                        <span className="font-medium">{qty}</span>
                        <button
                          onClick={() => incrementQty(item.id)}
                          className="px-3 py-1 border border-gray-300 rounded text-lg hover:bg-gray-200 transition"
                        >
                          +
                        </button>
                      </div>
                    )}

                    <div className="mt-2 text-sm">
                      <span className="line-through text-gray-400">
                        ₹{originalPrice}
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        ₹{price}
                      </span>{" "}
                      <span className="text-green-500">({discount}% Off)</span>
                    </div>
                  </div>

                  <div className="font-bold text-gray-800 text-lg text-right whitespace-nowrap">
                    ₹{price * qty}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Right: Summary */}
        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white p-4 rounded-xl shadow-md sticky top-6 space-y-4">
            <h2 className="text-xl font-bold">PRICE DETAILS</h2>

            <div className="flex justify-between text-sm">
              <span>Price ({itemsToCheckout.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>− ₹{totalDiscount}</span>
            </div>

            <div className="flex justify-between text-sm text-green-600">
              <span>Coupons for you</span>
              <span>− ₹{coupons}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between font-semibold text-base">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <p className="text-green-600 text-sm">
              You will save ₹{youSave} on this order
            </p>

            <button
              onClick={handlePaymentClick}
              disabled={loading}
              className={`mt-4 w-full flex justify-center items-center gap-2 py-2 rounded font-semibold transition-all duration-200 ${
                loading
                  ? "bg-red-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? (
                <>
                  <span className="loader-circle animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  Processing...
                </>
              ) : (
                "Choose Payment Method"
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
