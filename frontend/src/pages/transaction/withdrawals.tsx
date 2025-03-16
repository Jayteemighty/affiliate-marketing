import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";

interface Withdrawal {
  id: number;
  amount: string;
  status: string;
  bank_name: string;
  account_number: string;
  created_at: string;
}

const WithdrawalsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch withdrawal data from the backend
  useEffect(() => {
    const fetchWithdrawals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your withdrawals.");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL2}/api/payment/withdrawals/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setWithdrawals(response.data);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
        toast.error("Failed to fetch withdrawals. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading withdrawals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md z-50"
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons text-xl">menu</span>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Withdrawals
        </h1>
        <p className="text-gray-600 text-center mb-4">
          View your withdrawal history and track your earnings.
        </p>

        {/* Withdrawal Table */}
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Amount</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Bank</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Account</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-600">
                    No withdrawals found.
                  </td>
                </tr>
              )}
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">${withdrawal.amount}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        withdrawal.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : withdrawal.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{withdrawal.bank_name}</td>
                  <td className="py-3 px-4 text-gray-700">{withdrawal.account_number}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(withdrawal.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Withdrawals are processed every Sunday for all vendors and affiliates.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-xl">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@promptearn.com"
              className="text-blue-600 hover:underline"
            >
              help@profitplus.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, Profitplus</p>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WithdrawalsPage;