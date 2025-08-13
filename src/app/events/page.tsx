"use client"
import { useCallback, useMemo, useState } from "react";
import { EventHeader } from "@/components/event-header";
import { EventCard } from "@/components/event-card";

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

export default function EventsPage() {
  const [activities, setActivities] = useState<Activity[]>(() =>
    [...initialActivities].sort((a, b) => b.interestedCount - a.interestedCount)
  );

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
    <main className="min-h-screen bg-neutral-950 text-gray-100">
      <div className="mx-auto max-w-2xl sm:max-w-4xl md:max-w-5xl p-4 sm:p-6 space-y-4 sm:space-y-6">
        <EventHeader
          title="Big Weekender Event"
          firstActivityDate={firstActivityDate}
          onAddActivity={handleAddActivity}
          onViewLiveInfo={handleViewLiveInfo}
        />

        <div className="space-y-4 sm:space-y-6">
          {activities.map((a) => (
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
        </div>
      </div>
    </main>
  );
}


