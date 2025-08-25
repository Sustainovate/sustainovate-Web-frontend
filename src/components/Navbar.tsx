"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./ui/Logo";
import ProfileSidebar from "./ProfileBar";

interface User {
  avatar: string;
  _id: string;
  username: string;
  email: string;
  role: "user" | "moderator" | "admin";
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        }
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
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="glass backdrop-blur-xl border-b border-purple-500/20 text-white p-4 shadow-2xl relative z-[9999]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/"><Logo /></Link>
        </h1>

        <ul className="flex space-x-2 items-center">
          <li>
            <Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/">Home</Link>
          </li>
          <li>
            <Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/events">Events</Link>
          </li>
          <li>
            <Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/leaderboard">Leaderboard</Link>
          </li>

          {loading ? null : !user ? (
            <li>
              <Link className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg hover:from-purple-500 hover:to-purple-400 transition-all duration-300 font-medium shadow-lg glow-hover" href="/login">Login</Link>
            </li>
          ) : (
            <>
              {(user.role === "admin" || user.role === "moderator") && (
                <li>
                  <Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/admin" onClick={() => setOpen(false)}>Admin</Link>
                </li>
              )}
              {user.role === "moderator" && (
                <li>
                  <Link className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition-all duration-300 font-medium glow-hover" href="/moderator" onClick={() => setOpen(false)}>Moderator</Link>
                </li>
              )}

              <li className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl glass hover:bg-purple-500/20 transition-all duration-300 text-sm font-medium shadow-lg glow-hover"
                >
                  <img
                    src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border-2 border-purple-400 shadow-md"
                  />
                  <span className="truncate max-w-[80px] text-white">{user.username.split(" ")[0]}</span>
                </button>

                {open && (
                  <div className="fixed right-4 top-16 w-72 z-[99999] glass rounded-xl shadow-2xl overflow-hidden border border-purple-500/30">
                    <ProfileSidebar />
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
