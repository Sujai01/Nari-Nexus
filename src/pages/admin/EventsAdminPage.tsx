import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, MapPin, Calendar, X } from 'lucide-react'
import { getEvents, createEvent } from '@/lib/api/events'

interface Event {
  id: string
  title: string
  description: string | null
  event_type: string | null
  start_date: string | null
  end_date: string | null
  location: string | null
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', event_type: '', start_date: '', end_date: '', location: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getEvents().then(setEvents).catch(() => setEvents([])).finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const event = await createEvent(form)
      setEvents([...events, event])
      setShowModal(false)
      setForm({ title: '', description: '', event_type: '', start_date: '', end_date: '', location: '' })
    } catch {}
    setSubmitting(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-black text-[#1d1d1f]">Events</h1>
          <p className="text-[#1d1d1f]/50 text-sm">{events.length} events created</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#5856d6] text-white px-4 py-2 rounded-xl text-sm font-[500] hover:bg-[#4845c2] transition-colors"
        >
          <Plus size={16} />
          Create Event
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-black/30">Loading...</div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center text-black/30">
          No events yet. Create your first event.
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-black/5 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-display font-bold text-[#1d1d1f]">{event.title}</h3>
                    {event.event_type && (
                      <span className="px-2 py-1 rounded-md bg-[#5856d6]/10 text-[#5856d6] text-xs font-[500]">
                        {event.event_type}
                      </span>
                    )}
                  </div>
                  {event.description && <p className="text-sm text-[#1d1d1f]/50 mb-3">{event.description}</p>}
                  <div className="flex gap-4 text-sm text-[#1d1d1f]/40">
                    {event.start_date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(event.start_date).toLocaleDateString()}
                        {event.end_date && ` — ${new Date(event.end_date).toLocaleDateString()}`}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-[#1d1d1f]">Create Event</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-black/5 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]">
                <option value="">Select type</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="expo">Expo</option>
              </select>
              <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6] resize-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
                <input type="datetime-local" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              </div>
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              <button type="submit" disabled={submitting} className="w-full bg-[#5856d6] text-white py-3 rounded-xl font-[500] hover:bg-[#4845c2] disabled:opacity-50">
                {submitting ? 'Creating...' : 'Create Event'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}