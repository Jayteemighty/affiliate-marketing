import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <h1 className="text-2xl font-bold">Profit Plus</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#about-us" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#affiliates" className="hover:underline">
                Affiliates
              </a>
            </li>
            <li>
              <a href="#vendors" className="hover:underline">
                Vendors
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#login" className="hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="#create-account" className="hover:underline">
                Create Account
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;