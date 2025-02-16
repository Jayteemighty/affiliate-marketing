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
              <a href="/about" className="hover:underline block mb-1">
                About Us
              </a>
            </li>
            <li>
              <a href="/affiliate" className="hover:underline block mb-1">
                Affiliates
              </a>
            </li>
            <li>
              <a href="/vendor" className="hover:underline block mb-1">
                Vendors
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline block mb-1">
                Blog
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline block mb-1">
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
              <a href="/terms" className="hover:underline block mb-1">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="/disclaimer" className="hover:underline block mb-1">
                Disclaimer
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social Links</h3>
          <ul>
            <li>
              <a href="https://twitter.com/profitplus" className="hover:underline block mb-1">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block mb-1">
                Whatsapp
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/profitplus/" className="hover:underline block mb-1">
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:help@profitplus.com" className="hover:underline block mb-1">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p>Copyright © {new Date().getFullYear()} Profit Plus</p>
      </div>
    </footer>
  );
};

export default Footer;