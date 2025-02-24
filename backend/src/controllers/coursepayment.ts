import initializePayment from "./paystackService";
import Payment from "../model/Payment";
import axios from "axios";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import courseUser from "../model/courseSchema";

// Initialize payment for a logged-in user
export const registerAndPay = async (req: any, res: any) => {
    try {
        const { courseId } = req.body; // Extract courseId from request body
        const amount = 50000; // Fixed amount for course payment

        // Get the currently logged-in user from the token
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY || "");
        const userId = decodedToken.userId;

        const user = await courseUser.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate a unique reference for the payment
        const reference = `REF-${Date.now()}`;
        const callbackUrl = `${process.env.BASE_URL}/api/v1/payment-callback`;

        // Initialize payment with Paystack
        const paymentData = await initializePayment(user.email, amount, reference, callbackUrl);

        // Save payment details to the database
        const newPayment = new Payment({
            userId: user._id,
            amount,
            reference,
            authorization_url: paymentData.authorization_url,
            status: "pending",
        });

        await newPayment.save();

        // Respond with the authorization URL for payment
        res.json({
            success: true,
            authorizationUrl: paymentData.authorization_url,
            message: "Please complete your payment at the following URL.",
        });
    } catch (error: any) {
        console.error("Payment initialization error:", error.message);
        res.status(500).json({
            success: false,
            message: "Payment initialization failed",
            error: error.message,
        });
    }
};

// Handle payment callback after successful or failed payment
export const paymentCallback = async (req: any, res: any) => {
    const { reference } = req.query;

    try {
        // Verify the payment with Paystack using the transaction reference
        const verifyPaymentResponse = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        if (!verifyPaymentResponse.data.status) {
            return res.status(400).json({ success: false, message: "Payment verification failed." });
        }

        const paymentData = verifyPaymentResponse.data.data;

        // Update payment status in the database
        if (paymentData.status === "success") {
            await Payment.updateOne({ reference }, { status: "successful" });

            // Send success email to the user
            await sendSuccessEmail(paymentData.customer.email, paymentData);

            // Redirect to success page
            return res.redirect(`${process.env.FRONTEND_URL}/super/success.html`);
        } else {
            await Payment.updateOne({ reference }, { status: "failed" });

            // Redirect to failure page
            return res.status(400).json({ success: false, message: "Payment was not successful." });
        }
    } catch (error: any) {
        console.error("Payment verification error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Send success email after payment
const sendSuccessEmail = async (recipientEmail: string, paymentData: any) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "Gmail", // Default to Gmail if no service is provided
        auth: {
            user: process.env.EMAIL_USER || "",
            pass: process.env.EMAIL_PASS || "",
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER || "",
        to: recipientEmail,
        subject: "Payment Successful!",
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Successful</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    .header {
                        background: #28a745;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                    }
                    .header h1 {
                        margin: 0;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .footer {
                        background: #f4f4f4;
                        text-align: center;
                        padding: 10px;
                        font-size: 0.9em;
                    }
                    .highlight {
                        color: #28a745;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Payment Successful!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${paymentData.customer.name || "User"},</p>
                        <p>Your payment of <span class="highlight">${paymentData.amount / 100} NGN</span> was successful!</p>
                        <p>Transaction Reference: <span class="highlight">${paymentData.reference}</span></p>
                        <p>Thank you for your purchase!</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,</p>
                        <p>PromptEarn Team</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    await transporter.sendMail(mailOptions);
};

// User login logic (if needed)
export const courseLogin = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await courseUser.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || "", {
            expiresIn: "1h",
        });

        // Set the token as a cookie
        res.cookie("token", token, { httpOnly: true, secure: true });

        // Return user data without sensitive information
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "Login successful",
        });
    } catch (error: any) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export default {
    registerAndPay,
    paymentCallback,
    courseLogin,
};