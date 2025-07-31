import React, { useEffect } from "react";
import useOrderStore from "../data/stores/orderStore";
import { getAuth } from "firebase/auth";

const STATUS_STEPS = ["Confirmed Order", "Processing", "Dispatched", "Delivered"];

const UserOrders = () => {
  const { userOrders, fetchAllOrdersForUser, loading } = useOrderStore();

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      fetchAllOrdersForUser(user.uid);
    }
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {userOrders.length === 0 && (
        <div className="text-center text-gray-500">No orders found.</div>
      )}
      {userOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg shadow-sm bg-white mb-6 overflow-hidden"
        >
          {order.sharedBy && (
            <div className="bg-yellow-50 text-yellow-800 p-2 text-sm">
              {order.sharedBy} shared this order with you.
            </div>
          )}

          {/* Order Items */}
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border-b">
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-20 h-20 rounded object-cover border"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 truncate">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  Color: {item.color || "N/A"} &nbsp; Size: {item.size || "N/A"}
                </p>
              </div>
              <div className="text-right font-medium text-gray-800">
                ₹{item.price}
              </div>
            </div>
          ))}

          {/* Order Status Progress */}
          <div className="px-4 pt-4">
            <OrderStatusTracker currentStatus={order.status} />
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-start p-4 text-sm">
            <div>
              {order.refundStatus ? (
                <>
                  <p className="text-orange-600 font-semibold">
                    🟠 {order.refundStatus}
                  </p>
                  <p className="text-gray-500">{order.refundReason}</p>
                </>
              ) : (
                <>
                  <p className="text-green-600 font-semibold">
                    🟢 Delivered on {order.deliveryDate || "N/A"}
                  </p>
                  <p className="text-gray-500">Your item has been delivered</p>
                </>
              )}
            </div>
            <div className="text-blue-600 hover:underline cursor-pointer font-medium mt-2">
              ⭐ Rate & Review Product
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ✅ Order Status Progress Tracker Component
const OrderStatusTracker = ({ currentStatus }) => {
  const activeStepIndex = STATUS_STEPS.indexOf(currentStatus);

  return (
    <div className="w-full px-2 pb-4">
      <div className="flex justify-between relative">
        {STATUS_STEPS.map((step, idx) => (
          <div key={step} className="flex-1 flex flex-col items-center z-10">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs ${
                idx <= activeStepIndex
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                idx <= activeStepIndex ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
        {/* Blue line below steps */}
        <div className="absolute top-2.5 left-0 right-0 h-1 bg-gray-300 z-0">
          <div
            className="h-1 bg-blue-600 transition-all duration-500"
            style={{
              width: `${(activeStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
