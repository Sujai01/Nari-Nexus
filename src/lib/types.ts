/* ─────────────────────────────────────────────────────
   EVENT TYPES
   ───────────────────────────────────────────────────── */

export interface Event {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  start_date: string
  end_date: string
  location_city: string
  location_country: string
  cover_image_url: string | null
  status: 'draft' | 'published' | 'archived'
  registration_open: boolean
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface EventWithRelations extends Event {
  speakers: Speaker[]
  sessions: Session[]
  sponsors: Sponsor[]
  registrations_count: number
}

export interface CreateEventInput {
  title: string
  subtitle: string
  description: string
  start_date: string
  end_date: string
  location_city: string
  location_country: string
  cover_image_url?: string
}

/* ─────────────────────────────────────────────────────
   SPEAKER TYPES
   ───────────────────────────────────────────────────── */

export interface Speaker {
  id: string
  slug: string
  full_name: string
  title: string | null
  designation: string | null
  organization: string | null
  bio: string | null
  photo_url: string | null
  linkedin_url: string | null
  expertise_tags: string[]
  created_at: string
  updated_at: string
}

export interface SpeakerWithEvents extends Speaker {
  events: EventSpeaker[]
}

export interface CreateSpeakerInput {
  full_name: string
  designation?: string
  organization?: string
  bio?: string
  photo_url?: string
  linkedin_url?: string
  expertise_tags?: string[]
}

export interface EventSpeaker {
  id: string
  event_id: string
  speaker_id: string
  role: 'keynote' | 'speaker' | 'panelist' | 'moderator' | 'workshop_lead'
  talk_title: string | null
  talk_description: string | null
  created_at: string
}

/* ─────────────────────────────────────────────────────
   SESSION TYPES
   ───────────────────────────────────────────────────── */

export interface Session {
  id: string
  event_id: string
  track_id: string
  title: string
  description: string
  start_time: string
  end_time: string
  location: string
  session_type: 'keynote' | 'talk' | 'panel' | 'workshop' | 'networking'
  capacity: number | null
  created_at: string
  updated_at: string
}

export interface SessionWithSpeakers extends Session {
  speakers: Speaker[]
}

export interface CreateSessionInput {
  title: string
  description: string
  start_time: string
  end_time: string
  location: string
  session_type: 'keynote' | 'talk' | 'panel' | 'workshop' | 'networking'
  capacity?: number
}

/* ─────────────────────────────────────────────────────
   REGISTRATION TYPES
   ───────────────────────────────────────────────────── */

export interface Registration {
  id: string
  event_id: string
  user_id: string | null
  full_name: string
  email: string
  organization: string | null
  phone: string | null
  registration_type: 'attendee' | 'presenter' | 'workshop' | 'exhibitor'
  status: 'pending' | 'confirmed' | 'checked_in' | 'cancelled'
  confirmation_code: string
  created_at: string
  updated_at: string
}

export interface CreateRegistrationInput {
  event_id: string
  full_name: string
  email: string
  organization?: string
  phone?: string
  registration_type: 'attendee' | 'presenter' | 'workshop' | 'exhibitor'
}

/* ─────────────────────────────────────────────────────
   SPONSOR TYPES
   ───────────────────────────────────────────────────── */

export interface Sponsor {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  description: string | null
  created_at: string
}

export interface EventSponsor {
  id: string
  event_id: string
  sponsor_id: string
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'associate'
  created_at: string
}

export interface SponsorWithTier extends Sponsor {
  event_sponsors: EventSponsor[]
}

export interface CreateSponsorInput {
  name: string
  logo_url?: string
  website_url?: string
  description?: string
}

/* ─────────────────────────────────────────────────────
   NEWSLETTER TYPES
   ───────────────────────────────────────────────────── */

export interface NewsletterSubscriber {
  id: string
  email: string
  name: string | null
  is_confirmed: boolean
  subscribed_at: string
}

export interface CreateSubscriberInput {
  email: string
  name?: string
}

/* ─────────────────────────────────────────────────────
   BLOG TYPES
   ───────────────────────────────────────────────────── */

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image_url: string | null
  author_name: string
  category: string
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
}

export interface CreateBlogPostInput {
  title: string
  excerpt: string
  content: string
  cover_image_url?: string
  author_name: string
  category: string
  tags?: string[]
}

/* ─────────────────────────────────────────────────────
   USER & AUTH TYPES
   ───────────────────────────────────────────────────── */

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin' | 'moderator'
  created_at: string
  updated_at: string
}

export interface AuthSession {
  user: User | null
  isLoading: boolean
  error: string | null
}

/* ─────────────────────────────────────────────────────
   API RESPONSE TYPES
   ───────────────────────────────────────────────────── */

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

export interface ApiError {
  code: string
  message: string
  status: number
}

/* ─────────────────────────────────────────────────────
   FORM VALIDATION TYPES
   ───────────────────────────────────────────────────── */

export interface RegistrationFormData {
  fullName: string
  email: string
  institution: string
  registrationType: 'attendee' | 'presenter' | 'workshop' | 'exhibitor'
}

export interface NewsletterFormData {
  email: string
  name?: string
}

export interface ContactFormData {
  fullName: string
  email: string
  subject: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  email: string
  password: string
  fullName: string
}

/* ─────────────────────────────────────────────────────
   PAGINATION & FILTERING
   ───────────────────────────────────────────────────── */

export interface QueryOptions {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/* ─────────────────────────────────────────────────────
   UI & COMPONENT TYPES
   ───────────────────────────────────────────────────── */

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

export interface ModalState {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}

export interface NavigationItem {
  label: string
  path: string
  icon?: React.ReactNode
  children?: NavigationItem[]
}

/* ─────────────────────────────────────────────────────
   ADMIN TYPES
   ───────────────────────────────────────────────────── */

export interface DashboardStats {
  total_registrations: number
  total_speakers: number
  total_sponsors: number
  total_newsletter_subscribers: number
  events_count: number
  sessions_count: number
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'moderator'
  permissions: string[]
  created_at: string
}