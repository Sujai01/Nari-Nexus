import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, CheckCircle2 } from 'lucide-react'

/* Newsletter Form Schema */
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required').optional().or(z.literal('')),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setApiError(null)
    try {
      // Phase 3: Replace with actual API call to Supabase
      console.log('Newsletter signup:', data)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600))

      setSubmitted(true)
      reset()

      // Reset after 4 seconds for demo
      setTimeout(() => setSubmitted(false), 4000)
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Signup failed. Please try again.'
      )
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  if (submitted) {
    return (
      <motion.section
        className="px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[600px] mx-auto">
          <motion.div
            className="rounded-3xl p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(52,199,89,0.1), rgba(52,199,89,0.05))',
              border: '1px solid rgba(52,199,89,0.25)',
              backdrop: 'blur(10px)',
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

            <h3
              className="font-display font-black text-2xl text-[#1d1d1f] mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              You're subscribed!
            </h3>
            <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '15px', marginBottom: 0 }}>
              Check your inbox for exclusive updates on speakers, schedules, and early access to registrations.
            </p>
          </motion.div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      <div className="max-w-[700px] mx-auto">
        <motion.div
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(245,245,247,0.9), rgba(245,245,247,0.75))',
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          {/* Subtle Background Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 0%, rgba(88,86,214,0.08) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 100%, rgba(52,199,89,0.04) 0%, transparent 60%)
              `,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="inline-flex p-3 rounded-full mb-4"
              style={{
                background: 'rgba(88,86,214,0.1)',
                border: '1px solid rgba(88,86,214,0.15)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Mail size={20} style={{ color: '#5856d6' }} />
            </motion.div>

            {/* Heading */}
            <h2
              className="text-heading-3 text-[#1d1d1f] mb-3"
              style={{
                fontSize: 'clamp(24px, 4vw, 40px)',
                letterSpacing: '-0.02em',
              }}
            >
              Stay in the loop.
            </h2>

            {/* Subheading */}
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(0,0,0,0.55)',
                marginBottom: '24px',
                maxWidth: '520px',
                margin: '0 auto 24px',
                lineHeight: 1.58,
              }}
            >
              Get exclusive updates on speakers, schedule announcements, early registration access, and industry insights.
            </p>

            {/* Error Message */}
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
                  maxWidth: '100%',
                }}
              >
                {apiError}
              </motion.div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-3 justify-center mb-4"
            >
              {/* Name Input (Optional) */}
              <div className="flex-1 min-w-0 md:max-w-[200px]">
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your name (optional)"
                  disabled={isSubmitting}
                  style={{
                    background: '#fff',
                    border: errors.name
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
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(88,86,214,0.3)'
                    ;(e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0,0,0,0.08)'
                    ;(e.currentTarget as HTMLInputElement).style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Email Input */}
              <div className="flex-1 min-w-0 md:max-w-[280px]">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                  style={{
                    background: '#fff',
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
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(88,86,214,0.3)'
                    ;(e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(88,86,214,0.05)'
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(0,0,0,0.08)'
                    ;(e.currentTarget as HTMLInputElement).style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#5856d6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 24px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(88, 86, 214, 0.3)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#4845c2'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 6px 24px rgba(88, 86, 214, 0.45)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#5856d6'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
                      '0 4px 16px rgba(88, 86, 214, 0.3)'
                  }
                }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe →'}
              </button>
            </form>

            {/* Error Messages Below Inputs */}
            <div style={{ minHeight: '32px', marginBottom: '8px' }}>
              {(errors.email || errors.name) && (
                <div className="flex flex-col gap-1">
                  {errors.email && (
                    <p
                      style={{
                        color: 'rgba(220,20,20,0.8)',
                        fontSize: '12px',
                        marginBottom: 0,
                      }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                  {errors.name && (
                    <p
                      style={{
                        color: 'rgba(220,20,20,0.8)',
                        fontSize: '12px',
                        marginBottom: 0,
                      }}
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Privacy Notice */}
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(0,0,0,0.4)',
                marginBottom: 0,
              }}
            >
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}