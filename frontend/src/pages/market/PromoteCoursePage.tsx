import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar";
import { BASE_URL2 } from "../../libs/constants";

interface Course {
  id: number;
  title: string;
  video_url: string;
}

const PromoteCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [affiliateLink, setAffiliateLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${BASE_URL2}/api/course/courses/${courseId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        setCourse(response.data);
      } catch (error) {
        toast.error("Failed to fetch course details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Generate affiliate link
  useEffect(() => {
    const generateAffiliateLink = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL2}/api/affiliate/generate-link/`,
          { course_id: courseId },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setAffiliateLink(response.data.affiliate_link);
      } catch (error) {
        toast.error("Failed to generate affiliate link. Please try again.");
      }
    };

    generateAffiliateLink();
  }, [courseId]);

  // Copy link to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy link to clipboard.");
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Promote Course: {course.title}</h1>

          {/* Referral Link Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Referral Link</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={affiliateLink || ""}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={() => affiliateLink && copyToClipboard(affiliateLink)}
                className="bg-purple-800 text-white px-4 py-2 rounded-r-md hover:bg-purple-900 transition duration-300"
              >
                Copy Link
              </button>
            </div>
          </div>

          {/* Video Link Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Video Link</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={course.video_url || ""}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(course.video_url)}
                className="bg-purple-800 text-white px-4 py-2 rounded-r-md hover:bg-purple-900 transition duration-300"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PromoteCoursePage;