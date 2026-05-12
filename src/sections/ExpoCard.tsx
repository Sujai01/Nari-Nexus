import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ExpoCard() {
  return (
    <motion.div
      className="card col-full card-contained"
      style={{ background: '#0a1628', minHeight: '460px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="eyebrow" style={{ color: 'rgba(78,184,255,0.7)' }}>Innovation Expo</p>
      <h2 className="card-title" style={{ color: '#f5f5f7' }}>
        The exhibition floor <span style={{ color: '#4eb8ff' }}>awaits.</span>
      </h2>
      <p className="card-body" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Startups, research labs, and industry sponsors. Three days of live demos, pitches, and breakthrough reveals.
      </p>
      
      <div className="card-links">
        <Link to="/events/nari-summit-2026/expo" className="card-link" style={{ color: '#4eb8ff', borderColor: 'rgba(78,184,255,0.4)' }}>
          View expo map <ArrowRight size={14} className="ml-1" />
        </Link>
        <Link to="/sponsors" className="card-link" style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.18)' }}>
          Become an exhibitor
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[680px] mx-auto mt-4 px-4">
        <div className="aspect-square rounded-[10px] flex items-center justify-center font-display font-black text-[11px] tracking-[0.05em] text-center" 
             style={{ background: 'rgba(88,86,214,0.15)', color: 'rgba(162,157,255,0.8)' }}>AI<br/>STARTUPS</div>
        <div className="aspect-square rounded-[10px] flex items-center justify-center font-display font-black text-[11px] tracking-[0.05em] text-center" 
             style={{ background: 'rgba(52,199,89,0.1)', color: 'rgba(48,209,88,0.8)' }}>GREEN<br/>TECH</div>
        <div className="aspect-square rounded-[10px] flex items-center justify-center font-display font-black text-[11px] tracking-[0.05em] text-center" 
             style={{ background: 'rgba(78,184,255,0.12)', color: 'rgba(78,184,255,0.8)' }}>HEALTH<br/>TECH</div>
        
        <div className="col-span-2 rounded-[10px] flex items-center justify-center font-display font-black text-[10px] tracking-[0.08em] p-5" 
             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
          ROBOTICS &amp; IoT PAVILION
        </div>
        <div className="aspect-square rounded-[10px] flex items-center justify-center font-display font-black text-[11px] tracking-[0.05em] text-center" 
             style={{ background: 'rgba(245,194,66,0.1)', color: 'rgba(245,194,66,0.8)' }}>EDU<br/>TECH</div>
      </div>
    </motion.div>
  )
}