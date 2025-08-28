"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import ProfileSidebar from "./ProfileBar";

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
  const menuRef = useRef<HTMLLIElement>(null);
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    if (profileOpen) setProfileOpen(false); // auto-close profile when menu opens
  };

  const toggleProfile = () => {
    setProfileOpen(prev => !prev);
    if (menuOpen) setMenuOpen(false); // auto-close menu when profile opens
  };

  const avatarSrc = user?.avatar ? user.avatar : `https://i.pravatar.cc/150?u=${user?.avatar}`;

  return (
    <nav className="glass backdrop-blur-xl border-b border-purple-500/20 text-white p-4 shadow-2xl relative z-[9999]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-2 items-center">
          <li><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/">Home</Link></li>
          <li><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/events">Events</Link></li>
          <li><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/leaderboard">Leaderboard</Link></li>

          {!loading && !user && (
            <li>
              <Link className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-medium shadow-lg glow-hover" href="/login">Login</Link>
            </li>
          )}

          {!loading && user && (
            <>
              {(user.role === "admin" || user.role === "moderator") && (
                <li><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/admin">Admin</Link></li>
              )}
              {user.role === "moderator" && (
                <li><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/moderator">Moderator</Link></li>
              )}
              <li className="relative" ref={menuRef}>
                <button onClick={toggleProfile} className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium shadow-lg glow-hover">
                  <img src={avatarSrc} alt="avatar" className="h-8 w-8 rounded-full border-2 border-purple-400 shadow-md"/>
                  <span className="truncate max-w-[80px] text-white">{user.username.split(" ")[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 z-[99999] glass rounded-xl shadow-2xl overflow-hidden border border-purple-500/30">
                    <ProfileSidebar />
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          {!loading && !user && (
            <Link className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg text-sm font-medium shadow-lg glow-hover" href="/login">Login</Link>
          )}

          {user && (
            <button onClick={toggleProfile} className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300">
              <img src={avatarSrc} alt="avatar" className="h-8 w-8 rounded-full border-2 border-purple-400 shadow-md"/>
            </button>
          )}

          <button onClick={toggleMenu} className="focus:outline-none p-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {(menuOpen || profileOpen) && (
        <div className="md:hidden mt-2 space-y-2 bg-purple-900/20 glass backdrop-blur-xl rounded-lg p-4 border border-purple-500/30">
          {menuOpen && (
            <>
              <Link className="block px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium" href="/">Home</Link>
              <Link className="block px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium" href="/events">Events</Link>
              <Link className="block px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium" href="/leaderboard">Leaderboard</Link>
              {user && (user.role === "admin" || user.role === "moderator") && (
                <Link className="block px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium" href="/admin">Admin</Link>
              )}
              {user && user.role === "moderator" && (
                <Link className="block px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium" href="/moderator">Moderator</Link>
              )}
            </>
          )}

          {profileOpen && user && (
            <div className="mt-2 w-full">
              <ProfileSidebar />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
