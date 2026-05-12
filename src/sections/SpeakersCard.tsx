import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SPEAKERS = [
  { initials: 'RS', name: 'Dr. Rakesh Sharma',  role: 'IIT Delhi · Keynote',  tag: 'Keynote',  color: 'purple', offset: 0 },
  { initials: 'MP', name: 'Prof. Meena Pillai',  role: 'BITS Pilani · Panel',  tag: 'Panelist', color: 'green',  offset: -14 },
  { initials: 'AK', name: 'Ananya Kumar',        role: 'Google DeepMind',      tag: 'Speaker',  color: 'purple', offset: -6 },
  { initials: 'SN', name: 'Dr. Suresh Nair',     role: 'NIT · Workshop',       tag: 'Workshop', color: 'blue',   offset: -10 },
]

const TAG_STYLES: Record<string, React.CSSProperties> = {
  purple: { background: 'rgba(162,157,255,0.12)', border: '1px solid rgba(162,157,255,0.2)',  color: 'rgba(185,182,255,0.9)' },
  green:  { background: 'rgba(48,209,88,0.1)',    border: '1px solid rgba(48,209,88,0.2)',    color: 'rgba(90,230,120,0.9)'  },
  blue:   { background: 'rgba(78,184,255,0.1)',   border: '1px solid rgba(78,184,255,0.2)',   color: 'rgba(78,184,255,0.9)'  },
}

const AV_STYLES: Record<string, React.CSSProperties> = {
  purple: { background: 'rgba(162,157,255,0.12)', border: '1px solid rgba(162,157,255,0.2)', color: 'rgba(185,182,255,0.9)' },
  green:  { background: 'rgba(48,209,88,0.1)',    border: '1px solid rgba(48,209,88,0.2)',   color: 'rgba(90,230,120,0.9)' },
  blue:   { background: 'rgba(78,184,255,0.1)',   border: '1px solid rgba(78,184,255,0.2)',  color: 'rgba(78,184,255,0.9)' },
}

export default function SpeakersCard() {
  return (
    <motion.div
      className="card col-half"
      style={{ background: '#1c1243', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px 0' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(88,86,214,0.12) 0%, transparent 70%)',
        }}
      />

      <p className="eyebrow relative" style={{ color: 'rgba(162,157,255,0.75)' }}>Expert Speakers</p>

      <h2
        className="card-title relative"
        style={{ fontSize: 'clamp(28px, 3vw, 44px)', color: '#f5f5f7', maxWidth: '320px' }}
      >
        Voices that{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #a29dff, #d4d0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          define
        </span>{' '}
        the future.
      </h2>

      <p className="card-body relative" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '300px', textAlign: 'left' }}>
        Keynotes from IIT, BITS, IISc, Google DeepMind, and global research institutions.
      </p>

      <div className="card-links relative" style={{ justifyContent: 'flex-start', marginBottom: '28px' }}>
        <Link
          to="/speakers"
          className="card-link no-underline flex items-center gap-1"
          style={{ color: 'rgba(162,157,255,0.9)', borderColor: 'rgba(162,157,255,0.35)' }}
        >
          Meet all speakers <ArrowRight size={12} />
        </Link>
      </div>

      {/* Speaker portraits row */}
      <div
        className="relative w-full flex-1 flex items-end overflow-hidden"
        style={{ paddingBottom: 0 }}
      >
        <div className="flex gap-3 w-full px-1 pb-0 items-end">
          {SPEAKERS.map((spk) => (
            <div
              key={spk.initials}
              className="flex-1 rounded-2xl relative overflow-hidden"
              style={{
                minHeight: '180px',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.08)',
                transform: `translateY(${spk.offset}px)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '10px',
              }}
            >
              {/* Fade overlay */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55))',
                }}
              />
              {/* Initials watermark */}
              <span
                aria-hidden
                className="font-display font-black absolute"
                style={{
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -60%)',
                  fontSize: '30px',
                  color: 'rgba(255,255,255,0.1)',
                }}
              >
                {spk.initials}
              </span>
              {/* Name & tag */}
              <p className="relative text-[11px] font-[500] text-[#f5f5f7] leading-[1.3] z-10">{spk.name}</p>
              <p className="relative text-[10px] text-white/45 mb-[6px] z-10">{spk.role}</p>
              <span
                className="relative z-10 self-start text-[9px] font-[500] px-[7px] py-[2px] rounded-[5px] uppercase tracking-[0.04em]"
                style={TAG_STYLES[spk.color]}
              >
                {spk.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
