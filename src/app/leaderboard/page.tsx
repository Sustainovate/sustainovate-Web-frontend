"use client";

import { useMemo, useState, useEffect } from "react";
import { Filter, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type Player = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  points: number;
};

function getBadge(rank: number) {
  if (rank === 1)
    return { label: "Gold", className: "from-yellow-400/50 to-yellow-300/20 border-yellow-400/50" };
  if (rank === 2)
    return { label: "Silver", className: "from-slate-300/50 to-slate-200/20 border-slate-200/50" };
  if (rank === 3)
    return { label: "Bronze", className: "from-amber-700/50 to-amber-600/20 border-amber-600/50" };
  return { label: "", className: "from-white/5 to-white/0 border-white/10" };
}

export default function LeaderboardPage() {
  const [query, setQuery] = useState("");
  const [minPoints, setMinPoints] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUser, setCurrentUser] = useState<Player | null>(null);

  // Fetch all users
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${baseURL}/users`);
        const data = await res.json();
        if (!data?.data) return;
        const mappedPlayers: Player[] = data.data.map((user: any, index: number) => ({
          id: user._id || `fallback-${index}`,
          name: user.globalName || user.username || `User${index}`,
          username: user.username || `unknown${index}`,
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

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${baseURL}/users/me`);
        const data = await res.json();
        if (!data) return;
        const user: Player = {
          id: data._id,
          name: data.globalName || data.username,
          username: data.username,
          avatarUrl: data.avatar || data.authProviders?.[0]?.avatar,
          points: data.points ?? 0,
        };
        setCurrentUser(user);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };
    fetchCurrentUser();
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

  // Find user rank
  const currentUserRank = currentUser
    ? filteredPlayers.findIndex((p) => p.id === currentUser.id) + 1
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A12] via-[#1A1A2E] to-[#16213E] text-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold text-white">Search</h3>
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

            {/* Filters */}
            <div>
              <h3 className="text-lg font-semibold text-white mt-4">Filters</h3>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="secondary"
                  onClick={() => setMinPoints((v) => (v === 0 ? 3000 : 0))}
                  className={cn(
                    "flex items-center gap-2 justify-start",
                    minPoints === 0
                      ? "bg-red-600 text-white"
                      : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  {minPoints === 0 ? "3k+ Points" : "Clear"}
                </Button>
              </div>
            </div>
          </div>

          {/* Podium */}
          <div className="md:flex md:flex-col md:space-y-4 mt-4">
            {filteredPlayers.slice(0, 3).map((p, i) => {
              const rank = i + 1;
              const badge = getBadge(rank);
              return (
                <div
                  key={`${p.id}-${i}`}
                  className="glass rounded-2xl border border-purple-500/20 shadow-2xl p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
                >
                  <Avatar className="h-20 w-20 bg-black/30 ring-1 ring-purple-500/30 mb-3">
                    <AvatarImage src={p.avatarUrl} alt={p.name} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-white truncate">{p.name}</h3>
                  <span className="text-sm text-gray-400">@{p.username}</span>
                  <div className="mt-2 text-yellow-400 flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{p.points.toLocaleString()} pts</span>
                  </div>
                  {badge.label && (
                    <span
                      className={`mt-2 px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current User Card */}
          {currentUser && (
            <div className="glass rounded-2xl border border-purple-500/20 shadow-2xl p-4 flex flex-col items-center text-center mt-6">
              <Avatar className="h-16 w-16 bg-black/30 ring-1 ring-purple-500/30 mb-3">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
                <AvatarFallback>{currentUser.username}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold text-white truncate">{currentUser.username}</h3>
              <span className="text-sm text-gray-400">@{currentUser.username}</span>
              <div className="mt-2 text-yellow-400 flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>{currentUser.points.toLocaleString()} pts</span>
              </div>
              {currentUserRank && (
                <span className="mt-2 px-3 py-1 rounded-full text-xs font-medium border from-white/5 to-white/0 border-white/10">
                  Rank #{currentUserRank}
                </span>
              )}
            </div>
          )}
        </aside>

        {/* Leaderboard */}
        <div className="space-y-6">
          <ul className="space-y-4">
            {filteredPlayers.map((p, i) => {
              const rank = i + 1;
              const progress = Math.min(1, p.points / (maxPoints + 500));
              return (
                <li
                  key={`${p.id}-${i}`}
                  className="glass rounded-2xl border border-purple-500/20 shadow-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full grid place-items-center font-semibold text-sm",
                      rank === 1 &&
                      "bg-gradient-to-br from-blue-500/50 to-purple-500/30 text-blue-200",
                      rank === 2 &&
                      "bg-gradient-to-br from-purple-500/50 to-pink-500/30 text-purple-200",
                      rank === 3 &&
                      "bg-gradient-to-br from-orange-500/50 to-yellow-500/30 text-orange-200",
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
                    <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
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
