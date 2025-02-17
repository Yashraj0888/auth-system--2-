import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a global OTP store
if (!global.otpStore) {
  global.otpStore = new Map<string, { otp: string; timestamp: number }>();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email.endsWith("@aganitha.ai")) {
      return NextResponse.json(
        { error: "Invalid email domain. Please use an @aganitha.ai email address." },
        { status: 400 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with timestamp
    global.otpStore.set(email, {
      otp,
      timestamp: Date.now(),
    });

    // Create transporter with specific Gmail settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Use Gmail service directly
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Add error handling for transport verification
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (error) {
      console.error("SMTP verification failed:", error);
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: {
        name: "No Reply - Aganitha.ai",
        address: "yashraj@aganitha.ai"  // Use the authenticated email address
      },
      to: email,
      subject: "Your OTP for Aganitha.ai",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2196F3;">Aganitha.ai Authentication</h2>
          <p>Your one-time password (OTP) is:</p>
          <h1 style="color: #2196F3; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `,
    };

    // Log before sending
    console.log(`Attempting to send email to: ${email}`);

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
      return NextResponse.json({ 
        message: "OTP sent successfully",
        messageId: info.messageId  // Include message ID for tracking
      });
    } catch (sendError) {
      console.error("Error in sendMail:", sendError);
      return NextResponse.json(
        { error: "Failed to send email", details: sendError instanceof Error ? sendError.message : 'Unknown error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}