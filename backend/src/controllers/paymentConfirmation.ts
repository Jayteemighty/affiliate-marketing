import express, { Request, Response } from 'express';
import User from '../model/user';
import Sale from '../model/sales';
import nodemailer from 'nodemailer';

const router = express.Router();

interface PaymentRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

const payments = async (req: PaymentRequest, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Payment Confirmation',
        text: `
      Hello ${user.name},

      Your payment has been confirmed.

      Email: ${user.email}
      Password: ${password}

      Best regards,
      [Your Name]
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    res.send({ message: 'Payment confirmed and email sent' });
};

export { payments };
