import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../data/stores/authStore"; 
import useCartStore from "../data/stores/cartStore";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { setUser } = useAuthStore();
  const { clearBuyNowItem } = useCartStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout with loader for 10s before actually logging out
  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loader immediately
    setIsOpen(false); // Close dropdown

    try {
      // Wait for 10 seconds before logging out
      setTimeout(async () => {
        // Step 1: Firebase sign out
        await signOut(auth);

        // Step 2: Clear Zustand auth & cart
        setUser(null);
        clearBuyNowItem();

        // Step 3: Clear localStorage
        localStorage.clear();

        // Step 4: Navigate home
        navigate("/");
      }, 10000); // 10000ms = 10 seconds

    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false); // Hide loader only if failed
    }
  };

  return (
    <>
      {/* Fullscreen Loader Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-medium">Logging out...</p>
          </div>
        </div>
      )}

      <div ref={dropdownRef} className="relative inline-block text-left z-40">
        <button
          className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-200"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isLoggingOut} // prevent clicks while logging out
        >
          <FaUser className="w-6 h-6" />
        </button>

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg
            transform transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
        >
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/user-profile" onClick={() => setIsOpen(false)}>
                My Profile
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>
                Go to Admin
              </Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
