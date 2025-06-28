import React, { useState } from 'react';
import { Allcategories, BulkOrders, Industrial, LabSetUp, ShopByBrand } from '../constants/NavbarConstant';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UserDropdown from './OrderInfo';
import AddToCartHover from './AddToCard';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <nav className="bg-white text-black p-3.5 w-full fixed top-0 left-0 z-50 border shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-5">
        <div className="text-xl font-bold">MyApp</div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Nav Items */}
        <div
          className={`flex-col md:flex-row md:flex gap-5 items-start md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex p-4' : 'hidden md:flex'
          }`}
        >
          {/* Dropdown Wrapper */}
          {[
            { label: "All Categories", data: Allcategories },
            { label: "Shop By Brand", data: ShopByBrand },
            { label: "Bulk Orders", data: BulkOrders },
            { label: "Lab Set Up", data: LabSetUp },
            { label: "Industrial", data: Industrial },
          ].map(({ label, data }) => (
            <ul
              key={label}
              className="relative group cursor-pointer w-full md:w-auto"
              onClick={() => isMobile && toggleDropdown(label)}
              onMouseEnter={() => !isMobile && setOpenDropdown(label)}
              onMouseLeave={() => !isMobile && setOpenDropdown(null)}
            >
              <span className="hover:text-gray-300 flex items-center justify-between w-full">
                {label}
                <FiChevronDown
                  className={`ml-1 transition-transform duration-400 ${
                    openDropdown === label ? 'rotate-180' : ''
                  }`}
                />
              </span>
              <ul
                className={`md:absolute mt-2 w-40 bg-white text-black rounded shadow-lg transition duration-300 px-2 overflow-hidden ${
                  openDropdown === label ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
                } ${isMobile ? 'relative' : ''}`}
              >
                {data.map((item, index) => (
                  <li key={index}>
                    <Link to={item.href} className="block px-1 py-1 text-sm hover:bg-gray-100">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          ))}

          {/* Simple Links */}
          <Link to="/blogs" className="hover:text-gray-300">
            Blogs
          </Link>
          <Link to="/academy" className="hover:text-gray-300">
            Academy
          </Link>
          <Link to="/careers" className="hover:text-gray-300">
            Careers
          </Link>
          <Link to="/projectgpt" className="hover:text-gray-300">
            ProjectGpt
          </Link>

          {/* User + Cart */}
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <UserDropdown />
            <AddToCartHover />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
