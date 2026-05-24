"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Building, Globe, Mail, Sparkles, Network, ArrowRight } from "lucide-react";

interface Exhibitor {
  id: string;
  name: string;
  booth: string;
  track: "Track A" | "Track B" | "Track C";
  lead: string;
  description: string;
  website: string;
  email: string;
  brochureUrl: string;
  tags: string[];
}

export default function ECataloguePage() {
  const exhibitors: Exhibitor[] = [
    {
      id: "ex-aura-ai",
      name: "Aura AI Systems Ltd",
      booth: "Booth A-101",
      track: "Track A",
      lead: "Aditya Verma",
      description: "Pioneering highly optimized Local Language Translation LLM structures for public services. Our offline server models deploy directly in remote school corridors.",
      website: "https://aura.nari.world",
      email: "aura@nari.world",
      brochureUrl: "#aura-brochure",
      tags: ["AI Tools", "Local Languages", "Offline Compute"]
    },
    {
      id: "ex-solcells",
      name: "SolCells CleanTech",
      booth: "Booth B-102",
      track: "Track B",
      lead: "Dr. Sarah Jenkins",
      description: "Developing next-generation solid-state chemistry batteries with 4x energy density and absolute thermal stability. Tailored for smart agricultural telemetry.",
      website: "https://solcells.nari.world",
      email: "solcells@nari.world",
      brochureUrl: "#solcells-brochure",
      tags: ["Battery", "Green Energy", "Agritech"]
    },
    {
      id: "ex-biowear",
      name: "BioWear Telemetry",
      booth: "Booth B-201",
      track: "Track B",
      lead: "Dr. Priya Sharma",
      description: "Providing high-fidelity, low-cost wearable biosensors monitoring core electrocardiogram profiles in real-time. Built entirely on open-source hardware.",
      website: "https://biowear.nari.world",
      email: "biowear@nari.world",
      brochureUrl: "#biowear-brochure",
      tags: ["Bio-Tech", "IoT", "Sensors"]
    },
    {
      id: "ex-cybernet",
      name: "CyberNet Sandboxes",
      booth: "Booth A-202",
      track: "Track A",
      lead: "Dr. Arundhati Sen",
      description: "Secure, zero-knowledge privacy sandboxes engineered to shield institutional databases and student research files from external vectors.",
      website: "https://cybernet.nari.world",
      email: "cybernet@nari.world",
      brochureUrl: "#cybernet-brochure",
      tags: ["Cybersecurity", "Zero Knowledge", "Encryption"]
    },
    {
      id: "ex-venture-corridor",
      name: "Venture Incubation Corridor",
      booth: "Booth C-301",
      track: "Track C",
      lead: "Prof. Rajesh Mehta",
      description: "The primary university-industry tech transfer desk. Providing patent drafts reviews, commercial licensing consults, and direct connections to corporate VCs.",
      website: "https://incubator.nari.world",
      email: "incubator@nari.world",
      brochureUrl: "#incubator-brochure",
      tags: ["IPR Support", "Funding Desk", "Licensing"]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("All");

  const tracks = ["All", "Track A", "Track B", "Track C"];

  const filteredExhibitors = exhibitors.filter((ex) => {
    const matchesSearch = 
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTrack = selectedTrack === "All" || ex.track === selectedTrack;

    return matchesSearch && matchesTrack;
  });

  return (
    <div className="relative pt-12 pb-24 min-h-screen text-slate-700">
      {/* Background glow graphics */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Expo E-Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Exhibiting <span className="gradient-text">Academic Startups</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse through active incubation research teams commercializing their breakthroughs at NARI Summit 2026. Explore descriptions, download brochures, or book physical site audits.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel p-6 rounded-2xl bg-white/80 border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search exhibiting groups, booth IDs, leads, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Track Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none custom-scrollbar">
            {tracks.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 cursor-pointer border transition-all ${
                  selectedTrack === track
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {track === "All" ? "All Tracks" : `${track} Focus`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Exhibitors */}
        {filteredExhibitors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExhibitors.map((ex) => (
              <div 
                key={ex.id}
                className="glass-panel group rounded-2xl p-6 bg-white/90 border border-slate-200 hover:border-blue-200 shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Top booth tag header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-slate-500 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{ex.booth}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                      ex.track === "Track A" 
                        ? "bg-sky-500/10 border-sky-500/20 text-sky-400" 
                        : ex.track === "Track B" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      {ex.track}
                    </span>
                  </div>

                  {/* Name and Lead */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display mb-1.5 leading-snug group-hover:text-blue-600 transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mb-4">
                    Lead Researcher: {ex.lead}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {ex.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ex.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-slate-50 border border-slate-200 text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive contact bar */}
                <div className="border-t border-slate-200 pt-4 space-y-3.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <a href={ex.website} className="flex items-center hover:text-slate-900 transition-colors">
                      <Globe className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      <span>Website</span>
                    </a>
                    <a href={`mailto:${ex.email}`} className="flex items-center hover:text-slate-900 transition-colors">
                      <Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      <span>Email</span>
                    </a>
                  </div>
                  
                  <Link
                    href={`/summit-2026/expo?booth=${ex.id}`}
                    className="flex items-center justify-center w-full py-2 rounded-lg text-[10px] font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition-all"
                  >
                    <span>Locate on Expo Map</span>
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-200 bg-white/80 max-w-xl mx-auto">
            <p className="text-slate-700 text-sm font-semibold">No exhibiting groups match your filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTrack("All"); }}
              className="mt-4 px-4 py-2 bg-blue-600 border border-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-xl cursor-pointer"
            >
              Reset Catalogue Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
