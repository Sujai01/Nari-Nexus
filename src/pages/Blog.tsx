import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Calendar, User, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function Blog() {
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    // Mock blog data - replace with API call in Phase 3
    const blogPosts = [
        {
            id: '1',
            slug: 'future-of-ai-research',
            title: 'The Future of AI Research in Academia',
            excerpt: 'Exploring how artificial intelligence is reshaping academic research and innovation.',
            category: 'AI & Research',
            author: 'Dr. Rajesh Kumar',
            publishedAt: '2026-05-20',
            coverUrl: null,
        },
        {
            id: '2',
            slug: 'summit-2026-highlights',
            title: 'NARI Summit 2026: Key Highlights',
            excerpt: 'A recap of the most impactful sessions and announcements from our annual summit.',
            category: 'Events',
            author: 'Prof. Anjali Sharma',
            publishedAt: '2026-05-15',
            coverUrl: null,
        },
        {
            id: '3',
            slug: 'women-in-tech-2026',
            title: 'Celebrating Women in Technology',
            excerpt: 'Meet the inspiring women leading innovation and research across the globe.',
            category: 'Community',
            author: 'Dr. Neha Gupta',
            publishedAt: '2026-05-10',
            coverUrl: null,
        },
        {
            id: '4',
            slug: 'quantum-computing-breakthrough',
            title: 'Quantum Computing: The Next Frontier',
            excerpt: 'Understanding recent breakthroughs in quantum computing and their implications.',
            category: 'Technology',
            author: 'Vikram Patel',
            publishedAt: '2026-05-05',
            coverUrl: null,
        },
    ]

    const categories = Array.from(new Set(blogPosts.map((post) => post.category))).sort()

    useEffect(() => {
        setLoading(false)
    }, [])

    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || post.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    }

    return (
        <main className="min-h-screen bg-[#f5f5f7] py-20">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-heading-1 text-[#1d1d1f] mb-4">Blog</h1>
                    <p className="text-lg text-[#1d1d1f]/60 max-w-[600px] mx-auto" style={{ fontWeight: 300 }}>
                        Insights, stories, and updates from the NARI community.
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="mb-12"
                >
                    {/* Search Bar */}
                    <div className="mb-6 relative max-w-[500px] mx-auto">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1d1d1f]/40"
                        />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#1d1d1f]/8 bg-white text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#5856d6]/20 focus:border-[#5856d6] transition-all"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-lg text-sm font-[500] transition-all ${selectedCategory === null
                                    ? 'bg-[#5856d6] text-white'
                                    : 'bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] hover:bg-[#1d1d1f]/5'
                                }`}
                        >
                            All Articles
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-[500] transition-all ${selectedCategory === cat
                                        ? 'bg-[#5856d6] text-white'
                                        : 'bg-white border border-[#1d1d1f]/8 text-[#1d1d1f] hover:bg-[#1d1d1f]/5'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Blog Posts */}
                {!loading && filteredPosts.length > 0 && (
                    <motion.div
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                className="rounded-2xl bg-white border border-[#1d1d1f]/8 overflow-hidden hover:shadow-lg transition-all group"
                                variants={itemVariants}
                            >
                                <Link to={`/blog/${post.slug}`} className="block no-underline h-full">
                                    <div className="p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span
                                                    className="inline-block text-[10px] font-[600] px-2 py-1 rounded-full uppercase tracking-wider"
                                                    style={{
                                                        background: 'rgba(88,86,214,0.1)',
                                                        color: '#5856d6',
                                                    }}
                                                >
                                                    {post.category}
                                                </span>
                                            </div>

                                            <h3 className="font-display font-black text-2xl text-[#1d1d1f] mb-2 group-hover:text-[#5856d6] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#1d1d1f]/60 mb-4 line-clamp-2">{post.excerpt}</p>

                                            <div className="flex flex-wrap gap-4 text-sm text-[#1d1d1f]/50">
                                                <div className="flex items-center gap-1">
                                                    <User size={14} />
                                                    <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(post.publishedAt)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Arrow */}
                                        <div className="flex-shrink-0">
                                            <ArrowRight
                                                size={20}
                                                className="text-[#5856d6] group-hover:translate-x-1 transition-transform"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredPosts.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-[#1d1d1f]/60 mb-4">No articles found</p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-6 py-2 rounded-lg bg-[#5856d6] text-white text-sm font-[500] hover:bg-[#4845c2] transition-colors cursor-pointer border-none"
                            >
                                Clear Search
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </main>
    )
}