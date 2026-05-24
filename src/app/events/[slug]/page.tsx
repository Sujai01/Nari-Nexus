import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  CalendarDays, Clock, MapPin, Users, ArrowLeft, 
  Map, Mail, CheckCircle2, ChevronRight 
} from "lucide-react";
import { getEventBySlug, getEvents, getSpeakerById } from "@/lib/cms";
import RegistrationForm from "@/components/RegistrationForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for maximum SEO (Phase 5)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    return {
      title: "Event Not Found | NARI Nexus",
    };
  }

  return {
    title: `${event.title} | NARI Summit 2026`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "website",
      images: [
        {
          url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&h=630&q=80",
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  const speakers = event.speakerIds.map((id) => getSpeakerById(id)).filter(Boolean);

  return (
    <div className="relative pt-12 pb-24 text-slate-700">
      {/* Visual backdrop glow */}
      <div className="absolute top-20 left-1/3 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back navigation link */}
        <Link
          href="/events"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 group mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Session Listing</span>
        </Link>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main event details column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded uppercase font-mono">
                {event.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                {event.title}
              </h1>
            </div>

            {/* Description */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white/80 border border-slate-200 shadow space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Session Abstract & Objective
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {event.description}
              </p>
              
              {/* Event Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {event.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-50 border border-slate-200 text-slate-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Advisory Speakers Profiles */}
            {speakers.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                  Session Hosts & Advisory Leaders
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {speakers.map((speaker) => speaker && (
                    <div 
                      key={speaker.id} 
                      className="glass-panel p-5 rounded-2xl bg-white/85 border border-slate-200 hover:border-blue-200 transition-colors shadow flex flex-col justify-between"
                    >
                      <div className="flex items-center space-x-3.5 mb-3.5">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight font-display">
                            {speaker.name}
                          </h4>
                          <p className="text-[10px] text-blue-600 font-medium leading-tight mt-0.5">{speaker.role}</p>
                          <p className="text-[9px] text-slate-500 font-mono leading-none mt-1">{speaker.institution}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                        {speaker.bio}
                      </p>
                      <div className="border-t border-slate-950/80 pt-3 flex justify-between items-center text-[10px]">
                        <span className="text-[8px] font-bold text-slate-500 font-mono bg-slate-50 px-2 py-0.5 rounded">
                          {speaker.category}
                        </span>
                        <div className="flex space-x-2 font-mono text-slate-500">
                          {speaker.socials.linkedin && (
                            <a href={speaker.socials.linkedin} className="hover:text-teal-400">LinkedIn</a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Registration column sidebar */}
          <div className="space-y-6">
            
            {/* Session Specs Widget */}
            <div className="glass-panel p-5 rounded-3xl bg-white/85 border border-slate-200 shadow space-y-4">
              <h4 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">
                Session Logistics
              </h4>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start space-x-3">
                  <CalendarDays className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Session Date</p>
                    <p className="mt-0.5">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Time Block</p>
                    <p className="mt-0.5">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Physical Venue</p>
                    <p className="mt-0.5 leading-normal">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Admissions</p>
                    <p className="mt-0.5">{event.registeredCount} / {event.capacity} seats filled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mount our reactive checkout form */}
            <RegistrationForm
              eventTitle={event.title}
              eventDate={event.date}
              eventTime={event.time}
              eventVenue={event.venue}
            />

          </div>

        </div>

      </div>
    </div>
  );
}
