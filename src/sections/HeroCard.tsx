import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

// ── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(targetISO: string) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now()
    if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00', done: true }
    const d = Math.floor(diff / 86_400_000)
    const h = Math.floor((diff % 86_400_000) / 3_600_000)
    const m = Math.floor((diff % 3_600_000) / 60_000)
    const s = Math.floor((diff % 60_000) / 1_000)
    const p = (n: number) => String(n).padStart(2, '0')
    return { d: p(d), h: p(h), m: p(m), s: p(s), done: false }
  }
  const [tick, setTick] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTick(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return tick
}

// ── Floating chip component ──────────────────────────────────────────────────
function Chip({
  children,
  style,
  animClass,
}: {
  children: React.ReactNode
  style: React.CSSProperties
  animClass: string
}) {
  return (
    <div
      className={`float-chip ${animClass}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}

// ── Countdown box ────────────────────────────────────────────────────────────
function CdBox({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center min-w-[56px] px-4 py-3 rounded-xl text-center"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <span className="font-display font-black text-[22px] text-[#f5f5f7] leading-none tracking-[-0.02em]">
        {value}
      </span>
      <span className="text-[9px] text-white/40 uppercase tracking-[0.07em] mt-[3px]">
        {label}
      </span>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function HeroCard() {
  const { d, h, m, s } = useCountdown('2026-09-25T09:00:00+05:30')

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <div
      className="card col-full"
      style={{ background: '#1d1d1f', minHeight: '620px', paddingTop: '64px' }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(88,86,214,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(52,199,89,0.10) 0%, transparent 55%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      {/* Floating chips */}
      <Chip
        animClass="animate-float-a"
        style={{
          top: '18%', left: '5%',
          background: 'rgba(88,86,214,0.18)',
          border: '1px solid rgba(88,86,214,0.3)',
          color: 'rgba(162,157,255,0.95)',
        }}
      >
        🎓 IEEE Affiliated
      </Chip>
      <Chip
        animClass="animate-float-b"
        style={{
          top: '20%', right: '6%',
          background: 'rgba(52,199,89,0.13)',
          border: '1px solid rgba(52,199,89,0.25)',
          color: 'rgba(48,209,88,0.95)',
        }}
      >
        📍 Greater Noida
      </Chip>
      <Chip
        animClass="animate-float-c"
        style={{
          bottom: '35%', left: '3%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        ⚡ 500+ Speakers
      </Chip>
      <Chip
        animClass="animate-float-d"
        style={{
          bottom: '30%', right: '4%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        🌍 40+ Countries
      </Chip>

      {/* Text content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-7">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(52,199,89,0.12)', border: '1px solid rgba(52,199,89,0.3)' }}
          >
            <div className="w-[7px] h-[7px] rounded-full animate-pulse-dot" style={{ background: '#34c759', boxShadow: '0 0 6px #34c759' }} />
          </div>
          <span className="eyebrow" style={{ color: 'rgba(162,157,255,0.85)', marginBottom: 0 }}>
            NARI International Summit 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="card-title text-center"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: '#f5f5f7',
            maxWidth: '780px',
          }}
        >
          Where{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a29dff, #7b78ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Research
          </span>{' '}
          meets{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #34c759, #6dff9d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Innovation.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="card-body"
          style={{ color: 'rgba(255,255,255,0.62)', marginTop: '16px' }}
        >
          India's premier academic summit for researchers, technologists, and innovators.{' '}
          <span style={{ color: 'rgba(255,255,255,0.38)' }}>September 25–28 · Greater Noida.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap justify-center mb-8">
          <Link
            to="/events/nari-summit-2026/register"
            className="pill-btn pill-btn-primary no-underline flex items-center gap-2"
          >
            Register Now <ArrowRight size={14} />
          </Link>
          <Link
            to="/editions"
            className="pill-btn no-underline flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.09)', color: '#f5f5f7' }}
          >
            <Play size={13} fill="currentColor" /> Explore Editions
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={itemVariants} className="flex gap-2 mb-10">
          <CdBox value={d} label="Days" />
          <CdBox value={h} label="Hrs" />
          <CdBox value={m} label="Min" />
          <CdBox value={s} label="Sec" />
        </motion.div>
      </motion.div>

      {/* Bottom wordmark — fades into card bottom */}
      <div
        aria-hidden="true"
        style={{
          width: '100%',
          textAlign: 'center',
          overflow: 'hidden',
          marginTop: 'auto',
          lineHeight: 0.85,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '100%',
            background: 'linear-gradient(to top, #1d1d1f 20%, transparent)',
            zIndex: 1,
          }}
        />
        <span
          className="font-display font-black select-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 200px)',
            letterSpacing: '-0.06em',
            color: 'rgba(255,255,255,0.03)',
            display: 'block',
            lineHeight: 0.9,
          }}
        >
          NARI 2026
        </span>
      </div>
    </div>
  )
}
