import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function HeroCard() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-09-25T09:00:00+05:30').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <div
      className="card card-grid-full card-dark relative overflow-hidden"
      style={{ minHeight: '620px', paddingTop: '64px' }}
    >
      {/* Background Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(88, 86, 214, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(52, 199, 89, 0.1) 0%, transparent 55%)
          `,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      {/* Floating Chips */}
      <motion.div
        className="absolute top-[18%] left-[5%] float-chip text-[11px] font-[500] px-[13px] py-[6px] rounded-full backdrop-blur-[12px] pointer-events-none animate-float"
        style={{
          background: 'rgba(88, 86, 214, 0.18)',
          border: '1px solid rgba(88, 86, 214, 0.3)',
          color: 'rgba(162, 157, 255, 0.95)',
        }}
      >
        🎓 IEEE Affiliated
      </motion.div>

      <motion.div
        className="absolute top-[20%] right-[6%] float-chip text-[11px] font-[500] px-[13px] py-[6px] rounded-full backdrop-blur-[12px] pointer-events-none animate-float-slow"
        style={{
          background: 'rgba(52, 199, 89, 0.13)',
          border: '1px solid rgba(52, 199, 89, 0.25)',
          color: 'rgba(48, 209, 88, 0.95)',
        }}
      >
        📍 Greater Noida
      </motion.div>

      <motion.div
        className="absolute bottom-[35%] left-[3%] float-chip text-[11px] font-[500] px-[13px] py-[6px] rounded-full backdrop-blur-[12px] pointer-events-none animate-float"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        ⚡ 500+ Speakers
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[4%] float-chip text-[11px] font-[500] px-[13px] py-[6px] rounded-full backdrop-blur-[12px] pointer-events-none animate-float-slow"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        🌍 40+ Countries
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-7"
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(52, 199, 89, 0.12)',
              border: '1px solid rgba(52, 199, 89, 0.3)',
            }}
          >
            <div
              className="w-[7px] h-[7px] rounded-full animate-pulse-dot"
              style={{
                background: '#34c759',
                boxShadow: '0 0 6px #34c759',
              }}
            />
          </div>
          <span
            className="text-eyebrow"
            style={{
              color: 'rgba(162, 157, 255, 0.85)',
              marginBottom: 0,
            }}
          >
            NARI International Summit 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-heading-2 text-center"
          style={{
            maxWidth: '780px',
            color: '#f5f5f7',
          }}
        >
          Where{' '}
          <span className="gradient-purple-text">Research</span>{' '}
          meets{' '}
          <span className="gradient-green-text">Innovation.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg font-[300] text-center mt-4"
          style={{
            color: 'rgba(255, 255, 255, 0.62)',
            maxWidth: '560px',
          }}
        >
          India's premier academic summit for researchers, technologists, and innovators.{' '}
          <span style={{ color: 'rgba(255, 255, 255, 0.38)' }}>
            September 25–28 · Greater Noida.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 flex-wrap justify-center mb-8 mt-6"
        >
          <button
            className="inline-flex items-center gap-2 bg-[#5856d6] text-white px-7 py-[13px] rounded-full text-[14px] font-[500] no-underline border-none cursor-pointer transition-all duration-200 hover:bg-[#4845c2] hover:scale-102"
            style={{
              boxShadow: '0 0 20px rgba(88, 86, 214, 0.35)',
            }}
          >
            Register Now <ArrowRight size={14} />
          </button>
          <button
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-full text-[14px] font-[400] no-underline border-none cursor-pointer transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.09)',
              color: '#f5f5f7',
              boxShadow: '0 0 20px rgba(88, 86, 214, 0.15)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)')}
          >
            <Play size={13} fill="currentColor" /> Explore Editions
          </button>
        </motion.div>

        {/* Countdown */}
        <motion.div
          variants={itemVariants}
          className="flex gap-2 mb-10"
        >
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hrs', value: countdown.hours },
            { label: 'Min', value: countdown.minutes },
            { label: 'Sec', value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center min-w-[56px] px-4 py-3 rounded-xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span
                className="font-display font-black text-[22px] leading-none tracking-[-0.02em]"
                style={{ color: '#f5f5f7' }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.07em] mt-[3px]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Wordmark */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center overflow-hidden pointer-events-none"
        style={{
          lineHeight: 0.85,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
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
            color: 'rgba(255, 255, 255, 0.03)',
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