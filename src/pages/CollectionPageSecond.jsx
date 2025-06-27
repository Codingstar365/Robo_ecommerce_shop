import React from 'react';
import image1 from '../assets/hero/secondpageimage.jpg'; // Replace with actual image import
import { ElecrowFAQ, ElecrowHighlightConstant, SecondPageConstant } from '../constants/SecondPageConstant'; // Assuming your JSON data is stored here
import { CardData } from '../constants/CardConstant';
import Card from '../components/card';
import PagesBData from '../components/PagesBData';
import SecondPageFAQ from '../components/SecondPageFAQ';

const CollectionPageSecond = () => {
  const { title, image, sections, ctaButton } = SecondPageConstant;
  const { heading, paragraphs } = ElecrowHighlightConstant;


  return (
    <div className="m-5">
      <div className='m-5'>
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-22">{title}</h2>

      </div>
      {/* Left: Image */}
      <div className='flex gap-5 m-8'>
        <div className="h-full ">
          <img
            src={image1}
            alt={title}
            className=" rounded-md shadow-md"
          />
        </div>

        {/* Right: Content */}
        <div className="md: space-y-4">
          {/* Title */}

          {/* Paragraphs */}
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
          className="bg-black text-white px-5 py-3 text-sm font-semibold rounded-md hover:bg-gray-800 transition "
        >
          {ctaButton.text}
        </a>
      </div>
      <div className="flex gap-8 flex-wrap m-6">
        {CardData.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div >
       <div className="pt-4 flex justify-center ">
        <a
          href={ctaButton.link}
          className="bg-black text-white px-5 py-3 text-sm font-semibold rounded-md hover:bg-gray-800 transition "
        >
          View All
        </a>
      </div>
      <div className="text-center px-4 md:px-40 py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{heading}</h2>
      {paragraphs.map((text, index) => (
        <p key={index} className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
          {text}
        </p>
      ))}
    </div>
       <div>
        <h2 className='flex justify-center text-3xl'>
          FAQs
        </h2>
       </div>
       <div className='w-40px'>
        <div >
        {
          ElecrowFAQ.map((item,index)=>{
            return <SecondPageFAQ
             
             key={index}
             question={item.question}
             answer={item.answer} />
          })
        }
        </div>
        
        
       </div>
    </div>

  );
};

export default CollectionPageSecond;
