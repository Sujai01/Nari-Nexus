import { motion } from 'framer-motion'

export default function RegistrationCard() {
  return (
    <motion.div
      className="card col-full card-contained"
      style={{ background: '#000510', justifyContent: 'center' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(88,86,214,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <p className="eyebrow relative z-10" style={{ color: 'rgba(162,157,255,0.7)' }}>Reserve Your Place</p>
      <h2 className="card-title relative z-10" style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: '#f5f5f7' }}>
        Summit 2026<br />
        <span style={{ color: '#a29dff' }}>Registration</span>
      </h2>
      <p className="card-body relative z-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Seats are limited. Secure yours today.
      </p>

      <form 
        className="relative z-10 w-full max-w-[500px] mx-auto mt-6 p-7 md:p-8 rounded-[16px]"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col md:flex-row gap-2 mb-[10px]">
          <input type="text" placeholder="Full name" className="flex-1 bg-white/5 border border-white/10 rounded-[10px] text-[#f5f5f7] text-[13px] px-4 py-[11px] outline-none focus:border-[#5856d6]/50 transition-colors placeholder:text-white/30" />
          <input type="text" placeholder="Institution" className="flex-1 bg-white/5 border border-white/10 rounded-[10px] text-[#f5f5f7] text-[13px] px-4 py-[11px] outline-none focus:border-[#5856d6]/50 transition-colors placeholder:text-white/30" />
        </div>
        <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 rounded-[10px] text-[#f5f5f7] text-[13px] px-4 py-[11px] mb-[10px] outline-none focus:border-[#5856d6]/50 transition-colors placeholder:text-white/30" />
        <select className="w-full bg-white/5 border border-white/10 rounded-[10px] text-white/55 text-[13px] px-4 py-[11px] mb-4 outline-none focus:border-[#5856d6]/50 transition-colors appearance-none">
          <option value="" disabled selected>Participation type</option>
          <option value="presenter">Presenter</option>
          <option value="attendee">Attendee</option>
          <option value="workshop">Workshop</option>
          <option value="exhibitor">Exhibitor</option>
        </select>
        
        <button type="submit" className="w-full text-white font-[500] text-[14px] py-[13px] rounded-[10px] cursor-pointer transition-all hover:-translate-y-[2px]"
                style={{ background: 'linear-gradient(135deg, #5856d6, #7b78ff)', boxShadow: '0 4px 20px rgba(88,86,214,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
          Register for Summit 2026 →
        </button>
      </form>
    </motion.div>
  )
}