import React from "react";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle, FaDiscord } from "react-icons/fa";

export default function SocialAuth() {
  return (
    <div className="flex gap-5">
      <Button
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaGithub className="mr-2 h-5 w-5" /> GitHub
      </Button>
      <Button
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaGoogle className="mr-2 h-5 w-5" /> Google
      </Button>
      <Button
        variant="outline"
        className="w-full border-gray-700 hover:bg-[#12121D]"
      >
        <FaDiscord className="mr-2 h-5 w-5" /> Discord
      </Button>
    </div>
  );
}
