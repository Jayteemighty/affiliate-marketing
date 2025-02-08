import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const VendorPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a Profit Plus Vendor
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            List your digital products on our platform and reach a global audience
            of motivated buyers. Partner with us to grow your business!
          </p>
        </section>

        {/* How to List Products Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            How to List Your Products on Profit Plus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 1: Read Our Terms & Conditions
              </h3>
              <p className="text-gray-600">
                Review our terms and conditions for vendors to ensure compliance
                with our standards.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 2: Submit Your Product Details
              </h3>
              <p className="text-gray-600">
                Email your product details to{" "}
                <a
                  href="mailto:vendor@promptearn.com"
                  className="text-blue-600 hover:underline"
                >
                  vendor@promptearn.com
                </a>{" "}
                for approval.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 3: Get Approved and Start Selling
              </h3>
              <p className="text-gray-600">
                Once approved, your product will be listed within 24–96 hours.
                Start reaching a global audience today!
              </p>
            </div>
          </div>
        </section>

        {/* Product Listing Requirements Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Product Listing Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Requirement 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                All products undergo a quality check to ensure they meet our
                high standards.
              </p>
            </div>

            {/* Requirement 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Complete Product Details
              </h3>
              <p className="text-gray-600">
                Provide detailed information about your product, including name,
                price, sales page link, delivery process, and customer support
                details.
              </p>
            </div>

            {/* Requirement 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Optional Certification
              </h3>
              <p className="text-gray-600">
                Enhance your product's credibility with our optional certification
                program (one-time fee of 30,000 NGN).
              </p>
            </div>

            {/* Requirement 4 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Commission Structure
              </h3>
              <p className="text-gray-600">
                Set the commission rate for affiliates and let them promote your
                product worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Policy Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Payment Policy
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Transparent Revenue Sharing
            </h3>
            <p className="text-gray-600">
              Profit Plus charges a 10% transaction fee for each sale. For
              example, if your product costs ₦30,000, Profit Plus deducts ₦3,000,
              leaving you with ₦27,000.
            </p>
            <p className="text-gray-600 mt-4">
              You can withdraw your earnings weekly, with funds credited to your
              local bank account every Sunday.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Expand Your Business Globally?
          </h2>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => window.location.href = "/sign-up"}
          >
            Sign Up as a Vendor
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default VendorPage;