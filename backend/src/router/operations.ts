import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
    adminLogin,
    resetPassword,
    verifyEmail,
    userLogin,
    userRegister,
    createCourse,
    getUserCourses,
} from '../controllers/authentication';
import { userdash } from '../controllers/dashboard';
import { admindashboard } from '../controllers/adminDashBoard';
import { payments } from '../controllers/paymentConfirmation';
import { initiatewithdraw } from '../controllers/initiatewithdraw';
import { withdrawals } from '../controllers/withdrawals';
import { coursesales } from '../controllers/sales';
import { commissionsales } from '../controllers/commisionsales';
import {
    affiliatereferrals,
    generateaffiliatelink,
    affiliatesales,
    affiliatedlinks,
    affiliatesalesmetrics,
    getTopAffiliate,
} from '../controllers/affiliate';
import {
    registerAndPay,
    paymentcallback,
    courselogin,
} from '../controllers/coursepayment';
import { checkTransactionStatusByEmail } from '../controllers/transactionstatus';
import { logout } from '../controllers/logout';
import { uploadCourse, paymentCallback } from '../controllers/courseManagement';

const appRouter = express.Router();

// Authentication Routes
appRouter.post('/api/admin/login', protect, adminLogin);
appRouter.post('/api/user/login', userLogin);
appRouter.post('/api/register', userRegister);
appRouter.post('/api/reset-password', resetPassword);
appRouter.post('/api/verify-email', verifyEmail);

// Dashboard Routes
appRouter.get('/api/admindash', protect, admindashboard);
appRouter.get('/api/userdash', protect, userdash);

// Payment and Withdrawal Routes
appRouter.get('/api/payments', protect, payments);
appRouter.post('/api/initiatewithdraw', protect, initiatewithdraw);
appRouter.get('/api/withdrawals', protect, withdrawals);

// Affiliate Routes
appRouter.get('/api/affiliate/:courseId/:affiliateId', protect, affiliatereferrals);
appRouter.post('/api/generate-affiliate-link/:courseId', protect, generateaffiliatelink);
appRouter.post('/api/sale', protect, affiliatesales);
appRouter.get('/api/affiliate-links/:affiliateId', protect, affiliatedlinks);
appRouter.get('/api/affiliate-sales/:affiliateId', protect, affiliatesalesmetrics);

// Course Routes
appRouter.get('/api/realtimesales', coursesales);
appRouter.post('/api/course-login', courselogin);
appRouter.post('/api/create-course', protect, createCourse);
appRouter.get('/api/get-all-user-courses', protect, getUserCourses);

// Sales Routes
appRouter.post('/api/sales', protect, commissionsales);

// Course Payment Routes
appRouter.post('/api/register-and-pay', registerAndPay);
appRouter.get('/api/payment-callback', paymentcallback);

// Transaction Status Route
appRouter.get('/api/transaction-status/:email', protect, checkTransactionStatusByEmail);

// Top Affiliate Route
appRouter.get('/api/top-affiliate', protect, getTopAffiliate);

// Course Management Routes
appRouter.post('/api/upload-course', protect, uploadCourse);
appRouter.get('/api/payment-callback', paymentCallback);

export default appRouter;
