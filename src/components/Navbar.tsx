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
    <nav className="bg-gray-900 text-white p-4 relative shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link href="/"><Logo /></Link>
        </h1>

        <ul className="flex space-x-4 items-center">
          <li>
            <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/">Home</Link>
          </li>
          <li>
            <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/events">Events</Link>
          </li>
          <li>
            <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/leaderboard">Leaderboard</Link>
          </li>

          {loading ? null : !user ? (
            <li>
              <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/login">Login</Link>
            </li>
          ) : (
            <>
              {(user.role === "admin" || user.role === "moderator") && (
                <li>
                  <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/admin" onClick={() => setOpen(false)}>Admin</Link>
                </li>
              )}
              {user.role === "moderator" && (
                <li>
                  <Link className="px-3 py-2 rounded hover:bg-gray-700 transition-colors" href="/moderator" onClick={() => setOpen(false)}>Moderator</Link>
                </li>
              )}

              <li className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
                >
                  <img
                    src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
                    alt="avatar"
                    className="h-7 w-7 rounded-full border-2 border-purple-500"
                  />
                  <span className="truncate max-w-[80px]">{user.username.split(" ")[0]}</span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-72 z-50 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
