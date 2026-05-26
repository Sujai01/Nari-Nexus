import { supabase } from '@/lib/supabase'
import { Session, SessionWithSpeakers, CreateSessionInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SESSIONS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all sessions for an event
 */
export async function getEventSessions(
  eventId: string,
  options?: QueryOptions
): Promise<PaginatedResponse<Session>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('agenda_sessions')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_time', { ascending: true })
    }

    // Apply type filter
    if (options?.filters?.session_type) {
      query = query.eq('session_type', options.filters.session_type)
    }

    // Apply track filter
    if (options?.filters?.track_id) {
      query = query.eq('track_id', options.filters.track_id)
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `title.ilike.%${options.search}%,description.ilike.%${options.search}%`
      )
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
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get single session by ID
 */
export async function getSessionById(id: string): Promise<SessionWithSpeakers> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Session not found')
    }

    // Fetch session speakers
    const { data: sessionSpeakers } = await supabase
      .from('session_speakers')
      .select('speaker:speakers(*)')
      .eq('session_id', id)

    return {
      ...data,
      speakers: sessionSpeakers?.map((s: any) => s.speaker).filter(Boolean) || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch session'
    throw new Error(message)
  }
}

/**
 * Get sessions by type
 */
export async function getSessionsByType(
  eventId: string,
  type: 'keynote' | 'talk' | 'panel' | 'workshop' | 'networking'
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', type)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by track
 */
export async function getSessionsByTrack(trackId: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('track_id', trackId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by location
 */
export async function getSessionsByLocation(eventId: string, location: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('location', location)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by time range
 */
export async function getSessionsByTimeRange(
  eventId: string,
  startTime: string,
  endTime: string
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .gte('start_time', startTime)
      .lte('end_time', endTime)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get keynote sessions for event
 */
export async function getKeynotesSessions(eventId: string): Promise<SessionWithSpeakers[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', 'keynote')
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Fetch speakers for each session
    const sessionsWithSpeakers = await Promise.all(
      (data || []).map(async (session) => {
        const { data: speakers } = await supabase
          .from('session_speakers')
          .select('speaker:speakers(*)')
          .eq('session_id', session.id)

        return {
          ...session,
          speakers: speakers?.map((s: any) => s.speaker).filter(Boolean) || [],
        }
      })
    )

    return sessionsWithSpeakers
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch keynotes'
    throw new Error(message)
  }
}

/**
 * Create new session (admin only)
 */
export async function createSession(input: CreateSessionInput & { event_id: string; track_id: string }): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .insert([
        {
          ...input,
          capacity: input.capacity || null,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create session'
    throw new Error(message)
  }
}

/**
 * Update session (admin only)
 */
export async function updateSession(id: string, updates: Partial<Session>): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update session'
    throw new Error(message)
  }
}

/**
 * Delete session (admin only)
 */
export async function deleteSession(id: string): Promise<void> {
  try {
    // Delete session speakers first
    await supabase.from('session_speakers').delete().eq('session_id', id)

    // Then delete session
    const { error } = await supabase.from('agenda_sessions').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete session'
    throw new Error(message)
  }
}

/**
 * Add speaker to session
 */
export async function addSpeakerToSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .insert([{ session_id: sessionId, speaker_id: speakerId }])

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add speaker to session'
    throw new Error(message)
  }
}

/**
 * Remove speaker from session
 */
export async function removeSpeakerFromSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .delete()
      .eq('session_id', sessionId)
      .eq('speaker_id', speakerId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove speaker from session'
    throw new Error(message)
  }
}

/**
 * Get session availability (capacity check)
 */
export async function getSessionAvailability(id: string): Promise<{
  capacity: number | null
  registered: number
  available: number
}> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('agenda_sessions')
      .select('capacity')
      .eq('id', id)
      .single()

    if (sessionError || !session) {
      throw new Error(sessionError?.message || 'Session not found')
    }

    const { count: registered, error: countError } = await supabase
      .from('session_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', id)

    if (countError) {
      throw new Error(countError.message)
    }

    const capacity = session.capacity
    const registeredCount = registered || 0
    const available = capacity ? Math.max(0, capacity - registeredCount) : -1

    return {
      capacity,
      registered: registeredCount,
      available,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get session availability'
    throw new Error(message)
  }
}

/**
 * Get session schedule (day-by-day agenda)
 */
export async function getEventSchedule(eventId: string): Promise<{
  date: string
  sessions: Session[]
}[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Group by date
    const grouped = (data || []).reduce(
      (acc: any, session: Session) => {
        const date = session.start_time.split('T')[0]
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(session)
        return acc
      },
      {}
    )

    return Object.entries(grouped)
      .map(([date, sessions]) => ({ date, sessions: sessions as Session[] }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch schedule'
    throw new Error(message)
  }
}

/**
 * Search sessions
 */
export async function searchSessions(eventId: string, query: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_time', { ascending: true })

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
 * Get unique session locations
 */
export async function getSessionLocations(eventId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('location')
      .eq('event_id', eventId)
      .neq('location', null)

    if (error) {
      throw new Error(error.message)
    }

    const locations = data?.map((s: any) => s.location).filter(Boolean) || []
    return Array.from(new Set(locations)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch locations'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Session, SessionWithSpeakers, CreateSessionInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SESSIONS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all sessions for an event
 */
export async function getEventSessions(
  eventId: string,
  options?: QueryOptions
): Promise<PaginatedResponse<Session>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('agenda_sessions')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_time', { ascending: true })
    }

    // Apply type filter
    if (options?.filters?.session_type) {
      query = query.eq('session_type', options.filters.session_type)
    }

    // Apply track filter
    if (options?.filters?.track_id) {
      query = query.eq('track_id', options.filters.track_id)
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `title.ilike.%${options.search}%,description.ilike.%${options.search}%`
      )
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
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get single session by ID
 */
export async function getSessionById(id: string): Promise<SessionWithSpeakers> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Session not found')
    }

    // Fetch session speakers
    const { data: sessionSpeakers } = await supabase
      .from('session_speakers')
      .select('speaker:speakers(*)')
      .eq('session_id', id)

    return {
      ...data,
      speakers: sessionSpeakers?.map((s: any) => s.speaker).filter(Boolean) || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch session'
    throw new Error(message)
  }
}

/**
 * Get sessions by type
 */
export async function getSessionsByType(
  eventId: string,
  type: 'keynote' | 'talk' | 'panel' | 'workshop' | 'networking'
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', type)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by track
 */
export async function getSessionsByTrack(trackId: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('track_id', trackId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by location
 */
export async function getSessionsByLocation(eventId: string, location: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('location', location)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by time range
 */
export async function getSessionsByTimeRange(
  eventId: string,
  startTime: string,
  endTime: string
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .gte('start_time', startTime)
      .lte('end_time', endTime)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get keynote sessions for event
 */
export async function getKeynotesSessions(eventId: string): Promise<SessionWithSpeakers[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', 'keynote')
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Fetch speakers for each session
    const sessionsWithSpeakers = await Promise.all(
      (data || []).map(async (session) => {
        const { data: speakers } = await supabase
          .from('session_speakers')
          .select('speaker:speakers(*)')
          .eq('session_id', session.id)

        return {
          ...session,
          speakers: speakers?.map((s: any) => s.speaker).filter(Boolean) || [],
        }
      })
    )

    return sessionsWithSpeakers
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch keynotes'
    throw new Error(message)
  }
}

/**
 * Create new session (admin only)
 */
export async function createSession(input: CreateSessionInput & { event_id: string; track_id: string }): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .insert([
        {
          ...input,
          capacity: input.capacity || null,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create session'
    throw new Error(message)
  }
}

/**
 * Update session (admin only)
 */
export async function updateSession(id: string, updates: Partial<Session>): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update session'
    throw new Error(message)
  }
}

/**
 * Delete session (admin only)
 */
export async function deleteSession(id: string): Promise<void> {
  try {
    // Delete session speakers first
    await supabase.from('session_speakers').delete().eq('session_id', id)

    // Then delete session
    const { error } = await supabase.from('agenda_sessions').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete session'
    throw new Error(message)
  }
}

/**
 * Add speaker to session
 */
export async function addSpeakerToSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .insert([{ session_id: sessionId, speaker_id: speakerId }])

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add speaker to session'
    throw new Error(message)
  }
}

/**
 * Remove speaker from session
 */
export async function removeSpeakerFromSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .delete()
      .eq('session_id', sessionId)
      .eq('speaker_id', speakerId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove speaker from session'
    throw new Error(message)
  }
}

/**
 * Get session availability (capacity check)
 */
export async function getSessionAvailability(id: string): Promise<{
  capacity: number | null
  registered: number
  available: number
}> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('agenda_sessions')
      .select('capacity')
      .eq('id', id)
      .single()

    if (sessionError || !session) {
      throw new Error(sessionError?.message || 'Session not found')
    }

    const { count: registered, error: countError } = await supabase
      .from('session_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', id)

    if (countError) {
      throw new Error(countError.message)
    }

    const capacity = session.capacity
    const registeredCount = registered || 0
    const available = capacity ? Math.max(0, capacity - registeredCount) : -1

    return {
      capacity,
      registered: registeredCount,
      available,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get session availability'
    throw new Error(message)
  }
}

/**
 * Get session schedule (day-by-day agenda)
 */
export async function getEventSchedule(eventId: string): Promise<{
  date: string
  sessions: Session[]
}[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Group by date
    const grouped = (data || []).reduce(
      (acc: any, session: Session) => {
        const date = session.start_time.split('T')[0]
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(session)
        return acc
      },
      {}
    )

    return Object.entries(grouped)
      .map(([date, sessions]) => ({ date, sessions: sessions as Session[] }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch schedule'
    throw new Error(message)
  }
}

/**
 * Search sessions
 */
export async function searchSessions(eventId: string, query: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_time', { ascending: true })

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
 * Get unique session locations
 */
export async function getSessionLocations(eventId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('location')
      .eq('event_id', eventId)
      .neq('location', null)

    if (error) {
      throw new Error(error.message)
    }

    const locations = data?.map((s: any) => s.location).filter(Boolean) || []
    return Array.from(new Set(locations)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch locations'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Session, SessionWithSpeakers, CreateSessionInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SESSIONS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all sessions for an event
 */
export async function getEventSessions(
  eventId: string,
  options?: QueryOptions
): Promise<PaginatedResponse<Session>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('agenda_sessions')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('start_time', { ascending: true })
    }

    // Apply type filter
    if (options?.filters?.session_type) {
      query = query.eq('session_type', options.filters.session_type)
    }

    // Apply track filter
    if (options?.filters?.track_id) {
      query = query.eq('track_id', options.filters.track_id)
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `title.ilike.%${options.search}%,description.ilike.%${options.search}%`
      )
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
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get single session by ID
 */
export async function getSessionById(id: string): Promise<SessionWithSpeakers> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Session not found')
    }

    // Fetch session speakers
    const { data: sessionSpeakers } = await supabase
      .from('session_speakers')
      .select('speaker:speakers(*)')
      .eq('session_id', id)

    return {
      ...data,
      speakers: sessionSpeakers?.map((s: any) => s.speaker).filter(Boolean) || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch session'
    throw new Error(message)
  }
}

/**
 * Get sessions by type
 */
export async function getSessionsByType(
  eventId: string,
  type: 'keynote' | 'talk' | 'panel' | 'workshop' | 'networking'
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', type)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by track
 */
export async function getSessionsByTrack(trackId: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('track_id', trackId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by location
 */
export async function getSessionsByLocation(eventId: string, location: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('location', location)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get sessions by time range
 */
export async function getSessionsByTimeRange(
  eventId: string,
  startTime: string,
  endTime: string
): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .gte('start_time', startTime)
      .lte('end_time', endTime)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions'
    throw new Error(message)
  }
}

/**
 * Get keynote sessions for event
 */
export async function getKeynotesSessions(eventId: string): Promise<SessionWithSpeakers[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .eq('session_type', 'keynote')
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Fetch speakers for each session
    const sessionsWithSpeakers = await Promise.all(
      (data || []).map(async (session) => {
        const { data: speakers } = await supabase
          .from('session_speakers')
          .select('speaker:speakers(*)')
          .eq('session_id', session.id)

        return {
          ...session,
          speakers: speakers?.map((s: any) => s.speaker).filter(Boolean) || [],
        }
      })
    )

    return sessionsWithSpeakers
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch keynotes'
    throw new Error(message)
  }
}

/**
 * Create new session (admin only)
 */
export async function createSession(input: CreateSessionInput & { event_id: string; track_id: string }): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .insert([
        {
          ...input,
          capacity: input.capacity || null,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create session'
    throw new Error(message)
  }
}

/**
 * Update session (admin only)
 */
export async function updateSession(id: string, updates: Partial<Session>): Promise<Session> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update session')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update session'
    throw new Error(message)
  }
}

/**
 * Delete session (admin only)
 */
export async function deleteSession(id: string): Promise<void> {
  try {
    // Delete session speakers first
    await supabase.from('session_speakers').delete().eq('session_id', id)

    // Then delete session
    const { error } = await supabase.from('agenda_sessions').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete session'
    throw new Error(message)
  }
}

/**
 * Add speaker to session
 */
export async function addSpeakerToSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .insert([{ session_id: sessionId, speaker_id: speakerId }])

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add speaker to session'
    throw new Error(message)
  }
}

/**
 * Remove speaker from session
 */
export async function removeSpeakerFromSession(sessionId: string, speakerId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('session_speakers')
      .delete()
      .eq('session_id', sessionId)
      .eq('speaker_id', speakerId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove speaker from session'
    throw new Error(message)
  }
}

/**
 * Get session availability (capacity check)
 */
export async function getSessionAvailability(id: string): Promise<{
  capacity: number | null
  registered: number
  available: number
}> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('agenda_sessions')
      .select('capacity')
      .eq('id', id)
      .single()

    if (sessionError || !session) {
      throw new Error(sessionError?.message || 'Session not found')
    }

    const { count: registered, error: countError } = await supabase
      .from('session_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', id)

    if (countError) {
      throw new Error(countError.message)
    }

    const capacity = session.capacity
    const registeredCount = registered || 0
    const available = capacity ? Math.max(0, capacity - registeredCount) : -1

    return {
      capacity,
      registered: registeredCount,
      available,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get session availability'
    throw new Error(message)
  }
}

/**
 * Get session schedule (day-by-day agenda)
 */
export async function getEventSchedule(eventId: string): Promise<{
  date: string
  sessions: Session[]
}[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .order('start_time', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    // Group by date
    const grouped = (data || []).reduce(
      (acc: any, session: Session) => {
        const date = session.start_time.split('T')[0]
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(session)
        return acc
      },
      {}
    )

    return Object.entries(grouped)
      .map(([date, sessions]) => ({ date, sessions: sessions as Session[] }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch schedule'
    throw new Error(message)
  }
}

/**
 * Search sessions
 */
export async function searchSessions(eventId: string, query: string): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('*')
      .eq('event_id', eventId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_time', { ascending: true })

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
 * Get unique session locations
 */
export async function getSessionLocations(eventId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('agenda_sessions')
      .select('location')
      .eq('event_id', eventId)
      .neq('location', null)

    if (error) {
      throw new Error(error.message)
    }

    const locations = data?.map((s: any) => s.location).filter(Boolean) || []
    return Array.from(new Set(locations)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch locations'
    throw new Error(message)
  }
}