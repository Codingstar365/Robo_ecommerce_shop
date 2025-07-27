import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const TrackOrderStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "orders", id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const defaultSteps = [
          "Confirmed Order",
          "Processing Order",
          "Quality Check",
          "Product Dispatched",
          "Product Delivered",
        ];

        const currentStatus = data.currentStatus || defaultSteps[0];

        setOrder({
          orderId: data.orderId || id,
          courier: data.courier || "N/A",
          expectedDate: data.expectedDate?.toDate() || new Date(),
          currentStatus,
          steps: data.statusSteps || defaultSteps,
          paymentStatus: !!data.paymentStatus,
        });
      } else {
        setOrder(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [id]);

  if (loading) {
    return (
      <div className="  flex justify-center items-center text-gray-600 text-lg">
        ⏳ Loading order status...
      </div>
    );
  }

  if (!order) {
    return (
      <div className=" flex justify-center items-center text-red-600 text-xl font-semibold">
        ❌ Order not found.
      </div>
    );
  }

  const currentIndex = order.steps.indexOf(order.currentStatus);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10 flex justify-center items-start mt-16">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-sm sm:text-base">
          <span>
            <strong>Tracking Order #</strong> {order.orderId}
          </span>
          <span>
            <strong>Expected by:</strong>{" "}
            {order.expectedDate.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Order Info */}
        <div className="px-6 py-6 sm:py-8">
          <p className="text-sm sm:text-base mb-2">
            <strong className="text-gray-700">Shipped Via:</strong>{" "}
            <span className="font-medium text-gray-900">{order.courier}</span>
          </p>
          <p className="text-sm sm:text-base mb-6">
            <strong className="text-gray-700">Current Status:</strong>{" "}
            <span className="text-blue-700 font-semibold">{order.currentStatus}</span>
          </p>

          {/* Stepper */}
          <div className="relative flex justify-between items-start sm:items-center overflow-x-auto pb-8">
            {order.steps.map((step, idx) => {
              const isCompleted = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center w-full min-w-[100px] relative z-10"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors duration-200 ${
                      isCompleted || isCurrent
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p
                    className={`text-xs sm:text-sm font-medium leading-tight ${
                      isCompleted || isCurrent ? "text-blue-800" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}

            {/* Progress Bar */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-gray-300 z-0 rounded">
              <div
                className="h-full bg-blue-600 rounded transition-all duration-500"
                style={{
                  width: `${
                    currentIndex >= 0
                      ? (currentIndex / (order.steps.length - 1)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Notify */}
          <div className="mt-6 flex items-center space-x-3">
            <input type="checkbox" id="notify" className="accent-blue-600 w-4 h-4" />
            <label htmlFor="notify" className="text-sm text-gray-700">
              Notify me when the order is delivered
            </label>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-right">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-5 py-2 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition rounded-lg text-sm shadow-sm"
            >
              ← View Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderStatus;
