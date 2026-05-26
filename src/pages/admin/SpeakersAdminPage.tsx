import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Linkedin, Twitter } from 'lucide-react'
import { getSpeakers, createSpeaker } from '@/lib/api/speakers'

interface Speaker {
  id: string
  name: string
  designation: string | null
  organization: string | null
  bio: string | null
  image_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
}

export default function SpeakersAdminPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', designation: '', organization: '', bio: '', image_url: '', linkedin_url: '', twitter_url: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getSpeakers().then(setSpeakers).catch(() => setSpeakers([])).finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const speaker = await createSpeaker(form)
      setSpeakers([speaker, ...speakers])
      setShowModal(false)
      setForm({ name: '', designation: '', organization: '', bio: '', image_url: '', linkedin_url: '', twitter_url: '' })
    } catch {}
    setSubmitting(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-black text-[#1d1d1f]">Speakers</h1>
          <p className="text-[#1d1d1f]/50 text-sm">{speakers.length} speakers added</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#5856d6] text-white px-4 py-2 rounded-xl text-sm font-[500] hover:bg-[#4845c2] transition-colors"
        >
          <Plus size={16} />
          Add Speaker
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-black/30">Loading...</div>
      ) : speakers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center text-black/30">
          No speakers yet. Add your first speaker.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {speakers.map((speaker) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-black/5 p-6 flex gap-4"
            >
              <div className="w-16 h-16 rounded-xl bg-[#5856d6]/10 flex items-center justify-center shrink-0">
                <span className="text-[#5856d6] text-lg font-[700]">
                  {speaker.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-[600] text-[#1d1d1f]">{speaker.name}</h3>
                <p className="text-sm text-[#1d1d1f]/50">{speaker.designation}{speaker.organization ? ` · ${speaker.organization}` : ''}</p>
                {speaker.bio && <p className="text-sm text-[#1d1d1f]/40 mt-2 line-clamp-2">{speaker.bio}</p>}
                <div className="flex gap-2 mt-3">
                  {speaker.linkedin_url && <a href={speaker.linkedin_url} target="_blank" className="text-[#1d1d1f]/30 hover:text-[#0077b5]"><Linkedin size={16} /></a>}
                  {speaker.twitter_url && <a href={speaker.twitter_url} target="_blank" className="text-[#1d1d1f]/30 hover:text-[#1da1f2]"><Twitter size={16} /></a>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-[#1d1d1f]">Add Speaker</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-black/5 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
                <input placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              </div>
              <textarea placeholder="Bio" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6] resize-none" />
              <input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="LinkedIn URL" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
                <input placeholder="Twitter URL" value={form.twitter_url} onChange={(e) => setForm({ ...form, twitter_url: e.target.value })} className="w-full border border-black/10 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#5856d6]" />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-[#5856d6] text-white py-3 rounded-xl font-[500] hover:bg-[#4845c2] disabled:opacity-50">
                {submitting ? 'Adding...' : 'Add Speaker'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}