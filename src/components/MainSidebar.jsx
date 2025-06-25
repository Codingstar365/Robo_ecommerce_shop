import React, { useState } from 'react';

const sidebarItems = [
  { name: "Flash Sale" },
  { name: "STEM Kits" },
  { name: "Raspberry Pi" },
  { name: "Arduino" },
  { name: "Compatible With Arduino" },
  { name: "Electronic Components" },
  { name: "Electronic Modules" },
  { name: "Drones Parts" },
  { name: "3D Printers/Pens" },
  { name: "IOT & Wireless Boards" },
  { name: "Sensors" },
  { name: "Motors & Mechanical" },
  { name: "Development Boards" },
  { name: "Display Module" },
  { name: "Batteries & Power Supply" },
  { name: "Cables" },
  { name: "Tools & Instruments" }
];

const wirelessDropdown = [
  "ESP Module",
  "LORA",
  "WiFi Switch",
  "GSM/GPS/GPRS",
  "Bluetooth/BLE",
  "RF/NRF",
  "RFID/NFC",
  "XBee (ZigBee)",
  "Smart Products"
];

const Sidebar = () => {
  const [showWireless, setShowWireless] = useState(false);

  return (
    <div className=" bg-white text-black p-4 rounded ml-2 border relative mt-20 border-gray-400 ">
      <h2 className="text-xl font-bold mb-4">CATEGORIES</h2>

      {sidebarItems.map((item) => (
        <div key={item.name} className="hover:bg-gray-300 text-[12px]  mb-2 cursor-pointer px-2 py-1 rounded border border-gray-300">
          {item.name}
        </div>
      ))}

      <div className="mt-4">
        <button
          className="w-full text-left px-1 py-1 hover:bg-gray-300 rounded border"
          onClick={() => setShowWireless(!showWireless)}
        >
          IOT & Wireless Boards ▾
        </button>

        {showWireless && (
          <div className="absolute top-112 left-45 z-10 hover: bg-gray-300 ml-4 mt-1 space-y-1">
            {wirelessDropdown.map((item) => (
              <div key={item} className="text-sm hover:bg-blue-800 px-2 py-1 rounded cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 