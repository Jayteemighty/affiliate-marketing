import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const AffiliatePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock Your Earning Potential as an Affiliate
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Profit Plus empowers affiliates to promote high-quality digital
            products and earn generous commissions. Join our growing network of
            successful marketers today!
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 1: Create Your Account
              </h3>
              <p className="text-gray-600">
                Sign up on Profit Plus and complete your profile to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 2: Choose Products to Promote
              </h3>
              <p className="text-gray-600">
                Explore our curated marketplace and select products that align
                with your audience.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Step 3: Start Earning Commissions
              </h3>
              <p className="text-gray-600">
                Share your unique affiliate links and earn up to 75% commission
                on every sale.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Profit Plus as Your Affiliate Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Quick & Secure Payments
              </h3>
              <p className="text-gray-600">
                Receive your earnings weekly via direct bank transfers. We ensure
                timely and secure payments so you can focus on growing your
                business.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Generous Commission Structure
              </h3>
              <p className="text-gray-600">
                Earn up to 75% commission on each sale. Our competitive rates
                help you maximize your income potential.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Extensive Product Marketplace
              </h3>
              <p className="text-gray-600">
                Access a wide range of high-quality digital products to promote,
                ensuring there's something for every niche and audience.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Ongoing Training and Support
              </h3>
              <p className="text-gray-600">
                Boost your skills with our ABIC course and regular training
                sessions. Stay ahead of the curve with expert guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Affiliate Journey?
          </h2>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => window.location.href = "/sign-up"}
          >
            Sign Up Now
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AffiliatePage;