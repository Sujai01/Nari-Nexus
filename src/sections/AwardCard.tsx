import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AwardWinner {
  year: string
  count: number
}

const AWARD_HISTORY: AwardWinner[] = [
  { year: '2023', count: 12 },
  { year: '2024', count: 18 },
  { year: '2025', count: 22 },
]

export default function AwardCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const trophyVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
    },
  }

  return (
    <motion.div
      className="card card-grid-half card-rose relative overflow-hidden"
      style={{
        alignItems: 'center',
        textAlign: 'center',
        padding: '44px 32px 0',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 90%, rgba(255,107,157,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full justify-between w-full">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(255,107,157,0.7)' }}
          >
            Women in STEM
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: '#f5f5f7',
              marginTop: '10px',
              marginBottom: '10px',
              maxWidth: '280px',
            }}
          >
            Best Women in <span style={{ color: '#ff6b9d' }}>Research</span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.58,
              maxWidth: '260px',
              marginBottom: '20px',
            }}
          >
            Celebrating exceptional female researchers and innovators in STEM.
          </p>
        </div>

        {/* Trophy Visual */}
        <motion.div
          className="relative mb-8"
          variants={trophyVariants}
        >
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Trophy Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy
                size={60}
                style={{
                  color: '#ff6b9d',
                  filter: 'drop-shadow(0 8px 20px rgba(255, 107, 157, 0.25))',
                }}
              />

              {/* Star Accent */}
              <Star
                size={24}
                style={{
                  color: '#ff6b9d',
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  fill: 'currentColor',
                  animation: 'pulse 2.4s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Award Stats */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {AWARD_HISTORY.map((award, index) => (
              <motion.div
                key={award.year}
                className="rounded-lg px-3 py-4"
                style={{
                  background: 'rgba(255,107,157,0.12)',
                  border: '1px solid rgba(255,107,157,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3 + index * 0.1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#ff6b9d',
                    lineHeight: 1,
                  }}
                >
                  {award.count}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {award.year}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Learn More Link */}
          <Link
            to="/about"
            className="inline-block mt-2 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(255,107,157,0.9)',
              borderColor: 'rgba(255,107,157,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            View award recipients →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AwardWinner {
  year: string
  count: number
}

const AWARD_HISTORY: AwardWinner[] = [
  { year: '2023', count: 12 },
  { year: '2024', count: 18 },
  { year: '2025', count: 22 },
]

export default function AwardCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const trophyVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
    },
  }

  return (
    <motion.div
      className="card card-grid-half card-rose relative overflow-hidden"
      style={{
        alignItems: 'center',
        textAlign: 'center',
        padding: '44px 32px 0',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 90%, rgba(255,107,157,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full justify-between w-full">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(255,107,157,0.7)' }}
          >
            Women in STEM
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: '#f5f5f7',
              marginTop: '10px',
              marginBottom: '10px',
              maxWidth: '280px',
            }}
          >
            Best Women in <span style={{ color: '#ff6b9d' }}>Research</span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.58,
              maxWidth: '260px',
              marginBottom: '20px',
            }}
          >
            Celebrating exceptional female researchers and innovators in STEM.
          </p>
        </div>

        {/* Trophy Visual */}
        <motion.div
          className="relative mb-8"
          variants={trophyVariants}
        >
          <div
            style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Trophy Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy
                size={60}
                style={{
                  color: '#ff6b9d',
                  filter: 'drop-shadow(0 8px 20px rgba(255, 107, 157, 0.25))',
                }}
              />

              {/* Star Accent */}
              <Star
                size={24}
                style={{
                  color: '#ff6b9d',
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  fill: 'currentColor',
                  animation: 'pulse 2.4s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Award Stats */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {AWARD_HISTORY.map((award, index) => (
              <motion.div
                key={award.year}
                className="rounded-lg px-3 py-4"
                style={{
                  background: 'rgba(255,107,157,0.12)',
                  border: '1px solid rgba(255,107,157,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3 + index * 0.1,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#ff6b9d',
                    lineHeight: 1,
                  }}
                >
                  {award.count}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {award.year}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Learn More Link */}
          <Link
            to="/about"
            className="inline-block mt-2 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(255,107,157,0.9)',
              borderColor: 'rgba(255,107,157,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            View award recipients →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}