import React from 'react';
import ThirdPage from '../components/ThirdPage';
import { CategoryList, WhyBuyHere } from '../constants/ThirdPageConstant';
import Brand from '../components/Brand';
import TestimonialCard from '../components/TestimonialCard';
import { Testimonial } from '../constants/TestimonialConstant';
import SecondPageFAQ from '../components/SecondPageFAQ';
import { ElecrowFAQ } from '../constants/SecondPageConstant';
import PagesBanner from '../components/PagesBanner';

const CollectionPageThird = () => {
  return (
    <div>
      <div>
        <PagesBanner />
      </div>

      <div>
        <ThirdPage />
      </div>

      {/* Products Section */}
      <div className="px-4 mt-10">
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="font-bold text-2xl text-center mb-6 border-b border-gray-200 pb-2 rounded">Products</h2>
          <div className="py-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
              {CategoryList.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-3">
                  <div className="w-36 h-36 rounded-full border border-gray-300 bg-gradient-to-b from-blue-200 to-blue-500 flex items-center justify-center shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-contain rounded-full"
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-800 border-t border-gray-200 pt-2 w-full">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Buy Section */}
      <div className="px-4 mt-10">
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="font-bold text-2xl text-center mb-6 border-b border-gray-200 pb-2 rounded">WHY BUY FROM HERE?</h2>
          <section className="p-6 bg-white max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {WhyBuyHere.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-gradient-to-b from-white to-gray-100 p-4 rounded-lg shadow-sm border border-gray-300"
                >
                  <div className="w-20 h-20 mb-3 rounded-full border border-gray-300">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <p className="text-sm font-semibold border-t border-gray-200 pt-2 w-full">{item.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Brand Section */}
      <div className="mt-10 text-center border border-gray-300 rounded-lg p-4 m-4">
        <Brand isCenter={true} />
      </div>

      {/* Testimonial Section */}
      <div className="mt-10 px-4 ">
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-center mb-4 ">TESTIMONIAL</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Testimonial.map((item, index) => (
              <div className="  p-2">
                <TestimonialCard
                  key={index}
                  name={item.name}
                  avatar={item.avatar}
                  platform={item.platformIcon}
                  rating={item.rating}
                  time={item.time}
                  message={item.message}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
    <div className="mt-12 px-4 mb-4">
  <div className="border border-gray-300 rounded-lg p-4">
    <h2 className="text-3xl font-bold text-center mb-6 border-b border-gray-200 pb-2 rounded">FAQs</h2>
    <div className="max-w-4xl mx-auto space-y-2"> {/* reduced spacing between FAQs */}
      {ElecrowFAQ.map((item, index) => (
        <div key={index} className="p-1 transition-all duration-600 ease-in-out"> {/* smoother transition */}
          <SecondPageFAQ
            question={item.question}
            answer={item.answer}
          />
        </div>
      ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPageThird;
