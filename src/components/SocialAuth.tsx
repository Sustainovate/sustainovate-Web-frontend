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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2">
      <Button
        onClick={() => handleOAuth("github")}
        variant="outline"
        className="w-full border-purple-500/30 bg-black/30 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200 rounded-xl"
      >
        <FaGithub className="mr-2 h-4 w-4" /> GitHub
      </Button>

      <Button
        onClick={() => handleOAuth("google")}
        variant="outline"
        className="w-full border-purple-500/30 bg-black/30 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200 rounded-xl"
      >
        <FaGoogle className="mr-2 h-4 w-4" /> Google
      </Button>

      <Button
        onClick={() => handleOAuth("discord")}
        variant="outline"
        className="w-full border-purple-500/30 bg-black/30 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200 rounded-xl"
      >
        <FaDiscord className="mr-2 h-4 w-4" /> Discord
      </Button>
    </div>
  );
}
