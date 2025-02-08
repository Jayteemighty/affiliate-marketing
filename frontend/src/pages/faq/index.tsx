import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const FAQPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Find answers to common questions about Profit Plus and how our
            platform works.
          </p>
        </section>

        {/* FAQ Accordion Section */}
        <section className="mt-12">
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => toggleAccordion(0)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  What is Profit Plus About?
                </h3>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transition-transform ${
                      expanded === 0 ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {expanded === 0 && (
                <p className="text-gray-600 mt-2">
                  Profit Plus is a digital marketplace for the sale of high-value
                  and best-selling digital and physical products. It connects
                  skilled affiliates—marketers who promote and recommend
                  products—with vendors who create these products.
                </p>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => toggleAccordion(1)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  How do I become an affiliate on Profit Plus?
                </h3>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transition-transform ${
                      expanded === 1 ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {expanded === 1 && (
                <p className="text-gray-600 mt-2">
                  To become an affiliate, pay a yearly fee of ₦5,000 to create an
                  account. Click{" "}
                  <a
                    href="/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    here
                  </a>{" "}
                  to register.
                </p>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
              onClick={() => toggleAccordion(2)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  How do I become a vendor?
                </h3>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 transition-transform ${
                      expanded === 2 ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {expanded === 2 && (
                <p className="text-gray-600 mt-2">
                  To become a vendor, read the terms and conditions first. After
                  reading and agreeing, send an email containing the details of
                  your product to{" "}
                  <a
                    href="mailto:vendor@promptearn.com"
                    className="text-blue-600 hover:underline"
                  >
                    vendor@promptearn.com
                  </a>{" "}
                  for approval. The process usually takes 2–5 working days.
                </p>
              )}
            </div>

            {/* Add more FAQ items as needed */}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find Your Answer?
          </h2>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => window.location.href = "/contact"}
          >
            Contact Us
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default FAQPage;