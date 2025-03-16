import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { BASE_URL2 } from "../../libs/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "../../components/Preloader";
import Modal from "../../components/Modal"; // A reusable modal component

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
}

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch user details and registered courses
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your profile.");
        return;
      }

      setIsLoading(true);

      try {
        // Fetch user details
        const userResponse = await axios.get(`${BASE_URL2}/api/user/account/details/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserDetails(userResponse.data);

        // Fetch registered courses
        const coursesResponse = await axios.get(`${BASE_URL2}/api/course/user-registered-courses/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCourses(coursesResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.error || "Failed to fetch data.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle updating user details
  const handleUpdateDetails = async (updatedDetails: Partial<UserDetails>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to update your details.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.patch(
        `${BASE_URL2}/api/user/account/details/`,
        updatedDetails,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setUserDetails(response.data);
      toast.success("Details updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Failed to update details.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle changing email
  const handleChangeEmail = async (newEmail: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to change your email.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Remove the unused `response` variable
      await axios.patch(
        `${BASE_URL2}/api/user/account/email/change/`,
        { email: newEmail },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      setUserDetails((prev) => ({ ...prev, email: newEmail }));
      toast.success("Email changed successfully!");
      setIsEmailModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Failed to change email.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle changing password
  const handleChangePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to change your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.patch(
        `${BASE_URL2}/api/user/account/password/change/`,
        {
          email: userDetails.email,
          password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success("Password changed successfully!");
      setIsPasswordModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error || "Failed to change password.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex-grow p-4 md:p-8 overflow-y-auto ml-0 md:ml-64">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8">My Profile</h1>

        {/* User Details Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-4">
            <p><strong>Name:</strong> {userDetails.first_name} {userDetails.last_name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone_number}</p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Edit Details
          </button>
        </div>

        {/* Registered Courses Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Registered Courses</h2>
          {courses.length === 0 ? (
            <p>No courses registered yet.</p>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="border-b pb-4">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Change Email and Password Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Change Email
          </button>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
          >
            Change Password
          </button>
        </div>

        {/* Modals */}
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleUpdateDetails({
                first_name: formData.get("first_name") as string,
                last_name: formData.get("last_name") as string,
                phone_number: formData.get("phone_number") as string,
              });
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="first_name"
              defaultValue={userDetails.first_name}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="last_name"
              defaultValue={userDetails.last_name}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="phone_number"
              defaultValue={userDetails.phone_number}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </Modal>

        <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Change Email</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleChangeEmail(formData.get("email") as string);
            }}
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="New Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Change Email
            </button>
          </form>
        </Modal>

        <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleChangePassword(
                formData.get("currentPassword") as string,
                formData.get("newPassword") as string,
                formData.get("confirmPassword") as string
              );
            }}
            className="space-y-4"
          >
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </Modal>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-gray-500">
            For Support: Send a mail to{" "}
            <a
              href="mailto:help@profitplus.com"
              className="text-blue-600 hover:underline"
            >
              help@profitplus.com
            </a>
          </p>
          <p className="text-gray-500 mt-2">&copy; 2024, ProfitPlus</p>
        </footer>
      </div>

      {/* Preloader */}
      {isLoading && <Preloader />}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;