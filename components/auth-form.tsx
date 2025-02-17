"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSimulatedOtp(null)
    setShowAlert(false)

    if (!email.endsWith("@aganitha.ai")) {
      setShowAlert(true)
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsOtpSent(true)
        toast.success(data.message)
        setSimulatedOtp("123456") // Set a fixed OTP for simulation
      } else {
        throw new Error(data.error || "Failed to send OTP")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      if (res.ok) {
        toast.success("Successfully verified!")
        window.location.href = "/dashboard"
      } else {
        throw new Error("Invalid OTP")
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 mb-8 space-y-6">
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your company email"
              className="pl-10 w-full placeholder:text-gray-500 text-gray-600 border-black border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
              required
            />
          </div>
        </div>

        {isOtpSent && (
          <div>
            <Label htmlFor="otp" className="sr-only">
              Enter OTP
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                className="pl-10 w-full  placeholder:text-gray-500 text-gray-600 border-black border-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                pattern="\d{6}"
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-black text-white rounded-md hover:bg-gray-900 justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Loading...
            </>
          ) : isOtpSent ? (
            "Verify OTP"
          ) : (
            "Send OTP"
          )}
        </Button>
      </form>

      {simulatedOtp && (
        <div className="mt-4 p-4 bg-green-400/70 border border-blue-300 rounded-md">
          <p className="text-s">Email sent successfully. Kindly check your Aganitha email for the OTP.</p>
        </div>
      )}

      {showAlert && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded-md text-center">
          <p>Login possible with company email only</p>
        </div>
      )}
    </div>
  )
}
