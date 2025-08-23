"use client";

import handleLogout from "@/components/UserAuth";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  joined?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include", // send cookies
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0A12]">Loading...</div>;
  if (!user) return <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0A12]">Profile not found</div>;

  return (
    <div className="min-h-screen bg-[#0A0A12] text-white flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-[#12121D] rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
            alt="Profile"
            className="h-28 w-28 rounded-full border-2 border-[#A05CF5]"
          />
          <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="text-gray-500 mt-1 text-sm">Role: {user.role}</p>
          {user.joined && <p className="text-gray-500 text-sm">Joined: {user.joined}</p>}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#A05CF5] hover:bg-[#B16EFF] py-2 rounded-lg">
            <FaEdit /> Edit Profile
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
            <FaSignOutAlt /> Delete User
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Profile settings & account info
        </div>
      </div>
    </div>
  );
}
