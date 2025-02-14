import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { NavLink } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center bg-gradient-to-r bg-gray-800 py-16 rounded-lg shadow-lg mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Earning by Promoting Digital Products
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Unlock the Power Within: Empower Yourself to Unleash Your Full
            Potential, Transform Your Life, and Achieve Unparalleled Success by
            Implementing What You Learn, Overcoming Obstacles, and Embracing a
            Growth Mindset.
          </p>
          <button className="mt-8 bg-white text-purple-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            <NavLink to="/register">
            Get Started
            </NavLink>
          </button>
        </section>

        {/* Features Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Quick & Secure Payments
              </h3>
              <p className="text-gray-600">
                Receive your affiliate earnings quickly and securely. We ensure
                timely payments directly to your bank account every week.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-purple-600 text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Generous Commission Structure
              </h3>
              <p className="text-gray-600">
                Earn up to 75% commission on each sale, giving you the potential
                to earn significant income while promoting top-quality products.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-green-600 text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Extensive Affiliate Network
              </h3>
              <p className="text-gray-600">
                Join a growing network of successful affiliates and gain access
                to a wide range of products to promote.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 italic">
                "Profit Plus transformed my life! Within two months, I earned
                enough to pay for my school fees and even started my own small
                business."
              </p>
              <p className="font-bold mt-4 text-gray-800">- Oyebamiji Maryam</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 italic">
                "Joining Profit Plus was the best decision I ever made. The ABIC
                course equipped me with skills in affiliate marketing and forex
                trading."
              </p>
              <p className="font-bold mt-4 text-gray-800">- Shittu Nimotallahi</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 italic">
                "I was skeptical at first, but Profit Plus proved me wrong. I
                learned 3D animation and started making money creating content for
                brands."
              </p>
              <p className="font-bold mt-4 text-gray-800">- Qazeem Aisha</p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 italic">
                "Profit Plus gave me the tools and confidence to succeed. The
                weekly payouts are reliable, and the community is incredibly
                supportive."
              </p>
              <p className="font-bold mt-4 text-gray-800">- Ibrahim Awwal</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center bg-gradient-to-r bg-gray-800 py-16 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Affiliate Program and Start Earning Today!
          </h2>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            <NavLink to="/register">Sign Up Now</NavLink>
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;