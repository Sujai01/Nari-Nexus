import { Link } from 'react-router-dom'

const COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Events',        to: '/events' },
      { label: 'Speakers',      to: '/speakers' },
      { label: 'Media Gallery', to: '/media' },
      { label: 'Blog',          to: '/blog' },
      { label: 'Past Editions', to: '/editions' },
    ],
  },
  {
    heading: 'Summit 2026',
    links: [
      { label: 'Theme',      to: '/events/nari-summit-2026/theme' },
      { label: 'Register',   to: '/events/nari-summit-2026/register' },
      { label: 'Schedule',   to: '/events/nari-summit-2026/agenda' },
      { label: 'Expo Map',   to: '/events/nari-summit-2026/expo' },
      { label: 'E-Catalogue',to: '/events/nari-summit-2026/catalogue' },
    ],
  },
  {
    heading: 'Research',
    links: [
      { label: 'Submit a Paper', to: '/submit' },
      { label: 'Proceedings',   to: '/proceedings' },
      { label: 'Best Women',    to: '/about/awards' },
      { label: 'Associates',    to: '/about/partners' },
      { label: 'Sponsors',      to: '/sponsors' },
    ],
  },
  {
    heading: 'Organisation',
    links: [
      { label: 'About NARI', to: '/about' },
      { label: 'Team',       to: '/about/team' },
      { label: 'Volunteer',  to: '/community/volunteer' },
      { label: 'Contact',    to: '/contact' },
      { label: 'FAQs',       to: '/faqs' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.08] pt-10 pb-5 px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-black/[0.08]">
          {COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-[500] text-[#1d1d1f] mb-[10px] tracking-[0.01em]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-[7px] list-none">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[12px] text-[rgba(0,0,0,0.55)] no-underline hover:text-[#1d1d1f] transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[11.5px] text-[rgba(0,0,0,0.4)]">
            Copyright © {new Date().getFullYear()} NARI · New Age Research Initiatives in
            Technology · A-11 Knowledge Park 3rd, Greater Noida UP 201310
          </p>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'Privacy Policy',         to: '/privacy' },
              { label: 'Rules of Participation', to: '/rules' },
              { label: 'Contact',                to: '/contact' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[11.5px] text-[rgba(0,0,0,0.4)] no-underline hover:text-[#1d1d1f] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
