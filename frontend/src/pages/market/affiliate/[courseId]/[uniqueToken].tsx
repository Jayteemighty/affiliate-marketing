import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL2 } from "../../../../libs/constants";

const CourseAffiliatePage: React.FC = () => {
  const { courseId, uniqueToken } = useParams<{ courseId: string; uniqueToken: string }>();

  useEffect(() => {
    // Fetch course details using the courseId
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${BASE_URL2}/api/course/courses/${courseId}/`);
        console.log("Course Details:", response.data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    // Track the affiliate referral using the uniqueToken
    const trackAffiliateReferral = async () => {
      try {
        await axios.post(`${BASE_URL2}/api/affiliate/track-referral/`, {
          unique_token: uniqueToken,
        });
        console.log("Affiliate referral tracked successfully.");
      } catch (error) {
        console.error("Failed to track affiliate referral:", error);
      }
    };

    fetchCourse();
    trackAffiliateReferral();
  }, [courseId, uniqueToken]);

  return (
    <div>
      <h1>Course Affiliate Page</h1>
      <p>Course ID: {courseId}</p>
      <p>Unique Token: {uniqueToken}</p>
      {/* Render course details and payment options here */}
    </div>
  );
};

export default CourseAffiliatePage;