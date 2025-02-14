import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const BecomeVendorPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          How to Become a Vendor
        </h1>
        <p className="text-gray-600 text-center mb-4">
          List your products on our platform and reach a global audience of
          motivated buyers.
        </p>

        {/* Steps to Become a Vendor */}
        <section className="w-full max-w-xl space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 1: Sign Up as an Affiliate
            </h2>
            <p className="text-gray-600">
              To become a vendor, you need to first sign up as an affiliate. This
              gives you access to our marketplace, where you can list your
              products.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 2: Read Our Terms & Conditions
            </h2>
            <p className="text-gray-600">
              Carefully review our terms and conditions for vendors to ensure
              compliance with our standards.{" "}
              <a
                href="/terms-and-conditions"
                className="text-blue-600 hover:underline"
              >
                Click here to read our terms and conditions.
              </a>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 3: Submit Your Product Details
            </h2>
            <p className="text-gray-600">
              After reading and agreeing to the terms and conditions, send an
              email containing the details of your product to{" "}
              <a
                href="mailto:vendor@promptearn.com"
                className="text-blue-600 hover:underline"
              >
                vendor@promptearn.com
              </a>{" "}
              for approval.
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4">
              <li>Product URL: Link to your product's sales page.</li>
              <li>
                Product Delivery Process: Access link for product verification and
                buyer access.
              </li>
              <li>
                Price of Product: Specify the cost of your product.
              </li>
              <li>
                Commission Offers: Indicate the percentage affiliates will earn
                per sale.
              </li>
              <li>
                Customer Support Information: Provide contact details for buyers
                to reach your support team.
              </li>
              <li>Promotional Materials: Attach any materials for affiliates.</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Step 4: Get Approved and Start Selling
            </h2>
            <p className="text-gray-600">
              Once your product is submitted, we'll conduct a quality check to
              ensure it meets our standards. Approval typically takes 2–5 working
              days.
            </p>
          </div>
        </section>

        {/* Payment Policy Section */}
        <section className="mt-8 w-full max-w-xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Policy</h2>
          <p className="text-gray-600">
            PromptEarn automatically collects and splits sales payments among you,
            the affiliates, and the platform.
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4">
            <li>
              PromptEarn charges a 10% transaction fee for each sale. For
              example, if your product costs ₦30,000, PromptEarn deducts ₦3,000,
              leaving you with ₦27,000.
            </li>
            <li>
              Payments are processed every Sunday, and funds are credited to your
              local bank account the following day.
            </li>
            <li>
              All products listed on PromptEarn come with a refund policy to
              protect buyers.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300"
            onClick={() => window.location.href = "/sign-up"}
          >
            Sign Up as a Vendor
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-xl">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@promptearn.com"
              className="text-blue-600 hover:underline"
            >
              help@promptearn.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, PromptEarn</p>
        </footer>
      </div>
    </div>
  );
};

export default BecomeVendorPage;