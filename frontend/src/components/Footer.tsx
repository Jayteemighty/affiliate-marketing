import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul>
            <li>
              <a href="#about-us" className="hover:underline block mb-1">
                About Us
              </a>
            </li>
            <li>
              <a href="#affiliates" className="hover:underline block mb-1">
                Affiliates
              </a>
            </li>
            <li>
              <a href="#vendors" className="hover:underline block mb-1">
                Vendors
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:underline block mb-1">
                Blog
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline block mb-1">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul>
            <li>
              <a href="#terms" className="hover:underline block mb-1">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#disclaimer" className="hover:underline block mb-1">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="#refund" className="hover:underline block mb-1">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social Links</h3>
          <ul>
            <li>
              <a href="#twitter" className="hover:underline block mb-1">
                Twitter
              </a>
            </li>
            <li>
              <a href="#facebook" className="hover:underline block mb-1">
                Facebook
              </a>
            </li>
            <li>
              <a href="#instagram" className="hover:underline block mb-1">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p>Copyright © 2023 Profit Plus</p>
      </div>
    </footer>
  );
};

export default Footer;