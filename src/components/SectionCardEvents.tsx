import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { EventCard } from "./event-card"

interface Event {
  _id: string
  title: string
  description: string
  startTime: string
  endTime: string
  registrationEnd?: string
  category: string[]
  tags: string[]
  thumbnailUrl?: string
  registrationUserCount?: number
}

interface EventsSectionProps {
  loading: boolean;
  filteredEvents: Event[];
}

function EventsSection({ loading, filteredEvents }: EventsSectionProps) {
  // Helper: classify event
  const categorizeEvents = (events: any[]) => {
    const now = new Date()

    return {
      present: events.filter(
        (e) =>
          new Date(e.startTime) <= now &&
          new Date(e.endTime) >= now
      ),
      upcoming: events.filter(
        (e) => new Date(e.startTime) > now
      ),
      past: events.filter(
        (e) => new Date(e.endTime) < now
      ),
    }
  }

  const { present, upcoming, past } = categorizeEvents(filteredEvents)

  // Merge in the desired order
  const orderedEvents = [...present, ...upcoming, ...past]

  return (
    <section>
      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          <Loader2 className="animate-spin mr-2" /> Loading events...
        </div>
      ) : (
        <AnimatePresence>
          {orderedEvents.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {orderedEvents.map((e) => (
                <motion.div
                  key={e._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <EventCard
                    id={e._id}
                    title={e.title}
                    description={e.description}
                    thumbnailUrl={e.thumbnailUrl}
                    date={e.startTime}
                    durationDays={
                      e.registrationEnd
                        ? Math.max(
                            0,
                            Math.ceil(
                              (new Date(e.registrationEnd).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          )
                        : 0
                    }
                    category={e.category.join(", ")}
                    interestedCount={e.registrationUserCount}
                    tags={e.tags}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 mt-10 text-lg">
              No events match the selected filters.
            </p>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}

export default EventsSection
