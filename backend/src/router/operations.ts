import express, { Request, Response } from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  adminLogin,
//   resetPassword,
//   verifyEmail,
//   userLogin,
//   userRegister,
//   createCourse,
//   getUserCourses,
} from '../controllers/authentication';
// import { userDash } from '../controllers/dashboard';
// import { adminDashboard } from '../controllers/adminDashBoard';
// import { payments } from '../controllers/paymentConfirmation';
// import { initiateWithdraw } from '../controllers/initiatewithdraw';
// import { coursesales } from '../controllers/sales';
// import {
//   generateAffiliateLink,
//   trackAffiliateReferrals,
//   trackAffiliateSales,
//   getAffiliateLinks,
//   getAffiliateSalesMetrics
// } from '../controllers/affiliate';
// import {
//   registerAndPay,
//   paymentCallback,
//   courseLogin,
// } from '../controllers/coursepayment';
// import { checkTransactionStatusByEmail } from '../controllers/transactionstatus';
// import { uploadCourse } from '../controllers/upload-course';

const appRouter = express.Router();

// Authentication Routes
appRouter.post('/api/admin/login', protect, (req: Request, res: Response, next: NextFunction) => adminLogin(req, res, next));
// appRouter.post('/api/user/login', (req: Request, res: Response, next: NextFunction) => userLogin(req, res, next));
// appRouter.post('/api/register', (req: Request, res: Response, next: NextFunction) => userRegister(req, res, next));
// appRouter.post('/api/reset-password', (req: Request, res: Response, next: NextFunction) => resetPassword(req, res, next));
// appRouter.post('/api/verify-email', (req: Request, res: Response, next: NextFunction) => verifyEmail(req, res, next));


// // Dashboard Routes
// appRouter.get('/api/admindash', protect, (req: Request, res: Response) => adminDashboard(req, res));
// appRouter.get('/api/userdash', protect, (req: Request, res: Response) => userDash(req, res));

// // Payment and Withdrawal Routes
// appRouter.get('/api/payments', protect, (req: Request, res: Response) => payments(req, res));
// appRouter.post('/api/initiatewithdraw', protect, (req: Request, res: Response) => initiateWithdraw(req, res));

// // Affiliate Routes
// appRouter.get('/api/affiliate/:courseId/:affiliateId', protect, (req: Request, res: Response) => trackAffiliateReferrals(req, res));
// appRouter.post('/api/generate-affiliate-link/:courseId', protect, (req: Request, res: Response) => generateAffiliateLink(req, res));
// appRouter.post('/api/sale', protect, (req: Request, res: Response) => trackAffiliateSales(req, res));
// appRouter.get('/api/affiliate-links/:affiliateId', protect, (req: Request, res: Response) => getAffiliateLinks(req, res));
// appRouter.get('/api/affiliate-sales/:affiliateId', protect, (req: Request, res: Response) => getAffiliateSalesMetrics(req, res));

// // Course Routes
// appRouter.get('/api/realtimesales', (req: Request, res: Response) => coursesales(req, res));
// appRouter.post('/api/course-login', (req: Request, res: Response) => courseLogin(req, res));
// appRouter.post('/api/create-course', protect, (req: Request, res: Response) => createCourse(req, res));
// appRouter.get('/api/get-all-user-courses', protect, (req: Request, res: Response) => getUserCourses(req, res));

// // Sales Routes
// appRouter.post('/api/sales', protect, (req: Request, res: Response) => commissionSales(req, res));

// // Course Payment Routes
// appRouter.post('/api/register-and-pay', (req: Request, res: Response) => registerAndPay(req, res));
// appRouter.get('/api/payment-callback', (req: Request, res: Response) => paymentCallback(req, res));

// // Transaction Status Route
// appRouter.get('/api/transaction-status/:email', protect, (req: Request, res: Response) => checkTransactionStatusByEmail(req, res));

// // Top Affiliate Route
// appRouter.get('/api/top-affiliate', protect, (req: Request, res: Response) => getTopAffiliate(req, res));

// // Course Management Routes
// appRouter.post('/api/upload-course', protect, (req: Request, res: Response) => uploadCourse(req, res));

export default appRouter;
