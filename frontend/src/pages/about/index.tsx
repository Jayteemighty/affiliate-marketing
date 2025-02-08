import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const AboutPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pioneering Growth and Innovation
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Our mission is to inspire and enable individuals and businesses to
            reach new heights of success. By providing innovative solutions and a
            supportive platform, we turn aspirations into achievements and ideas
            into lasting impact.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Mission, Vision, and Values
          </h2>

          {/* Mission */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Mission
            </h3>
            <p className="text-gray-600 text-lg">
              To empower individuals and businesses by providing innovative and
              reliable solutions that enhance productivity, financial growth, and
              collaboration through seamless affiliate marketing and e-commerce
              opportunities.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Vision
            </h3>
            <p className="text-gray-600 text-lg">
              To be the leading platform in creating sustainable wealth and
              fostering entrepreneurial success, enabling users to achieve their
              financial goals through innovative tools and partnerships.
            </p>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Core Values
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-lg">
              <li>Integrity – We operate with transparency and honesty.</li>
              <li>
                Innovation – We continuously evolve to provide cutting-edge
                solutions.
              </li>
              <li>
                Empowerment – We are committed to supporting users to reach their
                full potential.
              </li>
              <li>
                Collaboration – We foster partnerships that drive growth and
                success.
              </li>
              <li>
                Customer Focus – We prioritize the needs and satisfaction of our
                users.
              </li>
              <li>
                Excellence – We strive to deliver top-notch services that exceed
                expectations.
              </li>
            </ul>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Unveiling the Journey That Drives Our Vision and Purpose
          </h2>
          <p className="text-gray-600 text-lg text-center">
            Our story begins with a vision to redefine online opportunities by
            creating a platform where innovation meets impact. Our founders,
            inspired by the limitless potential of digital transformation, set
            out to design a space where growth, collaboration, and value take
            priority.
          </p>
          <p className="text-gray-600 text-lg text-center mt-4">
            We are committed to building a community that not only fosters
            financial success but also promotes personal growth and meaningful
            connections. At the heart of our mission is the belief that success
            is best achieved when quality, integrity, and purpose align.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Us on Our Journey to Empowerment and Excellence!
          </h2>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300"
            onClick={() => window.location.href = "/sign-up"}
          >
            Learn More and Get Started
          </button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutPage;