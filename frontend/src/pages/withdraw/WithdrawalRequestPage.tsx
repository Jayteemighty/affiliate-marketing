import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";

const WithdrawalRequestPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [withdrawalType, setWithdrawalType] = useState("affiliate"); // Default to affiliate
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Extract the withdrawal amount and type from the query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amountParam = queryParams.get("amount");
    const typeParam = queryParams.get("type");

    if (amountParam) {
      setAmount(amountParam);
    }
    if (typeParam) {
      setWithdrawalType(typeParam);
    }
  }, [location]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form inputs
    if (!bankName || !accountNumber || !accountName) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to make a withdrawal request.");
        return;
      }
  
      // Log the request payload
      const payload = {
        amount: parseFloat(amount),
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
        withdrawal_type: withdrawalType,
      };
      console.log("Request Payload:", payload);
  
      // Send the withdrawal request to the backend
      const response = await axios.post(
        `${BASE_URL2}/api/payment/withdrawal-request/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      // Handle success
      if (response.status === 201) {
        toast.success("Withdrawal request submitted successfully!");
        navigate("/dashboard"); // Redirect to the dashboard
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
  
      // Display specific error messages from the backend
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Failed to submit withdrawal request. Please try again.";
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

        {/* Page Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Withdrawal Request</h1>

        {/* Withdrawal Request Form */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amount (₦)</label>
            <input
              type="text"
              value={amount}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Bank Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter your bank name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Account Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter your account number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Account Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter your account name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
          </button>
        </form>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default WithdrawalRequestPage;