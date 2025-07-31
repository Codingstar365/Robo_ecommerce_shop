import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // ✅ your firebase config
import { useAuthStore } from "../../data/stores/authStore";
import useCartStore from "../../data/stores/cartStore";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const { setUser } = useAuthStore(); // ✅ Update auth store
  const { clearBuyNowItem } = useCartStore(); // ✅ Clear cart
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1️⃣ Sign out from Firebase
      await signOut(auth);

      // 2️⃣ Clear Zustand stores
      setUser(null); // remove user from auth store
      clearBuyNowItem(); // remove cart items

      // 3️⃣ Clear localStorage data related to user
      localStorage.removeItem("cartItems");
      localStorage.removeItem("userData");

      // 4️⃣ Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h2>Welcome</h2>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default LogOut;
