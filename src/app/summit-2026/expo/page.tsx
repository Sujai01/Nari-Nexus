"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Map, MapPin, Building, Info, Sparkles, Network, Globe, Mail, ArrowRight, Layers } from "lucide-react";

interface BoothData {
  id: string;
  name: string;
  code: string;
  track: "Track A" | "Track B" | "Track C" | "Special Zone";
  lead: string;
  description: string;
  email: string;
  website: string;
  x: number; // SVG Grid coordinates
  y: number;
  w: number;
  h: number;
  fill: string;
  hoverFill: string;
}

function FloorMapContent() {
  const searchParams = useSearchParams();
  
  const booths: BoothData[] = [
    {
      id: "ex-aura-ai",
      name: "Aura AI Systems Ltd",
      code: "A-101",
      track: "Track A",
      lead: "Aditya Verma",
      description: "Pioneering highly optimized Local Language Translation LLM structures for public services. Our offline server models deploy directly in remote school corridors.",
      email: "aura@nari.world",
      website: "https://aura.nari.world",
      x: 60, y: 70, w: 90, h: 70,
      fill: "fill-sky-500/20 stroke-sky-400",
      hoverFill: "group-hover:fill-sky-500/40 group-hover:stroke-sky-300"
    },
    {
      id: "ex-cybernet",
      name: "CyberNet Sandboxes",
      code: "A-202",
      track: "Track A",
      lead: "Dr. Arundhati Sen",
      description: "Secure, zero-knowledge privacy sandboxes engineered to shield institutional databases and student research files from external vectors.",
      email: "cybernet@nari.world",
      website: "https://cybernet.nari.world",
      x: 180, y: 70, w: 90, h: 70,
      fill: "fill-sky-500/20 stroke-sky-400",
      hoverFill: "group-hover:fill-sky-500/40 group-hover:stroke-sky-300"
    },
    {
      id: "ex-solcells",
      name: "SolCells CleanTech",
      code: "B-102",
      track: "Track B",
      lead: "Dr. Sarah Jenkins",
      description: "Developing next-generation solid-state chemistry batteries with 4x energy density and absolute thermal stability. Tailored for smart agricultural telemetry.",
      email: "solcells@nari.world",
      website: "https://solcells.nari.world",
      x: 60, y: 220, w: 90, h: 70,
      fill: "fill-emerald-500/20 stroke-emerald-400",
      hoverFill: "group-hover:fill-emerald-500/40 group-hover:stroke-emerald-300"
    },
    {
      id: "ex-biowear",
      name: "BioWear Telemetry",
      code: "B-201",
      track: "Track B",
      lead: "Dr. Priya Sharma",
      description: "Providing high-fidelity, low-cost wearable biosensors monitoring core electrocardiogram profiles in real-time. Built entirely on open-source hardware.",
      email: "biowear@nari.world",
      website: "https://biowear.nari.world",
      x: 180, y: 220, w: 90, h: 70,
      fill: "fill-emerald-500/20 stroke-emerald-400",
      hoverFill: "group-hover:fill-emerald-500/40 group-hover:stroke-emerald-300"
    },
    {
      id: "ex-venture-corridor",
      name: "Venture Incubation Corridor",
      code: "C-301",
      track: "Track C",
      lead: "Prof. Rajesh Mehta",
      description: "The primary university-industry tech transfer desk. Providing patent drafts reviews, commercial licensing consults, and direct connections to corporate VCs.",
      email: "incubator@nari.world",
      x: 350, y: 70, w: 100, h: 100,
      fill: "fill-amber-500/20 stroke-amber-400",
      hoverFill: "group-hover:fill-amber-500/40 group-hover:stroke-amber-300",
      website: "https://incubator.nari.world"
    }
  ];

  const specialZones = [
    { label: "Technical Seminar Stage", x: 350, y: 220, w: 200, h: 70 },
    { label: "IP & Advisory Hub", x: 500, y: 70, w: 90, h: 100 },
    { label: "Scholar Lounge & Network Wing", x: 490, y: 320, w: 100, h: 50 }
  ];

  const [selectedBooth, setSelectedBooth] = useState<BoothData | null>(booths[0]);
  const [hoveredBooth, setHoveredBooth] = useState<BoothData | null>(null);

  // Sync URL parameters on mount/change
  useEffect(() => {
    const boothId = searchParams.get("booth");
    if (boothId) {
      const match = booths.find((b) => b.id === boothId);
      if (match) {
        setSelectedBooth(match);
      }
    }
  }, [searchParams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Interactive Map Layout Column (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel p-5 rounded-3xl bg-white/85 border border-slate-200 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-teal-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Exposition Arena Floor Plan
              </h3>
            </div>
            
            {/* Quick legend */}
            <div className="flex items-center space-x-3.5 text-[10px] font-mono">
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-sky-500/20 border border-sky-400 mr-1.5" /> Track A</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-400 mr-1.5" /> Track B</span>
              <span className="flex items-center"><span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-400 mr-1.5" /> Track C</span>
            </div>
          </div>

          {/* Interactive SVG Map Container */}
            <div className="relative border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-inner flex items-center justify-center p-2.5 min-h-[360px] sm:min-h-[460px]">
            {/* Grid graphic background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <svg 
              viewBox="0 0 620 400" 
              className="w-full max-w-full h-auto select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Floor boundary lines */}
              <rect x="10" y="10" width="600" height="380" rx="16" fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
              
              {/* Entrances */}
              <path d="M 10 180 L 10 220" stroke="#2563eb" strokeWidth="4" />
              <text x="18" y="205" fill="#2563eb" fontSize="9" fontFamily="monospace" fontWeight="bold">MAIN ENTRY</text>

              {/* Special zones */}
              {specialZones.map((zone, idx) => (
                <g key={idx} className="opacity-40">
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx="8"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2 + 3}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="sans-serif"
                    fontWeight="500"
                  >
                    {zone.label}
                  </text>
                </g>
              ))}

              {/* Interactive Booth Rectangles */}
              {booths.map((booth) => {
                const isSelected = selectedBooth?.id === booth.id;
                return (
                  <g 
                    key={booth.id}
                    onClick={() => setSelectedBooth(booth)}
                    onMouseEnter={() => setHoveredBooth(booth)}
                    onMouseLeave={() => setHoveredBooth(null)}
                    className="group cursor-pointer"
                  >
                    {/* Pulsing indicator background if selected */}
                    {isSelected && (
                      <rect
                        x={booth.x - 4}
                        y={booth.y - 4}
                        width={booth.w + 8}
                        height={booth.h + 8}
                        rx="12"
                        fill="transparent"
                        stroke="#0f766e"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}
                    {/* Core Booth */}
                    <rect
                      x={booth.x}
                      y={booth.y}
                      width={booth.w}
                      height={booth.h}
                      rx="8"
                      className={`transition-all duration-300 stroke-[1.5] ${booth.fill} ${booth.hoverFill} ${
                        isSelected ? "fill-teal-500/30 stroke-teal-400 stroke-2" : ""
                      }`}
                    />
                    {/* Booth Code Text */}
                    <text
                      x={booth.x + booth.w / 2}
                      y={booth.y + booth.h / 2 - 4}
                      textAnchor="middle"
                      className={`text-[10px] font-mono font-bold leading-none select-none transition-colors duration-300 ${
                        isSelected ? "fill-teal-300 font-extrabold" : "fill-slate-400 group-hover:fill-white"
                      }`}
                    >
                      {booth.code}
                    </text>
                    {/* Booth Name Text */}
                    <text
                      x={booth.x + booth.w / 2}
                      y={booth.y + booth.h / 2 + 10}
                      textAnchor="middle"
                      className={`text-[8px] select-none transition-colors duration-300 ${
                        isSelected ? "fill-white" : "fill-slate-500 group-hover:fill-slate-300"
                      }`}
                    >
                      {booth.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip floating on bottom-left */}
            {hoveredBooth && (
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/95 border border-slate-200 text-[10px] space-y-1.5 shadow-2xl animate-fade-in-up backdrop-blur-md">
                <p className="font-bold text-slate-900 font-display flex items-center space-x-1">
                  <span>{hoveredBooth.name}</span>
                </p>
                <div className="flex items-center justify-between gap-4 font-mono text-[9px]">
                  <span className="text-slate-500">Booth {hoveredBooth.code}</span>
                  <span className="text-teal-400">{hoveredBooth.track}</span>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-[10px] text-slate-500 leading-normal flex items-start space-x-1.5 bg-white/80 p-3 rounded-lg border border-slate-200">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Map Guide:</strong> Tap or click any color-coded booth rectangle above. The details, contact email, and academic inquiry gateway will update instantly in the right-hand panel.
            </span>
          </p>
        </div>
      </div>

      {/* Reactive Detail Drawer Column (1/3 width) */}
      <div className="space-y-6">
        {selectedBooth ? (
          <div className="glass-panel p-6 rounded-3xl bg-white/85 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between animate-fade-in-up min-h-[380px] sm:min-h-[460px]">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 to-indigo-500 opacity-60" />
            
            <div className="space-y-6">
              {/* Header metadata */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded">
                  Booth {selectedBooth.code}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  {selectedBooth.track}
                </span>
              </div>

              {/* Startup details */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display leading-snug">
                  {selectedBooth.name}
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  Lead: {selectedBooth.lead}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  {selectedBooth.description}
                </p>
              </div>
            </div>

            {/* Quick contact gates */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-600">
                <a 
                  href={selectedBooth.website} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:text-slate-900 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span>Website</span>
                </a>
                <a 
                  href={`mailto:${selectedBooth.email}`}
                  className="flex items-center justify-center py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:text-slate-900 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span>Email</span>
                </a>
              </div>

              <a
                href={`mailto:bookings@nari.world?subject=Meeting Request - Booth ${selectedBooth.code}`}
                className="w-full inline-flex items-center justify-center py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white text-xs shadow transition-all active:scale-98 cursor-pointer"
              >
                <span>Schedule Advisory Meeting</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 rounded-3xl bg-white/85 border border-slate-200 text-center py-16 animate-fade-in-up">
            <Building className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-700 text-xs font-semibold">No booth selected</p>
            <p className="text-slate-500 text-[10px] mt-1">Click a booth rectangle on the vector floor plan to view parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExpoFloorMapPage() {
  return (
    <div className="relative pt-12 pb-24 min-h-screen text-slate-700">
      {/* Background glow graphics */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NARI Summit 2026 Exposition Floor Plan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Interactive <span className="gradient-text">Expo Map</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Locate exhibiting deep-tech startups, collaborative research booths, and presentation wings in the primary Summit 2026 expo floor plan in Knowledge Park III.
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-20">
            <span className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin inline-block" />
          </div>
        }>
          <FloorMapContent />
        </Suspense>
      </div>
    </div>
  );
}
