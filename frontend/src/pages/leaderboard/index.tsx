import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LeaderboardItem {
  rank: number;
  affiliate: string;
  sales_count: number; // Updated to sales_count
}

const LeaderboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);
  const [leaderboardType, setLeaderboardType] = useState<"monthly" | "all_time">("monthly");
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch leaderboard data from the backend
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view the leaderboard.");
        return;
      }
    
      try {
        const response = await axios.get(`${BASE_URL2}/api/affiliate/leaderboard/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            type: leaderboardType, // Pass the leaderboard type as a query parameter
          },
        });
    
        setLeaderboardData(response.data);
      } catch (error) {
        toast.error("Failed to fetch leaderboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [leaderboardType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading leaderboard...</p>
        </div>
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

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Affiliate Leaderboard</h1>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setLeaderboardType("monthly")}
            className={`px-4 py-2 rounded-md ${
              leaderboardType === "monthly"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setLeaderboardType("all_time")}
            className={`px-4 py-2 rounded-md ${
              leaderboardType === "all_time"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All Time
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboardData.map((item) => (
                <tr key={item.rank}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.affiliate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">{item.sales_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-md">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@profitplus.com"
              className="text-blue-600 hover:underline"
            >
              help@profitplus.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, ProfitPlus</p>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeaderboardPage;