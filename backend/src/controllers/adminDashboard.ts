import { Request, Response } from 'express';
import Sale from '../model/sales';
import User from '../model/user';
import Admin from '../model/admin';

// Define interface for admin request with adminId
interface AdminRequest extends Request {
  adminId?: string;
}

/**
 * Get admin dashboard data including users, sales, and summary statistics
 */
const adminDashboard = async (req: AdminRequest, res: Response) => {
  try {
    const adminId = req.adminId;
    
    if (!adminId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Fetch admin, users and sales data
    const admin = await Admin.findById(adminId);
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    const users = await User.find();
    const sales = await Sale.find();
    
    // Calculate statistics
    const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
    const totalCommissions = sales.reduce((acc, sale) => acc + sale.commission, 0);
    
    // Return dashboard data
    res.status(200).json({ 
      admin, 
      users, 
      sales, 
      totalSales, 
      totalCommissions,
      userCount: users.length,
      salesCount: sales.length
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'An error occurred while loading dashboard data' });
  }
};

export {
  adminDashboard
};