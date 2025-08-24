"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventCard } from "@/components/event-card";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import EventsSection from "@/components/SectionCardEvents";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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
          category: item.category ?? [],
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
          domains: item.domains ?? [],
          thumbnailUrl: item.thumbnailUrl,
          slug: item.slug,
          meta: item.meta ?? {},
          registrationStart: item.registrationStart,
          registrationEnd: item.registrationEnd,
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

  // --- Unique tags & categories from events ---
  const { uniqueTags, uniqueCategories } = useMemo(() => {
    const tagsSet = new Set<string>();
    const categoriesSet = new Set<string>();

    events.forEach((e) => {
      (e.tags ?? []).forEach((t) => tagsSet.add(t));
      (e.category ?? []).forEach((c) => categoriesSet.add(c));
    });

    return {
      uniqueTags: Array.from(tagsSet),
      uniqueCategories: Array.from(categoriesSet),
    };
  }, [events]);

  // --- Filtering ---
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // if (selectedTag && !(e.tags?.includes(selectedTag))) return false;
      // if (selectedCategory && !(e.category?.includes(selectedCategory))) return false;

      if (selectedTag.length > 0 && !selectedTag.every(tag => e.tags?.includes(tag))) {
        return false;
      }
      if (selectedCategory.length > 0 && !selectedCategory.every(cat => e.category?.includes(cat))) {
        return false;
      }

      const regStart = new Date(e.registrationStart)
      const regEnd = new Date(e.registrationEnd)

      if (selectedDate) {
        const selected = new Date(selectedDate);
        // selected date should fall inside the event's duration
        if (!(new Date(e.startTime) <= selected && new Date(e.endTime) >= selected)) return false;
      }

      switch (statusFilter) {
        case "upcoming":
          // Registration not started yet
          if (!regStart || regStart <= today) return false;
          break;

        case "present":
          // Registration ongoing
          if (!regStart || !regEnd) return false;
          if (!(regStart <= today && regEnd >= today)) return false;
          break;

        case "past":
          // Registration closed
          if (!regEnd || regEnd >= today) return false;
          break;

        default:
          break;
      }

      return true;
    });
  }, [events, selectedTag, selectedCategory, statusFilter, selectedDate, today]);



  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* --- Side Panel (Filters) --- */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6 h-fit">
          {/* Status Filter */}
          <div>
            <h3 className="text-lg font-semibold">Status</h3>
            <div className="flex flex-col gap-2 mt-2">
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
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTag.includes(tag)
                      ? "bg-red-600 text-white"
                      : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                    }`}
                >
                  { tag }
                </button>
              ))}
          </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="flex flex-col gap-2 mt-2">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(prev =>
                  prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                )
              }
              className={`py-2 px-3 rounded-md text-sm font-medium text-left ${selectedCategory.includes(cat)
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

        {/* --- Events List --- */ }
  <EventsSection
    loading={loading}
    filteredEvents={filteredEvents}
  />

      </div >
    </main >
  );
}
