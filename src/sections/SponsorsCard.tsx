import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SPONSORS = ['IEEE', 'Springer', 'ACM', 'Elsevier', 'MeitY', 'CSIR']

export default function SponsorsCard() {
  return (
    <motion.div
      className="card col-half card-contained flex flex-col justify-between"
      style={{ background: '#fff8f0', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div>
        <p className="eyebrow" style={{ color: 'rgba(0,0,0,0.45)' }}>Our Partners</p>
        <h2 className="card-title" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', color: '#1d1d1f' }}>
          Backed by<br />
          <span style={{ color: '#5856d6' }}>the best.</span>
        </h2>
        <p className="card-body" style={{ color: 'rgba(0,0,0,0.55)', maxWidth: '300px', marginLeft: 0, textAlign: 'left' }}>
          IEEE, Springer, ACM, Elsevier, MeitY, and CSIR — powering NARI's global reach.
        </p>
        
        <div className="card-links" style={{ justifyContent: 'flex-start' }}>
          <Link to="/sponsors" className="card-link" style={{ color: '#0066cc', borderColor: 'rgba(0,102,204,0.3)' }}>
            Become a sponsor <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full pt-8 mt-auto">
        {SPONSORS.map((sponsor) => (
          <div key={sponsor} 
               className="bg-white rounded-[10px] p-[10px_18px] font-display font-black text-[13px] text-[#1d1d1f]"
               style={{ border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {sponsor}
          </div>
        ))}
      </div>
    </motion.div>
  )
}