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
import { HomeRoute } from '../constants/RouteConstants';

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
        <div className="text-xl text-primary font-bold">RoboMart</div>

        {/* Hamburger Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu Container */}
        <div
          className={`md:flex md:items-center md:gap-5 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
          } overflow-hidden md:overflow-visible`}
        >
          <div className="flex flex-col md:flex-row md:gap-5">
            {/* Dropdown Menus */}
            {dropdownItems.map(({ label, data }) => (
              <div
                key={label}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() =>
                    isMobile && setOpenDropdown(openDropdown === label ? null : label)
                  }
                  className="flex items-center gap-1 hover:text-gray-400 w-full md:w-auto py-2 md:py-0"
                >
                  {label}
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      openDropdown === label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown List */}
                <ul
                  className={`${
                    openDropdown === label
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  } transition-all duration-300 md:absolute md:left-0 mt-2 md:w-48 w-full bg-white text-black rounded shadow-lg z-50 px-2 py-2 space-y-0.5 ${
                    isMobile ? 'relative mt-1' : ''
                  }`}
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
              </div>
            ))}

            {/* Static Links */}
            <Link
              to={HomeRoute}
              className="hover:text-gray-400 py-2 md:py-0"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="hover:text-gray-400 py-2 md:py-0"
              onClick={closeMenu}
            >
              Blogs
            </Link>
            <Link
              to="/academy"
              className="hover:text-gray-400 py-2 md:py-0"
              onClick={closeMenu}
            >
              Academy
            </Link>
            <Link
              to="/careers"
              className="hover:text-gray-400 py-2 md:py-0"
              onClick={closeMenu}
            >
              Careers
            </Link>
            <Link
              to="/projectgpt"
              className="hover:text-gray-400 py-2 md:py-0"
              onClick={closeMenu}
            >
              ProjectGpt
            </Link>
          </div>

          {/* Cart & User */}
          <div className="flex gap-4 items-center mt-4 md:mt-0 px-2">
            <UserDropdown />
            <AddToCartHover />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
