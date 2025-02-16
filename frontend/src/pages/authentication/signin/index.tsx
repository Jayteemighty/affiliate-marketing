import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import logo from "../../../assets/result (3).png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const response = await fetch("https://backend-api.theprofitplus.com.ng/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      console.log(userData);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      alert("User signed in successfully");
      setTimeout(() => {
        window.location.href = "/dashboard"; // Redirect to dashboard or another page
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert(`An error occurred: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <DefaultLayout>
      <section className="flex h-screen">
        {/* Left Section */}
        <div className="hidden lg:block w-1/2 bg-gray-900 text-white flex items-center justify-center">
          <div className="space-y-8">
            <img
              src={logo} // Replace with your logo path
              alt="PromptEarn"
              className="w-64 mb-8"
            />
            <p className="text-2xl font-bold max-w-md p-8">
              It only takes a few seconds to log into your account.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Login</h2>

            {/* Email Field */}
            <div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type Your Email Address Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Password Field */}
            <div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Login
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Don't Have an Account? */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default LoginPage;
