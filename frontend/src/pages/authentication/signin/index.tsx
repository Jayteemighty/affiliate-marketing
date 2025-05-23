import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import logo from "../../../assets/result (3).png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Preloader from "../../../components/Preloader";
import { BASE_URL2 } from "../../../libs/constants";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL2}/api/user/account/login/`, {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "User signed in successfully!");

        // Save token, user data, and email to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userEmail", email); // Store the user's email

        // Log the token and email to verify they are stored correctly
        console.log("Token stored:", response.data.token);
        console.log("Email stored:", email);

        // Redirect to the referral link URL or dashboard
        const from = location.state?.from || "/dashboard";
        navigate(from); // Redirect to the stored URL or dashboard
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.error || "Login failed. Please recheck credentials."
        );
      } else {
        toast.error("An unexpected error occurred. Please recheck credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      {/* Show Preloader when isLoading is true */}
      {isLoading && <Preloader />}

      <section className="flex h-screen">
        {/* Left Section */}
        <div className="hidden lg:block w-1/2 bg-gray-900 text-white items-center justify-center">
          <div className="space-y-8">
            <img src={logo} alt="PromptEarn" className="w-64 mb-8" />
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
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>

            {/* Forgot Password Link */}
            <p className="text-sm text-gray-600 text-center">
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
                className="text-blue-600 hover:underline"
              >
                Reset it here
              </a>
            </p>

            {/* Register Link */}
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register", { state: { from: location.state?.from } });
                }}
                className="text-blue-600 hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default LoginPage;