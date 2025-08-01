import React, { useState, useEffect } from 'react';
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

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (!isMobile) setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpenDropdown(null);
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
          <div className="ml-2"> {/* Left margin only for mobile */}
            <AddToCartHover />
          </div>
          <UserDropdown />
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
              <button
                className="flex items-center gap-1 hover:text-gray-400"
              >
                {label}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    openDropdown === label ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === label && (
                <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50 px-2 py-2 space-y-0.5">
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
          {/* Cart & User */}
          <UserDropdown />
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
                    className={`transition-transform duration-300 ${
                      openDropdown === label ? 'rotate-180' : ''
                    }`}
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
