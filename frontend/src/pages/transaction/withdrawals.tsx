import React from "react";
import Sidebar from "../../components/Sidebar";

interface Withdrawal {
  id: number;
  amount: string;
  status: string;
  bank: string;
  accountNumber: string;
  date: string;
}

const withdrawalData: Withdrawal[] = [
  { id: 1, amount: "$100", status: "Completed", bank: "GTB", accountNumber: "0123456789", date: "2024-01-15" },
  { id: 2, amount: "$200", status: "Pending", bank: "Zenith", accountNumber: "9876543210", date: "2024-01-20" },
  { id: 3, amount: "$150", status: "Failed", bank: "Access Bank", accountNumber: "1234567890", date: "2024-01-22" },
  // Add more withdrawal data as needed
];

const WithdrawalsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Amount</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Bank</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Acct</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-600">
                    No withdrawals found.
                  </td>
                </tr>
              )}
              {withdrawalData.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">{withdrawal.amount}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        withdrawal.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : withdrawal.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{withdrawal.bank}</td>
                  <td className="py-3 px-4 text-gray-700">{withdrawal.accountNumber}</td>
                  <td className="py-3 px-4 text-gray-700">{withdrawal.date}</td>
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
              help@promptearn.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, PromptEarn</p>
        </footer>
      </div>
    </div>
  );
};

export default WithdrawalsPage;