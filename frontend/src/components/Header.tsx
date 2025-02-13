import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/result (3).png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo or Brand Name */}
        <nav className="bg-gray-800 flex items-center">
          <NavLink to="/" className="navbar-brand flex items-center">
            <img
              src={logo}
              alt="ProfitPlus"
              className="h-20 w-auto hover:opacity-80 transition-opacity duration-300"
            />
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`md:flex md:space-x-6 md:static absolute md:bg-transparent bg-gray-800 md:shadow-none shadow-lg md:py-0 py-4 md:top-0 top-16 left-0 right-0 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            {/* Home Link */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="Home"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>

            {/* About Us Link */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="About Us"
                onClick={toggleMenu}
              >
                About Us
              </NavLink>
            </li>

            {/* Affiliates Link */}
            <li>
              <NavLink
                to="/affiliate"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="Affiliates"
                onClick={toggleMenu}
              >
                Affiliates
              </NavLink>
            </li>

            {/* Vendors Link */}
            <li>
              <NavLink
                to="/vendor"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="Vendors"
                onClick={toggleMenu}
              >
                Vendors
              </NavLink>
            </li>

            {/* FAQ Link */}
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="FAQ"
                onClick={toggleMenu}
              >
                FAQ
              </NavLink>
            </li>

            {/* Login Link */}
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="Login"
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            </li>

            {/* Create Account Link */}
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 font-bold"
                      : "hover:bg-white hover:text-blue-700"
                  }`
                }
                aria-label="Create Account"
                onClick={toggleMenu}
              >
                Create Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;