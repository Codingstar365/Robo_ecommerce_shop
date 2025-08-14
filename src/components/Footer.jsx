import React from 'react'
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';
import { Allcategories, FooterBlogs, ShopByBrand, Support } from '../constants/NavbarConstant';
import logo from "../assets/robomart2.png"; // ✅ Add your logo image path here

const Footer = () => {
  return (
    <div className='bottom-0 left-0 w-full     '>
      <div className="bg-secondary text-center px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-white text-base md:text-lg font-semibold ">
          Sign up for our newsletter and unlock exclusive promotions and discounts
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <FaInstagram size={28} className="text-white  hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaFacebook size={28} className="text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaYoutube size={28} className="text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaLinkedin size={28} className="text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaTwitter size={28} className="text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
          <FaGoogle size={28} className="text-white hover:bg-blue-600 rounded-full p-1 transition-all" />
        </div>
      </div>

      <div className='bg-gray-200 flex gap-10 flex-col md:flex-row justify-between text-center md:text-left p-4 text-1xl '>
        <div className='md:w-1/5  '>
          {/* ✅ Replaced text with logo image */}
          <img src={logo} alt="Company Logo" className="w-28 h-auto object-contain" />
          <div className='w-full text-sm mt-5'>
            Robocraze is India's most trusted
            Robotics and DIY store. We aim at
            fostering the growth of knowledge in
            Embedded Systems, IoT and Automation.</div>
        </div>
        <div className='md:w-4/5 flex justify-between flex-col md:flex-row'>
          <div>
            <div className='text-primary font-bold text-2xl'>
              Top Categories
            </div>
            <div className='mt-5'>
              {
                Allcategories.map((value) => {
                  return <div className='text-sm'>{value.name}</div>
                })
              }
            </div>
          </div>
          <div>
            <div className='text-primary font-bold text-2xl '>
              Shop By Brand
            </div>
            <div className="mt-5">
              {ShopByBrand.slice(0, 15).map((value, index) => {
                return <div key={index} className="text-sm">{value.name}</div>;
              })}
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='text-primary font-bold text-2xl'>Blogs</div>
            <div className='mt-5'>
              {
                FooterBlogs.map((value) => {
                  return <div className='text-sm'>{value.name}</div>
                })
              }
            </div>
          </div>
          <div>
            <div className='text-primary font-bold text-2xl '>Support</div>
            <div className='mt-5'>
              {
                Support.map((value) => {
                  return <div className='text-sm'>{value.name}</div>
                })
              }
            </div>
          </div>
        </div>

      </div>
    </div >
  )
};

export default Footer;
