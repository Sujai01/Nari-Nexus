import { motion } from 'framer-motion'
import { Users, Award, Globe, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const values = [
    {
      icon: <Globe size={24} />,
      title: 'Global Reach',
      description: 'Connecting researchers and innovators from 40+ countries',
      color: '#4eb8ff',
    },
    {
      icon: <Users size={24} />,
      title: 'Community',
      description: 'Building a thriving community of scholars and technologists',
      color: '#34c759',
    },
    {
      icon: <Award size={24} />,
      title: 'Excellence',
      description: 'Promoting academic rigor and research quality',
      color: '#5856d6',
    },
    {
      icon: <Heart size={24} />,
      title: 'Impact',
      description: 'Creating positive change through innovation and research',
      color: '#ff6b9d',
    },
  ]

  const stats = [
    { number: '10+', label: 'Years of Excellence', suffix: '' },
    { number: '500+', label: 'Annual Speakers', suffix: '' },
    { number: '40+', label: 'Countries Represented', suffix: '' },
    { number: '22', label: 'Women in Research Awards', suffix: '' },
  ]

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & President',
      bio: 'Leading researcher in AI and emerging technologies',
    },
    {
      name: 'Prof. Anjali Sharma',
      role: 'Executive Director',
      bio: 'Expert in academic partnerships and research coordination',
    },
    {
      name: 'Vikram Patel',
      role: 'Head of Operations',
      bio: 'Manages global event logistics and partnerships',
    },
    {
      name: 'Dr. Neha Gupta',
      role: 'Research Director',
      bio: 'Oversees publication and research initiatives',
    },
  ]

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <motion.section
        className="py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-heading-1 text-[#1d1d1f] mb-6">About NARI</h1>
          <p className="text-xl text-[#1d1d1f]/60 max-w-[700px] mx-auto" style={{ fontWeight: 300 }}>
            New Age Research Initiatives in Technology (NARI) is dedicated to advancing
            research, fostering innovation, and building a global community of scholars and
            technologists.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="py-20 bg-white border-t border-b border-[#1d1d1f]/8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-4">Our Mission</h2>
              <p className="text-[#1d1d1f]/70 leading-relaxed">
                To create a platform where researchers, academics, and technologists from around
                the world can collaborate, share knowledge, and drive innovation. We believe that
                by bringing together the brightest minds, we can accelerate scientific progress
                and create lasting impact.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-4">Our Vision</h2>
              <p className="text-[#1d1d1f]/70 leading-relaxed">
                To be the world's premier platform for academic excellence and technological
                innovation. We envision a future where research is celebrated, collaboration is
                seamless, and breakthrough innovations emerge from the diverse perspectives of
                our global community.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display font-black text-3xl text-[#1d1d1f] text-center mb-12">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="rounded-2xl bg-white p-8 border border-[#1d1d1f]/8 text-center"
                variants={itemVariants}
              >
                <p className="font-display font-black text-4xl text-[#5856d6] mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-[#1d1d1f]/60 font-[500]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        className="py-20 bg-white border-t border-b border-[#1d1d1f]/8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display font-black text-3xl text-[#1d1d1f] text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-6 border border-[#1d1d1f]/8"
                style={{
                  background: `rgba(88,86,214,0.02)`,
                }}
                variants={itemVariants}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${value.color}15`, color: value.color }}
                >
                  {value.icon}
                </div>
                <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#1d1d1f]/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-display font-black text-3xl text-[#1d1d1f] text-center mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="rounded-2xl bg-white p-6 border border-[#1d1d1f]/8 text-center"
                variants={itemVariants}
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-black text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #5856d6, #34c759)',
                    color: '#fff',
                  }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#5856d6] font-[600] mb-2">{member.role}</p>
                <p className="text-xs text-[#1d1d1f]/60">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-white border-t border-[#1d1d1f]/8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-display font-black text-3xl text-[#1d1d1f] mb-4">Get Involved</h2>
          <p className="text-[#1d1d1f]/60 mb-8" style={{ fontWeight: 300 }}>
            Whether you're a researcher, speaker, sponsor, or simply passionate about innovation,
            there's a place for you at NARI.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/events"
              className="inline-flex px-8 py-3 rounded-lg bg-[#5856d6] text-white font-[500] no-underline hover:bg-[#4845c2] transition-colors"
            >
              Explore Events
            </Link>
            <Link
              to="/contact"
              className="inline-flex px-8 py-3 rounded-lg border border-[#1d1d1f]/8 text-[#1d1d1f] font-[500] no-underline hover:bg-[#1d1d1f]/5 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  )
}