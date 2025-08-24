"use client";

import { useMemo, useState, useEffect, Key } from "react";
import { Crown, Filter, Trophy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Player = {
  _id: Key | null | undefined;
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  points: number;
};

function getBadge(rank: number) {
  if (rank === 1)
    return {
      label: "Gold",
      className: "from-yellow-400/50 to-yellow-300/20 border-yellow-400/50",
    };
  if (rank === 2)
    return {
      label: "Silver",
      className: "from-slate-300/50 to-slate-200/20 border-slate-200/50",
    };
  if (rank === 3)
    return {
      label: "Bronze",
      className: "from-amber-700/50 to-amber-600/20 border-amber-600/50",
    };
  return { label: "", className: "from-white/5 to-white/0 border-white/10" };
}

export default function LeaderboardPage() {
  const [query, setQuery] = useState("");
  const [minPoints, setMinPoints] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${baseURL}/users`);
        const data = await res.json();
        if (!data?.data) return;
        const mappedPlayers: Player[] = data.data.map((user: any) => ({
          id: user._id,
          name: user.globalName || user.username,
          username: user.username,
          avatarUrl: user.avatar || user.authProviders?.[0]?.avatar || "",
          points: user.points ?? 0,
        }));
        setPlayers(mappedPlayers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchPlayers();
  }, []);

  const filteredPlayers = useMemo(() => {
    return [...players]
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.username.toLowerCase().includes(query.toLowerCase())
      )
      .filter((p) => p.points >= minPoints)
      .sort((a, b) => b.points - a.points);
  }, [query, minPoints, players]);

  const maxPoints = filteredPlayers[0]?.points ?? 1;

  return (
    <main className="min-h-screen bg-neutral-950 text-gray-100 p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar Filters */}
        <aside className="bg-neutral-900 p-6 rounded-xl shadow-lg space-y-6 h-fit">
          <div>
            <h3 className="text-lg font-semibold">Search</h3>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name or username"
                className="pl-9 bg-neutral-800 text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="flex flex-col gap-2 mt-2">
              <Button
                variant="secondary"
                onClick={() => setMinPoints((v) => (v === 0 ? 3000 : 0))}
                className={cn(
                  "flex items-center gap-2 justify-start",
                  minPoints === 0 ? "bg-red-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                )}
              >
                <Filter className="h-4 w-4" />
                {minPoints === 0 ? "3k+ Points" : "Clear"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Leaderboard Content */}
        <div className="space-y-6">
          {/* Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredPlayers.slice(0, 3).map((p, i) => {
              const rank = i + 1;
              const badge = getBadge(rank);
              return (
                <div
                  key={p._id}
                  className={cn(
                    "rounded-xl p-4 border bg-neutral-900 shadow-lg flex items-center gap-4",
                    "border-white/10"
                  )}
                >
                  <Avatar className="h-16 w-16 bg-neutral-800 ring-1 ring-white/10">
                    <AvatarImage src={p.avatarUrl} alt={p.name} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold truncate">{p.name}</h2>
                      <span className="text-xs text-gray-400 truncate">@{p.username}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-300 flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span>{p.points.toLocaleString()} pts</span>
                    </div>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs border bg-white/10 border-white/15">
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Leaderboard */}
          <ul className="space-y-2">
            {filteredPlayers.map((p, i) => {
              const rank = i + 1;
              const progress = Math.min(1, p.points / (maxPoints + 500));
              return (
                <li
                  key={p.id}
                  className="bg-neutral-900 rounded-xl p-4 flex items-center gap-4 shadow hover:shadow-lg transition"
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full grid place-items-center font-semibold text-sm",
                      rank === 1 && "bg-gradient-to-br from-blue-500/50 to-purple-500/30 text-blue-200",
                      rank === 2 && "bg-gradient-to-br from-purple-500/50 to-pink-500/30 text-purple-200",
                      rank === 3 && "bg-gradient-to-br from-orange-500/50 to-yellow-500/30 text-orange-200",
                      rank > 3 && "bg-white/10 text-gray-300"
                    )}
                  >
                    {rank}
                  </div>
                  <Avatar className="h-10 w-10 bg-neutral-800 ring-1 ring-white/10">
                    <AvatarImage src={p.avatarUrl} alt={p.name} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{p.name}</span>
                      <span className="text-xs text-gray-400 truncate">@{p.username}</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 transition-all"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{p.points.toLocaleString()} pts</div>
                    <div className="text-[10px] text-gray-400">
                      Next rank in {Math.max(0, maxPoints + 500 - p.points).toLocaleString()} pts
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
