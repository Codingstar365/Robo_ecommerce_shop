import React, { useState } from 'react';
import { ElecrowFAQ } from '../constants/SecondPageConstant';
// import { ElecrowFAQ } from '../constants/ElecrowFAQ';

const SecondPageFAQ = ({answer,question}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=" mb-3 ml-6 border rounded-md bg-gray-50 text-sm shadow-sm overflow-hidden transition-all duration-300 w-] "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 px-4 py-3 cursor-pointer font-medium">
        <input type="checkbox" checked readOnly className="accent-black" />
        <span className="underline">{question}</span>
        <span className="ml-auto">{isHovered ? '▴' : '▾'}</span>
      </div>

      {isHovered && (
        <div className="px-4 pb-4 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default SecondPageFAQ;
