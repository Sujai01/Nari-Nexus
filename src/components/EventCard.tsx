"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { WorkshopEvent, getSpeakerById } from "@/lib/cms";

interface EventCardProps {
  event: WorkshopEvent;
}

export default function EventCard({ event }: EventCardProps) {
  // Fetch speakers for the event
  const speakers = event.speakerIds.map(id => getSpeakerById(id)).filter(Boolean);
  
  // Calculate percentage of registration capacity
  const registeredPct = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
  const isFull = event.registeredCount >= event.capacity;

  const categoryColors = {
    "Keynote": "bg-blue-50 text-blue-600 border-blue-100",
    "Workshop": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Panel Discussion": "bg-purple-50 text-purple-600 border-purple-100",
    "Research Pitch": "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <div className="glass-panel group relative rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-500/30 shadow-md overflow-hidden hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between text-left">
      {/* Dynamic top gradient indicator */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-6">
        {/* Category & Capacity Header */}
        <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
            categoryColors[event.category] || "bg-slate-100 text-slate-600"
          }`}>
            {event.category}
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center space-x-1 ${
            isFull 
              ? "bg-rose-50 text-rose-600 border border-rose-100" 
              : registeredPct > 80 
                ? "bg-amber-50 text-amber-600 border border-amber-100" 
                : "bg-slate-100 text-slate-600 border border-slate-200/60"
          }`}>
            <Users className="w-3.5 h-3.5 mr-1 text-blue-600" />
            <span>{isFull ? "CLOSED" : `${event.capacity - event.registeredCount} seats left`}</span>
          </span>
        </div>

        {/* Title */}
        <Link href={`/events/${event.slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-300 mb-3 font-display line-clamp-2">
            {event.title}
          </h3>
        </Link>

        {/* Date, Time, Venue Details */}
        <div className="space-y-2 mb-5 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Capacity Loading Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1.5">
            <span>Capacity Utilization</span>
            <span>{registeredPct}% Filled</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isFull 
                  ? "bg-rose-500" 
                  : registeredPct > 80 
                    ? "bg-amber-500" 
                    : "bg-gradient-to-r from-blue-500 to-sky-500"
              }`}
              style={{ width: `${registeredPct}%` }}
            />
          </div>
        </div>

        {/* Speakers List */}
        {speakers.length > 0 && (
          <div className="border-t border-slate-100 pt-4 mb-2">
            <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 font-mono">
              Session Speakers
            </h4>
            <div className="flex flex-col space-y-2">
              {speakers.map((speaker) => speaker && (
                <div key={speaker.id} className="flex items-center space-x-2.5">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-100"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 leading-none">
                      {speaker.name}
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-none">
                      {speaker.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button link footer */}
      <div className="px-6 pb-6 pt-2">
        <Link 
          href={`/events/${event.slug}`}
          className="flex items-center justify-center w-full py-2.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 active:scale-98 transition-all group/btn"
        >
          <span>View Session & Register</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-slate-400 group-hover/btn:text-blue-600 group-hover/btn:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}
