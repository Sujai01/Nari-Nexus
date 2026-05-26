"use client";

import React, { useState } from "react";
import { Search, CalendarDays, BookOpen, Layers, Sparkles } from "lucide-react";
import { getEvents } from "@/lib/cms";
import EventCard from "@/components/EventCard";

export default function EventsListingPage() {
  const allEvents = getEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Keynote", "Workshop", "Panel Discussion", "Research Pitch"];

  // Filter events based on inputs
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative pt-12 pb-24 min-h-screen text-slate-700">
      {/* Dynamic background glows */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NARI Academic Masterclasses</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Technical Workshops & <span className="gradient-text">Panels</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Reserve your seat in our hands-on laboratory experiments, scientific panels, and publishing seminars hosted across the NARI blocks in Knowledge Park III.
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
              placeholder="Search by topic, keyword, or tag (e.g. AI, Patens)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none custom-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 cursor-pointer border transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Event Cards Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-200 bg-white/80 max-w-xl mx-auto">
            <p className="text-slate-700 text-sm font-semibold">No academic sessions match your filters.</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting your keywords or looking under 'All' categories.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 px-4 py-2 bg-blue-600 border border-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
