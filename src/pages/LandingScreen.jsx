import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import { CardData } from '../constants/CardConstant';
import SecondHero from '../components/SecondHero';
import { CardDataSecond } from '../constants/SecondHeroConstant';
import Brand from '../components/Brand';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../constants/TestimonialConstant';
import MySideBar from '../components/MySideBar';
import ItemCard from '../components/ItemCard';

const LandingScreen = () => {
  return (
    <div className="flex ">
       <MySideBar />

      <div className="w-full ml-2  ">
        <HeroCarousel />
        <div>

          <div className="  border border-2xl p-5 border-gray-300 mt-2 rounded-lg ">
               
            <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mt-5 justify-around  ">
              {CardDataSecond.map((item, index) => (
                <SecondHero
                  key={index}
                  name={item.name}
                  
        
                  discount={item.discount}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='border rounded-lg mt-4 border-gray-300'>
        <div className= "font-bold justify-items-center text-2xl mt-12 ">
          <h2>BEST SELLER</h2>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3  gap-10 mt-5 mx-5 mb-5 ">
          {CardData.map((item, index) => (
            <ItemCard
              key={index}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          ))}
        </div> 
        </div>
        <div className='border relative border-gray-400 mb-3 rounded-lg mt-4' >
          <Brand 
          isCenter={true}
          />
          
        </div>
        <div className='justify-items-center text-2xl font-bold border border-gray-300 m-1 rounded-lg'>
         <div> <h2>TESTIMONIAL</h2>
        </div>
       <div className="flex  flex-wrap mt-5 mb-5 justify-around">
          {Testimonial.map((item, index) => (
            <TestimonialCard
              key={index}
              name={item.name}
              avatar={item.avatar}
              platform={item.platformIcon}
              rating={item.rating}
              time={item.time}
              message={item.message}
            />
          ))}
        </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default LandingScreen;
