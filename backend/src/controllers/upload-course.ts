import express from "express";
import axios from "axios";
import nodemailer from "nodemailer";
import Course from "../models/course";
import Payment from "../models/payment";


interface UploadCourseRequestBody {
  email: string;
  sellerName: string;
  courseName: string;
  payForCertificate?: boolean; // Optional field for certificate payment
}


export const uploadCourse = async (req: express.Request, res: express.Response) => {
  try {
    const { email, sellerName, courseName, payForCertificate }: UploadCourseRequestBody =
      req.body;

    // Validate inputs
    if (!email || !sellerName || !courseName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, sellerName, or courseName.",
      });
    }

    // Find the course in the marketplace
    const course = await Course.findOne({ name: courseName, sellerName });

    if (!course) {
      return res.status(404).json({
        success: false,
        message:
          "Course or seller name not found. Ensure they match the marketplace.",
      });
    }

    // Check if the course has already been assigned
    if (course.ownerEmail) {
      return res.status(400).json({
        success: false,
        message: "This course has already been assigned to another user.",
      });
    }

    // Assign the course to the user's email
    course.ownerEmail = email;
    await course.save();

    // If user opts to pay for certification
    if (payForCertificate) {
      const amount = 1500000; // 15,000 NGN in kobo
      const reference = `REF-${Date.now()}`;
      const callbackUrl = `${process.env.BASE_URL}/api/v1/payment-callback`;

      // Initialize payment with Paystack
      const paymentData = await initializePayment(
        email,
        amount,
        reference,
        callbackUrl
      );

      // Save payment details
      const newPayment = new Payment({
        email,
        amount,
        reference,
        authorization_url: paymentData.authorization_url,
        status: "pending",
      });

      await newPayment.save();

      return res.json({
        success: true,
        authorizationUrl: paymentData.authorization_url,
        message:
          "Please complete your payment for the exam and certificate at the provided URL.",
      });
    }

    // If no payment is made, return success response
    return res.status(200).json({
      success: true,
      message: "Course assigned successfully without certificate and exam.",
    });
  } catch (error: any) {
    console.error("Error in uploading course:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Handle payment callback logic
export const paymentCallback = async (req: express.Request, res: express.Response) => {
  const { reference } = req.query;

  try {
    // Verify payment using Paystack
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

    if (paymentData.status === "success") {
      // Update payment status
      await Payment.updateOne({ reference }, { status: "successful" });

      // Send success email
      await sendSuccessEmail(paymentData.customer.email, paymentData);

      // Redirect to success page
      return res.redirect(`${process.env.FRONTEND_URL}/frontend/success.html`);
    } else {
      // Handle failed payment
      await Payment.updateOne({ reference }, { status: "failed" });

      return res.status(400).json({ success: false, message: "Payment failed." });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Send success email after payment
const sendSuccessEmail = async (recipientEmail: string, paymentData: any) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "Gmail",
    auth: {
      user: process.env.EMAIL_USER || "",
      pass: process.env.EMAIL_PASS || "",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || "",
    to: recipientEmail,
    subject: "Payment Successful - ProfitPlus",
    html: `
      <html>
      <body>
          <h2>Payment Successful!</h2>
          <p>Dear User,</p>
          <p>We have received your payment of <b>${paymentData.amount / 100} Naira</b>.</p>
          <p>Your transaction reference is <b>${paymentData.reference}</b>.</p>
          <p>You are now recognized as the owner of the course. Complete the course to earn a ProfitPlus certificate upon passing the assessment.</p>
          <p>Thank you for choosing ProfitPlus!</p>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const initializePayment = async (
  email: string,
  amount: number,
  reference: string,
  callbackUrl: string
) => {
  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email,
      amount,
      reference,
      callback_url: callbackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

export default { uploadCourse, paymentCallback };