import { motion } from 'framer-motion'
import HeroCard from '@/components/sections/HeroCard'
import SpeakersCard from '@/components/sections/SpeakersCard'
import PublicationsCard from '@/components/sections/PublicationsCard'
import RegistrationCard from '@/components/sections/RegistrationCard'
import IEEECard from '@/components/sections/IEEECard'
import AwardCard from '@/components/sections/AwardCard'
import ExpoCard from '@/components/sections/ExpoCard'
import ScheduleCard from '@/components/sections/ScheduleCard'
import SponsorsCard from '@/components/sections/SponsorsCard'
import NewsletterSection from '@/components/sections/NewsletterSection'

export default function Home() {
  return (
    <main className="bg-[#f5f5f7] min-h-screen">
      {/* Card Grid - Apple Editorial Layout */}
      <motion.div
        className="card-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Row 1: Hero (Full Width) */}
        <HeroCard />

        {/* Row 2: Speakers (Half) + Publications (Half) */}
        <SpeakersCard />
        <PublicationsCard />

        {/* Row 3: Registration (Full Width) */}
        <RegistrationCard />

        {/* Row 4: IEEE (Half) + Award (Half) */}
        <IEEECard />
        <AwardCard />

        {/* Row 5: Expo (Full Width) */}
        <ExpoCard />

        {/* Row 6: Schedule (Half) + Sponsors (Half) */}
        <ScheduleCard />
        <SponsorsCard />
      </motion.div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  )
}