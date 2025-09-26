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
import { useAuthStore } from '../data/stores/authStore'; 
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeout = useRef(null);

  const { user } = useAuthStore((state) => state);

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
    <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-4">
          <AddToCartHover />
          {user ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 text-white rounded-lg bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-sm transition"
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
        <div className="hidden md:flex md:items-center md:gap-8 font-medium">
          {dropdownItems.map(({ label, data }) => (
            <div
              key={label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="relative flex items-center gap-1 text-gray-800 hover:text-primary transition">
                {label}
                <FiChevronDown
                  className={`transition-transform duration-300 ${openDropdown === label ? 'rotate-180' : ''}`}
                />
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              <AnimatePresence>
                {openDropdown === label && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 mt-3 w-56 bg-white/90 backdrop-blur-md text-black rounded-xl shadow-lg z-50 px-3 py-3 space-y-2"
                  >
                    {data.map((item, i) => (
                      <li key={i}>
                        <Link
                          to={item.href}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition"
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}

          {user ? (
            <UserDropdown />
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
          <AddToCartHover />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t"
          >
            <div className="flex flex-col gap-3 p-5">
              {dropdownItems.map(({ label, data }) => (
                <div key={label} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === label ? null : label)
                    }
                    className="flex items-center justify-between w-full py-2 font-medium"
                  >
                    {label}
                    <FiChevronDown
                      className={`transition-transform duration-300 ${openDropdown === label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === label && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50 px-3 py-2 rounded-lg shadow-inner mt-1"
                      >
                        {data.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={item.href}
                              className="block px-2 py-1 text-sm hover:bg-gray-200 rounded-md"
                              onClick={closeMenu}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
