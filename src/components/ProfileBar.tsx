"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import handleLogout from "@/components/UserAuth";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  joined?: string;
  avatar?: string;
}

export default function ProfileSidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
          { credentials: "include" }
        );
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
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="p-6 w-72 text-center text-sm text-gray-300">
        Loading...
      </div>
    );

  if (!user)
    return (
      <div className="p-6 w-72 text-center text-sm text-gray-300">
        Not logged in
      </div>
    );

  return (
    <div className="bg-[#181820] text-white rounded-xl shadow-2xl border border-white/10">
      {/* User Info */}
      <div className="flex flex-col content-center items-center gap-3 p-4 border-b border-white/10">
        <img
          src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
          alt="avatar"
          className="h-12 w-12 rounded-full border-2 border-[#A05CF5] shadow"
        />
        <h2 className="font-semibold text-sm">{user.username}</h2>
        <p className="text-gray-300 text-sm max-w-[140px]">
          {user.email}
        </p>
      </div>

      {/* Actions */}
      <div className="p-2">
        <button className="w-full py-2 rounded-lg bg-[#A05CF5] hover:bg-[#B16EFF] transition text-sm font-medium">
          Manage Account
        </button>
        <MenuItem icon={<FaUser />} label="Profile" />
        <MenuItem icon={<FaCog />} label="Settings" />
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-2 space-y-1">
        <MenuItem
          icon={<FaTrashAlt />}
          label="Delete Account"
          className="text-red-400 hover:bg-red-500/10"
        />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 text-sm"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

/* Reusable MenuItem */
function MenuItem({
  icon,
  label,
  className = "",
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm hover:bg-white/5 transition ${className}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
