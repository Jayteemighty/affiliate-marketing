import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { NavLink } from "react-router-dom";
import heroImage from "../../assets/Frame004317.png";
import featuredImage from "../../assets/Frame34000004410.png";
// import testimonialImage1 from "../../assets/Frame34f1000004512.png";
// import testimonialImage2 from "../../assets/Mask4group3.png";
// import logo from "../../assets/result (3).png";
// import Footer from "../../components/Footer";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center bg-gradient-to-r bg-white-800 py-16 rounded-lg  mb-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Start Earning by Promoting Digital Products
            </h1>
            <p className="text-lg md:text-xl text-black-200 max-w-2xl mx-auto">
              Unlock the Power Within: Empower Yourself to Unleash Your Full
              Potential, Transform Your Life, and Achieve Unparalleled Success by
              Implementing What You Learn, Overcoming Obstacles, and Embracing a
              Growth Mindset.
            </p>
            <button className="mt-8 bg-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              <NavLink to="/register">
                Get Started
              </NavLink>
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={heroImage}
              alt="Promotional Image"
              className="w-full max-w-4xl mx-auto rounded-lg "
            />
          </div>
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

        {/* Featured Posts Section */}
        <section className="mt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src={featuredImage}
              alt="Featured Image"
              className="w-full md:w-1/2 rounded-lg shadow-lg"
            />
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/2">
              <h5 className="text-xl font-semibold text-gray-800 mb-4">
                Increase your income by promoting high-quality products from
                reliable vendors.
              </h5>
              <p className="text-gray-600 mb-4">
                Sign up as a ProfitPlus affiliate and gain immediate access to
                our product marketplace. Choose any product that interests you
                and start promoting it right away. Additionally, you'll receive
                ongoing training to enhance your sales skills and increase your
                weekly earnings.
              </p>
              <NavLink
                to="/register"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Become an Affiliate
              </NavLink>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="faq-container mx-auto">
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  What is Profit Plus about?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  Profit Plus is a digital marketplace that facilitates the sale
                  of high-value digital and physical products. It connects
                  skilled affiliates—marketers who promote and recommend
                  products—with vendors who create these products. The platform
                  offers a reliable payment system, high commission rates (up
                  to 75% per sale), a curated product marketplace, regular
                  training for affiliates, and strong support to ensure a
                  seamless experience.
                </p>
              </div>
            </div>
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  How do I make sales?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  To make sales on Profit Plus, you can register as an affiliate,
                  gain access to the product marketplace, and select products to
                  promote. By sharing your unique affiliate links and effectively
                  marketing the products, you earn commissions on each sale made
                  through your link. The platform provides regular training to
                  enhance your sales and marketing skills, helping you maximize
                  your earnings.
                </p>
              </div>
            </div>
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  What is the ABIC course about?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  The ABIC course teaches affiliate marketing, forex, 3D
                  animations, and monetization. It shows how to leverage
                  affiliate marketing to fund your forex account, take trades
                  based on strategies you learn, and get started with creating
                  and monetizing 3D animations. These skills can help you say
                  goodbye to financial struggles for good!
                </p>
              </div>
            </div>
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  How do I get paid on Profit Plus?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  Profit Plus has a solid payment system that ensures you receive
                  payments for every sale made through your affiliate links.
                  Earnings are paid out weekly, with withdrawals processed on
                  Sundays, allowing you to receive your money in your preferred
                  bank account. The platform supports earnings in multiple
                  currencies and offers favorable exchange rates for local bank
                  deposits.
                </p>
              </div>
            </div>
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  Can I sell my course on Profit Plus?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  On our website, vendors can upload and sell unlimited courses,
                  with the flexibility to withdraw earnings every Sunday directly
                  from their course dashboard.
                </p>
              </div>
            </div>
            <div className="faq-item bg-gray-100 p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300">
              <div className="faq-question flex justify-between items-center cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  Where can I find answers to more questions?
                </h3>
                <span className="icon text-xl font-bold">+</span>
              </div>
              <div className="faq-answer text-gray-600 mt-4 max-h-0 overflow-hidden transition-max-height duration-300 ease-in-out">
                <p>
                  You can find more answers on the Profit Plus platform. Visit
                  theprofitplus.com.ng for additional details and updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            What Our Users Are Saying
          </h2>
          <div className="carousel">
            <div className="carousel-track" id="carouselTrack">
              <div className="testimonial-item bg-white p-6 rounded-lg shadow-lg">
                <div className="testimonial-avatar bg-gray-200 text-gray-800 flex items-center justify-center text-lg font-bold">
                  OM
                </div>
                <div className="testimonial-content">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Oyebamiji Maryam
                  </h3>
                  <p className="text-gray-600">
                    "Profit Plus transformed my life! Within two months, I earned
                    enough to pay for my school fees and even started my own
                    small business."
                  </p>
                </div>
              </div>
              <div className="testimonial-item bg-white p-6 rounded-lg shadow-lg">
                <div className="testimonial-avatar bg-gray-200 text-gray-800 flex items-center justify-center text-lg font-bold">
                  SN
                </div>
                <div className="testimonial-content">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Shittu Nimotallahi
                  </h3>
                  <p className="text-gray-600">
                    "Joining Profit Plus was the best decision I ever made. The
                    ABIC course equipped me with skills in affiliate marketing and
                    forex trading."
                  </p>
                </div>
              </div>
              <div className="testimonial-item bg-white p-6 rounded-lg shadow-lg">
                <div className="testimonial-avatar bg-gray-200 text-gray-800 flex items-center justify-center text-lg font-bold">
                  QA
                </div>
                <div className="testimonial-content">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Qazeem Aisha
                  </h3>
                  <p className="text-gray-600">
                    "I was skeptical at first, but Profit Plus proved me wrong. I
                    learned 3D animation and started making money creating content
                    for brands."
                  </p>
                </div>
              </div>
              <div className="testimonial-item bg-white p-6 rounded-lg shadow-lg">
                <div className="testimonial-avatar bg-gray-200 text-gray-800 flex items-center justify-center text-lg font-bold">
                  IA
                </div>
                <div className="testimonial-content">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Ibrahim Awwal
                  </h3>
                  <p className="text-gray-600">
                    "Profit Plus gave me the tools and confidence to succeed. The
                    weekly payouts are reliable, and the community is incredibly
                    supportive."
                  </p>
                </div>
              </div>
            </div>
            <div className="button-container text-center mt-4">
              <button
                className="carousel-btn bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                id="prevBtn"
              >
                Previous
              </button>
              <button
                className="carousel-btn bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
                id="nextBtn"
              >
                Next
              </button>
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
