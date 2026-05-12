import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Phase 3 routes added here */}
          {/* <Route path="/events" element={<Events />} /> */}
          {/* <Route path="/events/:slug" element={<EventDetail />} /> */}
          {/* <Route path="/speakers" element={<Speakers />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
