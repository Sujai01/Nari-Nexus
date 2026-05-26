import { supabase } from '@/lib/supabase'
import { Event, EventWithRelations, CreateEventInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   EVENTS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all published events with optional filtering
 */
export async function getEvents(options?: QueryOptions): Promise<PaginatedResponse<Event>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 10
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('status', 'published')

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_date', { ascending: true })
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,subtitle.ilike.%${options.search}%`)
    }

    // Apply custom filters
    if (options?.filters) {
      if (options.filters.location_city) {
        query = query.eq('location_city', options.filters.location_city)
      }
      if (options.filters.year) {
        query = query.gte('start_date', `${options.filters.year}-01-01`)
        query = query.lte('start_date', `${options.filters.year}-12-31`)
      }
    }

    // Apply pagination
    const { data, error, count } = await query.range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    const totalPages = count ? Math.ceil(count / pageSize) : 0

    return {
      data: data || [],
      count: count || 0,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get single event by ID
 */
export async function getEventById(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventWithRelations> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    // Fetch related data
    const [{ data: speakers }, { data: sessions }, { data: sponsors }, { count: registrations }] =
      await Promise.all([
        supabase
          .from('event_speakers')
          .select('speaker:speakers(*)')
          .eq('event_id', data.id),
        supabase
          .from('agenda_sessions')
          .select('*')
          .eq('event_id', data.id),
        supabase
          .from('event_sponsors')
          .select('sponsor:sponsors(*)')
          .eq('event_id', data.id),
        supabase
          .from('registrations')
          .select('*', { count: 'exact' })
          .eq('event_id', data.id),
      ])

    return {
      ...data,
      speakers: speakers?.map((s: any) => s.speaker) || [],
      sessions: sessions || [],
      sponsors: sponsors?.map((s: any) => s.sponsor) || [],
      registrations_count: registrations || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 3): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch featured events'
    throw new Error(message)
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch upcoming events'
    throw new Error(message)
  }
}

/**
 * Get past events
 */
export async function getPastEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .lt('end_date', today)
      .order('start_date', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch past events'
    throw new Error(message)
  }
}

/**
 * Create new event (admin only)
 */
export async function createEvent(input: CreateEventInput): Promise<Event> {
  try {
    // Generate slug from title
    const slug = input.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          ...input,
          slug,
          status: 'draft',
          registration_open: false,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create event'
    throw new Error(message)
  }
}

/**
 * Update event (admin only)
 */
export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event'
    throw new Error(message)
  }
}

/**
 * Publish event (admin only)
 */
export async function publishEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to publish event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish event'
    throw new Error(message)
  }
}

/**
 * Archive event (admin only)
 */
export async function archiveEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'archived' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to archive event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to archive event'
    throw new Error(message)
  }
}

/**
 * Delete event (admin only)
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete event'
    throw new Error(message)
  }
}

/**
 * Open/close event registration
 */
export async function toggleEventRegistration(
  id: string,
  isOpen: boolean
): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ registration_open: isOpen })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration status')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration status'
    throw new Error(message)
  }
}

/**
 * Search events by title/description
 */
export async function searchEvents(query: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,subtitle.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed'
    throw new Error(message)
  }
}

/**
 * Get events by location
 */
export async function getEventsByLocation(city: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('location_city', city)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get event statistics
 */
export async function getEventStats(id: string): Promise<{
  total_registrations: number
  total_speakers: number
  total_sessions: number
  total_sponsors: number
}> {
  try {
    const [registrations, speakers, sessions, sponsors] = await Promise.all([
      supabase.from('registrations').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_speakers').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('agenda_sessions').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_sponsors').select('*', { count: 'exact' }).eq('event_id', id),
    ])

    return {
      total_registrations: registrations.count || 0,
      total_speakers: speakers.count || 0,
      total_sessions: sessions.count || 0,
      total_sponsors: sponsors.count || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event stats'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Event, EventWithRelations, CreateEventInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   EVENTS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all published events with optional filtering
 */
export async function getEvents(options?: QueryOptions): Promise<PaginatedResponse<Event>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 10
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('status', 'published')

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_date', { ascending: true })
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,subtitle.ilike.%${options.search}%`)
    }

    // Apply custom filters
    if (options?.filters) {
      if (options.filters.location_city) {
        query = query.eq('location_city', options.filters.location_city)
      }
      if (options.filters.year) {
        query = query.gte('start_date', `${options.filters.year}-01-01`)
        query = query.lte('start_date', `${options.filters.year}-12-31`)
      }
    }

    // Apply pagination
    const { data, error, count } = await query.range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    const totalPages = count ? Math.ceil(count / pageSize) : 0

    return {
      data: data || [],
      count: count || 0,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get single event by ID
 */
export async function getEventById(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventWithRelations> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    // Fetch related data
    const [{ data: speakers }, { data: sessions }, { data: sponsors }, { count: registrations }] =
      await Promise.all([
        supabase
          .from('event_speakers')
          .select('speaker:speakers(*)')
          .eq('event_id', data.id),
        supabase
          .from('agenda_sessions')
          .select('*')
          .eq('event_id', data.id),
        supabase
          .from('event_sponsors')
          .select('sponsor:sponsors(*)')
          .eq('event_id', data.id),
        supabase
          .from('registrations')
          .select('*', { count: 'exact' })
          .eq('event_id', data.id),
      ])

    return {
      ...data,
      speakers: speakers?.map((s: any) => s.speaker) || [],
      sessions: sessions || [],
      sponsors: sponsors?.map((s: any) => s.sponsor) || [],
      registrations_count: registrations || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 3): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch featured events'
    throw new Error(message)
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch upcoming events'
    throw new Error(message)
  }
}

/**
 * Get past events
 */
export async function getPastEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .lt('end_date', today)
      .order('start_date', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch past events'
    throw new Error(message)
  }
}

/**
 * Create new event (admin only)
 */
export async function createEvent(input: CreateEventInput): Promise<Event> {
  try {
    // Generate slug from title
    const slug = input.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          ...input,
          slug,
          status: 'draft',
          registration_open: false,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create event'
    throw new Error(message)
  }
}

/**
 * Update event (admin only)
 */
export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event'
    throw new Error(message)
  }
}

/**
 * Publish event (admin only)
 */
export async function publishEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to publish event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish event'
    throw new Error(message)
  }
}

/**
 * Archive event (admin only)
 */
export async function archiveEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'archived' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to archive event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to archive event'
    throw new Error(message)
  }
}

/**
 * Delete event (admin only)
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete event'
    throw new Error(message)
  }
}

/**
 * Open/close event registration
 */
export async function toggleEventRegistration(
  id: string,
  isOpen: boolean
): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ registration_open: isOpen })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration status')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration status'
    throw new Error(message)
  }
}

/**
 * Search events by title/description
 */
export async function searchEvents(query: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,subtitle.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed'
    throw new Error(message)
  }
}

/**
 * Get events by location
 */
export async function getEventsByLocation(city: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('location_city', city)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get event statistics
 */
export async function getEventStats(id: string): Promise<{
  total_registrations: number
  total_speakers: number
  total_sessions: number
  total_sponsors: number
}> {
  try {
    const [registrations, speakers, sessions, sponsors] = await Promise.all([
      supabase.from('registrations').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_speakers').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('agenda_sessions').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_sponsors').select('*', { count: 'exact' }).eq('event_id', id),
    ])

    return {
      total_registrations: registrations.count || 0,
      total_speakers: speakers.count || 0,
      total_sessions: sessions.count || 0,
      total_sponsors: sponsors.count || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event stats'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Event, EventWithRelations, CreateEventInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   EVENTS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all published events with optional filtering
 */
export async function getEvents(options?: QueryOptions): Promise<PaginatedResponse<Event>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 10
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })
      .eq('status', 'published')

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_date', { ascending: true })
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,subtitle.ilike.%${options.search}%`)
    }

    // Apply custom filters
    if (options?.filters) {
      if (options.filters.location_city) {
        query = query.eq('location_city', options.filters.location_city)
      }
      if (options.filters.year) {
        query = query.gte('start_date', `${options.filters.year}-01-01`)
        query = query.lte('start_date', `${options.filters.year}-12-31`)
      }
    }

    // Apply pagination
    const { data, error, count } = await query.range(from, to)

    if (error) {
      throw new Error(error.message)
    }

    const totalPages = count ? Math.ceil(count / pageSize) : 0

    return {
      data: data || [],
      count: count || 0,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get single event by ID
 */
export async function getEventById(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventWithRelations> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Event not found')
    }

    // Fetch related data
    const [{ data: speakers }, { data: sessions }, { data: sponsors }, { count: registrations }] =
      await Promise.all([
        supabase
          .from('event_speakers')
          .select('speaker:speakers(*)')
          .eq('event_id', data.id),
        supabase
          .from('agenda_sessions')
          .select('*')
          .eq('event_id', data.id),
        supabase
          .from('event_sponsors')
          .select('sponsor:sponsors(*)')
          .eq('event_id', data.id),
        supabase
          .from('registrations')
          .select('*', { count: 'exact' })
          .eq('event_id', data.id),
      ])

    return {
      ...data,
      speakers: speakers?.map((s: any) => s.speaker) || [],
      sessions: sessions || [],
      sponsors: sponsors?.map((s: any) => s.sponsor) || [],
      registrations_count: registrations || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event'
    throw new Error(message)
  }
}

/**
 * Get featured events
 */
export async function getFeaturedEvents(limit: number = 3): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch featured events'
    throw new Error(message)
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch upcoming events'
    throw new Error(message)
  }
}

/**
 * Get past events
 */
export async function getPastEvents(limit: number = 5): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .lt('end_date', today)
      .order('start_date', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch past events'
    throw new Error(message)
  }
}

/**
 * Create new event (admin only)
 */
export async function createEvent(input: CreateEventInput): Promise<Event> {
  try {
    // Generate slug from title
    const slug = input.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          ...input,
          slug,
          status: 'draft',
          registration_open: false,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create event'
    throw new Error(message)
  }
}

/**
 * Update event (admin only)
 */
export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event'
    throw new Error(message)
  }
}

/**
 * Publish event (admin only)
 */
export async function publishEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to publish event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to publish event'
    throw new Error(message)
  }
}

/**
 * Archive event (admin only)
 */
export async function archiveEvent(id: string): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'archived' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to archive event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to archive event'
    throw new Error(message)
  }
}

/**
 * Delete event (admin only)
 */
export async function deleteEvent(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('events').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete event'
    throw new Error(message)
  }
}

/**
 * Open/close event registration
 */
export async function toggleEventRegistration(
  id: string,
  isOpen: boolean
): Promise<Event> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ registration_open: isOpen })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration status')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration status'
    throw new Error(message)
  }
}

/**
 * Search events by title/description
 */
export async function searchEvents(query: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,subtitle.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Search failed'
    throw new Error(message)
  }
}

/**
 * Get events by location
 */
export async function getEventsByLocation(city: string): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('location_city', city)
      .order('start_date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch events'
    throw new Error(message)
  }
}

/**
 * Get event statistics
 */
export async function getEventStats(id: string): Promise<{
  total_registrations: number
  total_speakers: number
  total_sessions: number
  total_sponsors: number
}> {
  try {
    const [registrations, speakers, sessions, sponsors] = await Promise.all([
      supabase.from('registrations').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_speakers').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('agenda_sessions').select('*', { count: 'exact' }).eq('event_id', id),
      supabase.from('event_sponsors').select('*', { count: 'exact' }).eq('event_id', id),
    ])

    return {
      total_registrations: registrations.count || 0,
      total_speakers: speakers.count || 0,
      total_sessions: sessions.count || 0,
      total_sponsors: sponsors.count || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event stats'
    throw new Error(message)
  }
}