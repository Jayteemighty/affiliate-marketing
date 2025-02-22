import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

interface LeaderboardItem {
  rank: number;
  affiliate: string;
  sales: number;
}

const leaderboardData: LeaderboardItem[] = [
  { rank: 1, affiliate: "John Doe", sales: 120 },
  { rank: 2, affiliate: "Jane Smith", sales: 95 },
  { rank: 3, affiliate: "Alice Johnson", sales: 87 },
  { rank: 4, affiliate: "Michael Brown", sales: 78 },
  { rank: 5, affiliate: "Emily Davis", sales: 65 },
  // Add more leaderboard items as needed
];

const LeaderboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          Affiliate Leaderboard
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Ranked according to sales for the month
        </p>

        {/* Leaderboard Table */}
        <div className="bg-white shadow-md rounded-lg w-full max-w-xl overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">#</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">
                  Affiliate
                </th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((item) => (
                <tr key={item.rank} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">{item.rank}</td>
                  <td className="py-3 px-4 text-gray-700">{item.affiliate}</td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    {item.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Click{" "}
            <a
              href="https://twitter.com/profitplus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              here
            </a>{" "}
            to follow ProfitPlus on Twitter and stay updated.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-md">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@promptearn.com"
              className="text-blue-600 hover:underline"
            >
              help@ProfitPlus.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, ProfitPlus</p>
        </footer>
      </div>
    </div>
  );
};

export default LeaderboardPage;