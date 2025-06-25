import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Mainsidebar from '../components/Mainsidebar';
import Card from '../components/card';
import { CardData } from '../constants/CardConstant';
import SecondHero from '../components/SecondHero';
import { CardDataSecond } from '../constants/SecondHeroConstant';
import Brand from '../components/Brand';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../constants/TestimonialConstant';

const LandingScreen = () => {
  return (
    <div className="flex">
      <Mainsidebar />

      <div className="w-full ml-2.5">
        <HeroCarousel />
        <div>

          <div className=" ml-2.5 border-2 p-5 border-gray-300 mt-2 w-[95%] ">
               
            <div className="flex gap-10 flex-wrap mt-5 ">
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
        <div className='font-bold justify-items-center text-2xl mt-12'>
          <h2>BEST SELLER</h2>
        </div>
        <div className="flex gap-10 flex-wrap mt-5 mb-5 ">
          {CardData.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              price={item.price}
              discount={item.discount}
            />
          ))}
        </div>
        <div className='border relative border-gray-400 mb-3'>
          <Brand />
          
        </div>
        <div className='justify-items-center text-2xl font-bold'>
          <h2>TESTIMONIAL</h2>
        </div>
       <div className="flex  flex-wrap mt-5 mb-5 ">
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
      <div>
      </div>
    </div>
  );
};

export default LandingScreen;
