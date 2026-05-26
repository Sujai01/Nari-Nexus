import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getRegistrations } from '@/lib/api/registrations'
import { Download, Search } from 'lucide-react'

export default function RegistrationsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getRegistrations()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = data.filter(
    (r) =>
      r.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.participation_type?.toLowerCase().includes(search.toLowerCase())
  )

  const exportCSV = () => {
    const cols = ['full_name', 'institution', 'email', 'participation_type', 'created_at']
    const header = cols.join(',')
    const rows = filtered.map((r) => cols.map((c) => `"${r[c] || ''}"`).join(','))
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `registrations-${Date.now()}.csv`
    a.click()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-black text-[#1d1d1f]">Registrations</h1>
          <p className="text-[#1d1d1f]/50 text-sm">{data.length} total sign-ups</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-[#5856d6] text-white px-4 py-2 rounded-xl text-sm font-[500] hover:bg-[#4845c2] transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="p-4 border-b border-black/5 flex gap-4">
          <div className="relative flex-1 max-w-[320px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" />
            <input
              type="text"
              placeholder="Search by name, email, or type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/[0.03] rounded-lg pl-10 pr-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#5856d6]/20"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-black/30">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-black/30">No registrations found</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-black/[0.02]">
                <th className="text-left text-[12px] font-[600] text-black/50 uppercase tracking-wide px-6 py-3">Name</th>
                <th className="text-left text-[12px] font-[600] text-black/50 uppercase tracking-wide px-6 py-3">Email</th>
                <th className="text-left text-[12px] font-[600] text-black/50 uppercase tracking-wide px-6 py-3">Institution</th>
                <th className="text-left text-[12px] font-[600] text-black/50 uppercase tracking-wide px-6 py-3">Type</th>
                <th className="text-left text-[12px] font-[600] text-black/50 uppercase tracking-wide px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-black/5 hover:bg-black/[0.02]"
                >
                  <td className="px-6 py-4 text-[14px] font-[500] text-[#1d1d1f]">{row.full_name}</td>
                  <td className="px-6 py-4 text-[14px] text-[#1d1d1f]/60">{row.email}</td>
                  <td className="px-6 py-4 text-[14px] text-[#1d1d1f]/60">{row.institution || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 rounded-md bg-[#5856d6]/10 text-[#5856d6] text-[12px] font-[500]">
                      {row.participation_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-[#1d1d1f]/40">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}