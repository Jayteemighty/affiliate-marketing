import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing
    if (!token) {
      toast.error("You must be logged in to access this page.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ProtectedRoute;