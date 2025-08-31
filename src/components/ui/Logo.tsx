import Image from "next/image";
import React from "react";

// Import the logo image file directly
import logoImage from "@/assets/sus.webp";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        className="rounded-4xl"
        src={logoImage} // Use the imported image object
        alt="S"
        width={42}
        height={42}
        priority
      />

      {/* Brand name */}
      <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent hidden sm:inline">
        Sustainovate
      </span>
    </div>
  );
}