import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ScheduleCard() {
  return (
    <motion.div
      className="card col-half card-contained flex flex-col"
      style={{ background: '#fef9e7', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="eyebrow" style={{ color: 'rgba(0,0,0,0.45)' }}>4-Day Schedule</p>
      <h2 className="card-title" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', color: '#1d1d1f' }}>
        <span style={{ color: '#ff9f0a' }}>Four</span> days.<br />
        Infinite<br />
        discovery.
      </h2>
      <p className="card-body" style={{ color: 'rgba(0,0,0,0.55)', maxWidth: '300px', marginLeft: 0, textAlign: 'left' }}>
        Multi-track sessions, workshops, panels, and networking. Sep 25–28, Greater Noida.
      </p>
      
      <div className="card-links mb-0" style={{ justifyContent: 'flex-start' }}>
        <Link to="/events/nari-summit-2026/agenda" className="card-link" style={{ color: '#bf5000', borderColor: 'rgba(191,80,0,0.3)' }}>
          View full schedule <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>

      <div className="flex gap-[10px] mt-auto flex-wrap w-full pt-8">
        <div className="flex-1 min-w-[80px] rounded-[10px] text-center p-[10px_16px]" style={{ background: 'rgba(255,159,10,0.12)', border: '1px solid rgba(255,159,10,0.2)' }}>
          <div className="font-display font-black text-[22px] tracking-[-0.02em] leading-none mb-1" style={{ color: '#bf5000' }}>80+</div>
          <div className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'rgba(0,0,0,0.45)' }}>Sessions</div>
        </div>
        <div className="flex-1 min-w-[80px] rounded-[10px] text-center p-[10px_16px]" style={{ background: 'rgba(88,86,214,0.08)', border: '1px solid rgba(88,86,214,0.15)' }}>
          <div className="font-display font-black text-[22px] tracking-[-0.02em] leading-none mb-1" style={{ color: '#3a38a8' }}>4</div>
          <div className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'rgba(0,0,0,0.45)' }}>Tracks</div>
        </div>
        <div className="flex-1 min-w-[80px] rounded-[10px] text-center p-[10px_16px]" style={{ background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)' }}>
          <div className="font-display font-black text-[22px] tracking-[-0.02em] leading-none mb-1" style={{ color: '#1a7a32' }}>15k+</div>
          <div className="text-[10px] uppercase tracking-[0.06em]" style={{ color: 'rgba(0,0,0,0.45)' }}>Attendees</div>
        </div>
      </div>
    </motion.div>
  )
}