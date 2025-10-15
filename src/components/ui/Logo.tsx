import Image from "next/image";
import React from "react";
import { Sprout, Sparkles } from 'lucide-react';

// Import the logo image file directly
import logoImage from "@/assets/sus.webp";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* <Image
        className="rounded-4xl border-black"
        src={logoImage} // Use the imported image object
        alt="S"
        width={42}
        height={42}
        priority
      /> */}
      <div className="relative">
          <Sprout className="w-8 h-8 text-green-600" />
          <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
        </div>

      {/* Brand name */}
      <span className="text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text hidden text-transparent sm:inline">
        Sustainovate
      </span>
    </div>
  );
}