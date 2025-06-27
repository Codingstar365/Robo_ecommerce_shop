import React from 'react';
// import image from '../../src/assets/BrandLogo/Brand'
import img1 from '../assets/hero/BrandOne.jpg'
import img2 from '../assets/hero/BrandTwo.jpg'
import img3 from '../assets/hero/BrandOne.jpg'
import img4 from '../assets/hero/BrandOne.jpg'
import img5 from '../assets/hero/BrandOne.jpg'
import img6 from '../assets/hero/BrandOne.jpg'
import img7 from '../assets/hero/BrandOne.jpg'
import img8 from '../assets/hero/BrandOne.jpg'
import img9 from '../assets/hero/BrandOne.jpg'

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
  { image: img8 },
  { image: img8 }
];

const Brand = ({isCenter}) => {
  return (
    <div className=" ">
      <h2 className={`${isCenter? "text-center" : "text-left ml-16"} text-2xl font-bold mt-4`}>BRANDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5  items-center justify-items-center ">
        {brandLogos.map((item,index)=>{
          return <img className='w-25 flex-wrap   'src={item.image} alt="lmn," />;
        })}
      </div>
    </div>
  );
};

export default Brand;
