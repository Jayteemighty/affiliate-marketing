import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Models
import User from "../model/user";
import Admin from "../model/admin";
import Course from "../model/course";

// Utils
import { generateToken } from "../utils/generateToken";

// Types
interface UserRequest extends Request {
  auth?: string;
}

/**
 * Registers a new user and sends welcome email
 */
const userRegister = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }
    
    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();

    if (newUser) {
      // Generate token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.SECRET_KEY as string, 
        { expiresIn: "1h" }
      );
      
      // Set cookie and headers
      res.cookie("token", token, { httpOnly: true, secure: true });
      res
        .header("Authorization", `Bearer ${token}`)
        .status(200)
        .json({ message: "Registration Successful" });

      // Send welcome email
      await sendWelcomeEmail(email, username);
    } else {
      res.status(403).json({ message: "Registration failed" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

/**
 * Sends a welcome email to newly registered users
 */
const sendWelcomeEmail = async (email: string, username: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const currentYear = new Date().getFullYear();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to PROFIT PLUS",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PROFIT PLUS</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    h1 {
      color: #333333;
    }
    p {
      color: #555555;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #0066cc;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .cta-button:hover {
      background-color: #004c99;
    }
    .footer {
      font-size: 0.9em;
      color: #888888;
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eeeeee;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to PROFIT PLUS!</h1>
    <p>Hi ${username},</p>
    <p>We're thrilled to have you join us! As a new affiliate with https://www.theprofitplus.com.ng/, you're now part of a community dedicated to success and growth. We're here to support you in maximizing your earnings and achieving your goals.</p>
    <p>Start exploring our platform and discover the tools and resources available to help you get the most out of your affiliate journey.</p>
    <a href="https://www.theprofitplus.com.ng/" class="cta-button">Get Started Now</a>
    <p>If you have any questions or need assistance, our support team is just an email away. We look forward to working with you!</p>
    <p>Welcome aboard, and here's to your success!</p>
    <p>Best regards,<br>The profit plus Team</p>
    <div class="footer">
      © ${currentYear} profit plus. All rights reserved.<br>
      <a href="https://www.theprofitplus.com.ng/" style="color: #0066cc;">Privacy Policy</a> | <a href="https://www.theprofitplus.com.ng/" style="color: #0066cc;">Terms of Service</a>
    </div>
  </div>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};

/**
 * User login functionality
 */
const userLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user and validate password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.SECRET_KEY as string, 
      { expiresIn: "1h" }
    );
    
    // Set cookie and response
    res.cookie("token", token, { httpOnly: true, secure: true });
    res
      .header("Authorization", `Bearer ${token}`)
      .status(200)
      .json({ ...user.toObject() });
  } catch (error) {
    console.error(`Login error: ${error}`);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

/**
 * Admin login functionality
 */
const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find admin and validate password
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    // Generate token
    const token = jwt.sign(
      { adminId: admin._id }, 
      process.env.SECRET_KEY as string, 
      { expiresIn: "1h" }
    );
    
    // Set cookie and response
    res.cookie("adminToken", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(`Admin login error: ${error}`);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

/**
 * Reset user password
 */
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(`Password reset error: ${error}`);
    res.status(500).json({ message: "An error occurred during password reset" });
  }
});

/**
 * Email verification
 */
const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Create verification link - this is a placeholder; implement actual verification
    const verificationLink = `https://www.theprofitplus.com.ng/verify-email/${user._id}`;
    
    // Send verification email (implementation needed)
    // sendVerificationEmail(email, verificationLink);
    
    res.status(200).json({ message: "Email verification link sent successfully" });
  } catch (error) {
    console.error(`Email verification error: ${error}`);
    res.status(500).json({ message: "An error occurred during email verification" });
  }
});

/**
 * Create a new course
 */
const createCourse = asyncHandler(async (req: UserRequest, res: Response) => {
  try {
    const { title, description, price, lessons } = req.body;
    const userId = req.auth;
    
    // Validate input
    if (!title || !description || !price || !lessons) {
      return res.status(400).json({ message: "Missing required course information" });
    }
    
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create course
    const course = new Course({
      title,
      description,
      price,
      instructor: user._id,
      lessons,
    });

    const newCourse = await course.save();
    res.status(201).json({
      message: "Course registered successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

/**
 * Get courses created by a user
 */
const getUserCourses = asyncHandler(async (req: UserRequest, res: Response) => {
  try {
    const userId = req.auth;
    
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const courses = await Course.find({ instructor: userId });
    
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found for this user" });
    }
    
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching user's courses:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
});

export {
  userRegister,
  userLogin,
  adminLogin,
  resetPassword,
  verifyEmail,
  createCourse,
  getUserCourses
};