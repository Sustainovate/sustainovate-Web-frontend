"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./ui/Logo";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include", // send cookies
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

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Logo/>
        </h1>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/leaderboard">Leaderboard</Link></li>
          {loading ? null : !user ? (
            <li><Link href="/login">Login</Link></li>
          ) : (
            <li><Link href="/profile">Profile</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
