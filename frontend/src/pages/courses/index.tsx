import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AimCourse: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/course-login"); // Redirect to the login page
  };

  const handleRegister = () => {
    navigate("/course-register"); // Redirect to the register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Course Overview</h1>
        <p className="text-gray-600 mb-6">
          Welcome to our comprehensive course! Gain the skills and knowledge needed to excel in your field, with insights
          from expert instructors and hands-on experience.
        </p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          <button
            onClick={handleLogin}
            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="bg-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-900 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AimCourse;