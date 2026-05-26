import { motion } from 'framer-motion'
import { Zap, Cpu, Microscope, Wifi, Lightbulb, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ExpoCategory {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const EXPO_CATEGORIES: ExpoCategory[] = [
  {
    id: '1',
    icon: <Cpu size={28} />,
    title: 'AI & ML',
    description: 'Artificial Intelligence and Machine Learning innovations',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: '2',
    icon: <Microscope size={28} />,
    title: 'Biotech',
    description: 'Biotechnology and life sciences research',
    color: 'from-green-400 to-green-600',
  },
  {
    id: '3',
    icon: <Wifi size={28} />,
    title: '5G & IoT',
    description: 'Next-gen connectivity and smart devices',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: '4',
    icon: <Lightbulb size={28} />,
    title: 'Climate Tech',
    description: 'Sustainable and green technology solutions',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    id: '5',
    icon: <Shield size={28} />,
    title: 'Cybersecurity',
    description: 'Information security and threat protection',
    color: 'from-red-400 to-red-600',
  },
  {
    id: '6',
    icon: <Zap size={28} />,
    title: 'Quantum',
    description: 'Quantum computing and quantum technologies',
    color: 'from-indigo-400 to-indigo-600',
  },
]

export default function ExpoCard() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

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
      className="card card-grid-full card-slate relative overflow-hidden"
      style={{
        minHeight: '480px',
        padding: '52px 40px 40px',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(78,184,255,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(52,199,89,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(78,184,255,0.7)' }}
          >
            Innovation Expo 2026
          </p>

          <h2
            className="text-heading-2"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              color: '#f5f5f7',
              marginTop: '10px',
              marginBottom: '10px',
              maxWidth: '700px',
            }}
          >
            Explore Tomorrow's <span className="gradient-green-text">Technology</span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Six interactive zones showcasing cutting-edge research and innovation across AI, biotech, quantum, and more.
          </p>
        </div>

        {/* Expo Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1000px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPO_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              className="group rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {/* Hover Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(78,184,255,0.15), rgba(52,199,89,0.1))`,
                }}
              />

              {/* Icon Container */}
              <div
                className="relative z-10 mb-4 inline-flex p-3 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div style={{ color: '#4eb8ff' }}>
                  {category.icon}
                </div>
              </div>

              {/* Category Title */}
              <h3
                className="font-display font-black relative z-10 mb-2"
                style={{
                  fontSize: '16px',
                  color: '#f5f5f7',
                  lineHeight: 1.2,
                }}
              >
                {category.title}
              </h3>

              {/* Category Description */}
              <p
                className="relative z-10 text-[13px]"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5,
                  marginBottom: 0,
                }}
              >
                {category.description}
              </p>

              {/* Arrow Indicator */}
              <div
                className="relative z-10 mt-4 inline-flex opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  fontSize: '14px',
                  color: 'rgba(78,184,255,0.8)',
                }}
              >
                →
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <Link
          to="/events"
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full font-[500] text-[14px] no-underline transition-all duration-200"
          style={{
            background: 'rgba(78,184,255,0.15)',
            border: '1px solid rgba(78,184,255,0.3)',
            color: '#4eb8ff',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(78,184,255,0.25)'
            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(78,184,255,0.5)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(78,184,255,0.15)'
            ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(78,184,255,0.3)'
          }}
        >
          View Expo Schedule →
        </Link>
      </div>
    </motion.div>
  )
}