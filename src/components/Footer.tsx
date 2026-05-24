"use client";

import React, { useState } from "react";
import Link from "next/link";
import { submitNewsletter } from "@/lib/supabase";
import { 
  Mail, Send, CheckCircle, AlertCircle, Twitter, 
  Linkedin, Globe, MapPin, Phone, ShieldAlert
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await submitNewsletter(email);
      if (response.success) {
        setStatus("success");
        setMessage(response.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(response.message);
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected connection error occurred.");
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 font-sans relative overflow-hidden">
      {/* Soft light grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Newsletter Block Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-16 bg-gradient-to-br from-white/90 via-slate-50 to-blue-50/30 border border-slate-200 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:max-w-md text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
              Subscribe to <span className="gradient-text">NARI Nexus</span> Dispatch
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Get the latest peer-reviewed academic insights, CFP announcements, workshop invitations, and Summit updates. Direct from Knowledge Park III.
            </p>
          </div>
          
          <div className="w-full lg:max-w-md">
            <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your academic email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading" || status === "success"}
                  className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success" || !email}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50 transition-all text-sm active:scale-98"
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            
            {/* Feedback Messages */}
            {status === "success" && (
              <div className="mt-3.5 flex items-start space-x-2 text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 p-3 rounded-lg animate-fade-in-up">
                <CheckCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}
            {status === "error" && (
              <div className="mt-3.5 flex items-start space-x-2 text-rose-600 text-xs bg-rose-50 border border-rose-100 p-3 rounded-lg animate-fade-in-up">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-2.5 leading-normal text-left">
              Official alerts will be dispatched from <strong>communications@nari.world</strong>. Make sure to whitelist our domain in your institution mail client.
            </p>
          </div>
        </div>

        {/* Directory Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-left">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center font-bold text-white shadow-md">
                N
              </div>
              <span className="text-lg font-bold text-slate-900 font-display">
                NARI <span className="text-blue-600 font-medium">NEXUS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500">
              Fostering academic rigor, engineering breakthrough innovations, and establishing corporate venture corridors in Greater Noida and globally.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://twitter.com/nari_world" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/nari-world" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://nari.world" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-100 hover:border-slate-300 transition-colors shadow-sm">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Academy & Research
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">About the Nexus</Link>
              </li>
              <li>
                <Link href="/about#board" className="hover:text-blue-600 transition-colors">Advisory Board</Link>
              </li>
              <li>
                <Link href="/about#research" className="hover:text-blue-600 transition-colors">Incubated Research Labs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">Academic Publications</Link>
              </li>
            </ul>
          </div>

          {/* Event Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Summit 2026
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/summit-2026" className="hover:text-blue-600 transition-colors">Summit Main & Themes</Link>
              </li>
              <li>
                <Link href="/summit-2026/e-catalogue" className="hover:text-blue-600 transition-colors">Virtual E-Catalogue</Link>
              </li>
              <li>
                <Link href="/summit-2026/expo" className="hover:text-blue-600 transition-colors">Interactive Expo Floor Map</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-600 transition-colors">Workshops & Masterclasses</Link>
              </li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div className="flex flex-col space-y-3 text-xs">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
              NARI HQ Location
            </h4>
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed text-slate-600">
                Plot 12, Knowledge Park III, Greater Noida, UP, 201308
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-slate-600">+91 (120) 232-NARI</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0" />
              <span className="text-slate-600 font-mono">domain: narinexus.com</span>
            </div>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NARI (Nexus for Academic Research & Innovation). All rights reserved.</p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Academic Ethics Charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
