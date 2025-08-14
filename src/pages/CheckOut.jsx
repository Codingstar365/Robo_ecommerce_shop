// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import useCartStore from "../data/stores/cartStore";
import productImage from "../assets/hero/download.jpg";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ loader state

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
    const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;
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
    }, 1500); // Simulating network delay
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen mt-7">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left: Items */}
        <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Cart Items</h2>

          {itemsToCheckout.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            itemsToCheckout.map((item) => {
              const price = Number(item.price) || 0;
              const discount = Number(item.discount) || 0;
              const qty = Number(item.quantity) || 0;
              const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-4 last:border-none"
                >
                  <img
                    src={item.image || productImage}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">Size: XL</p>
                    <p className="text-sm text-gray-600">Seller: XYZRetail</p>

                    {!buyNowItem && (
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => decrementQty(item.id)}
                          className="px-2 py-1 border border-gray-300 rounded text-lg"
                        >
                          −
                        </button>
                        <span>{qty}</span>
                        <button
                          onClick={() => incrementQty(item.id)}
                          className="px-2 py-1 border border-gray-300 rounded text-lg"
                        >
                          +
                        </button>
                      </div>
                    )}

                    <div className="mt-2 text-sm">
                      <span className="line-through text-gray-500">
                        ₹{originalPrice}
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        ₹{price}
                      </span>{" "}
                      <span className="text-green-500">
                        ({discount}% Off)
                      </span>
                    </div>
                  </div>

                  <div className="font-bold text-gray-800 text-right whitespace-nowrap">
                    ₹{price * qty}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded shadow-md sticky top-6">
            <h2 className="text-lg font-bold mb-4">PRICE DETAILS</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Price ({itemsToCheckout.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>Discount</span>
              <span>− ₹{totalDiscount}</span>
            </div>

            <div className="flex justify-between text-sm text-green-600 mb-2">
              <span>Coupons for you</span>
              <span>− ₹{coupons}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold text-base">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <p className="text-green-600 mt-2 text-sm">
              You will save ₹{youSave} on this order
            </p>

            <button
              onClick={handlePaymentClick}
              disabled={loading}
              className={`mt-4 w-full ${
                loading ? "bg-red-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              } text-white py-2 rounded font-semibold transition-all duration-200 flex justify-center items-center gap-2`}
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
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
