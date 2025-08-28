"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Domain list (titles only)
const domainOptions = [
  "Green Tech and Digital Sustainability",
  "Media, Design, Social and Outreach",
  "Waste Management",
  "Ecology and Resource Management",
  "Research and Innovation",
  "Carbon and Energy Efficiency",
  "Nature and Biodiversity",
  "Mental Health and Emotional Well-being",
];

interface EventForm {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  registrationStart: string;
  registrationEnd: string;
  location: string;
  mode: "online" | "offline" | "hybrid";
  createdBy: string;
  slug: string;
  thumbnailUrl?: string;
  domains: string[];
  tags: string[];
  categories: string[];
}

interface Event {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

interface User {
  _id: string;
  role: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    registrationStart: "",
    registrationEnd: "",
    location: "",
    mode: "online",
    createdBy: "",
    slug: "",
    thumbnailUrl: "",
    domains: [],
    tags: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setForm(f => ({ ...f, createdBy: data.user._id }));
        } else setUser(null);
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, { credentials: "include" });
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
    if (
      !form.title || !form.description || !form.startTime || !form.endTime ||
      !form.location || !form.mode || !form.createdBy || !form.slug ||
      !form.registrationStart || !form.registrationEnd || form.domains.length === 0
    ) {
      toast.error("Please fill all required fields including at least one domain");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setEvents([...events, data.data]);
        toast.success("Event created successfully!");
        setForm({
          title: "",
          description: "",
          startTime: "",
          endTime: "",
          registrationStart: "",
          registrationEnd: "",
          location: "",
          mode: "online",
          createdBy: user?._id || "",
          slug: "",
          thumbnailUrl: "",
          domains: [],
          tags: [],
          categories: [],
        });
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-white">Admin Panel: Manage Events</h1>

      {/* --- Event Form --- */}
      <form onSubmit={handleCreate} className="bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
        <input type="text" placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
        <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
        <select value={form.mode} onChange={e => setForm({...form, mode: e.target.value as any})} className="p-3 w-full rounded bg-gray-800 text-white" required>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {/* --- Timing --- */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="datetime-local" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
          <input type="datetime-local" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
          <input type="datetime-local" value={form.registrationStart} onChange={e => setForm({...form, registrationStart: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
          <input type="datetime-local" value={form.registrationEnd} onChange={e => setForm({...form, registrationEnd: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white" required/>
        </div>

        <input type="text" placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={e => setForm({...form, thumbnailUrl: e.target.value})} className="p-3 w-full rounded bg-gray-800 text-white"/>

        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="p-3 w-full rounded bg-gray-800 text-white" required/>

        {/* --- Domains Multi-Select --- */}
        <div>
          <label className="text-gray-300 mb-1 block">Select Domains</label>
          <select multiple value={form.domains} onChange={e => setForm({...form, domains: Array.from(e.target.selectedOptions, option => option.value)})} className="p-3 w-full rounded bg-gray-800 text-white" required>
            {domainOptions.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
          </select>
        </div>

        {/* --- Tags and Categories --- */}
        <input type="text" placeholder="Tags (comma separated)" value={form.tags.join(",")} onChange={e => setForm({...form, tags: e.target.value.split(",").map(t => t.trim())})} className="p-3 w-full rounded bg-gray-800 text-white"/>
        <input type="text" placeholder="Categories (comma separated)" value={form.categories.join(",")} onChange={e => setForm({...form, categories: e.target.value.split(",").map(c => c.trim())})} className="p-3 w-full rounded bg-gray-800 text-white"/>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded transition">Create Event</button>
      </form>

      {/* --- Events List --- */}
      <div className="space-y-3">
        {events.length > 0 ? events.map(event => (
          <div key={event._id} className="flex justify-between items-center bg-gray-900 p-3 rounded hover:bg-gray-800 transition">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{event.title}</p>
              <p className="text-xs text-gray-400 truncate">{new Date(event.startTime).toLocaleString()} → {new Date(event.endTime).toLocaleString()} | {event.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => toast("Edit coming soon")} className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 text-white text-sm">Edit</button>
              <button onClick={() => handleDelete(event._id)} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white text-sm">Delete</button>
            </div>
          </div>
        )) : <p className="text-gray-400">No events found</p>}
      </div>
    </div>
  );
}
