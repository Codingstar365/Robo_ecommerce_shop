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

  // ✅ Logout with loader until everything is done
  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loader immediately

    try {
      // Step 1: Wait for Firebase sign out
      await signOut(auth);

      // Step 2: Clear Zustand auth & cart
      setUser(null);
      clearBuyNowItem();

      // Step 3: Clear all localStorage
      localStorage.clear();

      // Step 4: Navigate to home
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Step 5: Hide loader only after everything is done
      setIsLoggingOut(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      <button
        className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-200"
        onClick={() => setIsOpen((prev) => !prev)}
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
         
          {/* <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/account" onClick={() => setIsOpen(false)}>
              Account Options
            </Link>
          </li> */}
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/admin/dashboard" onClick={() => setIsOpen(false)}>
              Go to Admin
            </Link>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            onClick={handleLogout}
          >
            {isLoggingOut ? (
              <span className="text-blue-600 text-sm">Logging out...</span>
            ) : (
              "Logout"
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
