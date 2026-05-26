import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe } from 'lucide-react'
import { getSpeakers } from '@/lib/api/speakers'

const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface SpeakerItem {
  id: string
  name: string
  designation: string | null
  organization: string | null
  bio: string | null
  image_url: string | null
}

const FEATURED_SPEAKERS = [
  {
    id: 'ft-1',
    name: 'Dr. Rakesh Sharma',
    role: 'Professor, IIT Delhi',
    type: 'Keynote',
    country: 'India',
  },
  {
    id: 'ft-2',
    name: 'Prof. Meena Pillai',
    role: 'Director, BITS Pilani',
    type: 'Keynote',
    country: 'India',
  },
  {
    id: 'ft-3',
    name: 'Dr. Ananya Kumar',
    role: 'Research Lead, Google DeepMind',
    type: 'Speaker',
    country: 'USA',
  },
  {
    id: 'ft-4',
    name: 'Dr. Suresh Nair',
    role: 'Professor, MIT',
    type: 'Panelist',
    country: 'USA',
  },
  {
    id: 'ft-5',
    name: 'Prof. Julia Williams',
    role: 'Head of AI Research, Oxford',
    type: 'Keynote',
    country: 'UK',
  },
  {
    id: 'ft-6',
    name: 'Dr. Michael Hoffmann',
    role: 'Director, Max Planck Institute',
    type: 'Speaker',
    country: 'Germany',
  },
]

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function Speakers() {
  const [dbSpeakers, setDbSpeakers] = useState<SpeakerItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpeakers()
      .then(setDbSpeakers)
      .catch(() => setDbSpeakers([]))
      .finally(() => setLoading(false))
  }, [])

  const renderedSpeakers = loading
    ? FEATURED_SPEAKERS
    : [
        ...dbSpeakers.map((s) => ({
          id: s.id,
          name: s.name,
          role: [s.designation, s.organization].filter(Boolean).join(', ') || 'Speaker',
          type: 'Speaker',
          country: '',
        })),
        ...FEATURED_SPEAKERS,
      ]

  const totalCount = loading ? '500+' : dbSpeakers.length + FEATURED_SPEAKERS.length

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1e1030 0%, #0a0015 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7b78ff 0%, transparent 70%)' }}
        />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ff6b9d 0%, transparent 70%)' }}
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
            Speakers
          </h1>
          <p className="text-white/50 text-[16px] mt-4 max-w-xl leading-relaxed">
            Meet the distinguished researchers, industry leaders, and innovators sharing their expertise at our summits and events.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full apple-glass mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="text-[12px] font-medium text-white/60">
            {totalCount} Confirmed Speakers
          </span>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {renderedSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.6, ease: APPLE_EASE }}
              className="p-6 rounded-2xl apple-glass hover:bg-white/[0.06] transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="font-display font-semibold text-white text-lg">
                    {getInitials(speaker.name)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-[16px] tracking-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-white/50 text-[13px] mt-1">
                    {speaker.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/40 px-2 py-1 rounded bg-white/[0.05]">
                  {speaker.type}
                </span>
                {speaker.country && (
                  <span className="flex items-center gap-1 text-white/40 text-[12px]">
                    <Globe size={12} />
                    {speaker.country}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
          className="mt-16 text-center p-10 rounded-2xl apple-glass"
        >
          <h3 className="font-display font-semibold text-white text-[20px] mb-3">
            Interested in speaking?
          </h3>
          <p className="text-white/50 text-[14px] mb-6 max-w-md mx-auto">
            We're always looking for distinguished researchers and industry experts to share their insights.
          </p>
          <a
            href="mailto:speakers@narinexus.org"
            className="inline-flex items-center gap-2 bg-white text-black text-[13px] font-semibold px-6 py-3 rounded-full hover:scale-[1.02] transition-transform"
          >
            Submit Proposal
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}