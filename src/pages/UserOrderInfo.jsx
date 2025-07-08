import React, { useEffect } from "react";
import useOrderStore from "../data/stores/orderStore";
import { getAuth } from "firebase/auth";

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

          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border-b">
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.name}
                className="w-20 h-20 rounded object-cover border"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Color: {item.color || "N/A"} &nbsp; Size: {item.size || "N/A"}
                </p>
              </div>
              <div className="text-right font-medium text-gray-800">₹{item.price}</div>
            </div>
          ))}

          <div className="flex justify-between items-start p-4 text-sm">
            <div>
              {order.refundStatus ? (
                <>
                  <p className="text-orange-600 font-semibold">🟠 {order.refundStatus}</p>
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

export default UserOrders;
