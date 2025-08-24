"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface EventForm {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  mode: "online" | "offline" | "hybrid";
  tags: string[];
}

interface Event {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface User {
  role: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    mode: "online",
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
        else setUser(null);
      } catch (err) {
        console.error(err);
      } finally {
        setUserLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setEvents(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Create event
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setEvents([...events, data.event]);
        toast.success("Event created successfully!");
        setForm({ title: "", description: "", startTime: "", endTime: "", location: "", mode: "online", tags: [] });
      } else {
        toast.error(data.message || "Failed to create event");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  // Delete event
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setEvents(events.filter(e => e._id !== id));
        toast.success(data.message || "Event deleted");
      } else {
        toast.error(data.message || "Deletion failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  if (userLoading || loading) return <p>Loading...</p>;
  if (!user || !["admin", "moderator"].includes(user.role)) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">Admin Panel: Manage Events</h1>

      {/* --- Create Event Form --- */}
      <form onSubmit={handleCreate} className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-wrap">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="p-2 border rounded bg-gray-800 text-white flex-1" required />
        <input type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="p-2 border rounded bg-gray-800 text-white" required />
        <input type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className="p-2 border rounded bg-gray-800 text-white" required />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="p-2 border rounded bg-gray-800 text-white" required />
        <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as any })} className="p-2 border rounded bg-gray-800 text-white">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input type="text" placeholder="Tags (comma separated)" value={form.tags.join(",")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",") })} className="p-2 border rounded bg-gray-800 text-white flex-1" />
        <button type="submit" className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">Create</button>
      </form>

      {/* --- Events List --- */}
      <div className="space-y-2">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="flex justify-between items-center bg-gray-900 p-3 rounded hover:bg-gray-800 transition">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{event.title}</p>
                <p className="text-xs text-gray-400 truncate">
                  {new Date(event.startTime).toLocaleString()} → {new Date(event.endTime).toLocaleString()} | {event.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => toast("Edit functionality coming soon")} className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 transition text-white text-sm">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition text-white text-sm">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No events found</p>
        )}
      </div>
    </div>
  );
}
