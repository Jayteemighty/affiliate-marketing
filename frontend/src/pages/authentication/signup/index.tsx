import React from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";


const SignUpPage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        {/* Sign-Up Form Container */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create New Account
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Sign up with us and enjoy the best experience
          </p>

          {/* Full Name Field */}
          <div className="mb-4">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
            >
              <option value="" disabled selected>
                Select Country
              </option>
              {/* List of Countries */}
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
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
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2"
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
          >
            Create Account
          </button>

          {/* Already Have an Account Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </span>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUpPage;