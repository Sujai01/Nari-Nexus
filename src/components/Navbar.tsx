"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, ChevronDown, Compass, Users, BookOpen, FileText, 
  Calendar, Map, HelpCircle, Mail, Sparkles, Trophy, Network
} from "lucide-react";

interface SubItem {
  name: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href?: string;
  subItems?: SubItem[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks: NavItem[] = [
    {
      name: "About",
      subItems: [
        {
          name: "Overview & Vision",
          href: "/about",
          description: "Learn about the Nexus for Academic Research & Innovation.",
          icon: <Compass className="w-5 h-5 text-blue-500" />
        },
        {
          name: "Advisory Board",
          href: "/about#board",
          description: "Meet the academic visionaries leading our advisory council.",
          icon: <Users className="w-5 h-5 text-sky-500" />
        },
        {
          name: "Core Research Areas",
          href: "/about#research",
          description: "Explore our cross-disciplinary labs and academic publications.",
          icon: <Network className="w-5 h-5 text-indigo-500" />
        }
      ]
    },
    {
      name: "Events",
      subItems: [
        {
          name: "All Workshops & Events",
          href: "/events",
          description: "Browse hands-on labs, technical masterclasses, and panels.",
          icon: <Calendar className="w-5 h-5 text-emerald-500" />
        },
        {
          name: "Academic Blog & Insights",
          href: "/blog",
          description: "Read peer-reviewed insights, research writing tips, and newsletters.",
          icon: <BookOpen className="w-5 h-5 text-amber-500" />
        }
      ]
    },
    {
      name: "Summit 2026",
      subItems: [
        {
          name: "Summit Home & Themes",
          href: "/summit-2026",
          description: "Theme track lines, registration, and core agenda schedules.",
          icon: <Sparkles className="w-5 h-5 text-yellow-500" />
        },
        {
          name: "E-Catalogue",
          href: "/summit-2026/e-catalogue",
          description: "Digital expo guide, exhibiting startups, and research brochures.",
          icon: <FileText className="w-5 h-5 text-fuchsia-500" />
        },
        {
          name: "Interactive Floor Map",
          href: "/summit-2026/expo",
          description: "Locate exhibition booths, presentation rooms, and networking zones.",
          icon: <Map className="w-5 h-5 text-rose-500" />
        }
      ]
    },
    {
      name: "Contact",
      href: "/contact"
    }
  ];

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
      ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                NARI <span className="text-blue-600 font-medium">NEXUS</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider -mt-1 font-mono uppercase">
                Knowledge Park III
              </span>
            </div>
          </Link>

          {/* Desktop Nav Matrix */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.subItems && setActiveDropdown(link.name)}
                onMouseLeave={() => link.subItems && setActiveDropdown(null)}
              >
                {link.subItems ? (
                  <button 
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeDropdown === link.name || pathname.startsWith(link.name === "Summit 2026" ? "/summit-2026" : `/${link.name.toLowerCase()}`)
                        ? "text-blue-600 bg-blue-50/60" 
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-100/70"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === link.name ? "rotate-180" : ""
                    }`} />
                  </button>
                ) : (
                  <Link 
                    href={link.href || "/"}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      pathname === link.href 
                        ? "text-blue-600 bg-blue-50/60" 
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-100/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Desktop Dropdown Panel */}
                {link.subItems && activeDropdown === link.name && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl bg-white/95 border border-slate-200/80 shadow-2xl p-4 animate-fade-in-up backdrop-blur-xl">
                    <div className="space-y-3">
                      {link.subItems.map((sub) => (
                        <Link 
                          key={sub.name}
                          href={sub.href}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50/80 transition-all group/sub"
                        >
                          <div className="mt-0.5 p-1.5 rounded-md bg-slate-50 border border-slate-100 group-hover/sub:bg-blue-50/80 group-hover/sub:border-blue-100 transition-colors">
                            {sub.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 group-hover/sub:text-blue-600 transition-colors">
                              {sub.name}
                            </h4>
                            <p className="text-xs text-slate-500 leading-normal mt-0.5">
                              {sub.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Call Button */}
          <div className="hidden md:block">
            <Link 
              href="/summit-2026#register"
              className="inline-flex items-center px-4.5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition-all"
            >
              Summit Registration
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all"
              aria-label="Toggle Main Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-white/98 backdrop-blur-lg z-45 flex flex-col p-6 space-y-6 overflow-y-auto animate-fade-in-up border-t border-slate-100 shadow-xl">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-100 pb-3">
                {link.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex justify-between items-center w-full text-lg font-bold text-slate-800 py-2"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`} />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="mt-2 pl-4 space-y-3">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center space-x-3 py-2 text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            <span className="p-1 rounded bg-slate-50">{sub.icon}</span>
                            <span className="text-sm font-semibold">{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href || "/"}
                    className="block text-lg font-bold text-slate-800 py-2 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/summit-2026#register"
              className="flex items-center justify-center w-full py-3.5 text-center font-bold rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/10"
            >
              Summit Registration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
