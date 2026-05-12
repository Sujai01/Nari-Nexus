import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home',     to: '/' },
  { label: 'Events',   to: '/events' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'About',    to: '/about' },
  { label: 'Media',    to: '/media' },
  { label: 'Blog',     to: '/blog' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false) }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[52px]',
          'flex items-center justify-between px-6',
          'transition-all duration-300',
          scrolled
            ? 'bg-[rgba(245,245,247,0.82)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/[0.08] shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-[rgba(245,245,247,0.6)] backdrop-blur-[12px]'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Narinexus home">
          <div
            className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #5856d6, #34c759)',
              boxShadow: '0 2px 8px rgba(88,86,214,0.3)',
            }}
          >
            <span className="font-display font-black text-[12px] text-white leading-none">N</span>
          </div>
          <span className="font-display font-black text-[14px] text-[#1d1d1f] tracking-[-0.01em]">
            Nari<span className="text-[#5856d6]">nexus</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0 list-none" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-[12px] font-[400] px-[11px] py-1 rounded-md',
                    'transition-all duration-150 no-underline',
                    isActive
                      ? 'text-[#1d1d1f] font-[500]'
                      : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-black/[0.06]'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            to="/events/nari-summit-2026/register"
            className={cn(
              'hidden md:inline-flex items-center',
              'bg-[#5856d6] text-white text-[12px] font-[500]',
              'px-4 py-[7px] rounded-full',
              'transition-all duration-200',
              'hover:bg-[#4845c2] hover:scale-[1.02]',
              'shadow-[0_2px_12px_rgba(88,86,214,0.3)]',
              'no-underline whitespace-nowrap'
            )}
          >
            Join Summit 2026
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1 rounded-md text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-black/[0.06] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed top-[52px] left-0 right-0 z-40',
              'bg-[rgba(245,245,247,0.96)] backdrop-blur-[20px]',
              'border-b border-black/[0.08]',
              'px-6 py-4 flex flex-col gap-1',
              'md:hidden'
            )}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'text-[14px] px-3 py-2 rounded-lg no-underline',
                    'transition-colors duration-150',
                    isActive
                      ? 'text-[#1d1d1f] font-[500] bg-black/[0.05]'
                      : 'text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-black/[0.04]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/events/nari-summit-2026/register"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'mt-2 text-center bg-[#5856d6] text-white',
                'text-[14px] font-[500] px-4 py-2 rounded-full no-underline',
                'transition-all hover:bg-[#4845c2]'
              )}
            >
              Join Summit 2026
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div className="h-[52px]" aria-hidden="true" />
    </>
  )
}
