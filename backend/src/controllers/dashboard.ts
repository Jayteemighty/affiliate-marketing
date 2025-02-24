import express, { Request, Response } from "express";
import Sale from "../model/sales";
import User from "../model/user";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

interface CustomRequest extends Request {
  userId?: string;
}

// Dashboard controller for user data and sales statistics
export const userDash = async (req: CustomRequest, res: Response) => {
  try {
    // Extract userId from the authenticated request
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch sales data associated with the user
    const sales = await Sale.find({ vendor: userId });

    // Calculate total sales and commissions
    const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
    const totalCommissions = sales.reduce((acc, sale) => acc + sale.commission, 0);

    // Send response with user data and sales statistics
    res.status(200).json({
      user,
      sales,
      totalSales,
      totalCommissions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { userDash };