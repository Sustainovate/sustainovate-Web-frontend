import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "media.insider.in",
      "images.ctfassets.net",
      "www.eidesign.net",
      "images.unsplash.com",   // useful if you use Unsplash
      "res.cloudinary.com",    // common for Cloudinary
      "pbs.twimg.com",         // Twitter/X images
      "lh3.googleusercontent.com", // Google images
    ],
  },
};

export default nextConfig;
