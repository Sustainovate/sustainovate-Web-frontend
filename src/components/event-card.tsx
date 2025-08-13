"use client"

import Image from "next/image"
import { Button } from "@/components/ui"
import {
	Calendar,
	Clock3,
	Tag as TagIcon,
	Users,
} from "lucide-react"

export type EventCardProps = {
	id: string
	title: string
	date: string
	durationDays?: number
	category?: string
	priceGBP?: number
	thumbnailUrl?: string
	interestedCount: number
	tags?: string[]
	onJoin?: (id: string) => void
}

export function EventCard({
	id,
	title,
	date,
	durationDays = 1,
	category,
	priceGBP,
	thumbnailUrl,
	interestedCount,
	tags,
	onJoin,
}: EventCardProps) {
	const chips = tags && tags.length > 0 ? tags : (category ? [category] : [])

	return (
		<div className="w-full rounded-xl border border-neutral-800 bg-neutral-900 text-gray-100 overflow-hidden shadow-lg">
			<div className="relative h-40 sm:h-48 md:h-56 w-full bg-neutral-800">
				{thumbnailUrl ? (
					<Image src={thumbnailUrl} alt="Event cover" fill className="object-cover" />
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-fuchsia-600/20 to-emerald-600/30" />
				)}
				{category ? (
					<div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[10px] sm:text-xs">
						<TagIcon className="size-3.5" />
						<span>{category}</span>
					</div>
				) : null}
			</div>

			<div className="p-4 sm:p-5">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="space-y-2">
						<h3 className="text-lg sm:text-xl font-semibold leading-tight">{title}</h3>
						<div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-300">
							<span className="inline-flex items-center gap-1"><Calendar className="size-4" />{new Date(date).toLocaleDateString()}</span>
							<span className="inline-flex items-center gap-1"><Clock3 className="size-4" />{durationDays} days</span>
							{typeof priceGBP === "number" ? (
								<span className="inline-flex items-center gap-1">£{priceGBP}</span>
							) : null}
						</div>
						{chips.length > 0 ? (
							<div className="flex flex-wrap items-center gap-2">
								{chips.map((c) => (
									<span key={c} className="rounded-full bg-neutral-800 px-3 py-1 text-[10px] sm:text-xs text-gray-300 border border-neutral-700">
										{c}
									</span>
								))}
							</div>
						) : null}
					</div>

					<div className="flex flex-col sm:items-end gap-2 sm:gap-3 w-full sm:w-auto">
						<Button
							onClick={() => onJoin?.(id)}
							className="w-full sm:w-40 bg-indigo-500 hover:bg-indigo-600 text-white"
						>
							Join now
						</Button>
						<div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
							<Users className="size-4" />
							<span>{interestedCount.toLocaleString()} joined</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
} 