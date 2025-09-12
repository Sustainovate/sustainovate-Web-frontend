"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import ProfileSidebar from "./ProfileBar";

interface User {
  avatar?: string;
  _id: string;
  username:string;
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

  // --- ROBUST: Handles clicks outside both desktop and mobile menus ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      
      const isOutsideDesktop = !desktopProfileRef.current?.contains(targetNode);
      const isOutsideMobile = !mobileMenuRef.current?.contains(targetNode);

      if (isOutsideDesktop && isOutsideMobile) {
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

  const avatarSrc = user?.avatar ? user.avatar : `https://i.pravatar.cc/150?u=${user?._id}`;

  // Helper links array
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  if (user?.role === "admin" || user?.role === "moderator") {
    navLinks.push({ href: "/admin", label: "Admin" });
  }
  if (user?.role === "moderator") {
    navLinks.push({ href: "/moderator", label: "Moderator" });
  }

  return (
    <nav className="glass backdrop-blur-xl border-b border-purple-500/20 text-white p-4 shadow-2xl relative z-[9999]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" onClick={handleCloseMenu} className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-2 items-center">
          {navLinks.slice(0, 3).map(link => ( // Show only main links
             <li key={link.href}><Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href={link.href}>{link.label}</Link></li>
          ))}

          {!loading && !user && (
            <li>
              <Link className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-medium shadow-lg glow-hover" href="/login">Login</Link>
            </li>
          )}

          {!loading && user && (
            <li className="relative" ref={desktopProfileRef}>
              <button onClick={toggleProfile} className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium shadow-lg glow-hover">
                <img src={avatarSrc} alt="avatar" className="h-8 w-8 rounded-full border-2 border-purple-400 shadow-md"/>
                <span className="truncate max-w-[80px] text-white">{user.username.split(" ")[0]}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 z-[99999] glass rounded-xl shadow-2xl overflow-hidden border border-purple-500/30">
                  {/* FIXED: Pass the user prop */}
                  <ProfileSidebar user={user} />
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile menu Toggles */}
        <div className="md:hidden flex items-center gap-2">
          {/* ...your mobile buttons... */}
        </div>
      </div>

      {/* Mobile dropdown */}
      {(menuOpen || profileOpen) && (
        <div ref={mobileMenuRef} className="md:hidden mt-2 space-y-2 bg-purple-900/20 glass backdrop-blur-xl rounded-lg p-4 border border-purple-500/30">
          {menuOpen && (
            <>
              {navLinks.map(link => (
                <Link key={link.href} onClick={handleCloseMenu} className="block px-4 py-2 rounded-lg hover:bg-purple-500/20" href={link.href}>{link.label}</Link>
              ))}
            </>
          )}
          {profileOpen && user && (
            <div className="mt-2 w-full">
              {/* FIXED: Pass both user and onLinkClick props */}
              <ProfileSidebar user={user} onLinkClick={handleCloseMenu} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}