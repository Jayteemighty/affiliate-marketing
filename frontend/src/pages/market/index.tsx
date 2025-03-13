import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { BASE_URL2 } from "../../libs/constants";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  price: number;
  instructor_name: string;
  commission_rate: number;
}

const Marketplace: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL2}/api/course/courses/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        toast.error("Failed to fetch courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePromote = (courseId: number) => {
    navigate(`/market/promote/${courseId}`); // Navigate to the promotion page
  };

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

          {/* Search Bar */}
          <div className="mb-6">
            <form className="flex">
              <input
                type="search"
                placeholder="Search Product"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 rounded-r-md hover:bg-green-600"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Product Table */}
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Products</th>
                  <th className="p-3 text-left">Seller</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Comm (%)</th>
                  <th className="p-3 text-left">.</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="border-b">
                      <td className="p-3">
                        <a
                          href={`/course/${course.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {course.title}
                        </a>
                      </td>
                      <td className="p-3">{course.instructor_name}</td>
                      <td className="p-3">NGN{course.price}</td>
                      <td className="p-3">{course.commission_rate}%</td>
                      <td className="p-3">
                        <button
                          onClick={() => handlePromote(course.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Promote
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Marketplace;