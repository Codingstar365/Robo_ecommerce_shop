import React from 'react';
import img1 from '../assets/cmpicons/1.webp'
import img2 from '../assets/cmpicons/2.jpg'
import img3 from '../assets/cmpicons/3.jpg'
import img4 from '../assets/cmpicons/4.jpg'
import img5 from '../assets/cmpicons/5.jpg'
import img6 from '../assets/cmpicons/6.jpg'
import img7 from '../assets/cmpicons/7.jpg'
import img8 from '../assets/cmpicons/8.jpg'
import img9 from '../assets/cmpicons/9.jpg'
import img10 from '../assets/cmpicons/10.jpg'

const brandLogos = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
  { image: img4 },
  { image: img5 },
  { image: img6 },
  { image: img7 },
  { image: img8 },
  { image: img9 },
  { image: img10 },

];

const Brand = ({ isCenter }) => {
  return (
    <div className="px-4 py-6">
      <h2 className={`${isCenter ? "text-center" : "text-left ml-4"} text-2xl font-bold mb-6`}>
        BRANDS
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-items-center">
        {brandLogos.map((item, index) => (
          <img
            key={index}
            className="w-full h-24 object-contain rounded shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer"
            src={item.image}
            alt={`Brand ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Brand;
