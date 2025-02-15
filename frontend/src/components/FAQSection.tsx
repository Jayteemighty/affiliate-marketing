import React, { useState } from "react";

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Profit Plus about?",
      answer:
        "Profit Plus is a digital marketplace that facilitates the sale of high-value digital and physical products. It connects skilled affiliates—marketers who promote and recommend products—with vendors who create these products. The platform offers a reliable payment system, high commission rates (up to 75% per sale), a curated product marketplace, regular training for affiliates, and strong support to ensure a seamless experience.",
    },
    {
      question: "How do I make sales?",
      answer:
        "To make sales on Profit Plus, you can register as an affiliate, gain access to the product marketplace, and select products to promote. By sharing your unique affiliate links and effectively marketing the products, you earn commissions on each sale made through your link. The platform provides regular training to enhance your sales and marketing skills, helping you maximize your earnings.",
    },
    {
      question: "What is the ABIC course about?",
      answer:
        "The ABIC course teaches affiliate marketing, forex, 3D animations, and monetization. It shows how to leverage affiliate marketing to fund your forex account, take trades based on strategies you learn, and get started with creating and monetizing 3D animations. These skills can help you say goodbye to financial struggles for good!",
    },
    {
      question: "How do I get paid on Profit Plus?",
      answer:
        "Profit Plus has a solid payment system that ensures you receive payments for every sale made through your affiliate links. Earnings are paid out weekly, with withdrawals processed on Sundays, allowing you to receive your money in your preferred bank account. The platform supports earnings in multiple currencies and offers favorable exchange rates for local bank deposits.",
    },
    {
      question: "Can I sell my course on Profit Plus?",
      answer:
        "On our website, vendors can upload and sell unlimited courses, with the flexibility to withdraw earnings every Sunday directly from their course dashboard.",
    },
    {
      question: "Where can I find answers to more questions?",
      answer:
        "You can find more answers on the Profit Plus platform. Visit theprofitplus.com.ng for additional details and updates.",
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="faq-container mx-auto max-w-4xl">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:scale-105 hover:shadow-lg transition-shadow duration-300 ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <div
              className="faq-question flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 duration-300">
                {faq.question}
              </h3>
              <span className="icon text-xl font-bold">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`faq-answer text-gray-600 mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;