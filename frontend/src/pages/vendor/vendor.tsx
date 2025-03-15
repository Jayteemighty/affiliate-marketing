import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BecomeVendorPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [gmail, setGmail] = useState("");
  const [price, setPrice] = useState("");
  const [affiliateCommission, setAffiliateCommission] = useState("40"); // Default to 40%
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (!sellerName || !courseName || !gmail || !price || !affiliateCommission) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to submit a course request.");
        return;
      }

      // Send the course request to the backend
      const response = await axios.post(
        `${BASE_URL2}/api/course/course-requests/create/`,
        {
          seller_name: sellerName,
          course_title: courseName,
          email: gmail,
          price: parseFloat(price), // Convert to number
          affiliate_commission: parseFloat(affiliateCommission), // Convert to number
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        toast.success("Course request submitted successfully!");
        // Reset form fields
        setSellerName("");
        setCourseName("");
        setGmail("");
        setPrice("");
        setAffiliateCommission("40");
      }
    } catch (error) {
      console.error("Error submitting course request:", error);

      // Display specific error messages from the backend
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Failed to submit course request. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto ml-0 md:ml-64">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-gray-800 text-white rounded-md mb-4"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

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
                <label htmlFor="sellerName" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="courseName" className="block text-gray-700 font-medium mb-2">
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
                <label htmlFor="gmail" className="block text-gray-700 font-medium mb-2">
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

              {/* Price Field */}
              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                  Price (NGN) *
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter the course price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Affiliate Commission Field */}
              <div>
                <label htmlFor="affiliateCommission" className="block text-gray-700 font-medium mb-2">
                  Affiliate Commission (%) *
                </label>
                <input
                  type="number"
                  id="affiliateCommission"
                  value={affiliateCommission}
                  onChange={(e) => setAffiliateCommission(e.target.value)}
                  placeholder="Enter affiliate commission percentage"
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
                  <span className="material-icons ml-2">
                    {showDetails ? "expand_less" : "expand_more"}
                  </span>
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
                    window.location.href = "/vendor";
                  }}
                >
                  click here
                </a>{" "}
                for more instructions.
              </p>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BecomeVendorPage;