import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-gray-700 hover:text-blue-600 focus:outline-none transition duration-200">
        <FaUser className="w-6 h-6" />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg transition-opacity duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
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
    </div>
  );
};

export default UserDropdown;
