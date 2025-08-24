"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface UserData {
  _id: string;
  username: string;
  email: string;
  role: "user" | "moderator" | "admin";
  banned?: boolean;
}

interface User {
  role: string;
}

export default function ModeratorPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setCurrentUser(data.user);
      setLoading(false);
    }
    fetchUser();
  }, []);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/data`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setUsers(data.data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  // Handle role change
  async function handleRoleChange(id: string, newRole: "user" | "moderator" | "admin") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setUsers(users.map(u => (u._id === id ? { ...u, role: newRole } : u)));
      toast.success("Role updated successfully!");
    } else {
      toast.error("Failed to update role");
    }
  }

  // Handle delete user
  async function handleDelete(userToDelete: UserData) {
    const confirmMsg = currentUser?.role === "moderator" || currentUser?.role === "admin"
      ? `Type the username "${userToDelete.username}" to confirm deletion:`
      : "Enter your password to confirm deletion:";
    const input = prompt(confirmMsg);

    if (!input) return toast.error("Deletion cancelled");

    const body: any = {};
    if (currentUser?.role === "moderator" || currentUser?.role === "admin") body.username = input;
    else body.password = input;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userToDelete._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      setUsers(users.filter(u => u._id !== userToDelete._id));
      toast.success(data.message);
    } else {
      toast.error(data.message || "Deletion failed");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Moderator Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => (
          <div key={user._id} className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <h2 className="font-bold text-lg">{user.username}</h2>
            <p className="text-sm">{user.email}</p>
            <p className="text-xs text-gray-400">Role: {user.role}</p>
            {user.banned && <p className="text-xs text-red-500">BANNED</p>}

            <div className="mt-3 flex gap-2">
              {/* Role Selector */}
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value as any)}
                className="p-1 rounded bg-gray-800 text-white"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>

              {/* Delete */}
              <button
                onClick={() => handleDelete(user)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>

              {/* Ban */}
              <button
                onClick={() => toast("Ban functionality coming soon")}
                className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 transition"
              >
                Ban
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
