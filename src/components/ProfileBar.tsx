"use client";
import React from "react";
import Link from "next/link";
import { FaUser, FaCog, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import handleLogout from "@/components/UserAuth"; // Assuming this function handles logout logic + redirects

// 1. Define the User type (you can also import this from a central types file)
interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

// 2. Define the props interface for the component
interface ProfileSidebarProps {
  user: User | null;
  onLinkClick?: () => void;
}

export default function ProfileSidebar({ user, onLinkClick }: ProfileSidebarProps) {
  // If no user is passed, don't render anything.
  // The Navbar will handle the "Not logged in" state.
  if (!user) {
    return null;
  }
  
  // Wrapper function for logout to also close the menu
  const handleLogoutClick = () => {
    handleLogout(); // Call your original logout logic
    if (onLinkClick) {
      onLinkClick(); // Close the mobile menu
    }
  };

  return (
    <div className="bg-[#181820] text-white rounded-xl shadow-2xl border border-white/10 w-full">
      {/* User Info */}
      <div className="flex flex-col items-center gap-3 p-4 border-b border-white/10 text-center">
        <img
          src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
          alt="avatar"
          className="h-12 w-12 rounded-full border-2 border-[#A05CF5] shadow"
        />
        <div>
          <h2 className="font-semibold text-sm truncate">{user.username}</h2>
          <p className="text-gray-400 text-xs truncate">{user.email}</p>
          <p className="text-gray-400 text-xs capitalize mt-1">{user.role}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-2 flex flex-col gap-1">
        {/* These MenuItems now use `href` for navigation and `onClick` to close the menu */}
        <MenuItem
          icon={<FaUser />}
          label="Profile"
          href="/profile"
          onClick={onLinkClick}
        />
        <MenuItem
          icon={<FaCog />}
          label="Settings"
          href="/settings"
          onClick={onLinkClick}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-2 space-y-1">
        <MenuItem
          icon={<FaTrashAlt />}
          label="Delete Account"
          className="text-red-400 hover:bg-red-500/10"
          onClick={() => {
             // Add your delete account logic (e.g., open a modal)
             alert("Delete account functionality not implemented.");
             if(onLinkClick) onLinkClick();
          }}
        />
        <MenuItem
          icon={<FaSignOutAlt />}
          label="Logout"
          className="text-gray-400"
          onClick={handleLogoutClick}
        />
      </div>
    </div>
  );
}

// 3. Upgraded MenuItem to handle both links and buttons
function MenuItem({
  icon,
  label,
  className = "",
  onClick,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </>
  );

  const styles = `flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm hover:bg-white/5 transition ${className}`;

  // If an 'href' is provided, render a Next.js Link for proper navigation
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={styles}>
        {content}
      </Link>
    );
  }

  // Otherwise, render a button for actions
  return (
    <button onClick={onClick} className={styles}>
      {content}
    </button>
  );
}