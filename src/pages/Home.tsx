import { motion } from 'framer-motion'
import HeroCard from '@/sections/HeroCard'
import SpeakersCard from '@/sections/SpeakersCard'
import PublicationsCard from '@/sections/PublicationsCard'
import RegistrationCard from '@/sections/RegistrationCard'
import IEEECard from '@/sections/IEEECard'
import AwardCard from '@/sections/AwardCard'
import ExpoCard from '@/sections/ExpoCard'
import ScheduleCard from '@/sections/ScheduleCard'
import SponsorsCard from '@/sections/SponsorsCard'

export default function Home() {
// ... rest of the file stays exactly the same
  return (
    <main className="bg-[#f5f5f7]">
      {/* Card grid — matches Apple's exact layout system */}
      <motion.div
        className="card-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Row 1 */}
        <HeroCard />

        {/* Row 2 */}
        <SpeakersCard />
        <PublicationsCard />

        {/* Row 3 */}
        <RegistrationCard />

        {/* Row 4 */}
        <IEEECard />
        <AwardCard />

        {/* Row 5 */}
        <ExpoCard />

        {/* Row 6 */}
        <ScheduleCard />
        <SponsorsCard />
      </motion.div>

      {/* Newsletter section — between cards and footer */}
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="max-w-[600px] mx-auto text-center rounded-3xl p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6))',
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <h3
            className="font-display font-black text-2xl text-[#1d1d1f] mb-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            Stay in the loop
          </h3>
          <p className="text-[14px] text-[rgba(0,0,0,0.55)] mb-6">
            Get updates on speakers, schedules, and early registration offers.
          </p>
          <form className="flex gap-2 justify-center" onSubmit={(e) => { e.preventDefault() }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 max-w-[280px] rounded-lg px-4 py-3 text-[13px] border border-black/[0.08]"
              style={{ background: '#fff', outline: 'none' }}
            />
            <button
              type="submit"
              className="bg-[#5856d6] text-white px-6 py-3 rounded-lg font-[500] text-[13px] cursor-pointer transition-all hover:scale-[1.02]"
              style={{ boxShadow: '0 4px 16px rgba(88,86,214,0.3)' }}
            >
              Subscribe →
            </button>
          </form>
        </div>
      </motion.section>
    </main>
  )
}
