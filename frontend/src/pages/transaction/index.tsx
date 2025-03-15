import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TransactionData {
  user_payments: {
    id: number;
    amount: number;
    status: string;
    created_at: string;
  }[];
  course_payments: {
    id: number;
    amount: number;
    status: string;
    created_at: string;
  }[];
  affiliate_sales: {
    id: number;
    amount: number;
    commission: number;
    date: string;
  }[];
  withdrawal_requests: {
    id: number;
    amount: number;
    status: string;
    created_at: string;
  }[];
}

const TransactionStatusPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch transaction data from the backend
  useEffect(() => {
    const fetchTransactionData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your transaction status.");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL2}/api/payment/transaction-status/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setTransactionData(response.data);
      } catch (error) {
        toast.error("Failed to fetch transaction data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading transaction status...</p>
        </div>
      </div>
    );
  }

  if (!transactionData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load transaction data.</p>
      </div>
    );
  }

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

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Transaction Status</h1>

        {/* User Payments Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Payments</h2>
          {transactionData.user_payments.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionData.user_payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">₦{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No payments found.</p>
          )}
        </div>

        {/* Course Payments Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payments for Your Courses</h2>
          {transactionData.course_payments.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionData.course_payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">₦{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No course payments found.</p>
          )}
        </div>

        {/* Affiliate Sales Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Affiliate Sales</h2>
          {transactionData.affiliate_sales.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionData.affiliate_sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap">₦{sale.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₦{sale.commission}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(sale.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No affiliate sales found.</p>
          )}
        </div>

        {/* Withdrawal Requests Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
          {transactionData.withdrawal_requests.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactionData.withdrawal_requests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">₦{request.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(request.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No withdrawal requests found.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransactionStatusPage;