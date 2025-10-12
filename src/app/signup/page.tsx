"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { FaArrowLeft, FaCode, FaGithub, FaSpinner } from "react-icons/fa"
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
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-black">

      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 text-green-700 hover:text-green-600 transition-colors">
              <FaArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>

          {step === 1 ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-2xl p-8 border border-emerald-200"
            >
              <h2 className="mt-8 text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Create your account
              </h2>
              <p className="mt-2 text-emerald-800">Join the Sustainovate community today</p>

              <form onSubmit={handleSignup} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-emerald-800">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="border-emerald-300 bg-white text-emerald-900 focus:border-emerald-500 focus:ring-emerald-200 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-emerald-800">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="border-emerald-300 bg-white text-emerald-900 focus:border-emerald-500 focus:ring-emerald-200 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-emerald-800">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-emerald-300 bg-white text-emerald-900 focus:border-emerald-500 focus:ring-emerald-200 rounded-xl"
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 rounded-xl py-6 font-semibold shadow-md transition-all duration-300" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : "Sign Up"}
                </Button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-emerald-300"></div>
                  <span className="mx-4 text-emerald-500">or</span>
                  <div className="flex-grow border-t border-emerald-300"></div>
                </div>

                <SocialAuth />

                <p className="text-center text-sm text-emerald-700">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-500 font-medium">
                    Log in
                  </Link>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.3 }}
              className="bg-white shadow-lg rounded-2xl p-8 border border-emerald-200"
            >
              <h2 className="mt-8 text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Complete your profile
              </h2>
              <p className="mt-2 text-emerald-800">Tell us a bit about yourself</p>

              <form onSubmit={handleOnboarding} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-emerald-800">Username</Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    required
                    className="border-emerald-300 bg-white text-emerald-900 focus:border-emerald-500 focus:ring-emerald-200 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-emerald-800">Your interests</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {["Web Dev", "AI", "Mobile", "DevOps", "Cybersecurity", "UI/UX"].map((interest) => (
                      <Button
                        key={interest}
                        type="button"
                        variant="outline"
                        className="border-emerald-300 hover:border-green-500 hover:bg-green-500/10 text-emerald-900"
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-emerald-800">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-md border border-emerald-300 bg-white p-2 text-emerald-900 focus:border-emerald-500 focus:ring-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-emerald-800">Profile picture</Label>
                  <div className="flex items-center justify-center rounded-md border border-dashed border-emerald-300 p-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-white/50"></div>
                      <Button type="button" variant="outline" className="border-emerald-300 text-emerald-900">
                        Upload photo
                      </Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 rounded-xl py-6 font-semibold shadow-md transition-all duration-300" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Completing setup...
                    </>
                  ) : "Complete Setup"}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="hidden lg:block lg:w-1/2 border-l border-emerald-200 bg-green-50">
        <div className="flex h-full flex-col items-center justify-center p-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Join the Sustainovate community</h2>
            <p className="text-xl text-emerald-800">Connect, share, and grow with other passionate developers</p>
          </div>
          <div className="relative h-64 w-full max-w-md">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-lg bg-green-200/40 p-4">
              <div className="h-full w-full rounded-md bg-white/20 p-4">
                <FaCode className="h-8 w-8 text-green-600" />
                <div className="mt-2 h-2 w-16 rounded-full bg-green-300"></div>
                <div className="mt-2 h-2 w-24 rounded-full bg-green-300"></div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-lg bg-green-200/40 p-4">
              <div className="h-full w-full rounded-md bg-white/20 p-4">
                <FaGithub className="h-8 w-8 text-green-600" />
                <div className="mt-2 h-2 w-16 rounded-full bg-green-300"></div>
                <div className="mt-2 h-2 w-24 rounded-full bg-green-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
