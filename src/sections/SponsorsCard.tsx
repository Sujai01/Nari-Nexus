import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SponsorTier {
  tier: string
  color: string
  bgColor: string
  borderColor: string
  count: number
}

const SPONSOR_TIERS: SponsorTier[] = [
  {
    tier: 'Platinum',
    color: '#a8a9ad',
    bgColor: 'rgba(168,169,173,0.08)',
    borderColor: 'rgba(168,169,173,0.15)',
    count: 2,
  },
  {
    tier: 'Gold',
    color: '#d4a574',
    bgColor: 'rgba(212,165,116,0.08)',
    borderColor: 'rgba(212,165,116,0.15)',
    count: 5,
  },
  {
    tier: 'Silver',
    color: '#b4b4b4',
    bgColor: 'rgba(180,180,180,0.08)',
    borderColor: 'rgba(180,180,180,0.15)',
    count: 8,
  },
]

const SPONSOR_LOGOS = [
  { id: '1', initials: 'TCS', tier: 'Platinum', name: 'Tata Consultancy Services' },
  { id: '2', initials: 'IBM', tier: 'Platinum', name: 'IBM Research' },
  { id: '3', initials: 'GOOG', tier: 'Gold', name: 'Google Cloud' },
  { id: '4', initials: 'MSFT', tier: 'Gold', name: 'Microsoft Research' },
  { id: '5', initials: 'AWS', tier: 'Gold', name: 'Amazon Web Services' },
  { id: '6', initials: 'INTEL', tier: 'Gold', name: 'Intel Labs' },
  { id: '7', initials: 'NVIDIA', tier: 'Gold', name: 'NVIDIA Research' },
  { id: '8', initials: 'IIT', tier: 'Silver', name: 'IIT Bombay' },
  { id: '9', initials: 'BITS', tier: 'Silver', name: 'BITS Pilani' },
]

export default function SponsorsCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.25 + (index % 3) * 0.08,
      },
    }),
  }

  return (
    <motion.div
      className="card card-grid-half card-warm relative overflow-hidden"
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(212,165,116,0.1) 0%, transparent 70%)',
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
            Our Partners
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#1d1d1f',
              maxWidth: '300px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Powered by <span style={{ color: '#d4a574' }}>industry</span> leaders
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '290px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '16px',
            }}
          >
            World-class organizations supporting innovation and research.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: '#5856d6',
              borderColor: 'rgba(88,86,214,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            Become a sponsor <ArrowRight size={12} />
          </Link>
        </div>

        {/* Sponsor Tiers */}
        <div className="flex-1 flex flex-col justify-end gap-4 pb-0">
          {/* Sponsor Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {SPONSOR_LOGOS.slice(0, 9).map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                className="rounded-xl p-3 flex items-center justify-center aspect-square relative overflow-hidden group"
                style={{
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                custom={index}
                variants={logoVariants}
                whileHover={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderColor: 'rgba(0,0,0,0.12)',
                  scale: 1.08,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Logo Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(88,86,214,0.05), rgba(52,199,89,0.02))',
                  }}
                />

                {/* Sponsor Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <span
                    className="font-display font-black text-[11px] leading-tight"
                    style={{
                      color: '#1d1d1f',
                      marginBottom: '2px',
                    }}
                  >
                    {sponsor.initials}
                  </span>
                  <span
                    style={{
                      fontSize: '8px',
                      color: 'rgba(0,0,0,0.4)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {sponsor.tier}
                  </span>
                </div>

                {/* Tooltip on Hover */}
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20"
                  style={{
                    background: 'rgba(0,0,0,0.9)',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sponsor.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tier Legend */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {SPONSOR_TIERS.map((tierInfo) => (
              <div
                key={tierInfo.tier}
                className="rounded-lg px-3 py-2 text-[11px] font-[500] flex items-center gap-2"
                style={{
                  background: tierInfo.bgColor,
                  border: `1px solid ${tierInfo.borderColor}`,
                  color: '#1d1d1f',
                  opacity: 0.8,
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: tierInfo.color,
                    display: 'inline-block',
                  }}
                />
                {tierInfo.tier} ({tierInfo.count})
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface SponsorTier {
  tier: string
  color: string
  bgColor: string
  borderColor: string
  count: number
}

const SPONSOR_TIERS: SponsorTier[] = [
  {
    tier: 'Platinum',
    color: '#a8a9ad',
    bgColor: 'rgba(168,169,173,0.08)',
    borderColor: 'rgba(168,169,173,0.15)',
    count: 2,
  },
  {
    tier: 'Gold',
    color: '#d4a574',
    bgColor: 'rgba(212,165,116,0.08)',
    borderColor: 'rgba(212,165,116,0.15)',
    count: 5,
  },
  {
    tier: 'Silver',
    color: '#b4b4b4',
    bgColor: 'rgba(180,180,180,0.08)',
    borderColor: 'rgba(180,180,180,0.15)',
    count: 8,
  },
]

const SPONSOR_LOGOS = [
  { id: '1', initials: 'TCS', tier: 'Platinum', name: 'Tata Consultancy Services' },
  { id: '2', initials: 'IBM', tier: 'Platinum', name: 'IBM Research' },
  { id: '3', initials: 'GOOG', tier: 'Gold', name: 'Google Cloud' },
  { id: '4', initials: 'MSFT', tier: 'Gold', name: 'Microsoft Research' },
  { id: '5', initials: 'AWS', tier: 'Gold', name: 'Amazon Web Services' },
  { id: '6', initials: 'INTEL', tier: 'Gold', name: 'Intel Labs' },
  { id: '7', initials: 'NVIDIA', tier: 'Gold', name: 'NVIDIA Research' },
  { id: '8', initials: 'IIT', tier: 'Silver', name: 'IIT Bombay' },
  { id: '9', initials: 'BITS', tier: 'Silver', name: 'BITS Pilani' },
]

export default function SponsorsCard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.25 + (index % 3) * 0.08,
      },
    }),
  }

  return (
    <motion.div
      className="card card-grid-half card-warm relative overflow-hidden"
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(212,165,116,0.1) 0%, transparent 70%)',
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
            Our Partners
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#1d1d1f',
              maxWidth: '300px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Powered by <span style={{ color: '#d4a574' }}>industry</span> leaders
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '290px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '16px',
            }}
          >
            World-class organizations supporting innovation and research.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: '#5856d6',
              borderColor: 'rgba(88,86,214,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            Become a sponsor <ArrowRight size={12} />
          </Link>
        </div>

        {/* Sponsor Tiers */}
        <div className="flex-1 flex flex-col justify-end gap-4 pb-0">
          {/* Sponsor Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {SPONSOR_LOGOS.slice(0, 9).map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                className="rounded-xl p-3 flex items-center justify-center aspect-square relative overflow-hidden group"
                style={{
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                custom={index}
                variants={logoVariants}
                whileHover={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderColor: 'rgba(0,0,0,0.12)',
                  scale: 1.08,
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Logo Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'linear-gradient(135deg, rgba(88,86,214,0.05), rgba(52,199,89,0.02))',
                  }}
                />

                {/* Sponsor Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <span
                    className="font-display font-black text-[11px] leading-tight"
                    style={{
                      color: '#1d1d1f',
                      marginBottom: '2px',
                    }}
                  >
                    {sponsor.initials}
                  </span>
                  <span
                    style={{
                      fontSize: '8px',
                      color: 'rgba(0,0,0,0.4)',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {sponsor.tier}
                  </span>
                </div>

                {/* Tooltip on Hover */}
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20"
                  style={{
                    background: 'rgba(0,0,0,0.9)',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sponsor.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tier Legend */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {SPONSOR_TIERS.map((tierInfo) => (
              <div
                key={tierInfo.tier}
                className="rounded-lg px-3 py-2 text-[11px] font-[500] flex items-center gap-2"
                style={{
                  background: tierInfo.bgColor,
                  border: `1px solid ${tierInfo.borderColor}`,
                  color: '#1d1d1f',
                  opacity: 0.8,
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: tierInfo.color,
                    display: 'inline-block',
                  }}
                />
                {tierInfo.tier} ({tierInfo.count})
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}