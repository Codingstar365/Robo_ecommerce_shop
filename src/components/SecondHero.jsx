// SecondHero.jsx
import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const SecondHero = ({ name, bordercolor = "gray-300", Icon }) => {
  const borderClasses = {
    "gray-300": "border-gray-300",
    primary: "border-primary",
    secondary: "border-secondary",
    red: "border-red-500",
    green: "border-green-500",
    blue: "border-blue-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full h-32 flex flex-col items-center justify-center 
        rounded-xl cursor-pointer overflow-hidden group 
        transition-all duration-300 bg-white shadow-sm hover:shadow-md"
    >
      {/* Border */}
      <div
        className={clsx(
          "absolute inset-0 rounded-xl border-2 transition-all duration-300",
          borderClasses[bordercolor] || "border-gray-300",
          "group-hover:border-primary"
        )}
      />

      {/* Hover background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/10 to-transparent rounded-xl"
      />

      {/* Content: centered icon and name */}
      <div className="relative flex flex-col items-center justify-center h-full">
        {Icon && (
          <motion.div className="text-4xl text-gray-700 group-hover:text-primary mb-2">
            <Icon />
          </motion.div>
        )}
        <motion.p className="text-sm font-semibold text-center  transition-colors duration-300 group-hover:text-primary">
          {name}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SecondHero;
