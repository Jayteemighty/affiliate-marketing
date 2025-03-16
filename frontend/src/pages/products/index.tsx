import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  id: number;
  title: string;
  price: number;
  created_at: string;
  is_approved: boolean;
  seller_name: string;
  commission_rate: number;
}

interface CourseRequest {
  id: number;
  course_title: string;
  price: number;
  created_at: string;
  is_fulfilled: boolean;
}

const ProductsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseRequests, setCourseRequests] = useState<CourseRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch courses and course requests from the backend
  useEffect(() => {
    const fetchUserProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your products.");
        return;
      }
  
      try {
        const response = await axios.get(`${BASE_URL2}/user-products/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        setCourses(response.data.courses);
        setCourseRequests(response.data.course_requests);
      } catch (error) {
        console.error("Error fetching user products:", error);
        toast.error("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto ml-0 md:ml-64">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-gray-800 text-white rounded-md mb-4"
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
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          My Products
        </h1>
        <p className="text-gray-600 text-center mb-4">
          View and manage your products listed on ProfitPlus.
        </p>

        {/* Product Table */}
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Product</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Launch Date</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">Amount ($)</th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">Comm (%)</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 && courseRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-600">
                    No products found.
                  </td>
                </tr>
              )}
              {/* Display Courses */}
              {courses.map((course) => (
                <tr key={course.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">{course.title}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(course.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        course.is_approved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.is_approved ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    ${course.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    {course.commission_rate}%
                  </td>
                </tr>
              ))}

              {courseRequests.map((request) => (
                <tr key={request.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4 text-gray-700">{request.course_title}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {new Date(request.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    <span
                      className={`inline-block px-2 py-1 rounded-full ${
                        request.is_fulfilled
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.is_fulfilled ? "Inactive" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">
                    ${request.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">40%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Product Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300"
            onClick={() => (window.location.href = "/become-vendor")}
          >
            Add New Product
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center w-full max-w-xl mx-auto">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@promptearn.com"
              className="text-blue-600 hover:underline"
            >
              help@profitplus.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, ProfitPlus</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductsPage;