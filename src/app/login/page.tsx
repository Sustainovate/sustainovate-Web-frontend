"use client"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaCode, FaGithub, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import SocialAuth from "@/components/SocialAuth"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: await response.text() };
      }

      setIsLoading(false);

      if (response.ok) {
        // if (data.token) localStorage.setItem("token", data.token);
        window.location.href = "/events";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="flex min-h-screen bg-[#0A0A12] text-white">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 text-[#A05CF5] hover:underline">
              <FaArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="mt-8 text-3xl font-bold">Welcome back</h2>
            <p className="mt-2 text-gray-400">Log in to your account</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-[#A05CF5] hover:underline">
                    Forgot password
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                />
              </div>

              <Button type="submit" className="w-full bg-[#A05CF5] hover:bg-[#B16EFF]" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="mx-4 flex-shrink text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <SocialAuth />

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#A05CF5] hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden bg-[#12121D] lg:block lg:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">Welcome back, developer</h2>
            <p className="text-xl text-gray-400">Continue your journey with the Sustainovate</p>
          </div>
          <div className="relative h-64 w-full max-w-md">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-lg bg-[#A05CF5]/20 p-4">
              <div className="h-full w-full rounded-md bg-[#12121D] p-4">
                <FaCode className="h-8 w-8 text-[#A05CF5]" />
                <div className="mt-2 h-2 w-16 rounded-full bg-gray-700"></div>
                <div className="mt-2 h-2 w-24 rounded-full bg-gray-700"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-lg bg-[#A05CF5]/20 p-4">
              <div className="h-full w-full rounded-md bg-[#12121D] p-4">
                <FaGithub className="h-8 w-8 text-[#A05CF5]" />
                <div className="mt-2 h-2 w-16 rounded-full bg-gray-700"></div>
                <div className="mt-2 h-2 w-24 rounded-full bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
