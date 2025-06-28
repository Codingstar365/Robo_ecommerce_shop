import React from 'react';
import image1 from '../assets/hero/secondpageimage.jpg';
import { ElecrowFAQ, ElecrowHighlightConstant, SecondPageConstant } from '../constants/SecondPageConstant';
import { CardData } from '../constants/CardConstant';
import PagesBData from '../components/PagesBData';
import SecondPageFAQ from '../components/SecondPageFAQ';
import ItemCard from '../components/ItemCard';

const CollectionPageSecond = () => {
  const { title, image, sections, ctaButton } = SecondPageConstant;
  const { heading, paragraphs } = ElecrowHighlightConstant;

  return (
    <div className="m-5">
      {/* Title */}
      <div className="">
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-20">{title}</h2>
      </div>

      {/* Image + Content Section */}
      <div className="flex flex-col md:flex-row gap-6 m-4">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={image1}
            alt={title}
            className="w-full max-w-md rounded-md shadow-md object-cover"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0">
          {sections.map((para, idx) => (
            <p key={idx} className="text-gray-700 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4 flex justify-end mr-8">
        <a
          href={ctaButton.link}
          className="bg-black text-white px-5 py-3 text-sm font-semibold rounded-md hover:bg-gray-800 transition"
        >
          {ctaButton.text}
        </a>
      </div>

      {/* Card Section */}
      <div className="border m-10 border-gray-300 rounded-lg">
     <div className="grid grid-cols-1 md:grid-cols-3  gap-15 mt-5 mx-5 mb-5">
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

      {/* View All CTA */}
      <div className="pt-4 flex justify-center">
        <a
          href={ctaButton.link}
          className="bg-black text-white px-5 py-3 text-sm font-semibold rounded-md hover:bg-gray-800 transition"
        >
          View All
        </a>
      </div>

      {/* Highlight Section */}
      <div className="text-center px-4 md:px-40 py-12 bg-white ">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{heading}</h2>
        {paragraphs.map((text, index) => (
          <p key={index} className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            {text}
          </p>
        ))}
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="flex justify-center text-3xl mb-6">FAQs</h2>
        <div className="mx-4 md:mx-20">
          {ElecrowFAQ.map((item, index) => (
            <SecondPageFAQ
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPageSecond;
