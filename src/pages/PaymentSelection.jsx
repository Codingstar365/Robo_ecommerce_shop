// src/pages/PaymentSelection.jsx
import React, { useEffect, useState } from "react";
import PaymentOptionCard from "../components/PaymentOptionCard";
import { useNavigate } from "react-router-dom";
import { Wallet, Banknote } from "lucide-react";
import usePaymentStore from "../data/stores/PaymentStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useCartStore from "../data/stores/cartStore";
import useOrderStore from "../data/stores/orderStore";

const PaymentSelection = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { savePaymentDetails } = usePaymentStore();
  const [authLoading, setAuthLoading] = useState(true);
  const { cartItems, buyNowItem } = useCartStore();
  const { createOrder } = useOrderStore();

  const products = buyNowItem ? [buyNowItem] : cartItems;

  // ✅ Check login status
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        alert("⚠️ You are not logged in.\nRedirecting to login page...");
        setTimeout(() => {
          navigate("/login?redirect=/payment-method");
        }, 1500);
      } else {
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const paymentMethods = [
    {
      key: "upi",
      label: "UPI",
      desc: "Pay using PhonePe, GPay, Paytm, etc.",
      icon: <Wallet />,
    },
    {
      key: "cod",
      label: "Cash on Delivery",
      desc: "Pay when your order arrives",
      icon: <Banknote />,
    },
  ];

  const handleProceed = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    const orderDetails = {
      userId: getAuth().currentUser?.uid,
      items: products.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || "",
      })),
      totalAmount: 550,
      paymentMethod: selectedMethod.label,
      status: selectedMethod.key === "cod" ? "pending" : "paid",
    };

    if (selectedMethod.key === "cod") {
      const orderId = await createOrder(orderDetails);
      await savePaymentDetails({
        paymentId: "COD-" + new Date().getTime(),
        method: "Cash on Delivery",
        status: "pending",
        amount: 550,
        orderId,
      });
      alert("Order placed successfully!");
      navigate("/order-success");
    } else if (selectedMethod.key === "upi") {
      const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: "rzp_test_5JTg9I35AkiZMQ",
        amount: 55000,
        currency: "INR",
        name: "Your Store",
        description: "Payment for Order",
        image: "https://your-logo-url.com/logo.png",
        handler: async function (response) {
          const orderId = await createOrder(orderDetails);
          await savePaymentDetails({
            paymentId: response.razorpay_payment_id,
            orderId,
            signature: response.razorpay_signature || "",
            method: "UPI",
            status: "success",
            amount: 550,
          });

          alert("Payment successful! ID: " + response.razorpay_payment_id);
          navigate("/order-success");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  // ✅ Loader while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-orange-500 h-16 w-16 mb-4 animate-spin mx-auto"></div>
          <p className="text-gray-700 text-lg">Checking login status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <PaymentOptionCard
            key={method.key}
            method={method}
            selected={selectedMethod?.key === method.key}
            onSelect={setSelectedMethod}
          />
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded shadow-md border">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Items Total</span><span>₹500</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery</span><span>₹50</span>
        </div>
        <div className="flex justify-between font-bold text-base mt-2">
          <span>Total</span><span>₹550</span>
        </div>
      </div>

      <button
        onClick={handleProceed}
        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200"
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default PaymentSelection;

// ✅ Razorpay script loader
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
