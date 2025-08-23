"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventHeader } from "@/components/event-header";
import { EventCard } from "@/components/event-card";

const initialTags = ["Indoor", "Outdoor", "Adventure", "Fun", "Health", "Night", "New"];
const initialCategories = ["Rebound", "Zombie", "Fitness", "General"];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"upcoming" | "past" | "present" | "all">("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // --- Fetch events from backend ---
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/events`);
        const json = await res.json();

        const data: Event[] = (json.data ?? []).map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          category: item.category ?? [],   // keep as array
          tags: item.tags ?? [],
          status: item.status ?? "draft",
          startTime: item.startTime,
          endTime: item.endTime,
          registrationDeadline: item.registrationDeadline,
          registrationUserCount: item.registrationUserCount ?? 0,
          capacity: item.capacity ?? 100,
          isOpen: item.isOpen ?? true,
          location: item.location,
          mode: item.mode,
          organizer: item.organizer,
          domains: item.domains ?? [],
          thumbnailUrl: item.thumbnailUrl,
          slug: item.slug,
          meta: item.meta ?? {},
        }));

        setEvents(
          data.sort((a, b) => (b.registrationUserCount ?? 0) - (a.registrationUserCount ?? 0))
        );
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [baseURL]);

  // --- Filtering ---
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Tags
      if (selectedTag && !(e.tags?.includes(selectedTag))) return false;
      // Categories
      if (selectedCategory && !(e.category?.includes(selectedCategory))) return false;

      const start = new Date(e.startTime);
      const end = new Date(e.endTime);

      // Date filter
      if (selectedDate) {
        const selected = new Date(selectedDate);
        if (!(start <= selected && end >= selected)) return false;
      }

      const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

      // Status filter
      switch (statusFilter) {
        case "upcoming":
          if (start.getTime() - today.getTime() <= ONE_WEEK_MS) return false;
          break;
        case "present":
          if (start > today || end < today || start.getTime() - today.getTime() > ONE_WEEK_MS) return false;
          break;
        case "past":
          if (end >= today) return false;
          break;
        default:
          break;
      }

      return true;
    });
  }, [events, selectedTag, selectedCategory, statusFilter, selectedDate, today]);


  const firstEventDate = useMemo(() => events[0]?.startTime, [events]);

  // --- Handlers ---
  const handleAddEvent = useCallback(() => {
    const newEvent: Event = {
      _id: crypto.randomUUID(),
      title: `New Event`,
      description: "Temporary description",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 3600 * 1000).toISOString(),
      category: ["General"],
      tags: ["New"],
      status: "draft",
      isOpen: true,
      registrationUserCount: 0,
      capacity: 100,
      location: "TBD",
      mode: "online",
      domains: [],
      slug: `new-event-${Date.now()}`,
    };

    // Send to backend
    fetch(`${baseURL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    }).catch(console.error);

    setEvents((prev) => [newEvent, ...prev]);
  }, [baseURL]);

  const handleViewLiveInfo = useCallback(() => {
    alert("Live info coming soon");
  }, []);

  const onJoin = useCallback((id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e._id === id
          ? { ...e, registrationUserCount: (e.registrationUserCount ?? 0) + 1 }
          : e
      )
    );

    fetch(`${baseURL}/events/${id}/join`, {
      method: "PATCH",
    }).catch(console.error);
  }, [baseURL]);

  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 p-4 sm:p-6">
      <EventHeader
        title="Big Weekender Event"
        firstActivityDate={firstEventDate}
        onAddActivity={handleAddEvent}
        onViewLiveInfo={handleViewLiveInfo}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
        {/* Left Panel (Status Filters) */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6">
          <h3 className="text-lg font-semibold">Status</h3>
          <div className="flex flex-col gap-2">
            {["all", "upcoming", "present", "past"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`py-2 px-3 rounded-md text-sm font-medium text-left ${statusFilter === status
                  ? "bg-red-600 text-white"
                  : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </aside>

        {/* Event List */}
        <section className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-400">Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((e) => (
              <EventCard
                key={e._id}
                id={e._id}
                title={e.title}
                date={e.startTime}
                durationDays={e.registrationDeadline
                  ? Math.max(
                    0,
                    Math.ceil(
                      (new Date(e.registrationDeadline).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                    )
                  )
                  : 0}
                category={e.category.join(", ")}
                // thumbnailUrl={e.thumbnailUrl || ""}
                interestedCount={e.registrationUserCount}
                tags={e.tags}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 mt-6">
              No events match the selected filters.
            </p>
          )}
        </section>

        {/* Right Panel (Filters) */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6">
          <h3 className="text-lg font-semibold">Filters</h3>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-3">
              {initialTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTag === tag
                    ? "bg-red-600 text-white"
                    : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Categories</h4>
            <div className="flex flex-col gap-3">
              {initialCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`py-2 px-3 rounded-md text-sm font-medium text-left ${selectedCategory === cat
                    ? "bg-red-600 text-white"
                    : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
