"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EventForm {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    location: string;
    mode: "online" | "offline" | "hybrid";
    thumbnailUrl?: string;
    category: string[];
    tags: string[];
}

interface Event {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export default function AdminEventsPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [form, setForm] = useState<EventForm>({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
        mode: "online",
        category: [],
        tags: [],
    });
    const [loading, setLoading] = useState(true);

    // ✅ Fetch all events
    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) {
                    setEvents(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    // ✅ Handle create event
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
                setForm({
                    title: "",
                    description: "",
                    startTime: "",
                    endTime: "",
                    location: "",
                    mode: "online",
                    category: [],
                    tags: [],
                });
            } else {
                console.error("Error creating event:", data.message);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // ✅ Handle edit
    async function handleEdit(id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
                method: "PUT",
                credentials: "include",
            });

            if (res.ok) {
                setEvents(events.filter((e) => e._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    }

    // ✅ Handle delete                                                                                   //working
    async function handleDelete(id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                setEvents(events.filter((e) => e._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return <p>Loading admin panel...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Admin: Manage Events</h1>

            {/* Create form */}
            <form onSubmit={handleCreate} className="space-y-4 mb-10">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    value={form.mode}
                    onChange={(e) => setForm({ ...form, mode: e.target.value as any })}
                    className="w-full p-2 border rounded"
                >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={form.tags.join(",")}
                    onChange={(e) => setForm({ ...form, tags: e.target.value.split(",") })}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
                    Create Event
                </button>
            </form>

            {/* Event list */}
            <div className="space-y-4">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="border p-4 rounded flex justify-between items-center">
                            <div>
                                <h2 className="font-bold">{event.title}</h2>
                                <p className="text-sm">{event.description}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(event.startTime).toLocaleString()} → {new Date(event.endTime).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-5">
                            <button
                                onClick={() => handleEdit(event._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
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
