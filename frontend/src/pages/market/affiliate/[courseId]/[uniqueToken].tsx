import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL2 } from "../../../../libs/constants";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor_name: string;
  video_url: string;
  seller_name: string;
  is_approved: boolean;
}

const CourseAffiliatePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // Track if the user has access
  const { courseId, uniqueToken } = useParams<{ courseId: string; uniqueToken: string }>();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to access this page.");
      navigate("/login", { state: { from: `/market/affiliate/${courseId}/${uniqueToken}` } });
      return;
    }

    const fetchCourse = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`${BASE_URL2}/api/course/courses/${courseId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCourse(courseResponse.data);

        // Check if the user has access to the course
        const accessResponse = await axios.get(`${BASE_URL2}/api/course/check-access/${courseId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setHasAccess(accessResponse.data.has_access);
      } catch (error) {
        toast.error("Failed to fetch course details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const trackAffiliateReferral = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail"); // Retrieve the user's email
        if (!userEmail) {
          console.error("User email not found in localStorage.");
          return;
        }

        await axios.post(
          `${BASE_URL2}/api/affiliate/track-referral/`,
          {
            unique_token: uniqueToken,
            referred_user_email: userEmail, // Pass the referred user's email
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Failed to track affiliate referral:", error);
      }
    };

    fetchCourse();
    trackAffiliateReferral();
  }, [courseId, uniqueToken, navigate]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Your session has expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL2}/api/payment/initiate/`,
        { course_id: courseId, unique_token: uniqueToken }, // Include unique_token for affiliate tracking
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url; // Redirect to Paystack payment page
      }
    } catch (error) {
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const handleAccessCourse = () => {
    if (hasAccess) {
      navigate(`/market/course-lessons/${courseId}`); // Redirect to the course lessons page
    } else {
      toast.error("You do not have access to this course. Please pay to access.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading course details...</p>
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
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          {/* Course Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Information</h2>
              <div className="space-y-4">
                <div>
                  <span className="font-bold text-gray-600">Price:</span>{" "}
                  <span className="text-green-600">${course.price}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-600">Instructor:</span>{" "}
                  <span className="text-blue-500">{course.instructor_name}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-600">Seller:</span>{" "}
                  <span className="text-purple-500">{course.seller_name}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-600">Status:</span>{" "}
                  <span
                    className={`${
                      course.is_approved ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {course.is_approved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Video</h2>
              <a
                href={course.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Video
              </a>
            </div>
          </div>

          {/* Payment and Access Buttons */}
          <div className="text-center space-x-4">
            {!hasAccess && (
              <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Pay Now
              </button>
            )}
            <button
              onClick={handleAccessCourse}
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-300 ${
                hasAccess ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!hasAccess}
            >
              Access Full Course
            </button>
          </div>

          {/* Message for Non-Paying Users */}
          {!hasAccess && (
            <p className="text-red-500 mt-2 text-center">
              You must pay to access the full course.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseAffiliatePage;