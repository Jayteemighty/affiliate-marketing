import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const TransactionStatusPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle transaction status check
  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      setStatus(null);
      return;
    }

    try {
      const response = await fetch("https://profitplusbackend.com.ng/api/check-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to check transaction status.");
        setStatus(null);
        return;
      }

      const data = await response.json();
      setStatus(data.status || "No transactions found.");
      setError(null);
    } catch (error) {
      console.error("Error checking transaction status:", error);
      setError("An unexpected error occurred. Please try again later.");
      setStatus(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Check Transaction Status
        </h1>

        {/* Form Section */}
        <form
          onSubmit={handleCheckStatus}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
        >
          <label className="block text-gray-700 font-medium mb-2">
            Type Buyer Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter buyer's email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Check
          </button>
        </form>

        {/* Status or Error Message */}
        {status && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mt-4 w-full max-w-md text-center">
            {status}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mt-4 w-full max-w-md text-center">
            {error}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-md">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@promptearn.com"
              className="text-blue-600 hover:underline"
            >
              help@promptearn.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, PromptEarn</p>
        </footer>
      </div>
    </div>
  );
};

export default TransactionStatusPage;