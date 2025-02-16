import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { NavLink } from "react-router-dom";
import heroImage from "../../assets/Frame004317.png";
import featuredImage from "../../assets/Frame34000004410.png";
import FAQSection from "../../components/FAQSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import frameImage from "../../assets/Frame34f1000004512.png";
import HowItWorksSection from "../../components/HowItWorksSection";
import maskImage from "../../assets/Mask4group3.png";


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
            <button className="mt-8 bg-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-500 transition duration-300">
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
            <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                Quick & Secure Payments
              </h3>
              <p className="text-gray-600">
                Receive your affiliate earnings quickly and securely. We ensure
                timely payments directly to your bank account every week.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-purple-600 text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">
                Generous Commission Structure
              </h3>
              <p className="text-gray-600">
                Earn up to 75% commission on each sale, giving you the potential
                to earn significant income while promoting top-quality products.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-green-600 text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">
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
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/2 hover:scale-105 hover:shadow-2xl transition-shadow duration-300">
            <div className="text-blue-600 text-4xl mb-4">💰</div>
              <h5 className="text-2xl font-semibold text-purple-800 mb-4">
                Increase your income by promoting high-quality products from
                reliable vendors.
              </h5>
              <p className="text-gray-600 mb-20">
                Sign up as a ProfitPlus affiliate and gain immediate access to
                our product marketplace. Choose any product that interests you
                and start promoting it right away. Additionally, you'll receive
                ongoing training to enhance your sales skills and increase your
                weekly earnings.
              </p>
              <NavLink
                to="/register"
                className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Become an Affiliate
              </NavLink>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Call to Action */}
        <section className="mt-12 text-center bg-gradient-to-r bg-gray-800 py-16 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            Join Our Affiliate Program and Start Earning Today!
          </h2>
          <p className="text-white mb-4">
            Signing up is simple and fast. Share your unique referral link and start earning right away.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            <NavLink to="/register">Sign Up Now</NavLink>
          </button>
        </section>

          {/* Vendor Partnership Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <h2 className="text-[#05212f] font-raleway font-bold text-2xl mb-4">
                Have a product or course that deserves more sales?
              </h2>
              <h3 className="text-purple-800 leading-8 font-bold font-raleway text-xl mb-6">
                Partner with us to reach a wider audience and boost sales! Our platform connects you with experienced affiliates who can promote your products worldwide.
              </h3>
              <p className="font-raleway text-gray-700 mb-6">
                We'll help you sell your course to a targeted audience, handling marketing and promotion so you can focus on creating great content. <br />
                Our team is dedicated to supporting you every step of the way, ensuring your success in the online marketplace. <br />
                Add an extra layer of credibility to your course with our optional exam and certificate feature (one-time payment of 30,000 NGN). This feature allows you to create assessments and provide official certificates to students upon completion, enhancing their learning experience and your course's value.
              </p>
              <a
                href="/vendor"
                className="inline-block bg-purple-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#52b998] transition duration-300"
              >
                Become a ProfitPlus Vendor
              </a>
            </div>

            {/* Image */}
            <div className="flex-1">
              <img
                src={frameImage}
                alt="Promotional Banner"
                className="w-full max-w-[500px] rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <HowItWorksSection />

        {/* Featured Posts Section */}
        <section className="featured-posts py-12">
          <div className="container mx-auto px-4">
            <div className="main-content">
              <div className="row listfeaturedtag">
                <div className="col-sm-12">
                  <div className="card">
                    <div
                      className="flex flex-col md:flex-row bg-[#f3f9ea] p-0"
                      style={{ backgroundColor: "#f3f9ea", padding: "0px" }}
                    >
                      {/* Text Content */}
                      <div className="flex-1 p-6">
                        <h2
                          className="text-[#05212f] leading-[50px] font-raleway font-bold text-3xl md:text-4xl"
                          style={{
                            color: "#05212f",
                            lineHeight: "50px",
                            fontFamily: "Raleway",
                            fontWeight: "bold",
                          }}
                        >
                          Ready to make more money promoting quality products to
                          an international audience?
                        </h2>
                        <br />
                        <p className="font-raleway text-gray-700">
                          Create your PromptEarn account in less than 5 minutes
                          and start earning
                        </p>
                        <br />
                        <div className="flex flex-col md:flex-row gap-4">
                          <a
                            id="btn11xx"
                            href="/register"
                            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#218838] transition duration-300"
                          >
                            Create account
                          </a>
                          <a
                            id="btn22xx"
                            href="#"
                            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#218838] transition duration-300"
                          >
                            Watch live demo first
                          </a>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="flex-1">
                        <img
                          src={maskImage} // Use the imported image
                          alt="Promotional Banner"
                          className="w-full max-w-[500px] rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        

      {/* Spacer Div */}
      <div id="befor33" className="mt-24 md:mt-0"></div>
    
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
