import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../../../components/Preloader"; // Import the Preloader
import { BASE_URL } from "../../../libs/constants"; // Import the base URL

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate terms and conditions
    if (!termsChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    // Validate form fields
    if (!formData.name || !formData.email || !formData.password || !formData.country) {
      toast.error("All fields must be filled.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Send POST request to the backend
      const response = await axios.post(`${BASE_URL}/api/register`, formData);

      // Handle successful response
      if (response.status === 200) {
        toast.success("User signed up successfully!");
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = "/dashboard"; // Replace with your desired redirect path
        }, 3000);
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "An error occurred during signup.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <DefaultLayout>
      {/* Show Preloader when isLoading is true */}
      {isLoading && <Preloader />}

      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create New Account
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Sign up with us and enjoy the best experience
          </p>

          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Address Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Country Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {/* List of Countries */}
                <option value="Afghanistan">Nigeria</option>
                <option value="Albania">Ghana</option>
                <option value="Algeria">Algeria</option>
                {/* Add all other countries here... */}
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mr-2"
                checked={termsChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to these{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
              disabled={isLoading || !termsChecked}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default SignUpPage;