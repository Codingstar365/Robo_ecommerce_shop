import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // 🔒 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      <button
        className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaUser className="w-6 h-6" />
      </button>

      {/* Smooth dropdown */}
      <div
        className={`
          absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <ul className="py-2 text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/user-profile" onClick={() => setIsOpen(false)}>Your Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/track-order" onClick={() => setIsOpen(false)}>Track Your Order</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/invoice" onClick={() => setIsOpen(false)}>Download Invoice</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/account" onClick={() => setIsOpen(false)}>Account Options</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">
            <Link to="/admin/products"  onClick={("/admin/products")}>Go to Admin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
