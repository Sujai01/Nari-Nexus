"use client";

import React, { useState } from "react";
import { submitVolunteerApplication } from "@/lib/supabase";
import { 
  Mail, MapPin, Phone, HelpCircle, ChevronDown, 
  Send, CheckCircle2, ShieldAlert, Sparkles, User, FileText 
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function ContactPage() {
  // Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    interestArea: "Summit Logistics"
  });
  
  const [volStatus, setVolStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [volMessage, setVolMessage] = useState("");

  // FAQ Accordion State
  const [openFAQIdx, setOpenFAQIdx] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: "What is the cost of general delegate registration for Summit 2026?",
      answer: "General delegate admission is completely free for academic researchers, scholars, faculty members, and students affiliated with partner universities. A pre-verified institutional email ID is required to secure credentials."
    },
    {
      question: "How do I submit an abstract to the NARI Research Journal?",
      answer: "Research groups are encouraged to submit their drafts directly to abstracts@nari.world. The abstract must strictly follow our 5-sentence formula and be within 150-250 words. Reviews take approximately 2-3 weeks."
    },
    {
      question: "Are there any physical parking facilities at Knowledge Park III regional hub?",
      answer: "Yes, NARI provides dedicated multi-level parking stalls adjacent to Wing B for all pre-registered delegates. Electric charging slots are available on a first-come, first-served basis."
    },
    {
      question: "What is the recruitment timeline for volunteer staff positions?",
      answer: "Volunteer applications close on September 1, 2026. Successful applicants will receive verification confirmation via recruitment@nari.world by September 15, and mandatory digital onboarding commences shortly after."
    }
  ];

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.phone) return;

    setVolStatus("submitting");
    setVolMessage("");

    try {
      const response = await submitVolunteerApplication(volunteerForm);
      if (response.success) {
        setVolStatus("success");
        setVolMessage(response.message);
        setVolunteerForm({
          name: "",
          email: "",
          phone: "",
          skills: "",
          interestArea: "Summit Logistics"
        });
      } else {
        setVolStatus("error");
        setVolMessage(response.message);
      }
    } catch (err) {
      setVolStatus("error");
      setVolMessage("Connection failed. Please check your network connection.");
    }
  };

  const toggleFAQ = (idx: number) => {
    if (openFAQIdx === idx) {
      setOpenFAQIdx(null);
    } else {
      setOpenFAQIdx(idx);
    }
  };

  return (
    <div className="relative pt-12 pb-24 text-slate-700">
      {/* Background visual graphics */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Contact NARI <span className="gradient-text">Advisory Office</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Reach out to our administrative hub, apply as Summit 2026 volunteer staff, or get your research publishing queries answered.
          </p>
        </div>

        {/* 2-Column Split: Contact Info & Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Left Column: HQ Logistics & Maps */}
          <div className="space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white/80 border border-slate-200 shadow-xl space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Regional Headquarters & Logistics
              </h3>
              
              <div className="space-y-4.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">HQ Campus Address</p>
                    <p className="mt-0.5 leading-normal">
                      Plot 12, Knowledge Park III, Greater Noida, Uttar Pradesh, 201308
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Admissions Desk Phone</p>
                    <p className="mt-0.5">+91 (120) 232-NARI (6274)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-500">Official Channels</p>
                    <p className="mt-0.5">Admissions: <a href="mailto:sessions@nari.world" className="text-blue-600 hover:underline">sessions@nari.world</a></p>
                    <p className="mt-0.5">Publications: <a href="mailto:abstracts@nari.world" className="text-blue-600 hover:underline">abstracts@nari.world</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps (Phase 3 Requirement) */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-72 sm:h-96 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.4623871329584!2d77.4879203757388!3d28.495719375739908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1bad76a7c3b%3A0xc39f868c2d1b82a4!2sKnowledge%20Park%20III%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location for NARI HQ Knowledge Park III"
              />
            </div>
          </div>

          {/* Right Column: Volunteer Form Gate */}
          <div id="recruitment">
            {volStatus === "success" ? (
                <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-slate-200 shadow-2xl animate-fade-in-up text-center space-y-5">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Application Received!
                </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {volMessage}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setVolStatus("idle")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-500 inline-flex items-center cursor-pointer"
                  >
                    <span>Submit another application</span>
                    <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white/85 border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-500 to-indigo-500 opacity-60" />
                
                <div className="mb-6 flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    Summit 2026 Volunteer Application
                  </h3>
                </div>

                <form onSubmit={handleVolunteerSubmit} className="space-y-4.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anya Roy"
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="block w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 focus:outline-none transition-all"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Institutional Email</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. anya.roy@nari.world"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="block w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Contact Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="block w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 focus:outline-none transition-all"
                      />
                    </div>
                    {/* Area of Interest */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Interest Focus Area</label>
                      <select
                        value={volunteerForm.interestArea}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, interestArea: e.target.value })}
                        className="block w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 focus:outline-none transition-all"
                      >
                        <option>Summit Logistics</option>
                        <option>Technical Operations (AV/Compute)</option>
                        <option>Scholar Reception & Badges</option>
                        <option>IP Desk Assistance</option>
                      </select>
                    </div>
                  </div>

                  {/* Skills Statement */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Brief Skills / Affiliation Statement</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Specify your academic research background, prior event organizational experience, or key technical capabilities..."
                      value={volunteerForm.skills}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                      className="block w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {volStatus === "error" && (
                    <div className="flex items-start space-x-2 text-rose-400 text-xs bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg animate-fade-in-up">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{volMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={volStatus === "submitting" || !volunteerForm.name || !volunteerForm.email || !volunteerForm.phone}
                    className="w-full inline-flex items-center justify-center py-3.5 rounded-xl font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs shadow cursor-pointer disabled:opacity-50 active:scale-98 transition-all"
                  >
                    {volStatus === "submitting" ? (
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Application for Screening</span>
                        <Send className="w-3.5 h-3.5 ml-1.5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-[9px] text-slate-500 mt-3 text-center">
                  *NARI recruits under a strict academic non-discrimination code. Records are securely stored on our internal channels.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* FAQs Section */}
        <section className="border-t border-slate-200 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Get immediate answers regarding delegate credentials, publishing criteria, and parking guidelines.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQIdx === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl bg-white/85 border border-slate-200 overflow-hidden shadow transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="flex justify-between items-center w-full px-6 py-4.5 text-left text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center"><HelpCircle className="w-4.5 h-4.5 mr-2 text-blue-600" /> {faq.question}</span>
                    <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1.5 pl-12 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
