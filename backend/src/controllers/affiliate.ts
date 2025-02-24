import { Request, Response } from 'express';
import Course from '../model/course';
import Affiliate from '../model/affiliate';
import Referral from '../model/referral';

// Custom interfaces
interface UserRequest extends Request {
  userId?: string;
}

/**
 * Generate affiliate link for a course
 */
const generateAffiliateLink = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;

    // Validate input
    if (!courseId || !userId) {
      return res.status(400).json({ message: 'Course ID and User ID are required' });
    }

    // Find course and affiliate
    const course = await Course.findById(courseId);
    const affiliate = await Affiliate.findById(userId);

    if (!course || !affiliate) {
      return res.status(404).json({ message: 'Course or affiliate not found' });
    }

    // Generate affiliate link
    const affiliateLink = `https://theprofitplus.com.ng/${courseId}?affiliate=${userId}`;
    
    // Update affiliate and course with new link
    affiliate.courses.push({ courseId, affiliateLink });
    course.affiliates.push({ affiliateId: userId, affiliateLink });
    
    await affiliate.save();
    await course.save();

    res.status(200).json({ affiliateLink });
  } catch (error) {
    console.error('Error generating affiliate link:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Track affiliate referral for course
 */
const trackAffiliateReferrals = async (req: Request, res: Response) => {
  try {
    const { courseId, affiliateId } = req.params;
    const { referredUser } = req.query;
    
    // Validate input
    if (!courseId || !affiliateId) {
      return res.status(400).json({ message: 'Course ID and Affiliate ID are required' });
    }

    // Find course and affiliate
    const course = await Course.findById(courseId);
    const affiliate = await Affiliate.findById(affiliateId);

    if (!course || !affiliate) {
      return res.status(404).json({ message: 'Course or affiliate not found' });
    }

    // Create and save referral
    const referral = new Referral({
      course: course._id,
      affiliate: affiliate._id,
      referredUser: referredUser || 'anonymous',
    });
    
    await referral.save();

    res.status(200).json({ message: 'Referral tracked successfully' });
  } catch (error) {
    console.error('Error tracking referral:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Track affiliate sales
 */
const trackAffiliateSales = async (req: Request, res: Response) => {
  try {
    const { courseId, affiliateId, saleAmount } = req.body;
    
    // Validate input
    if (!courseId || !affiliateId || !saleAmount) {
      return res.status(400).json({ 
        message: 'Course ID, Affiliate ID, and Sale Amount are required' 
      });
    }

    // Find course and affiliate
    const course = await Course.findById(courseId);
    const affiliate = await Affiliate.findById(affiliateId);

    if (!course || !affiliate) {
      return res.status(404).json({ message: 'Course or affiliate not found' });
    }

    // Update course sales
    course.sales = (course.sales || 0) + 1;
    await course.save();

    // Update affiliate sales metrics
    affiliate.todaySales = (affiliate.todaySales || 0) + 1;
    affiliate.overallSales = (affiliate.overallSales || 0) + 1;
    affiliate.todayAffiliateEarnings = (affiliate.todayAffiliateEarnings || 0) + saleAmount;
    affiliate.overallAffiliateEarnings = (affiliate.overallAffiliateEarnings || 0) + saleAmount;
    
    // Calculate available earnings after fee
    const withdrawalFee = affiliate.withdrawalFee || 0;
    affiliate.availableAffiliateEarnings = 
      (affiliate.availableAffiliateEarnings || 0) + (saleAmount - withdrawalFee);
    
    await affiliate.save();

    res.status(200).json({ 
      message: 'Sale tracked successfully',
      updatedMetrics: {
        todaySales: affiliate.todaySales,
        overallSales: affiliate.overallSales,
        availableEarnings: affiliate.availableAffiliateEarnings
      }
    });
  } catch (error) {
    console.error('Error tracking sales:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get affiliate links for affiliate
 */
const getAffiliateLinks = async (req: Request, res: Response) => {
  try {
    const { affiliateId } = req.params;
    
    if (!affiliateId) {
      return res.status(400).json({ message: 'Affiliate ID is required' });
    }

    // Find affiliate and populate course details
    const affiliate = await Affiliate.findById(affiliateId).populate('courses.courseId');

    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    // Map courses to include relevant information
    const affiliateLinks = affiliate.courses.map((course) => ({
      courseId: course.courseId._id,
      title: course.courseId.title,
      affiliateLink: course.affiliateLink,
      description: course.courseId.description,
      price: course.courseId.price
    }));

    res.status(200).json(affiliateLinks);
  } catch (error) {
    console.error('Error fetching affiliate links:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get affiliate sales metrics
 */
const getAffiliateSalesMetrics = async (req: Request, res: Response) => {
  try {
    const { affiliateId } = req.params;
    
    if (!affiliateId) {
      return res.status(400).json({ message: 'Affiliate ID is required' });
    }

    // Find affiliate
    const affiliate = await Affiliate.findById(affiliateId);

    if (!affiliate) {
      return res.status(404).json({ message: 'Affiliate not found' });
    }

    // Compile sales metrics
    const salesMetrics = {
      todaySales: affiliate.todaySales || 0,
      overallSales: affiliate.overallSales || 0,
      todayAffiliateEarnings: affiliate.todayAffiliateEarnings || 0,
      overallAffiliateEarnings: affiliate.overallAffiliateEarnings || 0,
      availableAffiliateEarnings: affiliate.availableAffiliateEarnings || 0,
    };

    res.status(200).json(salesMetrics);
  } catch (error) {
    console.error('Error fetching sales metrics:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {
  generateAffiliateLink,
  trackAffiliateReferrals,
  trackAffiliateSales,
  getAffiliateLinks,
  getAffiliateSalesMetrics
};