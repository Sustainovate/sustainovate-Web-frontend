"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // ✅ Fetch current logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.user);
          // Only allow moderator
          if (!["moderator"].includes(data.user.role)) {
            router.replace("/");
          }
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error(err);
        router.replace("/");
      } finally {
        setUserLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  // ✅ Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/data`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          const normalizedUsers: UserData[] = data.data.map((u: any) => ({
            ...u,
            role: u.role === "admin" || u.role === "moderator" ? u.role : "user",
          }));
          setUsers(normalizedUsers);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);


  // ✅ Handle role update
  async function handleRoleChange(id: string, newRole: "user" | "moderator" | "admin") {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => (u._id === id ? { ...u, role: newRole } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  }



  // ✅ Handle delete user
  async function handleDelete(id: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (userLoading || loading) return <p>Loading...</p>;
  if (!currentUser || !["admin", "moderator"].includes(currentUser.role)) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Moderator Panel: Manage Users</h1>

      <div className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h2 className="font-bold">{user.username}</h2>
                <p className="text-sm">{user.email}</p>
                <p className="text-xs text-gray-400">Role: {user.role}</p>
                {user.banned && <p className="text-xs text-red-500">BANNED</p>}
              </div>
              <div className="flex gap-3">
                {/* Role change */}
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value as "user" | "moderator" | "admin")}
                  className="border p-1 rounded"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>


                {/* Delete user */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

                {/* TODO: Ban user (can trigger ban letter modal) */}
                <button
                  onClick={() => alert("Implement ban letter functionality")}
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Ban
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
}
