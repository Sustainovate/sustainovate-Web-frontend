"use client"

import { useMemo, useState, useEffect } from "react"
import { Crown, Search, Filter, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export type Player = {
	id: string
	name: string
	username: string
	avatarUrl?: string
	points: number
}

function getBadge(rank: number) {
	if (rank === 1) return { label: "Gold", className: "from-yellow-400/50 to-yellow-300/20 border-yellow-400/50" }
	if (rank === 2) return { label: "Silver", className: "from-slate-300/50 to-slate-200/20 border-slate-200/50" }
	if (rank === 3) return { label: "Bronze", className: "from-amber-700/50 to-amber-600/20 border-amber-600/50" }
	return { label: "", className: "from-white/5 to-white/0 border-white/10" }
}

export default function LeaderboardPage() {
	const [query, setQuery] = useState("")
	const [minPoints, setMinPoints] = useState(0)
	const [players, setPlayers] = useState<Player[]>([])

	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				const res = await fetch(`${baseURL}/users`)
				const data = await res.json()
				if (!data?.data) return
				const mappedPlayers: Player[] = data.data.map((user: any) => ({
					id: user._id,
					name: user.globalName || user.username,
					username: user.username,
					avatarUrl: user.avatar || user.authProviders?.[0]?.avatar || "",
					points: user.points ?? 0,
				}))
				setPlayers(mappedPlayers)
			} catch (err) {
				console.error("Failed to fetch users:", err)
			}
		}
		fetchPlayers()
	}, [])

	const filteredPlayers = useMemo(() => {
		return [...players]
			.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.username.toLowerCase().includes(query.toLowerCase()))
			.filter(p => p.points >= minPoints)
			.sort((a, b) => b.points - a.points)
	}, [query, minPoints, players])

	const maxPoints = filteredPlayers[0]?.points ?? 1

	return (
		<main className="min-h-screen bg-neutral-950 text-gray-100">
			<div className="mx-auto max-w-7xl p-6 space-y-6">
				{/* Header */}
				<header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
					<div className="flex items-center gap-3">
						<Crown className="h-6 w-6 text-yellow-400" />
						<h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
					</div>

					<div className="flex flex-wrap gap-2 items-center">
						<div className="relative flex-1 sm:w-80">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
							<Input
								value={query}
								onChange={e => setQuery(e.target.value)}
								placeholder="Search by name or username"
								className="pl-9 bg-white/5 border-white/10 text-gray-100 placeholder:text-gray-400"
							/>
						</div>
						<Button
							variant="secondary"
							onClick={() => setMinPoints(v => (v === 0 ? 3000 : 0))}
							className={cn("bg-blue-600/80 hover:bg-blue-700 text-white flex items-center gap-2")}
						>
							<Filter className="h-4 w-4" />
							{minPoints === 0 ? "3k+ Points" : "Clear"}
						</Button>
					</div>
				</header>

				{/* Podium + Leaderboard Table */}
				<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Top 3 Podium */}
					<div className="lg:col-span-1 flex flex-col gap-4">
						{filteredPlayers.slice(0, 3).map((p, i) => {
							const rank = i + 1;
							const badge = getBadge(rank);
							const glow = rank === 1 ? "shadow-[0_0_40px_0_rgba(147,197,253,0.35)]" : "";
							return (
								<div
									key={`podium-${p.id || i}`} // <--- unique key for podium
									className={cn(
										"relative rounded-2xl p-4 sm:p-5 border backdrop-blur-md",
										"bg-gradient-to-br " + badge.className,
										"border-white/10 shadow-[8px_8px_24px_rgba(0,0,0,0.6),_-8px_-8px_24px_rgba(255,255,255,0.02)]",
										glow
									)}
								>
									<div className="flex items-center gap-4">
										<Avatar className="h-16 w-16 ring-2 ring-white/10 bg-white/10">
											<AvatarImage src={p.avatarUrl} alt={p.name} />
											<AvatarFallback>{p.name[0]}</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<h2 className="text-lg font-semibold truncate">{p.name}</h2>
												<span className="text-xs text-gray-400 truncate">@{p.username}</span>
											</div>
											<div className="mt-1 flex items-center gap-2 text-sm text-gray-300">
												<Trophy className="h-4 w-4 text-yellow-400" />
												<span className="font-medium">{p.points.toLocaleString()} pts</span>
											</div>
										</div>
										<div className="ml-auto">
											<span className="px-3 py-1 rounded-full text-xs border bg-white/10 border-white/15">{badge.label}</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>

					{/* Full leaderboard */}
					<div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
						<ul className="divide-y divide-white/10">
							{filteredPlayers.map((p, i) => {
								const rank = i + 1
								const progress = Math.min(1, p.points / (maxPoints + 500))
								return (
									<li key={`player-${p.id || i}`} className="py-3 sm:py-4"> {/* <--- unique key for list */}
										<div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6">
											{/* Rank circle */}
											<div className={cn(
												"h-8 w-8 sm:h-9 sm:w-9 rounded-full grid place-items-center font-semibold text-xs",
												rank === 1 && "bg-gradient-to-br from-blue-500/50 to-purple-500/30 text-blue-200",
												rank === 2 && "bg-gradient-to-br from-purple-500/50 to-pink-500/30 text-purple-200",
												rank === 3 && "bg-gradient-to-br from-orange-500/50 to-yellow-500/30 text-orange-200",
												rank > 3 && "bg-white/10 text-gray-300"
											)}>
												{rank}
											</div>

											{/* Player info + progress */}
											<div className="flex items-center gap-3 min-w-0">
												<Avatar className="h-9 w-9 bg-white/10 ring-white/10">
													<AvatarImage src={p.avatarUrl} alt={p.name} />
													<AvatarFallback>{p.name[0]}</AvatarFallback>
												</Avatar>
												<div className="min-w-0 flex-1">
													<div className="flex items-center gap-2 min-w-0">
														<span className="truncate font-medium">{p.name}</span>
														<span className="text-xs text-gray-400 truncate">@{p.username}</span>
													</div>
													<div className="mt-1 h-2 w-full rounded-full bg-white/5 overflow-hidden">
														<div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 transition-all" style={{ width: `${progress * 100}%` }} />
													</div>
												</div>
											</div>

											{/* Points & next rank */}
											<div className="text-right">
												<div className="text-sm font-semibold">{p.points.toLocaleString()} pts</div>
												<div className="text-[10px] text-gray-400">
													Next rank in {(Math.max(0, maxPoints + 500 - p.points)).toLocaleString()} pts
												</div>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					</div>
				</section>
			</div>
		</main>
	)
}
