import React, { useState, useRef } from 'react';
const sidebarData = [
  { name: "Flash Sale", items: [] },
  { name: "STEM Kits", items: ["DIY STEM Kit", "School Kits", "Science Toys"] },
  { name: "Raspberry Pi", items: ["Pi 4", "Pi 5", "Accessories"] },
  { name: "Arduino", items: ["Uno", "Nano", "Mega"] },
  { name: "Compatible With Arduino", items: ["Clones", "Sensors", "Modules"] },
  { name: "Electronic Components", items: ["Resistors", "Capacitors", "Diodes"] },
  { name: "Electronic Modules", items: ["Relay", "GPS", "MP3"] },
  { name: "Drones Parts", items: ["Propellers", "ESC", "Frames"] },
  { name: "3D Printers/Pens", items: ["Printer", "Pen", "Filaments"] },
  {
    name: "IOT & Wireless Boards",
    items: [
      "ESP Module",
      "LORA",
      "WiFi Switch",
      "GSM/GPS/GPRS",
      "Bluetooth/BLE",
      "RF/NRF",
      "RFID/NFC",
      "XBee (ZigBee)",
      "Smart Products"
    ]
  },
  { name: "Sensors", items: ["IR Sensor", "Ultrasonic", "Gas Sensor"] },
  { name: "Motors & Mechanical", items: ["Servo", "Stepper", "Wheels"] },
  { name: "Development Boards", items: ["NodeMCU", "Teensy", "STM32"] },
  { name: "Display Module", items: ["OLED", "LCD", "TFT"] },
  { name: "Batteries & Power Supply", items: ["Li-ion", "Adapter", "Power Bank"] },
  { name: "Cables", items: ["Jumper Wires", "USB", "Connectors"] },
  { name: "Tools & Instruments", items: ["Soldering Iron", "Multimeter", "Cutters"] }
];

const MySideBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const itemRefs = useRef({});

  const handleClick = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory(categoryName);
  };

  const getItemsForCategory = (categoryName) => {
    const category = sidebarData.find(item => item.name === categoryName);
    return category ? category.items : [];
  };

  return (
    <div className="relative bg-white text-black p-4 rounded ml-2 border border-gray-400 mt-18 hidden md:block">
      <h2 className="text-xl font-bold mb-4">CATEGORIES</h2>

      {sidebarData.map((category) => (
        <div
          key={category.name}
          ref={(el) => (itemRefs.current[category.name] = el)}
          onClick={() => handleClick(category.name)}
          className="relative hover:bg-gray-300 text-[12px] mb-2 cursor-pointer px-2 py-1 rounded border border-gray-300"
        >
          {category.name} ▾
          {activeCategory === category.name && getItemsForCategory(category.name).length > 0 && (
            <div
              className="absolute left-full top-0 ml-2 w-48 z-10 bg-white shadow-lg border border-gray-300 rounded-md p-2 space-y-1"
            >
              {getItemsForCategory(category.name).map((item, index) => (
                <div
                  key={index}
                  className="text-sm hover:bg-blue-800 hover:text-white px-2 py-1 rounded cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MySideBar;
