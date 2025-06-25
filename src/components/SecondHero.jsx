import React from 'react';
import droneImg from '../../src/assets/drone.svg'

const SecondHero = ({name,bordercolor}) => {
  return (
    <div className ={`w-28 h-28 border border-${bordercolor || "red-600"} rounded-lg flex flex-col items-center justify-center hover:bg-red-50 cursor-pointer transition-all duration-300 ml-12`}>
      <h2></h2>
      <img
        src={droneImg}
        alt="Drone Parts"
        className="w-10 h-10 mb-2"
      />
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
};

export default SecondHero;
