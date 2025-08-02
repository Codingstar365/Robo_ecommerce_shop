import React from 'react';

const TestimonialCard = ({ name, avatar, platform, rating, time, message }) => {
  return (
    <div className="max-w-sm bg-gray-300 rounded-xl shadow-md p-4 flex flex-col space-y-2 border-gray-300 m-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center">
              {/* Render stars based on rating */}
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-400'}`}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">{time}</span>
            </div>
          </div>
        </div>
        {/* <img
          src={platform}
          alt="platformmmmmmmmmmmm"
          className="w-6 h-6"
        /> */}
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800">{message}</p>
    </div>
  );
};

export default TestimonialCard;
