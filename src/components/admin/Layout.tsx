import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Calendar, LogOut, Mic } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/registrations', label: 'Registrations', icon: Users },
  { to: '/admin/speakers', label: 'Speakers', icon: Mic },
  { to: '/admin/events', label: 'Events', icon: Calendar },
]

export default function Layout() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      <aside className="w-64 bg-white border-r border-black/5 shrink-0 p-4 flex flex-col">
        <div className="flex items-center gap-2 px-3 py-2 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #5856d6, #34c759)',
              boxShadow: '0 2px 8px rgba(88,86,214,0.3)',
            }}
          >
            <span className="font-display font-black text-sm text-white">N</span>
          </div>
          <span className="font-display font-black text-[13px] text-[#1d1d1f]">NariNexus Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] transition-colors ${
                  isActive
                    ? 'bg-[#5856d6] text-white'
                    : 'text-[#1d1d1f]/70 hover:bg-black/5'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#5856d6]/10 flex items-center justify-center">
              <span className="text-[#5856d6] text-xs font-[600]">
                {user?.email?.[0].toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-[500] text-[#1d1d1f] truncate">
                {user?.email?.split('@')[0] || 'Admin'}
              </p>
              <p className="text-[11px] text-[#1d1d1f]/50 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-[500] text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}