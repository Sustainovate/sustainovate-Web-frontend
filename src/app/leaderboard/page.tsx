"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Crown, Search, Filter, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export type Player = {
	id: string
	name: string
	username: string
	avatarUrl?: string
	points: number
}

const initialPlayers: Player[] = [
	{ id: "1", name: "Aarav Shah", username: "aarav", points: 4120 },
	{ id: "2", name: "Mia Chen", username: "miac", points: 3985 },
	{ id: "3", name: "Liam Patel", username: "liamp", points: 3720 },
	{ id: "4", name: "Zara Khan", username: "zarak", points: 3350 },
	{ id: "5", name: "Noah Singh", username: "noah", points: 3210 },
	{ id: "6", name: "Olivia Das", username: "olivia", points: 2975 },
]

function getBadge(rank: number) {
	if (rank === 1) return { label: "Gold", className: "from-yellow-500/30 to-yellow-300/10 border-yellow-400/40" }
	if (rank === 2) return { label: "Silver", className: "from-slate-300/30 to-slate-200/10 border-slate-200/40" }
	if (rank === 3) return { label: "Bronze", className: "from-amber-700/30 to-amber-600/10 border-amber-600/40" }
	return { label: "", className: "from-white/5 to-white/0 border-white/10" }
}

export default function LeaderboardPage() {
	const [query, setQuery] = useState("")
	const [minPoints, setMinPoints] = useState(0)

	const players = useMemo(() => {
		return [...initialPlayers]
			.filter((p) =>
				p.name.toLowerCase().includes(query.toLowerCase()) ||
				p.username.toLowerCase().includes(query.toLowerCase())
			)
			.filter((p) => p.points >= minPoints)
			.sort((a, b) => b.points - a.points)
	}, [query, minPoints])

	const maxPoints = players[0]?.points ?? 1

	return (
		<main className="min-h-screen bg-neutral-950 text-gray-100">
			<div className="mx-auto max-w-2xl sm:max-w-4xl md:max-w-6xl p-4 sm:p-6 space-y-6">
				<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<Crown className="size-6 text-yellow-400" />
						<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Leaderboard</h1>
					</div>
					<div className="flex w-full sm:w-auto items-center gap-2">
						<div className="relative flex-1 sm:w-80">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
							<Input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search name or username"
								className="pl-9 bg-white/5 border-white/10 text-gray-100 placeholder:text-gray-400"
							/>
						</div>
						<Button
							variant="secondary"
							onClick={() => setMinPoints((v) => (v === 0 ? 3000 : 0))}
							className="bg-blue-600/80 hover:bg-blue-600 text-white"
						>
							<Filter className="size-4" />
							{minPoints === 0 ? "Filter 3k+" : "Clear"}
						</Button>
					</div>
				</header>

				<section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
					{/* Podium for top 3 */}
					<div className="lg:col-span-1 flex flex-col gap-4">
						{players.slice(0, 3).map((p, i) => {
							const rank = i + 1
							const badge = getBadge(rank)
							const glow = rank === 1 ? "shadow-[0_0_40px_0_rgba(147,197,253,0.35)]" : ""
							return (
								<div
									key={p.id}
									className={cn(
										"relative rounded-2xl p-4 sm:p-5 border backdrop-blur-md",
										"bg-gradient-to-br "+badge.className,
										"border-white/10 shadow-[8px_8px_24px_rgba(0,0,0,0.6),_-8px_-8px_24px_rgba(255,255,255,0.02)]",
										glow
									)}
								>
									<div className="flex items-center gap-3">
										<Avatar className="size-12 ring-2 ring-white/10">
											<AvatarImage src={p.avatarUrl} alt={p.name} />
											<AvatarFallback>{p.name[0]}</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<span className="text-lg font-semibold truncate">{p.name}</span>
												<span className="text-xs text-gray-400 truncate">@{p.username}</span>
											</div>
											<div className="mt-1 text-sm text-gray-300 flex items-center gap-2">
												<Trophy className="size-4 text-yellow-400" />
												<span className="font-medium">{p.points.toLocaleString()} pts</span>
											</div>
										</div>
										<div className="ml-auto">
											<span className={cn(
												"px-3 py-1 rounded-full text-xs border",
												"bg-white/10 border-white/15"
											)}>
												{badge.label}
											</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>

					{/* Table/list for rest */}
					<div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-5 shadow-[8px_8px_24px_rgba(0,0,0,0.6),_-8px_-8px_24px_rgba(255,255,255,0.02)]">
						<ul className="divide-y divide-white/10">
							{players.map((p, i) => {
								const rank = i + 1
								const progress = Math.min(1, p.points / (maxPoints + 500))
								return (
									<li key={p.id} className="py-3 sm:py-4">
										<div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
											<div className={cn(
												"size-8 sm:size-9 rounded-full grid place-items-center text-xs font-semibold",
												rank === 1 && "bg-gradient-to-br from-blue-500/30 to-purple-500/20 text-blue-200",
												rank === 2 && "bg-gradient-to-br from-purple-500/30 to-pink-500/20 text-purple-200",
												rank === 3 && "bg-gradient-to-br from-orange-500/30 to-yellow-500/20 text-orange-200",
												!(rank <= 3) && "bg-white/5 text-gray-300"
											)}>
												{rank}
											</div>
											<div className="flex items-center gap-3 min-w-0">
												<Avatar className="size-9">
													<AvatarImage src={p.avatarUrl} alt={p.name} />
													<AvatarFallback>{p.name[0]}</AvatarFallback>
												</Avatar>
												<div className="min-w-0">
													<div className="flex items-center gap-2 min-w-0">
														<span className="truncate font-medium">{p.name}</span>
														<span className="text-xs text-gray-400 truncate">@{p.username}</span>
													</div>
													<div className="mt-1 h-2 w-full rounded-full bg-white/5 overflow-hidden">
														<div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400" style={{ width: `${progress * 100}%` }} />
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="text-sm font-semibold">{p.points.toLocaleString()} pts</div>
												<div className="text-[10px] text-gray-400">next rank in {(Math.max(0, maxPoints + 500 - p.points)).toLocaleString()} pts</div>
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