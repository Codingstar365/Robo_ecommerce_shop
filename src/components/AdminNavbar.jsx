import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
// xl,scls
const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  if (!location.pathname.startsWith('/admin')) return null;

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { to: '/admin/products', label: 'Products', icon: <FiBox /> },
    { to: '/admin/orders', label: 'Orders', icon: <FiSettings /> },
    { to: '/admin/users', label: 'Users', icon: <FiUsers /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen fixed top-0 left-0 z-40 w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="p-4 border-b border-gray-700 text-2xl font-bold tracking-wide">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)} // close on click in mobile
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
              location.pathname === link.to ? 'bg-gray-800' : ''
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={() => alert('Logging out...')}
          className="flex items-center gap-2 p-2 w-full hover:bg-red-600 rounded transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
