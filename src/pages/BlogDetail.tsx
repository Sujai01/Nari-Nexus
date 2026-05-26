import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>()

    // Mock blog data - replace with API call in Phase 3
    const blogPost = {
        id: '1',
        slug: 'future-of-ai-research',
        title: 'The Future of AI Research in Academia',
        excerpt: 'Exploring how artificial intelligence is reshaping academic research and innovation.',
        content: `Artificial intelligence has become one of the most transformative technologies of our time. Its impact on academic research is profound and multifaceted, opening new frontiers while simultaneously challenging established methodologies.

## The Current Landscape

AI is revolutionizing how researchers approach problem-solving. From drug discovery to climate modeling, machine learning algorithms are accelerating the pace of scientific advancement. Universities worldwide are establishing dedicated AI research centers and integrating AI literacy into their curricula.

## Challenges and Opportunities

While the potential is immense, academia faces several challenges in fully harnessing AI's power. These include concerns about data privacy, ensuring responsible AI development, and bridging the gap between theoretical research and practical applications.

However, these challenges also present opportunities. Collaborative efforts between institutions, industry partners, and researchers are creating new pathways for innovation. Open-source AI frameworks and shared datasets are democratizing access to cutting-edge tools.

## Looking Forward

The future of AI in academia depends on how we address current challenges while maintaining scientific integrity and ethical standards. Institutions that embrace AI while fostering critical thinking about its applications will be best positioned to lead the next generation of research.

As we move forward, the emphasis should be on creating a holistic approach that combines technical expertise with domain knowledge, ethical considerations, and collaborative spirit.`,
        category: 'AI & Research',
        author: 'Dr. Rajesh Kumar',
        publishedAt: '2026-05-20',
        coverUrl: null,
    }

    const relatedPosts = [
        {
            id: '2',
            slug: 'summit-2026-highlights',
            title: 'NARI Summit 2026: Key Highlights',
            excerpt: 'A recap of the most impactful sessions and announcements from our annual summit.',
        },
        {
            id: '3',
            slug: 'women-in-tech-2026',
            title: 'Celebrating Women in Technology',
            excerpt: 'Meet the inspiring women leading innovation and research across the globe.',
        },
    ]

    return (
        <main className="min-h-screen bg-[#f5f5f7]">
            <div className="max-w-[800px] mx-auto px-6 py-20">
                {/* Back Button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-8 no-underline hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={18} />
                    Back to Blog
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-8"
                >
                    <span
                        className="inline-block text-[10px] font-[600] px-2 py-1 rounded-full uppercase tracking-wider mb-4"
                        style={{
                            background: 'rgba(88,86,214,0.1)',
                            color: '#5856d6',
                        }}
                    >
                        {blogPost.category}
                    </span>

                    <h1 className="font-display font-black text-4xl text-[#1d1d1f] mb-4">
                        {blogPost.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-6 text-sm text-[#1d1d1f]/60 pb-8 border-b border-[#1d1d1f]/8">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{blogPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formatDate(blogPost.publishedAt)}</span>
                        </div>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: blogPost.title,
                                        url: window.location.href,
                                    })
                                } else {
                                    navigator.clipboard.writeText(window.location.href)
                                }
                            }}
                            className="flex items-center gap-2 text-[#5856d6] hover:opacity-70 transition-opacity cursor-pointer border-none bg-none"
                        >
                            <Share2 size={16} />
                            <span>Share</span>
                        </button>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.article
                    className="prose prose-sm max-w-none mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <div className="text-[#1d1d1f]/70 leading-relaxed whitespace-pre-wrap">
                        {blogPost.content}
                    </div>
                </motion.article>

                {/* Related Posts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 }}
                    className="pt-16 border-t border-[#1d1d1f]/8"
                >
                    <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-6">Related Articles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedPosts.map((post) => (<Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="rounded-2xl bg-white p-6 border border-[#1d1d1f]/8 hover:shadow-lg transition-all no-underline group"
                        >
                            <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-2 group-hover:text-[#5856d6] transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-sm text-[#1d1d1f]/60">{post.excerpt}</p>
                        </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}