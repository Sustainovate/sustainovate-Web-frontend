"use client";
import { useCallback, useMemo, useState } from "react";
import { EventHeader } from "@/components/event-header";
import { EventCard } from "@/components/event-card";

// --- Activity type ---
export type Activity = {
  id: string;
  title: string;
  date: string; // ISO string
  durationDays: number;
  category: string;
  priceGBP: number;
  interestedCount: number;
  thumbnailUrl?: string;
  tags?: string[];
};

// --- Initial Activities ---
const initialActivities: Activity[] = [
  {
    id: "1",
    title: "Ping Pong",
    date: "2025-02-12",
    durationDays: 5,
    category: "Rebound",
    priceGBP: 250,
    interestedCount: 120,
    tags: ["Indoor", "Fun"],
  },
  {
    id: "2",
    title: "Zombie chase",
    date: "2025-02-12",
    durationDays: 5,
    category: "Zombie",
    priceGBP: 250,
    interestedCount: 85,
    tags: ["Outdoor", "Adventure"],
  },
  {
    id: "3",
    title: "Night Run",
    date: "2025-03-01",
    durationDays: 2,
    category: "Fitness",
    priceGBP: 180,
    interestedCount: 95,
    tags: ["Health", "Night"],
  },
];

const initialTags = ["Indoor", "Outdoor", "Adventure", "Fun", "Health", "Night", "New"];
const initialCategories = ["Rebound", "Zombie", "Fitness", "General"];

// --- Mini Calendar Component ---
type MiniCalendarProps = {
  activities: Activity[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

function MiniCalendar({ activities, selectedDate, onSelectDate }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days: Date[] = [];
    for (let d = 1; d <= end.getDate(); d++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    }
    return days;
  }, [currentMonth]);

  const eventDates = useMemo(() => new Set(activities.map((a) => a.date.slice(0, 10))), [activities]);

  const handlePrevMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="text-gray-300 hover:text-white">&lt;</button>
        <span className="text-white font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth} className="text-gray-300 hover:text-white">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-gray-400 text-xs mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={day + i}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(daysInMonth[0].getDay()).fill(null).map((_, idx) => (
          <div key={"empty" + idx}></div>
        ))}
        {daysInMonth.map((day) => {
          const dateStr = day.toISOString().slice(0, 10);
          const isEvent = eventDates.has(dateStr);
          const isSelected = selectedDate === dateStr;
          const today = new Date().toISOString().slice(0, 10) === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              className={`
                w-full h-8 rounded-md text-sm flex items-center justify-center
                ${isEvent ? "bg-red-600 text-white" : "bg-neutral-700 text-gray-200"}
                ${isSelected ? "ring-2 ring-red-400" : ""}
                ${today && !isSelected ? "border border-gray-400" : ""}
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Main Page ---
export default function EventsPage() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    [...initialActivities].sort((a, b) => b.interestedCount - a.interestedCount)
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"upcoming" | "past" | "present" | "all">("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();

  const filteredActivities = useMemo(() => {
    return activities.filter((a) => {
      if (selectedTag && !(a.tags?.includes(selectedTag))) return false;
      if (selectedCategory && a.category !== selectedCategory) return false;
      if (selectedDate && a.date.slice(0, 10) !== selectedDate) return false;

      const eventDate = new Date(a.date);
      const endDate = new Date(a.date);
      endDate.setDate(endDate.getDate() + a.durationDays);

      if (statusFilter === "upcoming" && eventDate <= today) return false;
      if (statusFilter === "past" && endDate >= today) return false;
      if (statusFilter === "present" && !(eventDate <= today && endDate >= today)) return false;

      return true;
    });
  }, [activities, selectedTag, selectedCategory, statusFilter, selectedDate]);

  const firstActivityDate = useMemo(() => activities[0]?.date, [activities]);

  const handleAddActivity = useCallback(() => {
    const nextId = (activities.length + 1).toString();
    const newActivity: Activity = {
      id: nextId,
      title: `New Activity ${nextId}`,
      date: new Date().toISOString(),
      durationDays: 1,
      category: "General",
      priceGBP: 100,
      interestedCount: 0,
      tags: ["New"],
    };
    setActivities((prev) => [newActivity, ...prev]);
  }, [activities.length]);

  const handleViewLiveInfo = useCallback(() => {
    alert("Live info coming soon");
  }, []);

  const onJoin = useCallback((id: string) => {
    setActivities((prev) => {
      const updated = prev.map((e) =>
        e.id === id ? { ...e, interestedCount: e.interestedCount + 1 } : e
      );
      return updated.sort((a, b) => b.interestedCount - a.interestedCount);
    });
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 p-4 sm:p-6">
      <EventHeader
        title="Big Weekender Event"
        firstActivityDate={firstActivityDate}
        onAddActivity={handleAddActivity}
        onViewLiveInfo={handleViewLiveInfo}
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
        {/* Left Panel with Calendar */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6">
          <MiniCalendar
            activities={activities}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Status</h3>
            <div className="flex flex-col gap-2">
              {["all", "upcoming", "present", "past"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`py-2 px-3 rounded-md text-sm font-medium text-left ${
                    statusFilter === status ? "bg-red-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Event List */}
        <section className="space-y-6">
          {filteredActivities.map((a) => (
            <EventCard
              key={a.id}
              id={a.id}
              title={a.title}
              date={a.date}
              durationDays={a.durationDays}
              category={a.category}
              priceGBP={a.priceGBP}
              thumbnailUrl={a.thumbnailUrl}
              interestedCount={a.interestedCount}
              tags={a.tags}
              onJoin={onJoin}
            />
          ))}
          {filteredActivities.length === 0 && (
            <p className="text-center text-gray-400 mt-6">No events match the selected filters.</p>
          )}
        </section>

        {/* Right Panel Filters */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6">
          <h3 className="text-lg font-semibold">Filters</h3>

          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-3">
              {initialTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedTag === tag ? "bg-red-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
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
                  className={`py-2 px-3 rounded-md text-sm font-medium text-left ${
                    selectedCategory === cat ? "bg-red-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
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
