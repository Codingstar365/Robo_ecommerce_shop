// src/pages/Academy.jsx
import React, { useEffect, useState } from "react";
import { CareerData } from "../constants/AcademyData";

const Academy = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    // Load static job data
    setJobData(CareerData);
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-20">
      <h1 className="text-4xl font-bold text-center text-[#1A3B8B] mb-10">
        Join the Robocraze Family
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="bg-[#F7F7F7] p-6 rounded-md shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-[#1A3B8B] mb-4">
              {job.title}
            </h2>
            <h3 className="font-semibold mb-2 text-gray-800">QUALIFICATION:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.qualifications.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Academy;
