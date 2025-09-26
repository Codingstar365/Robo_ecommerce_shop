import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import SecondHero from '../components/SecondHero';
import { CardDataSecond } from '../constants/SecondHeroConstant';
import Brand from '../components/Brand';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../constants/TestimonialConstant';
import MySideBar from '../components/MySideBar';
import BestSeller from '../components/ProductFromAdmin';
import FAQSection from '../components/FAQSection';

const LandingScreen = () => {
  return (
    <div className="flex max-w-[1400px] p-4 mx-auto px-4 md:px-6 lg:px-8 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 pr-4">
        <MySideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="mb-8">
          <HeroCarousel />
        </section>

        {/* Category Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {CardDataSecond.map((item, index) => (
              <SecondHero
                key={index}
                name={item.name}
                Icon={item.img}
                discount={item.discount}
              />
            ))}
          </div>
        </section>

        {/* Best Seller Section */}
        <section className="mb-8">
          <BestSeller />
        </section>

        {/* Brand Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <Brand isCenter={true} />
        </section>

        {/* Testimonial Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-center text-2xl font-bold mb-6">What Our Customers Say</h2>
          <div className="flex flex-wrap gap-6 justify-center">
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
        </section>

        {/* FAQ Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <FAQSection />
        </section>
      </main>
    </div>
  );
};

export default LandingScreen;
