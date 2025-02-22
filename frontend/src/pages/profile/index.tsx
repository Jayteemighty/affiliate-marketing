import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

interface Bank {
  value: string;
  label: string;
}

const banks: Bank[] = [
  { value: "first-bank", label: "First Bank of Nigeria" },
  { value: "kuda", label: "Kuda" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "access", label: "Access Bank" },
  { value: "gtbank", label: "GT Bank Plc" },
  // Add more banks as needed
];

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    bank: "",
    accountNumber: "",
    mobileMoneyAccountName: "",
    bankAccountName: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch("https://profitplusbackend.com.ng/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      const data = await response.json();
      alert(data.message || "Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
        alert("An error occurred while updating your profile. Please try again.");
      } else {
        console.error("An unknown error occurred:", error);
        alert("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

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
          My Profile
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Update your personal and banking details here.
        </p>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg w-full max-w-xl p-6 space-y-4"
        >
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* WhatsApp Phone Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              WhatsApp Phone Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="Enter your WhatsApp number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Country Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Bank Selection Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bank</label>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>
                Select Bank
              </option>
              {banks.map((bank) => (
                <option key={bank.value} value={bank.value}>
                  {bank.label}
                </option>
              ))}
            </select>
          </div>

          {/* Account Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter your account number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Mobile Money Account Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mobile Money Account Name
            </label>
            <input
              type="text"
              name="mobileMoneyAccountName"
              value={formData.mobileMoneyAccountName}
              onChange={handleInputChange}
              placeholder="Enter your mobile money account name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Bank Account Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bank Account Name
            </label>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleInputChange}
              placeholder="Enter your bank account name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Info"}
          </button>
        </form>

        {/* Change Password Section */}
        <section className="mt-8 bg-white shadow-md rounded-lg w-full max-w-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>
          <form className="space-y-4">
            {/* Current Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </section>

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

export default ProfilePage;
