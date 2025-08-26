import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import SecondHero from '../components/SecondHero';
import { CardDataSecond } from '../constants/SecondHeroConstant';
import Brand from '../components/Brand';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../constants/TestimonialConstant';
import MySideBar from '../components/MySideBar';
import ItemCard from '../components/ItemCard';
import BestSeller from '../components/ProductFromAdmin';
import FAQSection from '../components/FAQSection';

const LandingScreen = () => {
  return (
    <div className="flex mx-auto ">
      <MySideBar />

      <div className="w-full ml-2  ">
        <HeroCarousel />
        <div>

          <div className="  border border-2xl p-5 border-gray-300  rounded-lg ">

            <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mt-5 justify-around  ">
              {CardDataSecond.map((item, index) => (
                <SecondHero
                  key={index}
                  name={item.name}
                   img={item.image}

                  discount={item.discount}
                />
              ))}
            </div>
          </div>
        </div>

        <BestSeller/>
        <div className='border relative border-gray-300 mb-3 rounded-lg mt-4 ' >
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
        <div><FAQSection/></div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default LandingScreen;
