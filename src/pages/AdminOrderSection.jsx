import React, { useEffect, useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// 🔹 Status to color mapping
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "text-red-600 bg-red-100";
    case "Processing Order":
      return "text-yellow-700 bg-yellow-100";
    case "Dispatched":
      return "text-blue-700 bg-blue-100";
    case "Delivered":
      return "text-green-700 bg-green-100";
    case "Confirm Order":
      return "text-purple-700 bg-purple-100";
    default:
      return "";
  }
};

const tabs = [
  "All orders",
  "Confirmed Order",
  "Processing Order",
  "Quality Check",
  "Product Dispatched",
  "Product Delivered",
];
const statusOptions = [
  "Confirmed Order",
  "Processing Order",
  "Quality Check",
  "Product Dispatched",
  "Product Delivered",
];

const UserProfile = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("All orders");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // 🔹 Fetch all orders (newest first) and user info
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const ordersData = await Promise.all(
          snapshot.docs.map(async (orderDoc) => {
            const orderData = orderDoc.data();
            let userName = "N/A";
            let userAddress = "N/A";

            if (orderData.userId) {
              try {
                const userRef = doc(db, "users", orderData.userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                  const userInfo = userSnap.data();
                  userName = userInfo.name || "N/A";
                  userAddress = userInfo.address || "N/A";
                }
              } catch (err) {
                console.error("Error fetching user info:", err);
              }
            }

            return {
              id: orderDoc.id,
              ...orderData,
              userName,
              userAddress,
            };
          })
        );

        setUserOrders(ordersData);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    activeTab === "All orders"
      ? userOrders
      : userOrders.filter((order) => order.currentStatus === activeTab);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { currentStatus: newStatus });
      setUserOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, currentStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
    setDropdownOpen(null);
  };

  const formatDate = (createdAt) => {
    if (!createdAt) return "N/A";
    if (createdAt.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleDateString();
    }
    return new Date(createdAt).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-24">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
            <p className="text-gray-500 text-sm">
              {filteredOrders.length} orders found
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`uppercase text-sm font-bold tracking-wide pb-2 transition-all duration-200 border-b-4 ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600 scale-105"
                  : "text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Orders */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-50 border-b text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.userName}</td>
                    <td className="py-3 px-4">{order.userAddress}</td>
                    <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-3 px-4">₹{order.totalAmount || 0}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${getStatusStyle(
                          order.currentStatus
                        )}`}
                      >
                        {order.currentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center relative">
                      <div className="flex justify-center gap-3 relative z-0">
                        <button
                          onClick={() =>
                            setDropdownOpen(dropdownOpen === order.id ? null : order.id)
                          }
                          className="hover:text-blue-600 relative z-10"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        {dropdownOpen === order.id && (
                          <div className="absolute top-6 right-0 z-20 w-40 bg-white border rounded shadow">
                            {statusOptions.map((status) => (
                              <div
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                              >
                                {status}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
