import React, { useState } from 'react';
import { RaspberryInfo } from '../constants/PagesConstant';

const PagesBData = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md shadow-inner bg-gray-100">
      {/* Header toggle section */}
      <div
        className="flex items-center justify-between cursor-pointer px-4 py-3"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-lg font-medium">
          {expanded ? '-' : '+'} {/* Toggle icon */}
          <span className="ml-2">{RaspberryInfo.title}</span>
        </span>
      </div>

      {/* Collapsible content section */}
      {expanded && (
        <div className="bg-white p-6 text-sm text-gray-800 leading-relaxed space-y-4">
          {RaspberryInfo.sections.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <h3 className="font-semibold text-base mt-6">
            {RaspberryInfo.subheading}
          </h3>

          {RaspberryInfo.description.map((desc, idx) => (
            <p key={`desc-${idx}`}>{desc}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesBData;
