import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import Preloader from "../../components/Preloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface AffiliateData {
  today_sales: number;
  overall_sales: number;
  today_affiliate_earnings: number;
  overall_affiliate_earnings: number;
  available_affiliate_earnings: number;
  withdrawal_fee: number;
  overall_vendor_earnings: number;
  available_vendor_earnings: number;
  total_withdrawals: number;
  my_products: number;
  affiliate_sales: number;
  affiliate_commission: number;
  first_name: string;
  email: string;
}

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currency, setCurrency] = useState("1"); // Default currency value
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [affiliateWithdrawalAmount, setAffiliateWithdrawalAmount] = useState("");
  const [vendorWithdrawalAmount, setVendorWithdrawalAmount] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleAffiliateWithdrawalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliateWithdrawalAmount(e.target.value);
  };
  
  const handleVendorWithdrawalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendorWithdrawalAmount(e.target.value);
  };

  // Handle withdrawal amount input
  const handleAffiliateWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate the withdrawal amount
    if (!affiliateWithdrawalAmount || parseFloat(affiliateWithdrawalAmount) <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }
  
    // Redirect to the withdrawal request page with the amount and type as query parameters
    navigate(`/withdrawal-request?amount=${affiliateWithdrawalAmount}&type=affiliate`);
  };
  
  const handleVendorWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate the withdrawal amount
    if (!vendorWithdrawalAmount || parseFloat(vendorWithdrawalAmount) <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }
  
    // Redirect to the withdrawal request page with the amount and type as query parameters
    navigate(`/withdrawal-request?amount=${vendorWithdrawalAmount}&type=vendor`);
  };


  // Fetch affiliate data from the backend
  useEffect(() => {
    const fetchAffiliateData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your dashboard.");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL2}/api/affiliate/dashboard/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setAffiliateData(response.data);
      } catch (error) {
        toast.error("Failed to fetch affiliate data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateData();
  }, []);

  if (isLoading && <Preloader />) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!affiliateData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load affiliate data.</p>
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

        {/* Display User's First Name and Email */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Hello, {affiliateData.first_name} {affiliateData.email}
        </h1>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Here, you can manage your products, check transaction status, and view earnings.
        </p>

        <div className="content">
          <div className="container-fluid relative flex items-center justify-between">
            {/* Currency Dropdown */}
            <div className="relative inline-block text-left">
              <i
                className="fa fa-caret-down absolute right-4 top-2 cursor-pointer text-green-500"
              ></i>
              <select
                id="currency"
                value={currency}
                onChange={handleCurrencyChange}
                className="form-control float-right text-green-600 max-w-[100px] appearance-none bg-white border border-gray-300 rounded-md px-2 py-1"
                style={{ color: "green" }}
              >
                <option value="1">Currency: $</option>
                <option value="2">Currency: ₦</option>
                <option value="3">Currency: ₵</option>
                <option value="4">Currency: CFA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Earnings and Sales Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Overall Affiliate Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Overall Affiliate Earnings</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.overall_affiliate_earnings}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Current Earnings</div>
          </div>

          {/* Overall Vendor Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Overall Vendor Earnings</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.overall_vendor_earnings}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Total Earnings from Sales</div>
          </div>

          {/* Overall Sales Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">store</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Overall Sales</h2>
                <p className="text-2xl md:text-3xl font-bold">{affiliateData.overall_sales}</p>
              </div>
            </div>
            <div className="text-gray-600">Total</div>
          </div>

          {/* Available Affiliate Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Available Affiliate Earnings</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.available_affiliate_earnings}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Withdrawals only available on Saturdays</div>
            <form onSubmit={handleAffiliateWithdrawalSubmit} className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Type Amount:</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                min="1"
                placeholder="Type Amount Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={affiliateWithdrawalAmount}
                onChange={handleAffiliateWithdrawalAmountChange}
              />
              <p className="text-red-500 text-sm">Please ensure you type the amount you want to withdraw in <b>Naira</b></p>
              <button type="submit" className="mt-2 bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                Withdraw
              </button>
            </form>
          </div>

          {/* Available Vendor Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Available Vendor Earnings</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.available_vendor_earnings}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Withdrawals only available on Saturdays</div>
            <form onSubmit={handleVendorWithdrawalSubmit} className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Type Amount:</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                min="1"
                placeholder="Type Amount Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                value={vendorWithdrawalAmount}
                onChange={handleVendorWithdrawalAmountChange}
              />
              <p className="text-red-500 text-sm">Please ensure you type the amount you want to withdraw in <b>Naira</b></p>
              <button type="submit" className="mt-2 bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                Withdraw
              </button>
            </form>
          </div>

          {/* My Products Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">list</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">My Products</h2>
                <p className="text-2xl md:text-3xl font-bold">{affiliateData.my_products}</p>
              </div>
            </div>
            <div className="text-gray-600">Number of Courses Owned</div>
          </div>

          {/* Total Withdrawals Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Total Withdrawals</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.total_withdrawals}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Total Successful Withdrawals</div>
          </div>

          {/* Affiliate Sales Card */}
          {/* <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Affiliate Sales</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.affiliate_sales}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Total Sales as Affiliate</div>
          </div> */}

          {/* Affiliate Commission Card */}
          {/* <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">$</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Affiliate Commission</h2>
                <p className="text-2xl md:text-3xl font-bold">
                  <span>₦</span><span>{affiliateData.affiliate_commission}</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Total Commission Earned</div>
          </div> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardPage;