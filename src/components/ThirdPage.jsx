import React from "react";
// import { WholesaleInfo } from "../constants/WholesaleInfo";
import { ThirdPageInfo } from "../constants/ThirdPageConstant";

const ThirdPage = () => {
  const { title, description, note, cta } = ThirdPageInfo;

  return (
    <div className="text-center py-10 px-4 bg-white mt-20">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="text-gray-700 space-y-2 max-w-2xl mx-auto mb-4">
        {description.map((para, idx) => (
          <p key={idx} className="text-sm md:text-base">{para}</p>
        ))}
      </div>
      <p className="text-sm text-gray-800 mb-6">
        <span className="font-semibold">Please Note: </span>{note}
      </p>
      <a
        href={cta.link}
        className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
      >
        {cta.text}
      </a>
    </div>
  );
};

export default ThirdPage;
