// src/components/PaymentOptionCard.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const PaymentOptionCard = ({ method, selected, onSelect }) => {
  return (
    <div
      className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${
        selected ? "border-green-500 bg-green-50" : "border-gray-300"
      }`}
      onClick={() => onSelect(method)}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{method.icon}</div>
        <div>
          <h3 className="font-semibold">{method.label}</h3>
          <p className="text-sm text-gray-500">{method.desc}</p>
        </div>
      </div>
      {selected && <CheckCircle className="text-green-500" />}
    </div>
  );
};

export default PaymentOptionCard;
