import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../../../components/Preloader";
import { BASE_URL2 } from "../../../libs/constants";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
  });
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const location = useLocation();
  const navigate = useNavigate();

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
    if (!formData.first_name) {
      toast.error("First name is required.");
      return;
    }
    if (!formData.last_name) {
      toast.error("Last name is required.");
      return;
    }
    if (!formData.email) {
      toast.error("Email address is required.");
      return;
    }
    if (!formData.phone_number) {
      toast.error("Phone number is required.");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required.");
      return;
    }
    if (!formData.password2) {
      toast.error("Confirm password is required.");
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    // Validate phone number format (basic validation)
    const phoneRegex = /^\d{10,15}$/; // Adjust regex based on your requirements
    if (!phoneRegex.test(formData.phone_number)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
  
    // Validate password match
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match.");
      return;
    }
  
    setIsLoading(true); // Start loading
  
    try {
      // Send POST request to the backend
      const response = await axios.post(
        `${BASE_URL2}/api/user/account/registerd/`,
        formData
      );
  
      // Handle successful response
      if (response.status === 201) {
        toast.success("Account created successfully. Check your email for a welcome message.");
        localStorage.setItem("user", JSON.stringify(response.data));
  
        // Redirect to the referral link URL or dashboard
        const from = location.state?.from || "/dashboard";
        navigate(from); // Redirect to the stored URL or dashboard
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error || "An error occurred during signup.";
        toast.error(errorMessage);
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
            {/* First Name Field */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            {/* Last Name Field */}
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.last_name}
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

            {/* Phone Number Field */}
            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {/* Phone number Hint */}
              <p className="text-xs text-gray-500 mt-1">
                Phone number must contain at least 10 digits and not more than 15 digits.
              </p>
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
              {/* Password Hint */}
              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.password2}
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