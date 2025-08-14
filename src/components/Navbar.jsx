import React, { useState, useEffect, useRef } from 'react';
import {
  Allcategories,
  BulkOrders,
  Industrial,
  LabSetUp,
  ShopByBrand
} from '../constants/NavbarConstant';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UserDropdown from './OrderInfo';
import AddToCartHover from './AddToCard';
import logo from '../assets/robomart.jpg';
import { useAuthStore } from '../data/stores/authStore'; // ✅ Zustand store

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeout = useRef(null);

  const { user } = useAuthStore((state) => state); // ✅ Zustand store with localStorage persist

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dropdownItems = [
    { label: 'All Categories', data: Allcategories },
    { label: 'Shop By Brand', data: ShopByBrand },
    { label: 'Bulk Orders', data: BulkOrders },
    { label: 'Lab Set Up', data: LabSetUp },
    { label: 'Industrial', data: Industrial }
  ];

  const handleMouseEnter = (label) => {
    if (!isMobile) {
      clearTimeout(closeTimeout.current);
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeout.current = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white text-black p-2.5 w-full fixed top-0 left-0 z-50 border border-gray-300 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Mobile Header Icons */}
        <div className="md:hidden flex items-center gap-4">
          <div className="ml-2">
            <AddToCartHover />
          </div>
          {user ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="px-3 py-1  text-white rounded hover:bg-blue-700 text-sm"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-5">
          {dropdownItems.map(({ label, data }) => (
            <div
              key={label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 hover:text-gray-400">
                {label}
                <FiChevronDown
                  className={`transition-transform duration-300 ${openDropdown === label ? 'rotate-180' : ''}`}
                />
              </button>
              {openDropdown === label && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50 px-2 py-2 space-y-0.5"
                  onMouseEnter={() => handleMouseEnter(label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {data.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={item.href}
                        className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {user ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="px-3 border rounded-xl py-1 bg-red-600 text-white font-normal text-md transition-colors duration-300 hover:bg-red-500"
            >
              Login
            </Link>
          )}
          <AddToCartHover />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col gap-2 p-4">
            {dropdownItems.map(({ label, data }) => (
              <div key={label} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === label ? null : label)
                  }
                  className="flex items-center justify-between w-full py-2"
                >
                  {label}
                  <FiChevronDown
                    className={`transition-transform duration-300 ${openDropdown === label ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === label && (
                  <ul className="mt-1 bg-white px-2 py-2 rounded shadow">
                    {data.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={item.href}
                          className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
