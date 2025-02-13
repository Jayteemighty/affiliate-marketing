import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Marketplace: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <form className="flex">
              <input
                type="search"
                placeholder="Search Product"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Product Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Products</th>
                  <th className="p-3 text-left">Seller</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Comm (%)</th>
                  <th className="p-3 text-left">.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <a href="/details-1" className="text-blue-500">
                      Automated Blueprint Income Course (ABIC)
                    </a>
                  </td>
                  <td className="p-3">OYEBAMIJI FATHIA KANYINSOLA</td>
                  <td className="p-3">$15</td>
                  <td className="p-3">50%</td>
                  <td className="p-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                      Promote
                    </button>
                  </td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;