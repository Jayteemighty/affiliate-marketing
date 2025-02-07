import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Earning by Promoting Digital Products
          </h1>
          <p className="text-lg text-gray-600">
            Unlock the Power Within: Empower Yourself to Unleash Your Full
            Potential, Transform Your Life, and Achieve Unparalleled Success.
          </p>
        </section>

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Quick & Secure Payments
              </h3>
              <p className="text-gray-600">
                Receive your affiliate earnings quickly and securely. Weekly
                payouts directly to your bank account.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Generous Commission Structure
              </h3>
              <p className="text-gray-600">
                Earn up to 75% commission on each sale. Maximize your income
                potential.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Extensive Affiliate Network
              </h3>
              <p className="text-gray-600">
                Join a growing network of successful affiliates. Access a wide
                range of products to promote.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600">
                "Profit Plus transformed my life! Within two months, I earned
                enough to pay for my school fees and even started my own small
                business."
              </p>
              <p className="font-bold mt-2">- Oyebamiji Maryam</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <p className="text-gray-600">
                "Joining Profit Plus was the best decision I ever made. The ABIC
                course equipped me with skills in affiliate marketing and forex
                trading."
              </p>
              <p className="font-bold mt-2">- Shittu Nimotallahi</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Affiliate Program and Start Earning Today!
          </h2>
          <button className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800">
            Sign Up Now
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;