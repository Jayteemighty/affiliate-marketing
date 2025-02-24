import { Request, Response } from 'express';
import User from '../model/user';
import Course from '../model/course';
import sendEmail from './email';

interface CourseSalesRequest extends Request {
    body: {
        userId: string;
        courseId: string;
        salesCount: number;
    };
}

const coursesales = async (req: CourseSalesRequest, res: Response) => {
    const { userId, courseId, salesCount } = req.body;

    try {
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user || !course) {
            return res.status(404).send('User or course not found');
        }

        const commissionAmount = course.price * 0.1; // Assuming 10% commission
        const totalEarnings = salesCount * commissionAmount;

        const emailHtml = `
            <h1>Congratulations on Your Sales!</h1>
            <p>You've successfully made ${salesCount} sales!</p>
            <p>Course Title: ${course.title}</p>
            <p>Total Earnings: ${totalEarnings}</p>
        `;

        await sendEmail(user.email, 'Congratulations on Your Sales!', emailHtml);

        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error processing course sales:', error);
        res.status(500).send('Internal server error');
    }
};

export { coursesales };
