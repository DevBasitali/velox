"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Check } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const features = [
  "Effortless Billing",
  "GST Compliance",
  "Inventory Management",
  "E-Way Bill & E-Invoice",
  "GST Filing Report",
  "Shipping Label",
  "Barcode Scanning",
  "Staff Account",
  "Tally Integration",
]

export default function LoginPage() {
  const router = useRouter()

  const [step, setStep] = useState<"sendOtp" | "verifyOtp">("sendOtp")
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    countryCode: "+91",
    otp: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.emailOrPhone, countryCode: formData.countryCode }),
      })

      if (response.ok) {
        toast.success("OTP sent to your email/phone!")
        setStep("verifyOtp")
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to send OTP!")
      }
    } catch (err) {
      console.error("Error:", err)
      toast.error("An unexpected error occurred!")
    } finally {
      setLoading(false)
    }
  }



const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.emailOrPhone, otp: formData.otp }),
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response to get the token
      const token = data.token;

      // Store the token in cookies
      Cookies.set("authToken", token, { expires: 7 }); // Token expires in 7 days

      toast.success("OTP verified successfully!");
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      const error = await response.json();
      toast.error(error.message || "OTP verification failed!");
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error("An unexpected error occurred!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-[600px] bg-purple-600 text-white p-8 flex-col">
        <Logo variant="light" />
        <div className="relative aspect-[4/3] mb-8 mt-8">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Dashboard Preview"
            fill
            className="rounded-lg object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <Logo />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Login to your Account</h2>
            <form
              onSubmit={step === "sendOtp" ? handleSendOtp : handleVerifyOtp}
              className="space-y-6"
            >
              {step === "sendOtp" ? (
                <div className="space-y-2">
                  <Label htmlFor="emailOrPhone">
                    Email or Phone<span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, countryCode: value }))
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+81">+81</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="emailOrPhone"
                      name="emailOrPhone"
                      type="text"
                      placeholder="Enter your email or phone"
                      value={formData.emailOrPhone}
                      onChange={handleInputChange}
                      className="flex-1"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp">
                    Enter OTP<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter the OTP sent to your email/phone"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="border-gray-200"
                    required
                  />
                </div>
              )}

              <div className="space-y-4">
                <Button
                  type="submit"
                  className={`w-full ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                      {step === "sendOtp" ? "Sending OTP..." : "Verifying OTP..."}
                    </div>
                  ) : step === "sendOtp" ? (
                    "Send OTP"
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
                {step === "verifyOtp" && (
                  <button
                    onClick={() => setStep("sendOtp")}
                    type="button"
                    className="text-purple-500 hover:underline text-sm"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/register">Create New Account</Link>
              </Button>
            </form>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-purple-600"
            >
              ← Back to velox.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
