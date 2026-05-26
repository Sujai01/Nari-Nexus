import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center py-20">
            <div className="max-w-[600px] mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                >
                    {/* 404 Number */}
                    <div className="mb-8">
                        <h1
                            className="font-display font-black text-[120px] md:text-[160px] leading-none text-transparent bg-clip-text"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #5856d6, #34c759)',
                            }}
                        >
                            404
                        </h1>
                    </div>

                    {/* Message */}
                    <h2 className="font-display font-black text-3xl text-[#1d1d1f] mb-4">
                        Page Not Found
                    </h2>

                    <p className="text-lg text-[#1d1d1f]/60 mb-8" style={{ fontWeight: 300 }}>
                        Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    {/* Suggestions */}
                    <div className="bg-white rounded-2xl p-8 border border-[#1d1d1f]/8 mb-8">
                        <p className="text-sm text-[#1d1d1f]/70 mb-4">Here are some helpful links instead:</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#5856d6] text-white font-[500] no-underline hover:bg-[#4845c2] transition-colors"
                            >
                                <Home size={18} />
                                Go Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#1d1d1f]/8 text-[#1d1d1f] font-[500] hover:bg-[#1d1d1f]/5 transition-colors cursor-pointer bg-white"
                            >
                                <ArrowLeft size={18} />
                                Go Back
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to="/events"
                            className="px-4 py-3 rounded-lg bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] text-sm font-[500] no-underline hover:bg-[#1d1d1f]/5 transition-colors"
                        >
                            Browse Events
                        </Link>
                        <Link
                            to="/speakers"
                            className="px-4 py-3 rounded-lg bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] text-sm font-[500] no-underline hover:bg-[#1d1d1f]/5 transition-colors"
                        >
                            View Speakers
                        </Link>
                        <Link
                            to="/blog"
                            className="px-4 py-3 rounded-lg bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] text-sm font-[500] no-underline hover:bg-[#1d1d1f]/5 transition-colors"
                        >
                            Read Blog
                        </Link>
                        <Link
                            to="/contact"
                            className="px-4 py-3 rounded-lg bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] text-sm font-[500] no-underline hover:bg-[#1d1d1f]/5 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}