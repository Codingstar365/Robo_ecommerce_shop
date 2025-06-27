import React from 'react';
import { Allcategories, BulkOrders, Industrial, LabSetUp, ShopByBrand } from '../constants/NavbarConstant';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import UserDropdown from './OrderInfo';
import AddToCartHover from './AddToCard';

function Navbar() {
  return (
    <nav className="bg-white text-black p-6  w-full fixed top-0 left-0 z-50  border">
      <div className="container mx-auto flex justify-between items-center px-5">
        <div className="text-xl font-bold">MyApp</div>
        <div className='flex gap-5'>

          <ul className="relative group cursor-pointer">
            <span className="hover:text-gray-300 flex items-center ">All Categories<FiChevronDown className='transition-transform duration-400 hover:rotate-180' /></span>

            {/* Dropdown content */}
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 px-2">
              {Allcategories.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="block px-1  text-sm gap-y-0.5 hover:bg-gray-100">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
          <ul className="relative group cursor-pointer">
            <span className="hover:text-gray-300 flex items-center gap-y-0.5">Shop By Brand<FiChevronDown className='transition-transform duration-400 hover:rotate-180' /></span>

            {/* Dropdown content */}
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 px-2">
              {ShopByBrand.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="block px-1  text-sm hover:bg-gray-100 overflow-y ">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
          <ul className="relative group cursor-pointer">
            <span className="hover:text-gray-300 flex items-center gap-0.5">Bulk Orders<FiChevronDown className='transition-transform duration-400 hover:rotate-180' /></span>

            {/* Dropdown content */}
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 px-2">
              {BulkOrders.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="block px-1  text-sm hover:bg-gray-100">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
          <ul className="relative group cursor-pointer">
            <span className="hover:text-gray-300 flex items-center gap-1">Lab Set Up<FiChevronDown className='transition-transform duration-400 hover:rotate-180' /></span>

            {/* Dropdown content */}
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 px-2">
              {LabSetUp.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="block px-1 py-1 text-sm hover:bg-gray-100">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>

          <Link to={"/blogs"}>Blogs</Link>
          <Link to={"/academy"}>Academy</Link>
          <Link to={"/careers"}>Careers</Link>
          <Link to={"/projectgpt"}>ProjectGpt</Link>

          <ul className="relative group cursor-pointer">
            <span className="hover:text-gray-300 flex items-center gap-1">Industrial<FiChevronDown className='transition-transform duration-400 hover:rotate-180' /></span>

            {/* Dropdown content */}
            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 px-2">
              {Industrial.map((item, index) => (
                <li key={index}>
                  <Link to={item.href} className="block px-1  text-sm hover:bg-gray-100">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
          <div className='flex gap-5 justify items-center px-6'>
        <UserDropdown/>
             <AddToCartHover/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;