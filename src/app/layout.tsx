// import Navbar from "../components/Navbar";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Sustainovate",
//   description: "A club that create future changes",
// };

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
// import { ThemeProvider } from "../components/ThemeProvider"; // You'll create this
import "./globals.css";

// Note: The direct import from 'geist/font/*' is the new recommended way.
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  // Set the base URL for your site
  metadataBase: new URL("https://sustainovate.mainak.me"),
  
  // Improved Title and Description
  title: {
    default: "Sustainovate", // Default title for the homepage
    template: "%s | Sustainovate", // Adds "| Sustainovate" to sub-pages
  },
  description: "A student-led club dedicated to creating future-forward changes through technology and sustainable innovation.",

  // Open Graph (for social media sharing)
  // openGraph: {
  //   title: "Sustainovate",
  //   description: "Creating future-forward changes through technology and sustainable innovation.",
  //   url: "https://sustainovate.mainak.me",
  //   siteName: "Sustainovate",
  //   images: [
  //     {
  //       url: "/sus.png", // Place an 'og-image.png' in your /public folder
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },

  // Twitter Card
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Sustainovate",
  //   description: "Creating future-forward changes through technology and sustainable innovation.",
  //   images: ["/og-image.png"], // The same image can be used
  // },
  
  // For Favicons (complements the files in your /app directory)
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
