import React, { useState } from 'react';
import img1 from '../../src/assets/hero/download.jpg';
import img2 from '../../src/assets/hero/download2.webp';
import img3 from '../../src/assets/hero/download3.jpg';
import img4 from '../../src/assets/hero/download4.jpg';

const HeroCarousel = () => {
  const images = [img1, img2,img3,img4];
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative items-end  h-[400px] md:h-[500px]  overflow-hidde mt-14 ">
      {/* Slide Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 ' : 'opacity-0 z-0'
          }`}
        >
          
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
      
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 hover:scale-105 shadow"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className=" cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 hover:scale-105 cursor-point shadow"
      >
        &#10095;
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
