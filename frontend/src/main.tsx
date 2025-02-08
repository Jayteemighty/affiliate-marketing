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
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);