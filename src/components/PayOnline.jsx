// src/components/PayOnline.jsx
import React from "react";
import loadRazorpay from "../utils/LoadRazorPay"; // ✅ CORRECT FILE NAME & CASE

const PayOnline = () => {
  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_5JTg9I35AkiZMQ", // ✅ Replace with your actual key
      amount: 70000, // ₹500 in paise
      currency: "INR",
      name: "Library Subscription",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // Optional logo
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Save to Firestore or your DB if needed
      },
      prefill: {
        name: "Ranjan Yadav",
        email: "ranjan@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Library Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded shadow-lg text-xl"
      >
        Pay ₹500 Online
      </button>
    </div>
  );
};

export default PayOnline;
