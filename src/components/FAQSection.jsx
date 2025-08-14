import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is RoboMart?",
    answer:
      "RoboMart is your one-stop online store for the latest gadgets, electronics, and accessories. We provide high-quality products at affordable prices with fast delivery.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with the tracking ID and a link to track your package. You can also check your order status in the 'My Orders' section of your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit/credit cards, UPI, net banking, and digital wallets. Cash on Delivery (COD) is available for selected locations.",
  },
  {
    question: "What is the return policy?",
    answer:
      "You can return most items within 7 days of delivery if they are unused and in original packaging. Please check our Returns & Refunds policy for more details.",
  },
  {
    question: "Do you offer warranty on products?",
    answer:
      "Yes, most of our products come with a standard manufacturer warranty. Warranty duration and terms vary by product category.",
  },
  {
    question: "Is my personal data safe with RoboMart?",
    answer:
      "Absolutely. We use advanced encryption and security measures to protect your personal and payment information.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-2 px-4 md:px-8 w-full">
      <div className="max-w-9xl mx-auto space-y-6">
        {/* FAQs heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">FAQs</h2>

        {/* FAQ list */}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition w-full"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition"
            >
              <span className="text-xl font-semibold text-gray-800 w-[92%] leading-snug">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-black flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-black flex-shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 py-5 bg-white border-t border-gray-200 text-gray-700 text-lg leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
