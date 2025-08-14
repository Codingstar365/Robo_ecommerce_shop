import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../data/stores/userStore";
import useOrderStore from "../data/stores/orderStore";
import wishlistStore from "../data/stores/wishlistStore"; // ✅ wishlist
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";

const UserProfile = () => {
  const { data: user, fetchUser, loading: userLoading, updateUser } = userStore();
  const { userOrders, fetchUserOrders, loading: orderLoading } = useOrderStore();

  const {
    wishlist,
    fetchWishlist,
    loading: wishlistLoading,
  } = wishlistStore(); // ✅ wishlist

  const [activeTab, setActiveTab] = useState("My Account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchUserOrders();
  }, []);

  useEffect(() => {
    if (user?.uid) fetchWishlist(user.uid); // ✅ wishlist
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    setIsEditing(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage("");

    const { current, newPass, confirm } = passwords;

    if (!current || !newPass || !confirm) {
      return setPasswordMessage(" Please fill in all fields.");
    }

    if (newPass !== confirm) {
      return setPasswordMessage(" New passwords do not match.");
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      return setPasswordMessage(" User not authenticated.");
    }

    const credential = EmailAuthProvider.credential(currentUser.email, current);

    try {
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPass);
      setPasswordMessage("✅ Password updated successfully.");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (error) {
      console.error(error);
      if (error.code === "auth/wrong-password") {
        setPasswordMessage(" Current password is incorrect.");
      } else {
        setPasswordMessage(` ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen w-full  py-6 px-2 md:px-4 mt-20">
      <div className="max-w-7xl mx-auto text shadow-2xl rounded-xl flex flex-col md:flex-row overflow-hidden border border-gray-300">
        <aside className=" w-full md:w-64 p-6 border-r border-gray-300">
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={user?.photoURL || "https://randomuser.me/api/portraits/men/1.jpg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 shadow-lg"
            />
            <h2 className="text-xl font-bold mt-3 ">{user?.name || "User Name"}</h2>
            <p className="text-sm font-semibold">{user?.email || "user@example.com"}</p>
            <p className="text-sm  font-semibold mt-1">Welcome back</p>
          </div>

          <nav className="space-y-2">
            {["My Account", "My Orders", "Returns & Cancel", "Wishlist", "Payment", "Change Password"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setIsEditing(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg transition font-semibold ${activeTab === item
                  ? "  shadow-md"
                  : " hover:bg-red-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 sm:p-8  overflow-y-auto max-h-[80vh]">
          <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
            <h2 className="text-2xl font-bold ">
              {activeTab === "My Account" ? "👤 Personal Information" : activeTab}
            </h2>
            {activeTab === "My Account" && !isEditing && (
              <button
                className=" text-sm font-medium hover:underline text-red-500 "
                onClick={() => setIsEditing(true)}
              >
                ✎ Edit Profile
              </button>
            )}
          </div>

          {activeTab === "My Account" && (
            <>
              {userLoading ? (
                <p className="text-gray-500">Loading user data...</p>
              ) : isEditing ? (
                <form onSubmit={handleFormSubmit} className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm  font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md "
                    />
                  </div>

                  <div>
                    <label className="text-sm  font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md "
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm  font-medium">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className=" border px-5 py-2 rounded-md bg-red-500 "
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="border  px-5 py-2 rounded-md bg-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium">Full Name</p>
                    <h3 className="text-lg font-semibold text-gray-800">{user?.name || "N/A"}</h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <h3 className="text-lg font-semibold text-gray-800">{user?.email || "N/A"}</h3>
                  </div>
                  <div>
                    <p className="text-sm  font-medium">Address</p>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user?.address || "N/A"}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Orders</p>
                    {orderLoading ? (
                      <p className="">Loading...</p>
                    ) : (
                      <h3 className="text-lg font-semibold text-gray-800">
                        {userOrders.length || 0}
                      </h3>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "My Orders" && (
            <>
              {orderLoading ? (
                <p className="text-gray-500">Fetching your orders...</p>
              ) : userOrders.length === 0 ? (
                <p className=" italic">You haven't placed any orders yet.</p>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                  {userOrders.map((order, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-xl p-4 shadow-md transition from-white to-red-50 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="text-lg font-bold ">
                            Order #{order.orderId || index + 1}
                          </h3>
                          <p className="text-sm ">
                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/track-order/${order.id}`)}
                          className="text-sm   px-4 py-1.5 rounded-full shadow"
                        >
                          🚚 Track Order
                        </button>
                      </div>

                      <div className="mt-3 space-y-3">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <img
                              src={item.image || "https://via.placeholder.com/80"}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-md border border-gray-300"
                            />
                            <div>
                              <p className="font-medium text-gray-800">{item.title}</p>
                              <p className="text-sm">Qty: {item.quantity}</p>
                              <p className="text-sm">Price: ₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-between items-center border-t border-gray-300 pt-3">
                        <p className="text-gray-800 font-semibold">Total: ₹{order.totalAmount}</p>
                        <span className="text-sm font-medium px-3 py-1 rounded-full  ">
                          {order.status?.[order.status.length - 1] || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "Wishlist" && (
            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
              {wishlistLoading ? (
                <p className="text-gray-500">Fetching your wishlist...</p>
              ) : wishlist.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-10">💔 Your wishlist is empty.</p>
              ) : (
                wishlist.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md border border-gray-300"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">₹{item.price}</p>

                      {/* ✅ Added fields */}
                      <p className="text-sm text-gray-600">Discount: {item.discount || "0%"} OFF</p>
                      <p className="text-sm text-gray-600">Name: {item.name || "N/A"}</p>

                      {item.category && (
                        <p className="text-xs text-gray-500">📦 Category: {item.category}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      )}
                      {item.rating && (
                        <p className="text-xs text-yellow-600">⭐ Rating: {item.rating}/5</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="text-sm  text-white px-4 py-2 rounded-md "
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {["Returns & Cancel", "Payment"].includes(activeTab) && (
            <div className="text-gray-500 text-center mt-16 text-sm italic">
              ⚠️ Feature "{activeTab}" is under development.
            </div>
          )}

          {activeTab === "Change Password" && (
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
              <div>
                <label className="text-sm  font-medium">Current Password</label>
                <input
                  type="password"
                  name="current"
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md "
                />
              </div>
              <div>
                <label className="text-sm  font-medium">New Password</label>
                <input
                  type="password"
                  name="newPass"
                  required
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md "
                />
              </div>
              <div>
                <label className="text-sm  font-medium">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  required
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border border-gray-400 rounded-md "
                />
              </div>
              {passwordMessage && (
                <p
                  className={`text-sm font-medium ${passwordMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {passwordMessage}
                </p>
              )}
              <button
                type="submit"
                className="  border bg-red-500 px-5 py-2 rounded-md"
              >
                Update Password
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserProfile; 