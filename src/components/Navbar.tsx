"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import ProfileSidebar from "./ProfileBar";
import { Menu, X } from "lucide-react";

interface User {
  avatar?: string;
  _id: string;
  username: string;
  email: string;
  role: "user" | "moderator" | "admin";
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const desktopProfileRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  // --- Handle outside clicks ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      if (
        !desktopProfileRef.current?.contains(targetNode) &&
        !mobileMenuRef.current?.contains(targetNode)
      ) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    if (profileOpen) setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(prev => !prev);
    if (menuOpen) setMenuOpen(false);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const avatarSrc = user?.avatar || `https://i.pravatar.cc/150?u=${user?._id}`;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  if (user?.role === "admin" || user?.role === "moderator")
    navLinks.push({ href: "/admin", label: "Admin" });
  if (user?.role === "moderator")
    navLinks.push({ href: "/moderator", label: "Moderator" });

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-emerald-100 shadow-sm transition-all duration-300 antialiased"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-16">
        {/* --- Logo --- */}
        <Link
          href="/"
          onClick={handleCloseMenu}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Logo />
        </Link>

        {/* --- Desktop Menu --- */}
        <ul className="hidden md:flex items-center space-x-4 font-medium">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all duration-200 text-emerald-800"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {!loading && !user && (
            <li>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white font-semibold transition-all duration-300 shadow-sm"
              >
                Login
              </Link>
            </li>
          )}

          {!loading && user && (
            <li className="relative" ref={desktopProfileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-400 hover:bg-emerald-100 transition-all duration-300 focus:outline-none"
              >
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border border-emerald-400 shadow-sm object-cover"
                  loading="lazy"
                />
                <span className="font-medium text-emerald-800">
                  {user.username.split(" ")[0]}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/90 rounded-xl shadow-lg border border-emerald-100 backdrop-blur-md overflow-hidden">
                  <ProfileSidebar user={user} />
                </div>
              )}
            </li>
          )}
        </ul>

        {/* --- Mobile Menu Toggle --- */}
        <div className="md:hidden flex items-center gap-3">
          {!loading && user && (
            <button onClick={toggleProfile} aria-label="Profile">
              <img
                src={avatarSrc}
                alt="avatar"
                className="h-8 w-8 rounded-full border border-emerald-400 object-cover"
                loading="lazy"
              />
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-emerald-100 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="text-emerald-800 w-6 h-6" />
            ) : (
              <Menu className="text-emerald-800 w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Dropdown --- */}
      {(menuOpen || profileOpen) && (
        <div
          ref={mobileMenuRef}
          className="md:hidden animate-in slide-in-from-top-2 fade-in bg-white/80 backdrop-blur-md border-t border-emerald-100 shadow-md rounded-b-2xl p-4 space-y-2"
        >
          {menuOpen &&
            navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleCloseMenu}
                className="block px-4 py-2 rounded-lg text-emerald-800 hover:bg-emerald-100 font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

          {profileOpen && user && (
            <div className="mt-3">
              <ProfileSidebar user={user} onLinkClick={handleCloseMenu} />
            </div>
          )}

          {!loading && !user && (
            <Link
              href="/login"
              onClick={handleCloseMenu}
              className="block text-center px-5 py-2 mt-2 rounded-full border border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white font-semibold transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
