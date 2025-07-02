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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(false);
      setOpenDropdown(null);
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
      clearTimeout(hoverTimeout);
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
      setHoverTimeout(timeout);
    }
  };

  return (
    <nav className="bg-white text-black p-2.5 w-full fixed top-0 left-0 z-50 border border-gray-300 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-5">
        <div className="text-xl font-bold space-y-0.5">MyApp</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`flex flex-col md:flex-row md:items-center gap-5 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex p-2' : 'hidden md:flex'
          }`}
        >
          {/* Dropdown Menus */}
          {dropdownItems.map(({ label, data }) => (
            <div
              key={label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => isMobile && setOpenDropdown(openDropdown === label ? null : label)}
                className="flex items-center gap-1 hover:text-gray-400"
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
                } transition-all duration-300 absolute md:left-0 mt-2 md:w-48 w-full bg-white text-black rounded shadow-lg z-50 px-2 py-2 space-y-0.5 ${
                  isMobile ? 'relative mt-1' : ''
                }`}
              >
                {data.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.href}
                      className="block px-2 p text-sm hover:bg-gray-100 rounded"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Other Static Links */}
          <Link to="/blogs" className="hover:text-gray-400">
            Blogs
          </Link>
          <Link to="/academy" className="hover:text-gray-400">
            Academy
          </Link>
          <Link to="/careers" className="hover:text-gray-400">
            Careers
          </Link>
          <Link to="/projectgpt" className="hover:text-gray-400">
            ProjectGpt
          </Link>

          {/* Cart and User */}
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <UserDropdown />
            <AddToCartHover />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
