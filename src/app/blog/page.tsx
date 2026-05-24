"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, User, Clock, ArrowRight, Sparkles } from "lucide-react";
import { getBlogs } from "@/lib/cms";

export default function BlogArchivePage() {
  const allBlogs = getBlogs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Research", "Academic Writing", "Summit News", "Innovation"];

  // Filter Blogs based on inputs
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative pt-12 pb-24 min-h-screen text-slate-700">
      {/* Visual background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-slate-200 text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NARI Scholar Publications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            The Research <span className="gradient-text">Nexus Journal</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Discover peer-reviewed guides, methodological analyses, venture incubation articles, and announcements written by the NARI advisory board members.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="glass-panel p-6 rounded-2xl bg-white/80 border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search research titles, keywords, abstract contents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter Chips */}
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

        {/* Blog Posts Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="glass-panel group rounded-2xl bg-white/90 border border-slate-200 hover:border-blue-200 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Blog Image */}
                    <div className="h-48 overflow-hidden relative border-b border-slate-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-4 left-4 px-2.5 py-1 text-[10px] font-bold bg-white/95 border border-slate-200 rounded text-blue-600 uppercase font-mono">
                      {blog.category}
                    </span>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500 mb-3">
                      <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {blog.date}</span>
                      <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {blog.readTime}</span>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 font-display mb-3">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Blog Author Footer */}
                <div className="p-6 pt-0">
                  <div className="border-t border-slate-950 pt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full border border-slate-800 object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-slate-900 leading-none">{blog.author.name}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5 leading-none">{blog.author.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-100 group-hover:border-blue-200 transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-2xl border border-slate-200 bg-white/80 max-w-xl mx-auto">
            <p className="text-slate-700 text-sm font-semibold">No scholarly articles matched your search query.</p>
            <p className="text-slate-500 text-xs mt-1">Try refining your keyword query or expanding the category filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 px-4 py-2 bg-blue-600 border border-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-xl transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
