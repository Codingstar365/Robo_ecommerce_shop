import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserOrder = () => {
  const navigate = useNavigate();
 
  const [showMessage,setShowMessage] =useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
      navigate("/");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {showMessage && (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center border border-gray-200">
          <div className="mb-4">
            <svg
              className="mx-auto w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 text-sm">
            Thank you for your purchase. You will be redirected to the homepage shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
