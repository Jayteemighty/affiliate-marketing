import User from "../model/user";
import Course from "../model/course";
import Commission from "../model/commission";

interface CommissionSalesRequestBody {
  userId: string;
  courseId: string;
  salesCount: number;
}

export const commissionSales = async (req: any, res: any) => {
  try {
    // Destructure request body
    const { userId, courseId, salesCount }: CommissionSalesRequestBody = req.body;

    // Validate inputs
    if (!userId || !courseId || typeof salesCount !== "number" || salesCount <= 0) {
      return res.status(400).json({ message: "Invalid input parameters." });
    }

    // Fetch user, course, and commission data
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    const commission = await Commission.findOne({ courseId });

    // Handle missing data
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    if (!commission) {
      return res.status(404).json({ message: "Commission settings not found." });
    }

    // Calculate commission amount
    const commissionAmount = salesCount * course.price * 0.4;

    // Update user's sales statistics
    user.todaySales += salesCount;
    user.overallSales += salesCount;
    user.todayEarnings += commissionAmount;
    user.overallEarnings += commissionAmount;

    // Update affiliate's earnings (if applicable)
    if (user.affiliateId) {
      const affiliate = await User.findById(user.affiliateId);

      if (!affiliate) {
        return res
          .status(404)
          .json({ message: "Affiliate not found for the given user." });
      }

      affiliate.todayAffiliateEarnings += commissionAmount;
      affiliate.overallAffiliateEarnings += commissionAmount;
      await affiliate.save();
    }

    // Save updated user record
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Sale recorded successfully!" });
  } catch (error) {
    console.error("Error processing commission sales:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

export default { commissionSales };