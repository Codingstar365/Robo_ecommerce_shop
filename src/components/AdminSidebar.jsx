import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';

const AdminNavbar = ({ toggleSidebar }) => {
  const location = useLocation();
  if (!location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Hamburger (visible on mobile only) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white p-2 rounded hover:bg-gray-800"
          >
            <FiMenu size={22} />
          </button>
          <h1 className="text-2xl font-semibold tracking-wide">Admin Panel</h1>
        </div>

        {/* Right Side: Profile & Logout */}
        <div className="flex items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
            alt="Admin"
            className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
          />
          <button
            onClick={() => alert('Logging out...')}
            className="flex items-center gap-1 text-sm bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-white font-medium transition"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
