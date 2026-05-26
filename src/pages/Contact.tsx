import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

/* Contact Form Schema */
const contactSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(3, 'Subject must be at least 3 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
    const [submitted, setSubmitted] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setApiError(null)
        try {
            // Phase 3: Wire to backend email service
            console.log('Contact form data:', data)

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800))

            setSubmitted(true)
            reset()

            // Reset after 4 seconds
            setTimeout(() => setSubmitted(false), 4000)
        } catch (error) {
            setApiError(
                error instanceof Error ? error.message : 'Failed to send message. Please try again.'
            )
        }
    }

    const contactInfo = [
        {
            icon: <Mail size={24} />,
            label: 'Email',
            value: 'hello@narinexus.com',
            link: 'mailto:hello@narinexus.com',
            color: '#5856d6',
        },
        {
            icon: <Phone size={24} />,
            label: 'Phone',
            value: '+91 (201) 123-4567',
            link: 'tel:+912011234567',
            color: '#34c759',
        },
        {
            icon: <MapPin size={24} />,
            label: 'Address',
            value: 'A-11 Knowledge Park 3rd, Greater Noida, UP 201310',
            link: 'https://maps.google.com',
            color: '#4eb8ff',
        },
    ]

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
            transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    }

    if (submitted) {
        return (
            <main className="min-h-screen bg-[#f5f5f7] py-20">
                <div className="max-w-[700px] mx-auto px-6">
                    <motion.div
                        className="rounded-3xl p-12 text-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(52,199,89,0.1), rgba(52,199,89,0.05))',
                            border: '1px solid rgba(52,199,89,0.25)',
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <CheckCircle2
                                size={48}
                                style={{
                                    color: '#34c759',
                                    marginBottom: '12px',
                                    margin: '0 auto 12px',
                                }}
                            />
                        </motion.div>

                        <h3 className="font-display font-black text-2xl text-[#1d1d1f] mb-2">
                            Message Received!
                        </h3>
                        <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '15px', marginBottom: 0 }}>
                            Thank you for contacting us. We'll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#f5f5f7] py-20">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                >
                    <h1 className="text-heading-1 text-[#1d1d1f] mb-4">Get In Touch</h1>
                    <p className="text-xl text-[#1d1d1f]/60 max-w-[600px] mx-auto" style={{ fontWeight: 300 }}>
                        Have questions about NARI? We'd love to hear from you. Reach out to us and we'll
                        respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Info Cards */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {contactInfo.map((info, i) => (
                            <motion.a
                                key={i}
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-2xl bg-white p-6 border border-[#1d1d1f]/8 hover:shadow-lg transition-all no-underline group"
                                variants={itemVariants}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{ background: `${info.color}15`, color: info.color }}
                                >
                                    {info.icon}
                                </div>
                                <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-2">
                                    {info.label}
                                </h3>
                                <p className="text-sm text-[#1d1d1f]/60 group-hover:text-[#1d1d1f] transition-colors">
                                    {info.value}
                                </p>
                            </motion.a>
                        ))}

                        {/* Hours */}
                        <motion.div
                            className="rounded-2xl bg-white p-6 border border-[#1d1d1f]/8"
                            variants={itemVariants}
                        >
                            <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-4">
                                Business Hours
                            </h3>
                            <div className="space-y-2 text-sm text-[#1d1d1f]/60">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2 rounded-3xl bg-white p-8 border border-[#1d1d1f]/8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                    >
                        <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-6">Send us a message</h2>

                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    background: 'rgba(220,20,20,0.1)',
                                    border: '1px solid rgba(220,20,20,0.25)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: 'rgba(220,20,20,0.8)',
                                    fontSize: '13px',
                                    marginBottom: '16px',
                                }}
                            >
                                {apiError}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-[500] text-[#1d1d1f] mb-2">Full Name</label>
                                <input
                                    {...register('fullName')}
                                    type="text"
                                    placeholder="Your name"
                                    disabled={isSubmitting}
                                    style={{
                                        background: '#f9f9fb',
                                        border: errors.fullName
                                            ? '1px solid rgba(220,20,20,0.3)'
                                            : '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '10px',
                                        padding: '11px 16px',
                                        fontSize: '13px',
                                        fontFamily: 'var(--font-body)',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        transition: 'all 0.15s',
                                        color: '#1d1d1f',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(88,86,214,0.3)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                                {errors.fullName && (
                                    <p style={{ color: 'rgba(220,20,20,0.8)', fontSize: '11px', marginTop: '4px' }}>
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-[500] text-[#1d1d1f] mb-2">Email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                    style={{
                                        background: '#f9f9fb',
                                        border: errors.email
                                            ? '1px solid rgba(220,20,20,0.3)'
                                            : '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '10px',
                                        padding: '11px 16px',
                                        fontSize: '13px',
                                        fontFamily: 'var(--font-body)',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        transition: 'all 0.15s',
                                        color: '#1d1d1f',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(88,86,214,0.3)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                                {errors.email && (
                                    <p style={{ color: 'rgba(220,20,20,0.8)', fontSize: '11px', marginTop: '4px' }}>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-[500] text-[#1d1d1f] mb-2">Subject</label>
                                <input
                                    {...register('subject')}
                                    type="text"
                                    placeholder="What is this about?"
                                    disabled={isSubmitting}
                                    style={{
                                        background: '#f9f9fb',
                                        border: errors.subject
                                            ? '1px solid rgba(220,20,20,0.3)'
                                            : '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '10px',
                                        padding: '11px 16px',
                                        fontSize: '13px',
                                        fontFamily: 'var(--font-body)',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        transition: 'all 0.15s',
                                        color: '#1d1d1f',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(88,86,214,0.3)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                                {errors.subject && (
                                    <p style={{ color: 'rgba(220,20,20,0.8)', fontSize: '11px', marginTop: '4px' }}>
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-[500] text-[#1d1d1f] mb-2">Message</label>
                                <textarea
                                    {...register('message')}
                                    placeholder="Your message here..."
                                    disabled={isSubmitting}
                                    rows={6}
                                    style={{
                                        background: '#f9f9fb',
                                        border: errors.message
                                            ? '1px solid rgba(220,20,20,0.3)'
                                            : '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '10px',
                                        padding: '11px 16px',
                                        fontSize: '13px',
                                        fontFamily: 'var(--font-body)',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        outline: 'none',
                                        transition: 'all 0.15s',
                                        color: '#1d1d1f',
                                        resize: 'vertical',
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(88,86,214,0.3)'
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                                {errors.message && (
                                    <p style={{ color: 'rgba(220,20,20,0.8)', fontSize: '11px', marginTop: '4px' }}>
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    background: '#5856d6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    padding: '13px',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    marginTop: '6px',
                                    opacity: isSubmitting ? 0.6 : 1,
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        ; (e.currentTarget as HTMLButtonElement).style.background = '#4845c2'
                                            ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                                            ; (e.currentTarget as HTMLButtonElement).style.boxShadow =
                                                '0 6px 28px rgba(88, 86, 214, 0.5)'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        ; (e.currentTarget as HTMLButtonElement).style.background = '#5856d6'
                                            ; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                                            ; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
                                    }
                                }}
                            >
                                <Send size={16} />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}