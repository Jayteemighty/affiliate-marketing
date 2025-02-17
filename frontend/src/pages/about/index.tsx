import React from "react";
import frameImage from "../../assets/Frame.png";
import star from "../../assets/star23.png";
import DefaultLayout from "../../layouts/DefaultLayout";

const AboutPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="w-full py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-4xl md:text-5xl font-raleway font-bold text-black mb-6">
                Pioneering Growth and Innovation
              </h4>
              <p className="font-raleway text-lg text-gray-600">
                Our mission is to inspire and enable individuals and businesses
                to reach new heights of success. By providing innovative
                solutions and a supportive platform, we turn aspirations into
                achievements and ideas into lasting impact.
              </p>
              </div>
              <div className="flex-1">
                <img
                  src={frameImage}
                  alt="Pioneering Growth and Innovation"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        

        {/* Company Story Section */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start justify-between">
              {/* Left Column */}
              <div className="md:w-1/2 space-y-0">
                <h4 className="text-3xl font-bold text-black text-left font-raleway">
                  Unveiling the journey that drives our vision and purpose.
                </h4>
                <p className="text-xl font-bold text-gray-800 text-left font-raleway mt-6">
                  We are thrilled to unveil the story behind our journey and give you
                  an exclusive glimpse into the inspiration and vision that brought
                  our platform to life. Join us as we celebrate the milestones that
                  define our existence and drive our mission forward!
                </p>
              </div>
              {/* Right Column */}
              <div className="md:w-1/2 text-left font-raleway md:mt-0 mt-6">
                <p className="text-lg text-gray-600">
                  Our story begins with a vision to redefine online opportunities by
                  creating a platform where innovation meets impact. Our founders,
                  inspired by the limitless potential of digital transformation, set
                  out to design a space where growth, collaboration, and value take
                  priority.
                  <br />
                  <br />
                  We are committed to building a community that not only fosters
                  financial success but also promotes personal growth and meaningful
                  connections. At the heart of our mission is the belief that success
                  is best achieved when quality, integrity, and purpose align.
                  <br />
                  <br />
                  Join us as we continue to pave the way for a future driven by
                  empowerment and excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="w-full py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start justify-between relative">
              {/* Left Column (Mission) */}
              <div className="md:w-1/2 text-center md:text-left space-y-6">
                <img
                  src={star}
                  alt="Star Icon"
                  className="max-w-[80px] mx-auto md:mx-0 mb-6 bg-[#f3f9ee] p-4 rounded-full"
                />
                <h3 className="text-4xl md:text-5xl font-bold text-black font-raleway">
                  Our Mission
                </h3>
                <p className="text-base text-black font-normal font-raleway max-w-md mx-auto md:mx-0">
                  To connect creators of exceptional digital products with motivated
                  affiliates, enabling sustainable growth through strategic
                  partnerships, cutting-edge tools, and personalized support.
                </p>
              </div>

              {/* Right Column (Vision) */}
              <div className="md:w-1/2 text-center md:text-left space-y-6 mt-16 md:mt-0">
                <img
                  src={star}
                  alt="Star Icon"
                  className="max-w-[80px] mx-auto md:mx-0 mb-6 bg-[#f3f9ee] p-4 rounded-full"
                />
                <h3 className="text-4xl md:text-5xl font-bold text-black font-raleway">
                  Our Vision
                </h3>
                <p className="text-base text-black font-normal font-raleway max-w-md mx-auto md:mx-0">
                  To empower individuals and businesses with unparalleled
                  opportunities, fostering growth, innovation, and success in the
                  digital economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Us on Our Journey to Empowerment and Excellence!
          </h2>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => window.location.href = "/register"}
          >
            Learn More and Get Started
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;