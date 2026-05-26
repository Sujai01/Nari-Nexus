import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PublicationsCard() {
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
      className="card card-grid-half card-green relative overflow-hidden"
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
          background: 'radial-gradient(ellipse 60% 40% at 80% 90%, rgba(52,199,89,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(48,209,88,0.7)', marginBottom: 0 }}
          >
            Research Publications
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 44px)',
              color: '#f5f5f7',
              maxWidth: '300px',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Publish.{' '}
            <span className="gradient-green-text">Be cited.</span>{' '}
            Be known.
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '290px',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              marginBottom: '16px',
            }}
          >
            Your paper in Springer, ACM, or Elsevier indexed proceedings. Peer reviewed. Globally distributed.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-[14px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(48,209,88,0.9)',
              borderColor: 'rgba(48,209,88,0.35)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            Submit your paper <ArrowRight size={12} />
          </Link>
        </div>

        {/* Publication Cards Stack */}
        <div
          className="relative w-full flex-1 flex items-center justify-center"
          style={{ minHeight: '200px', paddingBottom: '8px' }}
        >
          {/* Back Card - Purple */}
          <div
            className="absolute rounded-[10px] p-4 box-shadow flex flex-col"
            style={{
              width: '140px',
              height: '180px',
              background: 'linear-gradient(135deg, #1c1243, #2d1b69)',
              border: '1px solid rgba(255,255,255,0.08)',
              transform: 'rotate(-6deg) translateX(-20px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '11px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.3,
                marginBottom: 0,
              }}
            >
              Research<br />
              Proceedings<br />
              2026
            </p>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  height: '3px',
                  width: '80%',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div
                style={{
                  height: '3px',
                  width: '60%',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div
                style={{
                  height: '3px',
                  width: '75%',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
              <div
                style={{
                  height: '3px',
                  width: '45%',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.12)',
                }}
              />
            </div>
            <p
              style={{
                marginTop: 'auto',
                fontSize: '9px',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.04em',
                marginBottom: 0,
              }}
            >
              IEEE · SPRINGER · ACM
            </p>
          </div>

          {/* Front Card - Green */}
          <div
            className="absolute rounded-[10px] p-4 box-shadow flex flex-col"
            style={{
              width: '140px',
              height: '180px',
              background: 'linear-gradient(135deg, #021b0a, #052e12)',
              border: '1px solid rgba(52,199,89,0.15)',
              transform: 'rotate(3deg) translateX(30px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '11px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.3,
                marginBottom: 0,
              }}
            >
              AI &amp; Machine<br />
              Learning<br />
              Track
            </p>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  height: '3px',
                  width: '70%',
                  borderRadius: '2px',
                  background: 'rgba(52,199,89,0.2)',
                }}
              />
              <div
                style={{
                  height: '3px',
                  width: '90%',
                  borderRadius: '2px',
                  background: 'rgba(52,199,89,0.15)',
                }}
              />
              <div
                style={{
                  height: '3px',
                  width: '55%',
                  borderRadius: '2px',
                  background: 'rgba(52,199,89,0.2)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}