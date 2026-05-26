import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Speaker {
  id: string
  initials: string
  name: string
  role: string
  organization: string
  badge: string
  badgeColor: 'purple' | 'green' | 'blue'
  portraitBg: string
}

const FEATURED_SPEAKERS: Speaker[] = [
  {
    id: '1',
    initials: 'RS',
    name: 'Dr. Rakesh Sharma',
    role: 'IIT Delhi · Keynote',
    organization: 'Professor',
    badge: 'Keynote',
    badgeColor: 'purple',
    portraitBg: 'linear-gradient(160deg, rgba(162,157,255,0.15), rgba(88,86,214,0.08))',
  },
  {
    id: '2',
    initials: 'MP',
    name: 'Prof. Meena Pillai',
    role: 'BITS Pilani · Panel',
    organization: 'Department Head',
    badge: 'Panelist',
    badgeColor: 'green',
    portraitBg: 'linear-gradient(160deg, rgba(48,209,88,0.12), rgba(35,199,89,0.05))',
  },
  {
    id: '3',
    initials: 'AK',
    name: 'Ananya Kumar',
    role: 'Google DeepMind',
    organization: 'Research Lead',
    badge: 'Speaker',
    badgeColor: 'purple',
    portraitBg: 'linear-gradient(160deg, rgba(162,157,255,0.1), rgba(88,86,214,0.06))',
  },
  {
    id: '4',
    initials: 'SN',
    name: 'Dr. Suresh Nair',
    role: 'NIT · Workshop',
    organization: 'Director',
    badge: 'Workshop',
    badgeColor: 'blue',
    portraitBg: 'linear-gradient(160deg, rgba(78,184,255,0.12), rgba(41,151,255,0.06))',
  },
]

const badgeStyles = {
  purple: {
    bg: 'rgba(162,157,255,0.12)',
    border: '1px solid rgba(162,157,255,0.2)',
    color: 'rgba(185,182,255,0.9)',
  },
  green: {
    bg: 'rgba(48,209,88,0.1)',
    border: '1px solid rgba(48,209,88,0.2)',
    color: 'rgba(90,230,120,0.9)',
  },
  blue: {
    bg: 'rgba(78,184,255,0.1)',
    border: '1px solid rgba(78,184,255,0.2)',
    color: 'rgba(78,184,255,0.9)',
  },
}

export default function SpeakersCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.div
      className="card card-grid-half card-purple relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 0',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Subtle Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(88,86,214,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(162,157,255,0.75)', marginBottom: 0 }}
          >
            Expert Speakers
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#f5f5f7',
              maxWidth: '320px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Voices that{' '}
            <span className="gradient-purple-text">define</span>{' '}
            the future.
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '300px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '16px',
            }}
          >
            Keynotes from IIT, BITS, IISc, Google DeepMind, and global research institutions.
          </p>

          <Link
            to="/speakers"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(162,157,255,0.9)',
              borderColor: 'rgba(162,157,255,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            Meet all speakers <ArrowRight size={12} />
          </Link>
        </div>

        {/* Speaker Portraits Row */}
        <div
          className="relative w-full flex-1 flex items-end overflow-hidden"
          style={{ paddingBottom: 0 }}
        >
          <div className="flex gap-3 w-full px-1 pb-0 items-end">
            {FEATURED_SPEAKERS.map((speaker, index) => (
              <div
                key={speaker.id}
                className="flex-1 rounded-2xl relative overflow-hidden flex flex-col justify-end p-[10px]"
                style={{
                  minHeight: '180px',
                  background: speaker.portraitBg,
                  border: '1px solid rgba(255,255,255,0.08)',
                  transform: `translateY(${[0, -14, -6, -10][index]}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Fade Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55))',
                    zIndex: 1,
                  }}
                />

                {/* Initials Watermark */}
                <span
                  className="font-display font-black absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                    fontSize: '30px',
                    color: 'rgba(255,255,255,0.1)',
                  }}
                >
                  {speaker.initials}
                </span>

                {/* Speaker Info */}
                <p
                  className="relative z-10 text-[11px] font-[500] text-[#f5f5f7] leading-[1.3]"
                  style={{ marginBottom: 0 }}
                >
                  {speaker.name}
                </p>
                <p
                  className="relative z-10 text-[10px] text-white/45 mb-[6px]"
                  style={{ marginTop: '2px' }}
                >
                  {speaker.role}
                </p>
                <span
                  className="relative z-10 self-start text-[9px] font-[500] px-[7px] py-[2px] rounded-[5px] uppercase tracking-[0.04em]"
                  style={{
                    background: badgeStyles[speaker.badgeColor].bg,
                    border: badgeStyles[speaker.badgeColor].border,
                    color: badgeStyles[speaker.badgeColor].color,
                  }}
                >
                  {speaker.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}