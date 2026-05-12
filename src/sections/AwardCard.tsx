import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function AwardCard() {
  return (
    <motion.div
      className="card col-half"
      style={{ background: '#1a0010', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px 0' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="eyebrow" style={{ color: 'rgba(255,107,157,0.7)' }}>Best Women in STEM</p>
      <h2 className="card-title" style={{ fontSize: 'clamp(26px, 3vw, 40px)', color: '#f5f5f7' }}>
        Celebrating<br />
        <span style={{ color: '#ff6b9d' }}>women</span><br />
        who lead.
      </h2>
      <p className="card-body" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '300px', marginLeft: 0, textAlign: 'left' }}>
        Recognising outstanding women researchers and innovators. Nominate a trailblazer for the 2026 award.
      </p>
      <div className="card-links" style={{ justifyContent: 'flex-start' }}>
        <Link to="/about/awards" className="card-link" style={{ color: '#ff6b9d', borderColor: 'rgba(255,107,157,0.4)' }}>
          Nominate now <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>

      <div className="w-full flex-1 flex items-end justify-end overflow-hidden mt-auto pr-5 pb-5">
        <div className="text-[100px] leading-none" style={{ filter: 'drop-shadow(0 0 30px rgba(245,194,66,0.2))' }}>
          🏆
        </div>
      </div>
    </motion.div>
  )
}