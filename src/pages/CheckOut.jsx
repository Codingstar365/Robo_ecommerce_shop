// src/pages/CheckoutPage.jsx
import React from "react";
import useCartStore from "../data/stores/cartStore";
import productImage from "../assets/hero/download.jpg";

const CheckoutPage = () => {
  const { cartItems, incrementQty, decrementQty } = useCartStore();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce((sum, item) => {
    const originalPrice = Math.round(item.price / (1 - item.discount / 100));
    return sum + (originalPrice - item.price) * item.quantity;
  }, 0);

  const coupons = 342;
  const platformFee = 4;
  const finalAmount = totalPrice - totalDiscount - coupons + platformFee;
  const youSave = totalDiscount + coupons;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-48px)]">
        {/* Left: Cart Items */}
        <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto h-full">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const originalPrice = Math.round(
                item.price / (1 - item.discount / 100)
              );
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border-b py-4 last:border-none"
                >
                  <img
                    src={item.image || productImage}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: XL</p>
                    <p className="text-sm text-gray-600">Seller: XYZRetail</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => decrementQty(item.id)}
                        className="px-2 py-1 border rounded text-lg"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className="px-2 py-1 border rounded text-lg"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="line-through text-gray-500">
                        ₹{originalPrice}
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        ₹{item.price}
                      </span>{" "}
                      <span className="text-green-500">
                        ({item.discount}% Off)
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-gray-800 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Price Summary */}
        <div className="w-full lg:w-1/3 sticky top-6">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">PRICE DETAILS</h2>
            <div className="flex justify-between text-sm mb-2">
              <span>Price ({cartItems.length} items)</span>
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
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
