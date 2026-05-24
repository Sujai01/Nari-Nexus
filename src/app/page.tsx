import React from "react";
import Link from "next/link";
import { 
  ArrowRight, MapPin, 
  Sparkles, Trophy, Cpu, Network, Landmark, GraduationCap 
} from "lucide-react";
import { getBlogs, getEvents } from "@/lib/cms";
import EventCard from "@/components/EventCard";
import AnimatedStats from "@/components/AnimatedStats";

export default function HomePage() {
  const featuredEvents = getEvents().slice(0, 3);
  const latestBlogs = getBlogs().slice(0, 2);

  const metrics = [
    { value: "80+", label: "Academic Speakers", desc: "Global research leads", icon: <GraduationCap className="w-5 h-5 text-blue-600" /> },
    { value: "1,400+", label: "Delegate Registrations", desc: "Scholars & students pre-registered", icon: <GraduationCap className="w-5 h-5 text-sky-500" /> },
    { value: "45+", label: "Exhibiting Labs", desc: "Incubated technology groups", icon: <Trophy className="w-5 h-5 text-amber-500" /> },
    { value: "Plot 12", label: "Regional Hub", desc: "Knowledge Park III campus", icon: <MapPin className="w-5 h-5 text-indigo-500" /> }
  ];

  const pillars = [
    {
      id: "pillar-a",
      title: "AI Ethics & Local Languages",
      desc: "Creating privacy-preserving Translation LLM sandboxes optimized for low-resource environments and public portals.",
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      color: "border-l-4 border-l-blue-500"
    },
    {
      id: "pillar-b",
      title: "Clean Energy Chemistry",
      desc: "Engineering next-generation solid-state chemistry batteries and micro-grid telemetry solutions.",
      icon: <Network className="w-6 h-6 text-sky-500" />,
      color: "border-l-4 border-l-sky-500"
    },
    {
      id: "pillar-c",
      title: "IPR Commercialization Hub",
      desc: "Bridging peer-reviewed university research with licensing corridors, capital incubators, and seed funding pools.",
      icon: <Landmark className="w-6 h-6 text-indigo-500" />,
      color: "border-l-4 border-l-indigo-500"
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Premium background visual glow elements (Bluish & Pastel) */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[130px] pointer-events-none animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] rounded-full bg-indigo-300/10 blur-[120px] pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-24 space-y-28">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200/80 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-2 animate-fade-in-up">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NARI NEXUS • GREATER NOIDA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1] animate-fade-in-up">
            Where Academic Rigor <br />
            <span className="gradient-text">Meets Digital Futures</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Welcome to the Nexus for Academic Research & Innovation based in Plot 12, Knowledge Park III. Discover collaborative sandboxes, peer-reviewed journals, and our flagship Summit 2026.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4 animate-fade-in-up">
            <Link
              href="/summit-2026"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition-all text-xs"
            >
              <span>Explore Summit 2026</span>
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold glass-panel hover:bg-slate-100 text-slate-700 border border-slate-200 active:scale-98 transition-all text-xs"
            >
              Reserve Masterclass Seats
            </Link>
          </div>
        </section>

        {/* METRICS PANEL (With floating animation hover) */}
        <AnimatedStats metrics={metrics} />

        {/* THREE CORE PILLARS SECTION */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Strategic Research Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We focus our academic telemetry and cross-disciplinary collaborations across three key scientific sandboxes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div 
                key={p.id}
                className={`glass-panel p-8 rounded-2xl bg-white/70 shadow flex flex-col justify-between border-slate-200/80 hover:border-blue-500/20 transition-all duration-300 ${p.color} text-left`}
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 w-fit">
                    {p.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <Link
                  href="/about#research"
                  className="mt-6 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 group/link"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* WORKSHOPS & EVENT SHOWCASE */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-5">
            <div className="text-left space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
                Featured Technical Sessions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Reserve admission spots in our ongoing scientific conferences and masterclasses.
              </p>
            </div>
            <Link 
              href="/events" 
              className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 group"
            >
              <span>View All Sessions</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* LATEST PUBLICATIONS (With slide hover effect) */}
        <section className="space-y-12 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-5">
            <div className="text-left space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
                Recent Insights & Guides
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Peer-reviewed telemetry, academic writing tips, and corporate innovation dispatches.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-500 group"
            >
              <span>Explore Blog Archives</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {latestBlogs.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.slug}`}
                className="glass-panel group rounded-2xl p-6 sm:p-8 bg-white/70 border border-slate-200/80 hover:border-blue-500/20 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>{blog.date}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100">{blog.category}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 mt-6 group-hover:text-blue-500">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
