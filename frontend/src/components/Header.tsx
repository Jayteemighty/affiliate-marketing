import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active link styling

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <h1 className="text-2xl font-bold">Profit Plus</h1>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        {/* Navigation Links */}
        <nav
          className={`md:flex md:space-x-4 md:static absolute md:relative top-full left-0 right-0 bg-blue-800 py-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0">
            {/* Home Link */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="Home"
              >
                Home
              </NavLink>
            </li>

            {/* About Us Link */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="About Us"
              >
                About Us
              </NavLink>
            </li>

            {/* Affiliates Link */}
            <li>
              <NavLink
                to="/affiliate"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="Affiliates"
              >
                Affiliates
              </NavLink>
            </li>

            {/* Vendors Link */}
            <li>
              <NavLink
                to="/vendor"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="Vendors"
              >
                Vendors
              </NavLink>
            </li>

            {/* FAQ Link */}
            <li>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="FAQ"
              >
                FAQ
              </NavLink>
            </li>

            {/* Login Link */}
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="Login"
              >
                Login
              </NavLink>
            </li>

            {/* Create Account Link */}
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "hover:underline block font-bold"
                    : "hover:underline block"
                }
                aria-label="Create Account"
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