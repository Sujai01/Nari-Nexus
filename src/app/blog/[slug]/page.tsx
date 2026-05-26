import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, Clock, User, ArrowLeft, Send } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/cms";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate Dynamic Metadata for solid SEO (Phase 5)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  
  if (!blog) {
    return {
      title: "Article Not Found | NARI Nexus",
    };
  }

  return {
    title: `${blog.title} | NARI Journal`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
      images: [{ url: blog.image }],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const otherBlogs = getBlogs()
    .filter((b) => b.id !== blog.id)
    .slice(0, 2);

  return (
    <div className="relative pt-12 pb-24 text-slate-700">
      {/* Decorative glows */}
      <div className="absolute top-20 right-10 w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 group mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Publication Archives</span>
        </Link>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-4">
            <span className="px-2.5 py-1 text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded uppercase font-mono">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              {blog.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          </div>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-200">
            <div className="flex items-center space-x-3.5">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {blog.author.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-none">
                  {blog.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-blue-600" /> {blog.date}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-blue-600" /> {blog.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="h-64 sm:h-[420px] rounded-3xl overflow-hidden relative border border-slate-200 shadow-2xl my-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Article Rich Text Body */}
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-xs sm:text-sm space-y-6 pt-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* CTA Abstract submission card */}
        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-slate-200 shadow-2xl mt-16 text-center space-y-5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
            Want to Publish Your Research in NARI Journal?
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            We are actively reviewing abstracts for the Q3 issue. Researchers in Knowledge Park III and partner institutes are invited to submit their publications drafts.
          </p>
          <a
            href="mailto:abstracts@nari.world"
            className="inline-flex items-center px-5 py-3 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all cursor-pointer active:scale-98"
          >
            <span>Submit Abstract to abstracts@nari.world</span>
            <Send className="w-4 h-4 ml-1.5 shrink-0" />
          </a>
        </div>

        {/* Related articles bottom list */}
        {otherBlogs.length > 0 && (
          <div className="border-t border-slate-200 pt-16 mt-20">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display mb-8">
              Read Next
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {otherBlogs.map((other) => (
                <div 
                  key={other.id} 
                  className="glass-panel group rounded-2xl p-6 bg-white/80 border border-slate-200 hover:border-blue-200 transition-colors shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[9px] font-bold text-teal-400 uppercase tracking-wider font-mono">
                      {other.category}
                    </span>
                    <Link href={`/blog/${other.slug}`}>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {other.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                    <span className="text-[10px] text-slate-500 font-mono">{other.date}</span>
                    <Link 
                      href={`/blog/${other.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 inline-flex items-center"
                    >
                      <span>Read Guide</span>
                      <ArrowLeft className="w-3.5 h-3.5 ml-1 rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
