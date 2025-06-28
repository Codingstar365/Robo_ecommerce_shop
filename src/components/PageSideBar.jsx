import React from "react";

const PageSidebar = () => {
  return (
    <div className="w-64 h-full p-4 border-r text-sm">
      {/* Filter Section */}
      <h2 className="font-semibold mb-2">Filter:</h2>
      <div className="border-b mb-4 pb-2">
        <details open className="mb-2">
          <summary className="cursor-pointer font-medium">Availability</summary>
          <div className="mt-2 space-y-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              In stock (107)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Out of stock (67)
            </label>
          </div>
        </details>

        <details open>
          <summary className="cursor-pointer font-medium">Price</summary>
          <p className="text-xs text-gray-500 mt-2 mb-2">
            The highest price is <strong>Rs. 224,999</strong>
          </p>
          <div className="flex items-center gap-2">
            <span>₹</span>
            <input
              type="text"
              placeholder="From"
              className="border text-xs p-1 w-20"
            />
            <input
              type="text"
              placeholder="To"
              className="border text-xs p-1 w-20"
            />
          </div>
        </details>
      </div>

      {/* Category Section */}
      <h2 className="font-bold text-blue-900 text-base mb-2">Show All Categories</h2>
      <div className="text-sm">
        <h3 className="text-gray-700 font-semibold mb-1">Raspberry Pi</h3>
        <ul className="space-y-1 text-blue-800">
          {[
            "Raspberry Pi 5",
            "Boards",
            "Kits",
            "Cases",
            "Keyboards & Mouse",
            "Displays Raspberry Pi",
            "Camera Raspberry Pi",
            "Raspberry Pi Power Supply",
            "Raspberry Pi Hats",
            "Raspberry Pi Cables",
            "SD Cards",
            "Raspberry Pi Accessories",
          ].map((item, index) => (
            <li key={index}>
              <a href="#" className="hover:underline">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageSidebar;
