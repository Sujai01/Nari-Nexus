import React from "react";
import Link from "next/link";
import { 
  Sparkles, Calendar, MapPin, ChevronRight, FileText, 
  Map, Trophy, Network, Cpu, ArrowRight, ShieldAlert 
} from "lucide-react";

export default function SummitPage() {
  
  const tracks = [
    {
      id: "track-a",
      code: "TRACK A",
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      title: "AI Ethics & Local Language Translation LLMs",
      lead: "Dr. Arundhati Sen",
      focus: ["Privacy-preserving sandboxes", "Local translation optimization", "Cognitive humanoids"]
    },
    {
      id: "track-b",
      code: "TRACK B",
      icon: <Network className="w-6 h-6 text-sky-400" />,
      title: "Sustainable Smart Infrastructure & Chemistry",
      lead: "Dr. Sarah Jenkins",
      focus: ["Solid-state battery cells", "Carbon capture telemetry", "Decentralized mini-grids"]
    },
    {
      id: "track-c",
      code: "TRACK C",
      icon: <Trophy className="w-6 h-6 text-amber-400" />,
      title: "IPR Commercialization & Research Incubation",
      lead: "Prof. Rajesh Mehta",
      focus: ["Patent database architectures", "Seed fundraising routes", "Corporate joint ventures"]
    }
  ];

  const agenda = [
    {
      day: "DAY 1 • OCT 14",
      title: "Foundation & Scholarly Opening",
      sessions: [
        { time: "09:00 AM", title: "Registrations & Digital Pass Verification", venue: "Entrance Foyer" },
        { time: "09:30 AM", title: "Opening Keynote & Advisory Address", venue: "Main Auditorium, Block A" },
        { time: "01:30 PM", title: "Technical Masterclass: High-Impact Writing", venue: "Seminar Room 204" }
      ]
    },
    {
      day: "DAY 2 • OCT 15",
      title: "Commercialization & Sandboxes",
      sessions: [
        { time: "10:00 AM", title: "Panel: Patenting University Prototypes", venue: "Innovation Center Hall" },
        { time: "02:00 PM", title: "Workshop: Smart Telemetry Wearables", venue: "Bio-Electronics Lab" },
        { time: "04:30 PM", title: "Exhibitor Showcases & Networking", venue: "Expo Hall Wing B" }
      ]
    },
    {
      day: "DAY 3 • OCT 16",
      title: "Valedictory & Awards",
      sessions: [
        { time: "10:30 AM", title: "Startup Pitch & Seed Funding Round", venue: "Venture Auditorium" },
        { time: "03:00 PM", title: "NARI Research Rigor Awards 2026", venue: "Main Auditorium, Block A" }
      ]
    }
  ];

  return (
    <div className="relative pt-12 pb-24 text-slate-700">
      {/* Visual background elements */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header Block */}
        <section className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NARI SUMMIT 2026 • FLAGSHIP EXPOSITION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]">
            Unifying Scholars, <br />
            <span className="gradient-text">Powering Digital Futures</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            NARI Summit 2026 represents North India's premiere academic convergence. Explore next-generation research breakthroughs, secure seed funding, and discover dynamic startup exhibits.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <div className="flex items-center space-x-2.5 px-4.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs shadow-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>October 14-16, 2026</span>
            </div>
            <div className="flex items-center space-x-2.5 px-4.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs shadow-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Plot 12, Knowledge Park III, Greater Noida</span>
            </div>
          </div>
        </section>

        {/* Dynamic Route Gateway Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          <div className="glass-panel p-8 rounded-3xl bg-white/85 border border-slate-200 shadow-xl flex flex-col justify-between group hover:border-blue-200 transition-all duration-300">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 w-fit">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                Digital Expo E-Catalogue
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Browse through detailed profiles of our 45+ exhibiting university startups, clean energy laboratories, and AI research cells. Access product brochures and contact information instantly.
              </p>
            </div>
            <Link
              href="/summit-2026/e-catalogue"
              className="mt-8 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 group/link"
            >
              <span>Access E-Catalogue Database</span>
              <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-3xl bg-white/85 border border-slate-200 shadow-xl flex flex-col justify-between group hover:border-blue-200 transition-all duration-300">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 w-fit">
                <Map className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                Interactive Expo Floor Map
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Locate exhibition booths, presentation rooms, diagnostic laboratories, and networking hubs in the Expo Arena. Plan your route, click booths to view details, and book advisory slots directly.
              </p>
            </div>
            <Link
              href="/summit-2026/expo"
              className="mt-8 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 group/link"
            >
              <span>Open Interactive Floor Map</span>
              <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </section>

        {/* Themes Track section */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Summit Tracks & Core Focus
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Our conference program spans three dedicated thematic tracks directed by global expert panels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="glass-panel p-6 sm:p-8 rounded-2xl bg-white/85 border border-slate-200 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-blue-600 tracking-wider font-mono">
                      {track.code}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">{track.icon}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                      Track Director: {track.lead}
                    </p>
                  </div>

                  <ul className="space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                    {track.focus.map((f, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agenda Timelines */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Summit Program Agenda
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Discover the full schedule of panels, workshops, and exhibition hours spanning three academic days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {agenda.map((day, i) => (
              <div 
                key={i} 
                className="glass-panel p-6 rounded-2xl bg-white/85 border border-slate-200 flex flex-col justify-between shadow"
              >
                <div>
                  <div className="border-b border-slate-200 pb-3 mb-5 flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 font-mono tracking-widest">{day.day}</span>
                    <span className="text-[10px] text-slate-500 font-mono">NARI Summit</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono mb-6">
                    {day.title}
                  </h3>
                  
                  <div className="space-y-5">
                    {day.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="flex items-start space-x-3.5 text-xs">
                        <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5">{session.time}</span>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{session.title}</p>
                          <p className="text-[10px] text-slate-500 leading-none mt-1 font-mono">{session.venue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summit Call-to-action */}
        <section id="register" className="glass-panel rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-slate-200 shadow-2xl text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Secure Your Admission Pass Now
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Claim your complimentary student, researcher, or exhibitor digital credentials today. Fast-track badge pick-up available at the Knowledge Park III entrance hall.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3">
            <Link
              href="/events/summit-2026-keynote"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/10 cursor-pointer text-xs active:scale-98 transition-all"
            >
              <span>Get Free General Delegate Pass</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
            <Link
              href="/contact#recruitment"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold glass-panel hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 cursor-pointer text-xs active:scale-98 transition-all"
            >
              Apply as Volunteer Staff
            </Link>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            *Official communications regarding credentials issued via <strong>sessions@nari.world</strong>.
          </p>
        </section>

      </div>
    </div>
  );
}
