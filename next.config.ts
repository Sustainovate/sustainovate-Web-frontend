import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.insider.in" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "www.eidesign.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "www.smartmeetings.com" },
    ],
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(
        new webpack.ProgressPlugin((percentage, message) => {
          const percent = Math.round(percentage * 100);
          const barLength = 30;
          const filledBarLength = Math.round((percent / 100) * barLength);
          const bar =
            "█".repeat(filledBarLength) +
            "-".repeat(barLength - filledBarLength);

          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`Building [${bar}] ${percent}% - ${message}`);
        })
      );
    }
    return config;
  },
};

export default nextConfig;
