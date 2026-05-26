"use client";

import React, { useState } from "react";
import { CheckCircle2, Ticket, Sparkles, QrCode, ArrowRight, Mail, User, Landmark } from "lucide-react";

interface RegistrationFormProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
}

export default function RegistrationForm({ 
  eventTitle, 
  eventDate, 
  eventTime, 
  eventVenue 
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", institution: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) return;

    setStatus("submitting");

    // Simulate backend registration request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedId = "NARI-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);
    setTicketId(generatedId);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border border-slate-200 shadow-2xl animate-fade-in-up text-center relative overflow-hidden">
        {/* Ticket Header background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-sky-500" />
        
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center mb-4 text-emerald-600 shadow-lg">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-display mb-1.5">
          Registration Confirmed!
        </h3>
        <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-normal mb-6">
          Your reservation is successfully processed. A digital pass has been dispatched from <strong>sessions@nari.world</strong>.
        </p>

        {/* Core Ticket UI */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4 mb-6 shadow-sm relative">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-[9px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                Official Access Ticket
              </p>
              <h4 className="text-sm font-bold text-slate-900 leading-tight font-display mt-1 line-clamp-1">
                {eventTitle}
              </h4>
            </div>
            <Ticket className="w-5 h-5 text-slate-400 shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-[10px] border-t border-slate-200 pt-3">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider font-mono">Date</p>
              <p className="text-slate-700 mt-0.5">{eventDate}</p>
            </div>
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-wider font-mono">Time</p>
              <p className="text-slate-700 mt-0.5">{eventTime}</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider font-mono">Venue</p>
              <p className="text-slate-700 mt-0.5 line-clamp-1">{eventVenue}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-400 text-[8px] font-bold uppercase tracking-wider font-mono">Attendee</p>
              <p className="text-slate-950 text-xs font-semibold leading-tight mt-0.5">{formData.name}</p>
              <p className="text-[9px] text-slate-500 leading-none mt-0.5">{formData.institution}</p>
            </div>
            {/* QR code plate */}
            <div className="p-1.5 rounded-lg bg-white shrink-0 shadow border border-slate-100 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-slate-900" />
            </div>
          </div>

          {/* Ticket ID Sub-bar */}
          <div className="border-t border-dashed border-slate-200 pt-2.5 flex justify-between items-center text-[9px] font-mono text-slate-400">
            <span>Access Code</span>
            <span className="text-blue-600 font-bold">{ticketId}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({ name: "", email: "", institution: "" });
            setStatus("idle");
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-500 inline-flex items-center cursor-pointer"
        >
          <span>Register another person</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200 shadow-lg relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500" />
      
      <div className="mb-6 flex items-center space-x-2">
        <Ticket className="w-5 h-5 text-blue-600" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
          Reserve Seat
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4.5">
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Rohan Roy"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Institutional Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="email"
              required
              placeholder="e.g. rohan.roy@nari.world"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Institution input */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Affiliation / University
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Landmark className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              required
              placeholder="e.g. G. Noida Technology Forum"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="block w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || !formData.name || !formData.email || !formData.institution}
          className="w-full inline-flex items-center justify-center py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-500/5 hover:shadow-blue-500/10 cursor-pointer disabled:opacity-50 transition-all text-xs active:scale-98"
        >
          {status === "submitting" ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Claim Free Attendee Pass</span>
              <Sparkles className="w-3.5 h-3.5 ml-1.5" />
            </>
          )}
        </button>
      </form>
      
      <p className="text-[9px] text-slate-450 leading-normal mt-3.5 text-center">
        Access is free of charge for students and faculty of partner universities. High-speed Wi-Fi and seminar materials included.
      </p>
    </div>
  );
}
