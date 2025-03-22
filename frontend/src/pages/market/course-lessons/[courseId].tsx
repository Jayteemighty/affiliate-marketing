import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL2 } from "../../../libs/constants";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Lesson {
  id: number;
  title: string;
  description: string;
  video: string;
}

interface Course {
  id: number;
  title: string;
}

const CourseLessonsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Your session has expired. Please log in again.");
          navigate("/login");
          return;
        }

        // Fetch course details
        const courseResponse = await axios.get(
          `${BASE_URL2}/api/course/courses/${courseId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setCourse(courseResponse.data);

        // Check if the user has access to the course
        const accessResponse = await axios.get(
          `${BASE_URL2}/api/course/check-access/${courseId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!accessResponse.data.has_access) {
          toast.error("You do not have access to this course. Please pay to access.");
          navigate(`/market/${courseId}`);
          return;
        }

        setHasAccess(true);

        // Fetch lessons for the course
        const lessonsResponse = await axios.get(
          `${BASE_URL2}/api/course/courses/${courseId}/lessons/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLessons(lessonsResponse.data);
      } catch (error) {
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [courseId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null; // Redirect will handle this
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Course Title */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Course Lessons: {course ? course.title : "Loading..."}
          </h1>

          {/* Lessons List */}
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/market/course-lessons/${courseId}/${lesson.id}`)}
              >
                <div className="flex items-start space-x-4">
                  {/* Video Preview */}
                  <div className="w-48 flex-shrink-0">
                    <video
                      src={lesson.video}
                      className="w-full h-24 object-cover rounded-md"
                      controls={false}
                      muted
                      loop
                      playsInline
                    />
                  </div>

                  {/* Lesson Details */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">
                      Lesson {index + 1}: {lesson.title}
                    </h2>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseLessonsPage;