"use client"
import React from "react";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle, FaDiscord } from "react-icons/fa";

export default function SocialAuth() {
  const handleOAuth = (provider: "github" | "google" | "discord") => {
    // Adjust this base URL to your backend API
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${baseURL}/auth/${provider}`;
  };

  return (
    <div className="flex gap-5">
      <Button
        onClick={() => handleOAuth("github")}
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaGithub className="mr-2 h-5 w-5" /> GitHub
      </Button>

      <Button
        onClick={() => handleOAuth("google")}
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaGoogle className="mr-2 h-5 w-5" /> Google
      </Button>

      <Button
        onClick={() => handleOAuth("discord")}
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaDiscord className="mr-2 h-5 w-5" /> Discord
      </Button>
    </div>
  );
}
