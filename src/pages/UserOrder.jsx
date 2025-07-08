// src/pages/OrderTracking.jsx
import React from "react";
import {
  ShoppingCart,
  Settings,
  BadgeCheck,
  Truck,
  Home,
} from "lucide-react";

const steps = [
  { label: "Confirmed Order", icon: <ShoppingCart />, status: "completed" },
  { label: "Processing Order", icon: <Settings />, status: "completed" },
  { label: "Quality Check", icon: <BadgeCheck />, status: "current" },
  { label: "Product Dispatched", icon: <Truck />, status: "upcoming" },
  { label: "Product Delivered", icon: <Home />, status: "upcoming" },
];

const OrderTracking = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <p className="text-sm">TRACKING ORDER NO - <span className="font-bold">001698653lp</span></p>
        </div>
        <div className="text-sm">
          Expected Date: <span className="font-semibold">SEP 09, 2017</span>
        </div>
      </div>

      {/* Subheader */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex justify-between">
        <div>Shipped Via: <span className="font-semibold">UPS Ground</span></div>
        <div>Status: <span className="font-semibold text-blue-600">Checking Quality</span></div>
      </div>

      {/* Stepper */}
      <div className="bg-white border rounded-b-lg p-6">
        <div className="flex justify-between items-center relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center
                ${step.status === "completed" ? "bg-blue-500 text-white"
                  : step.status === "current" ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"}`}>
                {step.icon}
              </div>
              <span className={`mt-2 text-sm font-medium
                ${step.status === "completed" ? "text-gray-800"
                  : step.status === "current" ? "text-blue-600"
                  : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
          {/* Horizontal lines between steps */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 z-0" />
          <div className="absolute top-6 left-6 right-[60%] h-0.5 bg-blue-500 z-10" /> {/* progress line */}
        </div>
      </div>

      {/* Bottom Options */}
      <div className="mt-6 flex items-center justify-between px-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="form-checkbox rounded" />
          Notify me when order is delivered
        </label>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all">
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
