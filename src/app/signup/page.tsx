"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaCode, FaGithub, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import SocialAuth from "@/components/SocialAuth"    

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

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

          {step === 1 ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="mt-8 text-3xl font-bold">Create your account</h2>
              <p className="mt-2 text-gray-400">Join the Sustainovate community today</p>

              <form onSubmit={handleSignup} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#A05CF5] hover:bg-[#B16EFF]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-700"></div>
                  <span className="mx-4 flex-shrink text-gray-400">or</span>
                  <div className="flex-grow border-t border-gray-700"></div>
                </div>

                <SocialAuth />

                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#A05CF5] hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <h2 className="mt-8 text-3xl font-bold">Complete your profile</h2>
              <p className="mt-2 text-gray-400">Tell us a bit about yourself</p>

              <form onSubmit={handleOnboarding} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    required
                    className="border-gray-700 bg-[#12121D] text-white focus:border-[#A05CF5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your interests</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {["Web Dev", "AI", "Mobile", "DevOps", "Cybersecurity", "UI/UX"].map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant="outline"
                        className="border-gray-700 hover:border-[#A05CF5] hover:bg-[#A05CF5]/10"
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-md border border-gray-700 bg-[#12121D] p-2 text-white focus:border-[#A05CF5] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile picture</Label>
                  <div className="flex items-center justify-center rounded-md border border-dashed border-gray-700 p-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-[#12121D]"></div>
                      <Button type="button" variant="outline" className="border-gray-700">
                        Upload photo
                      </Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#A05CF5] hover:bg-[#B16EFF]" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Completing setup...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden bg-[#12121D] lg:block lg:w-1/2">
        <div className="flex h-full flex-col items-center justify-center p-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">Join the Sustainovate community</h2>
            <p className="text-xl text-gray-400">Connect, share, and grow with other passionate developers</p>
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

