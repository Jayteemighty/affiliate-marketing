import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for Mobile (Visible when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button (Visible on Mobile) */}
        <button
          onClick={onClose}
          className="md:hidden p-4 text-white focus:outline-none"
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
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center h-20">
          <h1 className="text-2xl font-bold">Profit Earn</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 p-4">
          <Link
            to="/dashboard"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">dashboard</span> Dashboard
          </Link>
          <Link
            to="/marketplace"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">store</span> Marketplace
          </Link>
          <Link
            to="/aim-course"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">school</span> AIM Course
          </Link>
          <Link
            to="/transaction-status"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">library_books</span> Check
            Transaction Status
          </Link>
          <Link
            to="/leaderboard"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">star</span> Affiliate Leaderboard
          </Link>
          <Link
            to="/become-vendor"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">content_paste</span> Become a
            Vendor
          </Link>
          <Link
            to="/manage-products"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">library_books</span> Manage
            Products
          </Link>
          <Link
            to="/withdrawals"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">money</span> Withdrawals
          </Link>
          <Link
            to="/profile"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">person</span> Profile
          </Link>
          <Link
            to="/"
            className="block py-2 px-4 hover:bg-gray-700 rounded-md transition duration-300"
            onClick={onClose}
          >
            <span className="material-icons mr-2">logout</span> Logout
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;