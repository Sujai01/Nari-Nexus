import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function IEEECard() {
  return (
    <motion.div
      className="card col-half"
      style={{ background: '#e8e4f9', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px 0' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="eyebrow" style={{ color: 'rgba(0,0,0,0.45)' }}>IEEE Affiliated</p>
      <h2 className="card-title" style={{ fontSize: 'clamp(26px, 3vw, 40px)', color: '#1c1243' }}>
        Academic<br />
        <span style={{ color: '#5856d6' }}>credibility,</span><br />
        globally.
      </h2>
      <p className="card-body" style={{ color: 'rgba(28,18,67,0.65)', maxWidth: '300px', marginLeft: 0, textAlign: 'left' }}>
        NARI's events carry IEEE and Springer recognition. Your participation means something internationally.
      </p>
      <div className="card-links" style={{ justifyContent: 'flex-start' }}>
        <Link to="/about/partners" className="card-link" style={{ color: '#5856d6', borderColor: 'rgba(88,86,214,0.35)' }}>
          Learn about accreditation <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>

      <div className="w-full flex-1 flex items-center justify-center overflow-hidden mt-auto pb-8">
        <div className="w-[140px] h-[140px] rounded-[28px] flex flex-col items-center justify-center backdrop-blur-[10px]"
             style={{ background: 'linear-gradient(135deg, rgba(88,86,214,0.15), rgba(88,86,214,0.06))', border: '1px solid rgba(88,86,214,0.2)' }}>
          <div className="font-display font-black text-[32px] tracking-[-0.02em] text-[#5856d6]">IEEE</div>
          <div className="text-[10px] text-[#5856d6]/60 tracking-[0.08em] uppercase mt-[2px]">Affiliated</div>
        </div>
      </div>
    </motion.div>
  )
}