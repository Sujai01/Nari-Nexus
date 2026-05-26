import { motion } from 'framer-motion'
import { Calendar, Users, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

const SCHEDULE_STATS: StatItem[] = [
  {
    icon: <BookOpen size={20} />,
    value: '80+',
    label: 'Sessions',
    description: 'Keynotes, panels, workshops',
  },
  {
    icon: <Users size={20} />,
    value: '500+',
    label: 'Speakers',
    description: 'From 40+ countries',
  },
  {
    icon: <Calendar size={20} />,
    value: '4',
    label: 'Days',
    description: 'Sep 25-28, 2026',
  },
]

export default function ScheduleCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.25 + index * 0.1,
      },
    }),
  }

  return (
    <motion.div
      className="card card-grid-half card-cream relative overflow-hidden"
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(245,194,66,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(88,86,214,0.65)' }}
          >
            Event Schedule
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#1d1d1f',
              maxWidth: '320px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: '#5856d6' }}>Four</span> days of <span style={{ color: '#f5c242' }}>discovery</span>
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '300px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '20px',
            }}
          >
            Packed with keynotes, breakout sessions, workshops, and networking opportunities.
          </p>

          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: '#5856d6',
              borderColor: 'rgba(88,86,214,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            View full schedule →
          </Link>
        </div>

        {/* Stats Grid */}
        <div
          className="flex-1 flex items-end"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '12px',
            paddingBottom: '8px',
          }}
        >
          {SCHEDULE_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-5 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(245,194,66,0.08), rgba(245,194,66,0.04))',
                border: '1px solid rgba(88,86,214,0.12)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              custom={index}
              variants={statVariants}
              whileHover={{
                backgroundColor: 'rgba(245,194,66,0.12)',
                borderColor: 'rgba(88,86,214,0.2)',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Icon */}
              <div
                className="inline-flex p-2 rounded-lg mb-3"
                style={{
                  background: 'rgba(88,86,214,0.1)',
                  border: '1px solid rgba(88,86,214,0.15)',
                  color: '#5856d6',
                  transition: 'all 0.2s',
                }}
              >
                {stat.icon}
              </div>

              {/* Stats Content */}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: '24px',
                    color: '#1d1d1f',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#1d1d1f',
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)',
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}import { motion } from 'framer-motion'
import { Calendar, Users, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

const SCHEDULE_STATS: StatItem[] = [
  {
    icon: <BookOpen size={20} />,
    value: '80+',
    label: 'Sessions',
    description: 'Keynotes, panels, workshops',
  },
  {
    icon: <Users size={20} />,
    value: '500+',
    label: 'Speakers',
    description: 'From 40+ countries',
  },
  {
    icon: <Calendar size={20} />,
    value: '4',
    label: 'Days',
    description: 'Sep 25-28, 2026',
  },
]

export default function ScheduleCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.25 + index * 0.1,
      },
    }),
  }

  return (
    <motion.div
      className="card card-grid-half card-cream relative overflow-hidden"
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(245,194,66,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(88,86,214,0.65)' }}
          >
            Event Schedule
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#1d1d1f',
              maxWidth: '320px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: '#5856d6' }}>Four</span> days of <span style={{ color: '#f5c242' }}>discovery</span>
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '300px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '20px',
            }}
          >
            Packed with keynotes, breakout sessions, workshops, and networking opportunities.
          </p>

          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: '#5856d6',
              borderColor: 'rgba(88,86,214,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            View full schedule →
          </Link>
        </div>

        {/* Stats Grid */}
        <div
          className="flex-1 flex items-end"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '12px',
            paddingBottom: '8px',
          }}
        >
          {SCHEDULE_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-5 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(245,194,66,0.08), rgba(245,194,66,0.04))',
                border: '1px solid rgba(88,86,214,0.12)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              custom={index}
              variants={statVariants}
              whileHover={{
                backgroundColor: 'rgba(245,194,66,0.12)',
                borderColor: 'rgba(88,86,214,0.2)',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Icon */}
              <div
                className="inline-flex p-2 rounded-lg mb-3"
                style={{
                  background: 'rgba(88,86,214,0.1)',
                  border: '1px solid rgba(88,86,214,0.15)',
                  color: '#5856d6',
                  transition: 'all 0.2s',
                }}
              >
                {stat.icon}
              </div>

              {/* Stats Content */}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-display font-black"
                  style={{
                    fontSize: '24px',
                    color: '#1d1d1f',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#1d1d1f',
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)',
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}