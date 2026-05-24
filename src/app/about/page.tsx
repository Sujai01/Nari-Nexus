import React from "react";
import { 
  Compass, ShieldAlert, Award, FileText, Landmark, Users, 
  ChevronRight, MapPin, Sparkles, BookOpen, ShieldCheck 
} from "lucide-react";
import { getSpeakers } from "@/lib/cms";

export default function AboutPage() {
  const speakers = getSpeakers();
  const advisoryCouncil = speakers.filter(s => s.category === "Advisory Council");
  const researchLeads = speakers.filter(s => s.category === "Research Lead");

  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-blue-600" />,
      title: "Interdisciplinary Rigor",
      desc: "Integrating foundational mathematics, solid-state chemistry, and applied cognitive science under unified peer reviews."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: "Ethical Sandboxes",
      desc: "Validating advanced algorithms and smart battery telemetries inside secure local institutional sandboxes prior to commercial licensing."
    },
    {
      icon: <Landmark className="w-5 h-5 text-blue-600" />,
      title: "Venture Corridors",
      desc: "Establishing highly optimized, transparent technology transfer channels mapping university prototypes directly to venture funds."
    }
  ];

  return (
    <div className="relative pt-12 pb-24 min-h-screen">
      {/* Background glow graphics */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Main vision section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Infrastructure & Vision</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Fostering Breakthroughs in <br />
            <span className="gradient-text">Knowledge Park III</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Nexus for Academic Research & Innovation (NARI) serves as North India's premiere academic convergence. Operating from our central Plot 12 facility in Greater Noida, UP, NARI bridges local language telemetry, clean smart energy cells, and advanced intellectual property advisory models.
          </p>
        </section>

        {/* Three Pillars Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl bg-white/70 border border-slate-200 hover:border-blue-500/20 shadow-md text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 w-fit">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Advisory council section */}
        <section id="board" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Core Advisory Council
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Our academic policies and research initiatives are steered by standard peer-recognized professors and lab directors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryCouncil.map((member) => (
              <div 
                key={member.id}
                className="glass-panel p-6 rounded-2xl bg-white/70 border border-slate-200 hover:border-blue-500/20 shadow flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center space-x-3.5 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight font-display">
                        {member.name}
                      </h3>
                      <p className="text-[10px] text-blue-600 font-bold leading-tight mt-0.5">{member.role}</p>
                      <p className="text-[9px] text-slate-500 font-mono leading-none mt-1">{member.institution}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Advisory Council</span>
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="hover:text-blue-600 text-blue-500">LinkedIn Profile</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Leads section */}
        <section id="research" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Principal Sandboxes & Research Leads
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Meet our laboratory hosts coordinating the translation sandboxes and clean infrastructure projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {researchLeads.map((member) => (
              <div 
                key={member.id}
                className="glass-panel p-6 rounded-2xl bg-white/70 border border-slate-200 hover:border-blue-500/20 shadow flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center space-x-3.5 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight font-display">
                        {member.name}
                      </h3>
                      <p className="text-[10px] text-blue-600 font-bold leading-tight mt-0.5">{member.role}</p>
                      <p className="text-[9px] text-slate-500 font-mono leading-none mt-1">{member.institution}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>Research Lead</span>
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="hover:text-blue-600 text-blue-500">LinkedIn Profile</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
