import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Ensure the global OTP store is accessible
declare global {
  var otpStore: Map<string, { otp: string; timestamp: number }>
}

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    if (!global.otpStore) {
      return NextResponse.json({ error: "OTP store not initialized" }, { status: 500 })
    }

    const storedData = global.otpStore.get(email)

    if (!storedData) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 400 })
    }

    const { otp: storedOtp, timestamp } = storedData

    // Check if OTP is expired (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      global.otpStore.delete(email)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    // Verify OTP
    if (otp === storedOtp) {
      global.otpStore.delete(email)

      // Set a session cookie
      cookies().set("session", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      })

      return NextResponse.json({ message: "OTP verified successfully" })
    }

    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}

