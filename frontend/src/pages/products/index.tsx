import React from "react";
import Sidebar from "../../components/Sidebar";

interface Product {
  name: string;
  launchDate: string;
  status: string;
  amount: number;
  commission: number;
}

const productData: Product[] = [
  { name: "Digital Marketing Mastery", launchDate: "2023-10-01", status: "Active", amount: 49.99, commission: 75 },
  { name: "Forex Trading Essentials", launchDate: "2023-11-15", status: "Pending", amount: 99.99, commission: 60 },
  { name: "3D Animation Basics", launchDate: "2024-01-01", status: "Inactive", amount: 79.99, commission: 50 },
  // Add more products as needed
];

const ProductsPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          My Products
        </h1>
        <p className="text-gray-600 text-center mb-4">
          View and manage your products listed on PromptEarn.
        </p>

        {/* Product Table */}
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Product</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Launch Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">Amount ($)</th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">Comm (%)</th>
              </tr>
            </thead>
            <tbody>
              {productData.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-600">
                    No products found.
                  </td>
                </tr>
              )}
              {productData.map((product, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.launchDate}</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    ${product.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    {product.commission}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Product Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300"
            onClick={() => window.location.href = "/upload-course"}
          >
            Add New Product
          </button>
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

export default ProductsPage;