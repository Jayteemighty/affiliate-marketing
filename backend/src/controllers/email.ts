import nodemailer from 'nodemailer';
import { TransportOptions, SentMessageInfo } from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Using 'service' instead of 'host' for Gmail
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // Using uppercase for environment variables (convention)
    pass: process.env.PASSWORD // Changed to 'pass' which is the correct property name
  }
} as TransportOptions);

/**
 * Send an email with the specified parameters
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - Email HTML content
 * @returns Promise that resolves with the message info
 */
const sendEmail = async (
  to: string, 
  subject: string, 
  html: string
): Promise<SentMessageInfo> => {
  const mailOptions = {
    from: process.env.EMAIL || 'your-from-email', // Using env variable with fallback
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throwing to allow caller to handle the error
  }
};

export default sendEmail;