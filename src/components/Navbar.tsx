"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "./ui/Logo";
import { Menu } from "lucide-react";
import ProfileSidebar from "./ProfileBar"; // keep but will behave like dropdown

interface User {
  avatar: string;
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  console.log(user)

  // close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/"><Logo /></Link>
        </h1>
        <ul className="flex space-x-4 items-center">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/leaderboard">Leaderboard</Link></li>
          {loading ? null : !user ? (
            <li><Link href="/login">Login</Link></li>
          ) : (
            <li className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
              >
                {/* Optional avatar */}
                <img
                  src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
                  alt="avatar"
                  className="h-7 w-7 rounded-full border-2 border-purple-500"
                />
                <span className="truncate max-w-[80px]">{user.username.split(" ")[0]}</span>
              </button>

              {/* Dropdown (like Mongo) */}
          {open && (
            <div className="absolute right-0 mt-2 w-72 z-50">
              <ProfileSidebar />
            </div>
          )}
        </li>
          )}
      </ul>
    </div>
    </nav >
  );
}
