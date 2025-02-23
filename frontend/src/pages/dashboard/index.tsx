import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [currency, setCurrency] = useState("1"); // Default currency value
  // const [isDateFilterVisible, setIsDateFilterVisible] = useState(false); // Toggle date filter visibility

  // Function to handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  // Function to toggle date filter dropdown
  // const toggleDateFilter = () => {
  //   setIsDateFilterVisible((prev) => !prev);
  // };

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

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Hello</h1>

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
                // onClick={toggleDateFilter} // Reuse the same icon for dropdown toggle
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

            {/* Filter by Date Buttons */}
            {/* <div className="flex items-center space-x-4">
              <button
                onClick={toggleDateFilter}
                id="show1"
                className="w-[150px] border-none cursor-pointer bg-white text-gray-500 px-2 py-1 rounded-md hover:text-black transition-colors"
              >
                Filter by date
              </button>
              {isDateFilterVisible && (
                <button
                  onClick={toggleDateFilter}
                  id="show2"
                  className="w-[150px] border-none cursor-pointer bg-white text-gray-500 px-2 py-1 rounded-md hover:text-black transition-colors"
                >
                  Filter by date
                </button>
              )}
            </div> */}
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
                  <span>$</span><span>0</span>
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
                  <span>$</span><span>0</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Current Earnings</div>
          </div>

          {/* Overall Sales Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-200 rounded-full">
                <i className="material-icons text-purple-800">store</i>
              </div>
              <div className="ml-2">
                <h2 className="text-lg md:text-xl font-semibold">Overall Sales</h2>
                <p className="text-2xl md:text-3xl font-bold">0</p>
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
                  <span>$</span><span>0</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Withdrawals only available on Saturdays</div>
            <form className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Type Amount:</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                min="1"
                placeholder="Type Amount Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <p className="text-red-500 text-sm">Please ensure you type the amount you want to withdraw in <b>dollar</b></p>
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
                  <span>$</span><span>0</span>
                </p>
              </div>
            </div>
            <div className="text-gray-600">Withdrawals only available on Saturdays</div>
            <form className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Type Amount:</label>
              <input
                type="number"
                step="0.01"
                name="amount"
                min="1"
                placeholder="Type Amount Here"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <p className="text-red-500 text-sm">Please ensure you type the amount you want to withdraw in <b>dollar</b></p>
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
                <p className="text-2xl md:text-3xl font-bold">0</p>
              </div>
            </div>
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
                  <span>$</span><span>0</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
