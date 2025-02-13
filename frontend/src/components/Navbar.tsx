import React from "react";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-gray-800 focus:outline-none"
        >
          <i className="material-icons">menu</i>
        </button>

        {/* Logo or Brand Name */}
        <h1 className="text-xl font-bold">Marketplace</h1>

        {/* Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-800">
            <i className="material-icons">notifications</i>
          </button>
          <button className="text-gray-800">
            <i className="material-icons">person</i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;