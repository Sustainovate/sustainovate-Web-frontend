"use client"

import { Calendar, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type EventHeaderProps = {
	title: string
	firstActivityDate?: string
	onAddActivity?: () => void
	onViewLiveInfo?: () => void
}

export function EventHeader({
	title,
	firstActivityDate,
	onAddActivity,
	onViewLiveInfo,
}: EventHeaderProps) {
	return (
		<section className="w-full rounded-xl border border-neutral-800 bg-neutral-900 text-gray-100 shadow-sm">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6">
				<div className="flex items-center gap-2 sm:gap-3">
					<h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
					<Edit2 className="size-4 text-gray-400" />
				</div>
				<Button variant="secondary" onClick={onViewLiveInfo} className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white">
					Event live info
				</Button>
			</div>
			{firstActivityDate ? (
				<div className="px-4 sm:px-6 pb-4 sm:pb-6">
					<div className="text-sm text-gray-300 flex items-center gap-2">
						<Calendar className="size-4" />
						<span>
							First Activity Date: {new Date(firstActivityDate).toLocaleDateString()}
						</span>
					</div>
					<div className="mt-3 sm:mt-4">
						<Button onClick={onAddActivity} className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white">
							+ Add Activity
						</Button>
					</div>
				</div>
			) : null}
		</section>
	)
} 