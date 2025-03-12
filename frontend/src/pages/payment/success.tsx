import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <svg
          className="w-16 h-16 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentSuccessPage;