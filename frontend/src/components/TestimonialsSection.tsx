import React, { useState, useEffect } from "react";

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      initials: "OM",
      name: "Oyebamiji Maryam",
      quote:
        "Profit Plus transformed my life! Within two months, I earned enough to pay for my school fees and even started my own small business.",
    },
    {
      initials: "SN",
      name: "Shittu Nimotallahi",
      quote:
        "Joining Profit Plus was the best decision I ever made. The ABIC course equipped me with skills in affiliate marketing and forex trading.",
    },
    {
      initials: "QA",
      name: "Qazeem Aisha",
      quote:
        "I was skeptical at first, but Profit Plus proved me wrong. I learned 3D animation and started making money creating content for brands.",
    },
    {
      initials: "IA",
      name: "Ibrahim Awwal",
      quote:
        "Profit Plus gave me the tools and confidence to succeed. The weekly payouts are reliable, and the community is incredibly supportive.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < testimonials.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  useEffect(() => {
    const track = document.getElementById("carouselTrack");
    if (track) {
      const width = track.children[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * width}px)`;
    }
  }, [currentIndex]);

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        What Our Users Are Saying
      </h2>
      <div className="testimonials-container mx-auto max-w-4xl overflow-hidden">
        <div className="carousel">
          <div
            id="carouselTrack"
            className="carousel-track flex transition-transform duration-300"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-item bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-full"
              >
                <div className="testimonial-avatar bg-gray-200 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
                  {testimonial.initials}
                </div>
                <div className="testimonial-content mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 mt-2">{testimonial.quote}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="button-container text-center mt-4">
            <button
              className="carousel-btn bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 mr-2"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className="carousel-btn bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
              onClick={handleNext}
              disabled={currentIndex === testimonials.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;