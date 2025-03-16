import React, { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL2 } from "../../../libs/constants";
import Preloader from "../../../components/Preloader";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL2}/api/user/account/password/request-reset/`,
        { email }
      );

      if (response.status === 200) {
        toast.success("OTP sent to your email. Please check your inbox.");
        setStep("verify");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Failed to send OTP. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL2}/api/user/account/password/request-reset/verify/`,
        { email, otp }
      );

      if (response.status === 200) {
        toast.success("OTP verified. Please reset your password.");
        setStep("reset");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Invalid OTP. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL2}/api/user/account/password/reset/`,
        { email, new_password: newPassword, confirm_password: confirmPassword }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Failed to reset password. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      {isLoading && <Preloader />}

      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-96">
          <h2 className="text-2xl font-bold text-center mb-6">
            {step === "request"
              ? "Forgot Password"
              : step === "verify"
              ? "Verify OTP"
              : "Reset Password"}
          </h2>

          {step === "request" && (
            <form onSubmit={handleRequestReset}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter the OTP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default ForgotPasswordPage;