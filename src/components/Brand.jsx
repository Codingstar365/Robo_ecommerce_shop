import React from 'react';

const brandLogos = [
  { image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Amazon_logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Intel_logo_%282020%29.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Tesla_logo.png' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/IBM_logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Sony_logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Netflix_2015_logo.svg' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png' },
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
