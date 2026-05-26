import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* Registration Form Schema */
const registrationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  institution: z.string().min(1, 'Institution is required'),
  registrationType: z.enum(['attendee', 'presenter', 'workshop', 'exhibitor']),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationCard() {
  const [submitted, setSubmitted] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setApiError(null)
    try {
      // Phase 3: Replace with actual API call to Supabase
      console.log('Form data:', data)
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      
      setSubmitted(true)
      reset()
      
      // Reset after 3 seconds for demo
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Registration failed. Please try again.'
      )
    }
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.11)',
    borderRadius: '10px',
    color: '#f5f5f7',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    padding: '11px 16px',
    width: '100%',
    outline: 'none',
    transition: 'all 0.18s',
    boxSizing: 'border-box' as const,
  }

  if (submitted) {
    return (
      <motion.div
        className="card card-grid-full card-midnight relative overflow-hidden"
        style={{
          minHeight: '420px',
          paddingTop: '60px',
          paddingBottom: '60px',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Success Message */}
        <div
          style={{
            background: 'rgba(52,199,89,0.1)',
            border: '1px solid rgba(52,199,89,0.25)',
            borderRadius: '16px',
            padding: '28px 40px',
            color: 'rgba(48,209,88,0.9)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '18px',
            textAlign: 'center',
            animation: 'slide-up 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          ✓ Registration successful! Check your email for confirmation.
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="card card-grid-full card-midnight relative overflow-hidden"
      style={{
        minHeight: '420px',
        paddingTop: '60px',
        paddingBottom: '60px',
        justifyContent: 'center',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(88,86,214,0.11) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[500px]">
        {/* Header */}
        <p
          className="text-eyebrow"
          style={{ color: 'rgba(162,157,255,0.75)' }}
        >
          Reserve Your Place
        </p>

        <h2
          className="text-heading-2"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: '#f5f5f7',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Summit 2026{' '}
          <span className="gradient-purple-text">Registration</span>
        </h2>

        <p
          style={{
            fontSize: '15px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.55)',
            textAlign: 'center',
            lineHeight: 1.58,
            maxWidth: '460px',
            marginBottom: '20px',
          }}
        >
          Seats are limited. Secure yours today.
        </p>

        {/* Error Message */}
        {apiError && (
          <div
            style={{
              background: 'rgba(220,20,20,0.1)',
              border: '1px solid rgba(220,20,20,0.25)',
              borderRadius: '8px',
              padding: '12px',
              color: 'rgba(255,100,100,0.9)',
              fontSize: '12px',
              marginBottom: '16px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {apiError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '28px 32px',
            backdropFilter: 'blur(12px)',
            boxSizing: 'border-box',
          }}
        >
          {/* Name & Institution Row */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <input
                {...register('fullName')}
                type="text"
                placeholder="Full name"
                disabled={isSubmitting}
                style={inputStyle}
              />
              {errors.fullName && (
                <p
                  style={{
                    color: 'rgba(255,100,100,0.9)',
                    fontSize: '11px',
                    marginTop: '4px',
                    margin: 0,
                  }}
                >
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <input
                {...register('institution')}
                type="text"
                placeholder="Institution"
                disabled={isSubmitting}
                style={inputStyle}
              />
              {errors.institution && (
                <p
                  style={{
                    color: 'rgba(255,100,100,0.9)',
                    fontSize: '11px',
                    marginTop: '4px',
                    margin: 0,
                  }}
                >
                  {errors.institution.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '10px' }}>
            <input
              {...register('email')}
              type="email"
              placeholder="Email address"
              disabled={isSubmitting}
              style={inputStyle}
            />
            {errors.email && (
              <p
                style={{
                  color: 'rgba(255,100,100,0.9)',
                  fontSize: '11px',
                  marginTop: '4px',
                  margin: 0,
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Registration Type */}
          <div style={{ marginBottom: '10px' }}>
            <select
              {...register('registrationType')}
              disabled={isSubmitting}
              style={{
                ...inputStyle,
                color: '#f5f5f7',
              }}
            >
              <option value="" disabled>
                Participation type
              </option>
              <option value="attendee">Attendee</option>
              <option value="presenter">Presenter</option>
              <option value="workshop">Workshop</option>
              <option value="exhibitor">Exhibitor</option>
            </select>
            {errors.registrationType && (
              <p
                style={{
                  color: 'rgba(255,100,100,0.9)',
                  fontSize: '11px',
                  marginTop: '4px',
                  margin: 0,
                }}
              >
                {errors.registrationType.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #5856d6, #7b78ff)',
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
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 6px 28px rgba(88, 86, 214, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
                  '0 4px 20px rgba(88, 86, 214, 0.35)'
              }
            }}
          >
            {isSubmitting ? 'Registering...' : 'Register for Summit 2026 →'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}