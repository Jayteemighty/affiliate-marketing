import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Here, you can manage your products, check transaction status, and view
          earnings.
        </p>

        {/* Today's Sales Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Today's Sale Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Today's Sale</h2>
            <p className="text-2xl md:text-3xl font-bold">$0</p>
          </div>

          {/* Affiliate Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Today's Affiliate Earnings</h2>
            <p className="text-2xl md:text-3xl font-bold">$0</p>
          </div>

          {/* Vendor Earnings Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Today's Vendor Earnings</h2>
            <p className="text-2xl md:text-3xl font-bold">$0</p>
          </div>
        </div>

        {/* Withdrawals Section */}
        <section className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Withdrawals</h2>
          <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
            <p className="text-gray-600 mb-4">
              Withdrawals are only available on Saturdays.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
              <label htmlFor="withdrawalAmount" className="font-medium">
                Type Amount:
              </label>
              <input
                type="number"
                id="withdrawalAmount"
                placeholder="Enter amount in dollars"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 flex-grow w-full md:w-auto"
              />
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300 w-full md:w-auto"
                disabled
              >
                Withdraw
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;