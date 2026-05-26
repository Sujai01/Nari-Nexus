import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getEvents } from '@/lib/api/events'

const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FLAGSHIP_EVENTS = [
  {
    id: 'flagship-1',
    title: 'NARI Summit 2026',
    start_date: '2026-09-25',
    end_date: '2026-09-28',
    location: 'Greater Noida, India',
    description: 'Our flagship international summit bringing together researchers, technologists, and innovators from 40+ countries.',
    event_type: 'Flagship',
  },
  {
    id: 'flagship-2',
    title: 'Research Symposium',
    start_date: '2026-03-15',
    end_date: '2026-03-17',
    location: 'Virtual',
    description: 'A virtual gathering of leading researchers presenting cutting-edge papers across multiple disciplines.',
    event_type: 'Virtual',
  },
  {
    id: 'flagship-3',
    title: 'Innovation Workshop Series',
    start_date: null,
    end_date: null,
    location: 'Online & In-Person',
    description: 'Monthly workshops led by industry experts on emerging technologies and research methodologies.',
    event_type: 'Ongoing',
  },
]

interface EventItem {
  id: string
  title: string
  description: string | null
  event_type: string | null
  start_date: string | null
  end_date: string | null
  location: string | null
}

function formatDateRange(start: string | null, end: string | null) {
  if (!start && !end) return 'Ongoing'
  if (!start) return end ? new Date(end).toLocaleDateString() : ''
  if (!end) return new Date(start).toLocaleDateString()
  return `${new Date(start).toLocaleDateString()} — ${new Date(end).toLocaleDateString()}`
}

export default function Events() {
  const [dbEvents, setDbEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
      .then(setDbEvents)
      .catch(() => setDbEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const merged = loading
    ? FLAGSHIP_EVENTS
    : [...FLAGSHIP_EVENTS, ...dbEvents.filter((e) => !FLAGSHIP_EVENTS.some((f) => f.title === e.title))]

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0f172a 0%, #020617 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #5856d6 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #34c759 0%, transparent 70%)' }}
        />
      </div>
      <motion.div
        className="relative pt-8 px-6 pb-20 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="mb-16"
        >
          <h1
            className="font-display font-semibold text-white tracking-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
          >
            Events
          </h1>
          <p className="text-white/50 text-[16px] mt-4 max-w-xl leading-relaxed">
            Join our prestigious gatherings of researchers, innovators, and thought leaders shaping the future of science and technology.
          </p>
        </motion.div>
        <div className="space-y-6">
          {merged.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: APPLE_EASE }}
              className="p-6 md:p-8 rounded-2xl apple-glass hover:bg-white/[0.06] transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/[0.08]">
                      {event.event_type || 'Event'}
                    </span>
                  </div>
                  <h2
                    className="font-display font-semibold text-white tracking-tight mb-3"
                    style={{ fontSize: 'clamp(20px, 3vw, 26px)' }}
                  >
                    {event.title}
                  </h2>
                  <p className="text-white/50 text-[14px] leading-relaxed mb-5 max-w-xl">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-6 text-white/40 text-[13px]">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDateRange(event.start_date, event.end_date)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-2">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <Link
                    to={`/events/${event.title.toLowerCase().replace(/ /g, '-')}`}
                    className="inline-flex items-center gap-2 text-white/60 text-[13px] font-medium group-hover:text-white transition-colors"
                  >
                    Learn more
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}