"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSignOutAlt } from "react-icons/fa";

export default function ProfileBtns({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // 📝 Edit profile (example just updating username)
  const handleEdit = async () => {
    const username = prompt("Enter new username:");
    if (!username) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/users/${userId}`, {
        method: "PUT",
        credentials: "include", // send cookie
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete user
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure? This action is permanent!");
    if (!confirmDelete) return;

    const password = prompt("Enter your password to confirm deletion:");
    if (!password) return;

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "12345" }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully");
        window.location.href = "/"; // redirect to landing
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
    await fetch(`${baseURL}/auth/logout`, {
      method: "POST",
      credentials: "include", // important for cookie
    });
    window.location.href = "/login"; // send user back to login
  } catch (err) {
    console.error(err);
  }
  };

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleEdit}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-[#A05CF5] hover:bg-[#B16EFF] py-2 rounded-lg"
      >
        <FaEdit /> Edit Profile
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
      >
        <FaTrash /> Delete User
      </button>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
