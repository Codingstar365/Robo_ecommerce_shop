import React from "react";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import {
  Allcategories,
  FooterBlogs,
  ShopByBrand,
  Support,
} from "../constants/NavbarConstant";
import logo from "../assets/robomart2.png"; // ✅ Add your logo image

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Newsletter Section */}
      <div className="bg-secondary px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-white text-lg md:text-xl font-semibold text-center md:text-left">
          Sign up for our newsletter & unlock exclusive promotions and discounts 🚀
        </h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg outline-none w-full md:w-64"
          />
          <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div className="col-span-2 md:col-span-1">
          <img src={logo} alt="Company Logo" className="w-32 h-auto mb-4" />
          <p className="text-sm leading-relaxed">
            Robocraze is India's most trusted Robotics and DIY store. We foster
            growth of knowledge in Embedded Systems, IoT, and Automation.
          </p>
          <div className="flex gap-3 mt-4">
            <FaInstagram size={28} className="text-gray-600 hover:text-primary transition" />
            <FaFacebook size={28} className="text-gray-600 hover:text-primary transition" />
            <FaYoutube size={28} className="text-gray-600 hover:text-primary transition" />
            <FaLinkedin size={28} className="text-gray-600 hover:text-primary transition" />
            <FaTwitter size={28} className="text-gray-600 hover:text-primary transition" />
            <FaGoogle size={28} className="text-gray-600 hover:text-primary transition" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-primary font-bold text-lg mb-4">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            {Allcategories.map((value, index) => (
              <li
                key={index}
                className="hover:text-primary cursor-pointer transition"
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-primary font-bold text-lg mb-4">Shop By Brand</h3>
          <ul className="space-y-2 text-sm">
            {ShopByBrand.slice(0, 10).map((value, index) => (
              <li
                key={index}
                className="hover:text-primary cursor-pointer transition"
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Blogs */}
        <div className="hidden md:block">
          <h3 className="text-primary font-bold text-lg mb-4">Blogs</h3>
          <ul className="space-y-2 text-sm">
            {FooterBlogs.map((value, index) => (
              <li
                key={index}
                className="hover:text-primary cursor-pointer transition"
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-primary font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            {Support.map((value, index) => (
              <li
                key={index}
                className="hover:text-primary cursor-pointer transition"
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-gray-400 text-center text-sm py-4">
        © {new Date().getFullYear()} Robocraze. All rights reserved. | Designed by Surendra
      </div>
    </footer>
  );
};

export default Footer;
