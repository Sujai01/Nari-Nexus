import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Events', path: '/events' },
      { label: 'Speakers', path: '/speakers' },
      { label: 'Blog', path: '/blog' },
      { label: 'About', path: '/about' },
    ],
  },
  {
    title: 'Summit 2026',
    links: [
      { label: 'Register', path: '/events' },
      { label: 'Schedule', path: '/events' },
      { label: 'Speakers', path: '/speakers' },
      { label: 'Sponsors', path: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', path: '/blog' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/contact' },
      { label: 'Terms', path: '/contact' },
    ],
  },
  {
    title: 'Organization',
    links: [
      { label: 'About NARI', path: '/about' },
      { label: 'Team', path: '/about' },
      { label: 'Careers', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
  },
]

const SOCIAL_LINKS = [
  { icon: 'in', label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: 'x', label: 'Twitter', url: 'https://twitter.com' },
  { icon: 'ig', label: 'Instagram', url: 'https://instagram.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/8 pt-12 pb-6 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-black/8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4">
              <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-[#5856d6] to-[#34c759] flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-white text-[12px] leading-none">N</span>
              </div>
              <span className="font-display font-black text-[14px] text-[#1d1d1f] tracking-[-0.01em]">
                Nari<span className="text-[#5856d6]">nexus</span>
              </span>
            </Link>
            <p className="text-[12px] text-[#1d1d1f]/55 leading-relaxed max-w-[260px] font-[300]">
              New Age Research Initiatives in Technology. Empowering researchers, students, and institutions worldwide since 2013.
            </p>
            {/* Social Links */}
            <div className="flex gap-2 mt-4">
              {SOCIAL_LINKS.map((social) => (
                
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] rounded-md border border-black/8 text-[#1d1d1f]/50 hover:text-[#5856d6] hover:border-black/15 flex items-center justify-center text-[12px] font-[500] no-underline transition-all duration-150"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-[500] text-[#1d1d1f] mb-3 tracking-[0.01em] uppercase">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2 list-none">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[12px] text-[#1d1d1f]/55 hover:text-[#1d1d1f] no-underline transition-colors duration-150 font-[400]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11.5px] text-[#1d1d1f]/40 font-[300]">
            Copyright © {currentYear} NARI · New Age Research Initiatives in Technology · A-11 Knowledge Park 3rd, Greater Noida UP 201310
          </p>
          <div className="flex gap-4 flex-wrap">
            
              href="#privacy"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Privacy Policy
            </a>
            
              href="#terms"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Terms & Conditions
            </a>
            
              href="#sitemap"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}