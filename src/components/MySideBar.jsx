import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sidebarData = [
  { name: "Flash Sale", items: ["Clones"] },
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
      "Smart Products",
    ],
  },
  { name: "Sensors", items: ["IR Sensor", "Ultrasonic", "Gas Sensor"] },
  { name: "Motors & Mechanical", items: ["Servo", "Stepper", "Wheels"] },
  { name: "Development Boards", items: ["NodeMCU", "Teensy", "STM32"] },
  { name: "Display Module", items: ["OLED", "LCD", "TFT"] },
  { name: "Batteries & Power Supply", items: ["Li-ion", "Adapter", "Power Bank"] },
  { name: "Cables", items: ["Jumper Wires", "USB", "Connectors"] },
  { name: "Tools & Instruments", items: ["Soldering Iron", "Multimeter", "Cutters"] },
];

const MySideBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const sidebarRef = useRef(null);

  const handleClick = (categoryName) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const getItemsForCategory = (categoryName) => {
    const category = sidebarData.find((item) => item.name === categoryName);
    return category ? category.items : [];
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 bg-white text-black p-5 rounded ml-2 border border-gray-200 mt-16 mb-2 hidden md:block shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4 text-primary tracking-wide">
        CATEGORIES
      </h2>

      {sidebarData.map((category, index) => {
        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

        return (
          <motion.div
            key={category.name}
            ref={(el) => ref(el)}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => handleClick(category.name)}
            className="relative text-[13px] mb-2 cursor-pointer px-2 py-1 rounded-md border border-gray-200 transition duration-300 
              hover:bg-secondary hover:text-white hover:shadow-md hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <span>{category.name}</span>
              <motion.span
                animate={{ rotate: activeCategory === category.name ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▾
              </motion.span>
            </div>

            <AnimatePresence>
              {activeCategory === category.name && getItemsForCategory(category.name).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-full top-0 text-black ml-2 w-52 z-50 bg-white shadow-lg border border-gray-200 rounded-md p-2"
                >
                  {getItemsForCategory(category.name).map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="text-sm hover:bg-primary hover:text-white px-2 py-1 rounded cursor-pointer transition duration-200"
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MySideBar;
