import { motion } from 'framer-motion'
import { Award, CheckCircle2 } from 'lucide-react'

export default function IEEECard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    },
  }

  return (
    <motion.div
      className="card card-grid-half card-lavender relative overflow-hidden"
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
      {/* Subtle Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(179,167,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full justify-between">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(88,86,214,0.65)' }}
          >
            Academic Recognition
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: '#1d1d1f',
              marginTop: '10px',
              marginBottom: '10px',
              maxWidth: '280px',
            }}
          >
            Indexed & <span style={{ color: '#5856d6' }}>Peer Reviewed</span>
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.58,
              maxWidth: '260px',
              marginBottom: '20px',
            }}
          >
            Papers published in IEEE Xplore, ACM Digital Library, and Springer proceedings.
          </p>
        </div>

        {/* IEEE Badge */}
        <motion.div
          className="relative mb-8"
          variants={badgeVariants}
        >
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(88,86,214,0.1), rgba(88,86,214,0.05))',
              border: '2px solid rgba(88,86,214,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(88,86,214,0.15)',
            }}
          >
            <Award
              size={52}
              style={{
                color: '#5856d6',
              }}
            />
          </div>
        </motion.div>

        {/* Recognition Items */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {[
            { text: 'IEEE Xplore Indexed' },
            { text: 'ACM Digital Library' },
            { text: 'Springer Proceedings' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: 'rgba(88,86,214,0.08)',
                border: '1px solid rgba(88,86,214,0.15)',
                animation: `fade-in 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s both`,
              }}
            >
              <CheckCircle2
                size={16}
                style={{
                  color: '#5856d6',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: '#1d1d1f',
                  fontSize: '13px',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}