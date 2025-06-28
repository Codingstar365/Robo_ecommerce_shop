import React from 'react';

const NotFound = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="text-center">
        <div className="animate-bounce text-6xl mb-4">🚧</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring this page to life. Please check back soon!
        </p>
        <p className="text-sm text-gray-500">Today’s Date: {currentDate}</p>
      </div>
    </div>
  );
};

export default NotFound;

