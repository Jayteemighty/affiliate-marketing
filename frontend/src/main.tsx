import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/about/index";
import AffiliatePage from "./pages/affiliate/index";
import LoginPage from "./pages/authentication/signin/index";
import SignUpPage from "./pages/authentication/signup/index";
import HomePage from "./pages/home/index";
import FAQPage from "./pages/faq/index";
import VendorPage from "./pages/vendor/index";
import DashboardPage from "./pages/dashboard/index";
import MarketPage from "./pages/market/index";
import AimCourse from "./pages/courses/index";
import TransactionStatusPage from "./pages/transaction/index";
import LeaderboardPage from "./pages/leaderboard/index";
import BecomeVendorPage from "./pages/vendor/vendor";
import ProductsPage from "./pages/products/index";
import WithdrawalsPage from "./pages/transaction/withdrawals";
import ProfilePage from "./pages/profile/index";
import UploadCoursePage from "./pages/courses/uploadcourses";
import CourseDetails from "./pages/market/[id]";
import CourseAffiliatePage from "./pages/market/affiliate/[courseId]/[uniqueToken]";

import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/marketplace" element={<MarketPage />} />
        <Route path="/aim-course" element={<AimCourse />} />
        <Route path="/transaction-status" element={<TransactionStatusPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/become-vendor" element={<BecomeVendorPage />} />
        <Route path="/manage-products" element={<ProductsPage />} />
        <Route path="/withdrawals" element={<WithdrawalsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/upload-course" element={<UploadCoursePage />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course/:courseId/:uniqueToken" element={<CourseAffiliatePage />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);