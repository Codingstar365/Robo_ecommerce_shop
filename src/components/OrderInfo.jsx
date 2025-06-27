import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <FaUser className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/track-order">Track Your Order</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/invoice">Download Invoice</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/account">Account Options</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
