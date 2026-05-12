import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function PublicationsCard() {
  return (
    <motion.div
      className="card col-half"
      style={{ background: '#021b0a', alignItems: 'flex-start', textAlign: 'left', padding: '44px 32px 0' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="eyebrow" style={{ color: 'rgba(48,209,88,0.7)' }}>Research Publications</p>
      
      <h2 className="card-title" style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: '#f5f5f7' }}>
        Publish.<br />
        <span style={{ color: '#34c759' }}>Be cited.</span><br />
        Be known.
      </h2>
      
      <p className="card-body" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '320px', textAlign: 'left', marginLeft: 0 }}>
        Your paper in Springer, ACM, or Elsevier indexed proceedings. Peer reviewed. Globally distributed.
      </p>
      
      <div className="card-links" style={{ justifyContent: 'flex-start' }}>
        <Link to="/submit" className="card-link" style={{ color: '#30d158', borderColor: 'rgba(48,209,88,0.4)' }}>
          Submit your paper <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>

      <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden mt-auto">
        <div className="relative w-[200px] h-[180px] mx-auto mt-6">
          {/* Card 1 */}
          <div className="absolute w-[140px] h-[180px] rounded-[10px] flex flex-col p-[16px_14px] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
               style={{ background: 'linear-gradient(135deg, #1c1243, #2d1b69)', left: 0, top: 0, transform: 'rotate(-6deg)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="font-display font-black text-[11px] text-white/80 tracking-[0.02em] leading-[1.3]">Research<br/>Proceedings<br/>2026</div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="h-[3px] rounded-[2px] bg-white/10 w-[80%]" />
              <div className="h-[3px] rounded-[2px] bg-white/10 w-[60%]" />
              <div className="h-[3px] rounded-[2px] bg-white/10 w-[75%]" />
            </div>
            <div className="mt-auto text-[9px] text-white/35 tracking-[0.04em]">IEEE · SPRINGER</div>
          </div>
          {/* Card 2 */}
          <div className="absolute w-[140px] h-[180px] rounded-[10px] flex flex-col p-[16px_14px] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
               style={{ background: 'linear-gradient(135deg, #021b0a, #052e12)', left: '50%', top: 0, transform: 'rotate(3deg) translateX(-40%)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="font-display font-black text-[11px] text-white/80 tracking-[0.02em] leading-[1.3]">AI &amp; Machine<br/>Learning<br/>Track</div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="h-[3px] rounded-[2px] w-[70%]" style={{ background: 'rgba(48,209,88,0.2)' }} />
              <div className="h-[3px] rounded-[2px] w-[90%]" style={{ background: 'rgba(48,209,88,0.15)' }} />
              <div className="h-[3px] rounded-[2px] w-[55%]" style={{ background: 'rgba(48,209,88,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}