import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Calendar, Mic, TrendingUp } from 'lucide-react'
import { getRegistrations } from '@/lib/api/registrations'
import { getSpeakers } from '@/lib/api/speakers'
import { getEvents } from '@/lib/api/events'

export default function DashboardPage() {
  const [stats, setStats] = useState({ registrations: 0, speakers: 0, events: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const [regs, spks, evts] = await Promise.all([
          getRegistrations(),
          getSpeakers(),
          getEvents(),
        ])
        setStats({
          registrations: regs.length,
          speakers: spks.length,
          events: evts.length,
        })
      } catch {
        setStats({ registrations: 0, speakers: 0, events: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const cards = [
    { label: 'Registrations', value: stats.registrations, icon: Users, color: '#5856d6' },
    { label: 'Speakers', value: stats.speakers, icon: Mic, color: '#34c759' },
    { label: 'Events', value: stats.events, icon: Calendar, color: '#ff9500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-display font-black text-[#1d1d1f] mb-1">Dashboard</h1>
      <p className="text-[#1d1d1f]/50 text-sm mb-8">Overview of your Nari Nexus data</p>

      <div className="grid grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-black/5"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${card.color}15` }}
            >
              <card.icon size={20} style={{ color: card.color }} />
            </div>
            <p className="text-3xl font-display font-black text-[#1d1d1f]">
              {loading ? '—' : card.value}
            </p>
            <p className="text-[#1d1d1f]/50 text-sm mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <div className="bg-white rounded-2xl p-8 border border-black/5">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-[#5856d6]" />
            <h2 className="font-display font-bold text-lg text-[#1d1d1f]">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Link to="/admin/registrations" className="p-4 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] transition-colors text-center">
              <Users size={20} className="mx-auto mb-2 text-[#5856d6]" />
              <p className="text-sm font-[500] text-[#1d1d1f]">View Registrations</p>
            </Link>
            <Link to="/admin/speakers" className="p-4 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] transition-colors text-center">
              <Mic size={20} className="mx-auto mb-2 text-[#34c759]" />
              <p className="text-sm font-[500] text-[#1d1d1f]">Manage Speakers</p>
            </Link>
            <Link to="/admin/events" className="p-4 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] transition-colors text-center">
              <Calendar size={20} className="mx-auto mb-2 text-[#ff9500]" />
              <p className="text-sm font-[500] text-[#1d1d1f]">Manage Events</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}