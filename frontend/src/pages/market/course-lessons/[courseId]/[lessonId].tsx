import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL2 } from "../../../../libs/constants";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  video: string; // URL to the lesson video
}

const VideoLessonPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Your session has expired. Please log in again.");
      navigate("/login");
      return;
    }

    const fetchLesson = async () => {
      try {
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

        // Fetch the specific lesson
        const lessonResponse = await axios.get(
          `${BASE_URL2}/api/course/lessons/${lessonId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setLesson(lessonResponse.data);
      } catch (error) {
        toast.error("Failed to fetch lesson. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p className="mt-2">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="flex-grow overflow-y-auto ml-0 md:ml-64">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">{lesson.title}</h1>
          <p className="text-gray-600 mb-6">{lesson.description}</p>

          {/* Video Player */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <video controls className="w-full">
              <source src={lesson.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Lesson Content */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <p className="text-gray-700">{lesson.content}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VideoLessonPage;