import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full h-[52px] flex items-center justify-between px-6 transition-all duration-200 ${
          scrolled
            ? 'bg-[rgba(245,245,247,0.82)] backdrop-blur-[20px] border-b border-black/8'
            : 'bg-[rgba(245,245,247,0.6)]'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
          <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-[#5856d6] to-[#34c759] flex items-center justify-center flex-shrink-0">
            <span className="font-display font-black text-white text-[12px] leading-none">N</span>
          </div>
          <span className="font-display font-black text-[14px] text-[#1d1d1f] tracking-[-0.01em]">
            Nari<span className="text-[#5856d6]">nexus</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-0 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-[12px] font-[400] px-[11px] py-1 rounded-md no-underline transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-[#1d1d1f] font-[500] opacity-100'
                    : 'text-[#1d1d1f] opacity-70 hover:opacity-100 hover:bg-black/6'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/events"
            className="bg-[#5856d6] text-white text-[12px] font-[500] px-4 py-[7px] rounded-full no-underline transition-all duration-200 hover:bg-[#4845c2] hover:scale-102 inline-block whitespace-nowrap"
          >
            Explore Events
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 rounded-md text-[#1d1d1f] opacity-70 hover:opacity-100 hover:bg-black/6 transition-all duration-150 cursor-pointer border-none bg-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[52px] left-0 right-0 bg-[rgba(245,245,247,0.96)] backdrop-blur-[20px] border-b border-black/8 z-40 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] px-3 py-2 rounded-lg no-underline transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-[#1d1d1f] font-[500] bg-black/5'
                    : 'text-[#1d1d1f] opacity-70 hover:opacity-100 hover:bg-black/4'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              to="/events"
              className="mt-2 bg-[#5856d6] text-white text-[14px] font-[500] px-4 py-2 rounded-full no-underline transition-all duration-200 hover:bg-[#4845c2] text-center"
            >
              Explore Events
            </Link>
          </div>
        </div>
      )}
    </>
  )
}