import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const UploadCoursePage: React.FC = () => {
  const [sellerName, setSellerName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [gmail, setGmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      const response = await fetch("https://profitplusbackend.com.ng/api/upload-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerName, courseName, gmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit the course.");
      }

      const data = await response.json();
      alert(data.message || "Course submitted successfully!");
    } catch (error) {
      // Ensure the error is properly handled
      if (error instanceof Error) {
        console.error("Error submitting course:", error.message);
        alert("An error occurred while submitting your course. Please try again.");
      } else {
        console.error("Unknown error occurred during course submission:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      // Reset the loading state after submission or error handling
      setIsSubmitting(false); // Removed the semicolon after this line
    }
  };

  return (
    <DefaultLayout>
        <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Upload Your Course</h2>
            {/* Upload Course Form */}
            <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
            >
            {/* Seller Name Field */}
            <div>
                <label
                htmlFor="sellerName"
                className="block text-gray-700 font-medium mb-2"
                >
                Seller Name *
                </label>
                <input
                type="text"
                id="sellerName"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <small className="text-red-500 block mt-1">
                Seller name must match the name you registered with.
                </small>
            </div>

            {/* Course Name Field */}
            <div>
                <label
                htmlFor="courseName"
                className="block text-gray-700 font-medium mb-2"
                >
                Course Name *
                </label>
                <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter your course name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Gmail Field */}
            <div>
                <label
                htmlFor="gmail"
                className="block text-gray-700 font-medium mb-2"
                >
                Gmail *
                </label>
                <input
                type="email"
                id="gmail"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                placeholder="Enter your Gmail address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Add Exam & Certificate Option */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                Add Exam & Certificate (15,000 NGN/month)
                </label>
                <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-blue-600 hover:underline font-medium flex items-center"
                type="button"
                >
                Learn More{" "}
                <span className="material-icons ml-2">{showDetails ? "expand_less" : "expand_more"}</span>
                </button>

                {/* Details Section */}
                {showDetails && (
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                    <p className="text-gray-700">
                    Adding an exam and a ProfitPlus-branded certificate to your
                    course increases its credibility and attractiveness to
                    students. It gives students something tangible to show for
                    completing the course, enhancing its value. This helps boost
                    sales and makes your course stand out in the marketplace.
                    </p>
                    <p className="text-gray-700 mt-2">
                    For only 15,000 NGN per month, your course can have the added
                    benefits of a certificate, encouraging more students to buy it!
                    </p>
                </div>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Loading..." : "Submit Course"}
            </button>

            {/* Help Link */}
            <p className="text-center text-gray-600 mt-4">
                If you're unsure about how to upload your course,{" "}
                <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href =
                    "https://theprofitplus.com.ng/faq";
                }}
                >
                click here
                </a>{" "}
                for more instructions.
            </p>
            </form>
        </div>
        </section>
    </DefaultLayout>
  );
};

export default UploadCoursePage;