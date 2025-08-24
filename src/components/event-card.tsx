"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { Calendar, Clock3, Tag as TagIcon, Users } from "lucide-react";

export type EventCardProps = {
  id: string;
  title: string;
  description: string;
  date: string; // start date
  durationDays?: number;
  category?: string;
  priceGBP?: number;
  thumbnailUrl?: string;
  interestedCount: number;
  tags?: string[];
  onJoin?: (id: string) => void;
};

export function EventCard({
  id,
  title,
  description,
  date,
  durationDays,
  category,
  thumbnailUrl,
  interestedCount,
  tags,
  onJoin,
}: EventCardProps) {
  const chips = [...(tags || [])];

  const start = new Date(date);
  const end = new Date(start.getTime() + durationDays! * 24 * 60 * 60 * 1000);
  const now = new Date();

  let durationLabel = "";

  if (now > end) {
    durationLabel = "OVER";
  } else if (now >= start && now <= end) {
    durationLabel = "Present";
  } else {
    // 👇 calculate days left until start
    const diffMs = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      durationLabel = `${diffDays - 1 } days left`;
    } else if (diffDays === 1) {
      durationLabel = "1 day left";
    } else {
      const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
      durationLabel = `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
    }
  }

  return (
    <div className="w-full h-[380px] flex flex-col rounded-xl border border-neutral-800 bg-neutral-900 text-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Thumbnail */}
      <div className="relative h-40 w-full bg-neutral-800">
        {thumbnailUrl ? (
          <Image src={thumbnailUrl} alt="Event cover" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-fuchsia-600/20 to-emerald-600/30" />
        )}
        {category && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[10px] sm:text-xs">
            <TagIcon className="w-3.5 h-3.5" />
            <span>{category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        {/* Top section: title + desc */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>

        {/* Middle section: tags + meta */}
        <div className="mt-3 space-y-2">
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {chips.slice(0, 5).map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] text-gray-300 border border-neutral-700 line-clamp-1"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-300">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {start.toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              {durationLabel}
            </span>
          </div>
        </div>

        {/* Footer pinned bottom-right */}
        <div className="mt-4 flex justify-end items-center gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            <Users className="w-4 h-4" />
            <span>{interestedCount.toLocaleString()} joined</span>
          </div>
          <Button
            onClick={() => onJoin?.(id)}
            className="w-32 sm:w-36 bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Join now
          </Button>
        </div>
      </div>
    </div>
  );
}
