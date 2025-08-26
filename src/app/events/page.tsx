"use client";
import { useEffect, useMemo, useState } from "react";
import EventsSection from "@/components/SectionCardEvents";

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string[];
  tags: string[];
  status: "draft" | "upcoming" | "present" | "past";
  startTime: string;
  endTime: string;
  registrationDeadline?: string;
  registrationStart?: string;
  registrationEnd?: string;
  registrationUserCount?: number;
  capacity: number;
  isOpen: boolean;
  location?: string;
  mode?: string;
  domains: string[];
  thumbnailUrl?: string;
  slug: string;
  meta: Record<string, unknown>;
}

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
          registrationUsers: item.registrationUsers,
          registrationUserCount: item.registrationUserCount,
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
      (e.tags ?? []).forEach((t: string) => tagsSet.add(t));
      (e.category ?? []).forEach((c: string) => categoriesSet.add(c));
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

      const regStart = e.registrationStart
        ? new Date(e.registrationStart)
        : null;
      const regEnd = e.registrationEnd ? new Date(e.registrationEnd) : null;

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
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A12] via-[#1A1A2E] to-[#16213E] text-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
            Events
          </h1>
          <p className="text-gray-300 text-lg">
            Discover and participate in our sustainability events
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* --- Side Panel (Filters) --- */}
          <aside className="glass rounded-2xl p-6 border border-purple-500/20 shadow-2xl space-y-6 h-fit">
            {/* Status Filter */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Status</h3>
              <div className="flex flex-col gap-2">
                {["all", "upcoming", "present", "past"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium text-left transition-all duration-300 ${statusFilter === status
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg"
                      : "bg-black/30 text-gray-300 hover:bg-purple-500/20 hover:text-white"
                      }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedTag(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      )
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag.includes(tag)
                      ? "bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg"
                      : "bg-black/30 text-gray-300 hover:bg-green-500/20 hover:text-white border border-green-500/30"
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(prev =>
                        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                      )
                    }
                    className={`py-3 px-4 rounded-xl text-sm font-medium text-left transition-all duration-300 ${selectedCategory.includes(cat)
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg"
                      : "bg-black/30 text-gray-300 hover:bg-purple-500/20 hover:text-white"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* --- Events List --- */}
          <div className="glass rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
            <EventsSection
              loading={loading}
              filteredEvents={filteredEvents}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
