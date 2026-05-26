import { supabase } from '@/lib/supabase'
import { Speaker, SpeakerWithEvents, CreateSpeakerInput, EventSpeaker, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SPEAKERS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all speakers with optional filtering and pagination
 */
export async function getSpeakers(options?: QueryOptions): Promise<PaginatedResponse<Speaker>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 12
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('speakers')
      .select('*', { count: 'exact' })

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('full_name', { ascending: true })
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `full_name.ilike.%${options.search}%,bio.ilike.%${options.search}%,organization.ilike.%${options.search}%`
      )
    }

    // Apply expertise tag filter
    if (options?.filters?.expertise_tags) {
      const tags = Array.isArray(options.filters.expertise_tags)
        ? options.filters.expertise_tags
        : [options.filters.expertise_tags]
      query = query.contains('expertise_tags', tags)
    }

    // Apply organization filter
    if (options?.filters?.organization) {
      query = query.eq('organization', options.filters.organization)
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
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get single speaker by ID
 */
export async function getSpeakerById(id: string): Promise<SpeakerWithEvents> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Speaker not found')
    }

    // Fetch speaker's event assignments
    const { data: eventSpeakers } = await supabase
      .from('event_speakers')
      .select('*')
      .eq('speaker_id', id)

    return {
      ...data,
      events: eventSpeakers || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker'
    throw new Error(message)
  }
}

/**
 * Get speaker by slug
 */
export async function getSpeakerBySlug(slug: string): Promise<SpeakerWithEvents> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Speaker not found')
    }

    // Fetch speaker's event assignments
    const { data: eventSpeakers } = await supabase
      .from('event_speakers')
      .select('*')
      .eq('speaker_id', data.id)

    return {
      ...data,
      events: eventSpeakers || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker'
    throw new Error(message)
  }
}

/**
 * Get featured speakers
 */
export async function getFeaturedSpeakers(limit: number = 6): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('role', 'keynote')
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch featured speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers for specific event
 */
export async function getEventSpeakers(eventId: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('event_id', eventId)
      .order('role', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by role for specific event
 */
export async function getEventSpeakersByRole(
  eventId: string,
  role: 'keynote' | 'speaker' | 'panelist' | 'moderator' | 'workshop_lead'
): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('event_id', eventId)
      .eq('role', role)
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by expertise tag
 */
export async function getSpeakersByExpertise(expertise: string, limit?: number): Promise<Speaker[]> {
  try {
    let query = supabase
      .from('speakers')
      .select('*')
      .contains('expertise_tags', [expertise])
      .order('full_name', { ascending: true })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by organization
 */
export async function getSpeakersByOrganization(organization: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('organization', organization)
      .order('full_name', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Create new speaker (admin only)
 */
export async function createSpeaker(input: CreateSpeakerInput): Promise<Speaker> {
  try {
    // Generate slug from full name
    const slug = input.full_name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await supabase
      .from('speakers')
      .insert([
        {
          ...input,
          slug,
          expertise_tags: input.expertise_tags || [],
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create speaker'
    throw new Error(message)
  }
}

/**
 * Update speaker (admin only)
 */
export async function updateSpeaker(id: string, updates: Partial<Speaker>): Promise<Speaker> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update speaker'
    throw new Error(message)
  }
}

/**
 * Delete speaker (admin only)
 */
export async function deleteSpeaker(id: string): Promise<void> {
  try {
    // First delete all event speaker assignments
    await supabase.from('event_speakers').delete().eq('speaker_id', id)

    // Then delete the speaker
    const { error } = await supabase.from('speakers').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete speaker'
    throw new Error(message)
  }
}

/**
 * Add speaker to event
 */
export async function addSpeakerToEvent(
  eventId: string,
  speakerId: string,
  role: 'keynote' | 'speaker' | 'panelist' | 'moderator' | 'workshop_lead',
  talkTitle?: string
): Promise<EventSpeaker> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .insert([
        {
          event_id: eventId,
          speaker_id: speakerId,
          role,
          talk_title: talkTitle || null,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to add speaker to event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add speaker to event'
    throw new Error(message)
  }
}

/**
 * Update speaker's event assignment
 */
export async function updateEventSpeaker(
  eventSpeakerId: string,
  updates: Partial<EventSpeaker>
): Promise<EventSpeaker> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .update(updates)
      .eq('id', eventSpeakerId)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update event speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event speaker'
    throw new Error(message)
  }
}

/**
 * Remove speaker from event
 */
export async function removeSpeakerFromEvent(eventSpeakerId: string): Promise<void> {
  try {
    const { error } = await supabase.from('event_speakers').delete().eq('id', eventSpeakerId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove speaker from event'
    throw new Error(message)
  }
}

/**
 * Search speakers by name, organization, or expertise
 */
export async function searchSpeakers(query: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .or(
        `full_name.ilike.%${query}%,organization.ilike.%${query}%,bio.ilike.%${query}%`
      )
      .order('full_name', { ascending: true })

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
 * Get all unique expertise tags
 */
export async function getAllExpertiseTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('expertise_tags')

    if (error) {
      throw new Error(error.message)
    }

    // Flatten and deduplicate tags
    const allTags = data?.reduce((tags: string[], speaker: any) => {
      return [...tags, ...(speaker.expertise_tags || [])]
    }, []) || []

    return Array.from(new Set(allTags)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch expertise tags'
    throw new Error(message)
  }
}

/**
 * Get all unique organizations
 */
export async function getAllOrganizations(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('organization')
      .neq('organization', null)

    if (error) {
      throw new Error(error.message)
    }

    const organizations = data?.map((s: any) => s.organization).filter(Boolean) || []
    return Array.from(new Set(organizations)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch organizations'
    throw new Error(message)
  }
}

/**
 * Get speaker statistics
 */
export async function getSpeakerStats(): Promise<{
  total_speakers: number
  total_events: number
  average_talks_per_speaker: number
  top_organizations: { organization: string; count: number }[]
}> {
  try {
    const { count: totalSpeakers } = await supabase
      .from('speakers')
      .select('*', { count: 'exact', head: true })

    const { count: totalEventSpeakers } = await supabase
      .from('event_speakers')
      .select('*', { count: 'exact', head: true })

    const { data: byOrganization } = await supabase
      .from('speakers')
      .select('organization')
      .neq('organization', null)

    const orgStats = (byOrganization || []).reduce(
      (acc: any, speaker: any) => {
        const org = speaker.organization
        acc[org] = (acc[org] || 0) + 1
        return acc
      },
      {}
    )

    const topOrganizations = Object.entries(orgStats)
      .map(([organization, count]) => ({ organization, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      total_speakers: totalSpeakers || 0,
      total_events: totalEventSpeakers || 0,
      average_talks_per_speaker:
        totalSpeakers && totalEventSpeakers ? totalEventSpeakers / totalSpeakers : 0,
      top_organizations: topOrganizations,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker stats'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Speaker, SpeakerWithEvents, CreateSpeakerInput, EventSpeaker, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SPEAKERS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all speakers with optional filtering and pagination
 */
export async function getSpeakers(options?: QueryOptions): Promise<PaginatedResponse<Speaker>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 12
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('speakers')
      .select('*', { count: 'exact' })

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('full_name', { ascending: true })
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `full_name.ilike.%${options.search}%,bio.ilike.%${options.search}%,organization.ilike.%${options.search}%`
      )
    }

    // Apply expertise tag filter
    if (options?.filters?.expertise_tags) {
      const tags = Array.isArray(options.filters.expertise_tags)
        ? options.filters.expertise_tags
        : [options.filters.expertise_tags]
      query = query.contains('expertise_tags', tags)
    }

    // Apply organization filter
    if (options?.filters?.organization) {
      query = query.eq('organization', options.filters.organization)
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
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get single speaker by ID
 */
export async function getSpeakerById(id: string): Promise<SpeakerWithEvents> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Speaker not found')
    }

    // Fetch speaker's event assignments
    const { data: eventSpeakers } = await supabase
      .from('event_speakers')
      .select('*')
      .eq('speaker_id', id)

    return {
      ...data,
      events: eventSpeakers || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker'
    throw new Error(message)
  }
}

/**
 * Get speaker by slug
 */
export async function getSpeakerBySlug(slug: string): Promise<SpeakerWithEvents> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Speaker not found')
    }

    // Fetch speaker's event assignments
    const { data: eventSpeakers } = await supabase
      .from('event_speakers')
      .select('*')
      .eq('speaker_id', data.id)

    return {
      ...data,
      events: eventSpeakers || [],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker'
    throw new Error(message)
  }
}

/**
 * Get featured speakers
 */
export async function getFeaturedSpeakers(limit: number = 6): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('role', 'keynote')
      .limit(limit)

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch featured speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers for specific event
 */
export async function getEventSpeakers(eventId: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('event_id', eventId)
      .order('role', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by role for specific event
 */
export async function getEventSpeakersByRole(
  eventId: string,
  role: 'keynote' | 'speaker' | 'panelist' | 'moderator' | 'workshop_lead'
): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .select('speaker:speakers(*)')
      .eq('event_id', eventId)
      .eq('role', role)
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.speaker).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by expertise tag
 */
export async function getSpeakersByExpertise(expertise: string, limit?: number): Promise<Speaker[]> {
  try {
    let query = supabase
      .from('speakers')
      .select('*')
      .contains('expertise_tags', [expertise])
      .order('full_name', { ascending: true })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Get speakers by organization
 */
export async function getSpeakersByOrganization(organization: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('organization', organization)
      .order('full_name', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speakers'
    throw new Error(message)
  }
}

/**
 * Create new speaker (admin only)
 */
export async function createSpeaker(input: CreateSpeakerInput): Promise<Speaker> {
  try {
    // Generate slug from full name
    const slug = input.full_name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await supabase
      .from('speakers')
      .insert([
        {
          ...input,
          slug,
          expertise_tags: input.expertise_tags || [],
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create speaker'
    throw new Error(message)
  }
}

/**
 * Update speaker (admin only)
 */
export async function updateSpeaker(id: string, updates: Partial<Speaker>): Promise<Speaker> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update speaker'
    throw new Error(message)
  }
}

/**
 * Delete speaker (admin only)
 */
export async function deleteSpeaker(id: string): Promise<void> {
  try {
    // First delete all event speaker assignments
    await supabase.from('event_speakers').delete().eq('speaker_id', id)

    // Then delete the speaker
    const { error } = await supabase.from('speakers').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete speaker'
    throw new Error(message)
  }
}

/**
 * Add speaker to event
 */
export async function addSpeakerToEvent(
  eventId: string,
  speakerId: string,
  role: 'keynote' | 'speaker' | 'panelist' | 'moderator' | 'workshop_lead',
  talkTitle?: string
): Promise<EventSpeaker> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .insert([
        {
          event_id: eventId,
          speaker_id: speakerId,
          role,
          talk_title: talkTitle || null,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to add speaker to event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add speaker to event'
    throw new Error(message)
  }
}

/**
 * Update speaker's event assignment
 */
export async function updateEventSpeaker(
  eventSpeakerId: string,
  updates: Partial<EventSpeaker>
): Promise<EventSpeaker> {
  try {
    const { data, error } = await supabase
      .from('event_speakers')
      .update(updates)
      .eq('id', eventSpeakerId)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update event speaker')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update event speaker'
    throw new Error(message)
  }
}

/**
 * Remove speaker from event
 */
export async function removeSpeakerFromEvent(eventSpeakerId: string): Promise<void> {
  try {
    const { error } = await supabase.from('event_speakers').delete().eq('id', eventSpeakerId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove speaker from event'
    throw new Error(message)
  }
}

/**
 * Search speakers by name, organization, or expertise
 */
export async function searchSpeakers(query: string): Promise<Speaker[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .or(
        `full_name.ilike.%${query}%,organization.ilike.%${query}%,bio.ilike.%${query}%`
      )
      .order('full_name', { ascending: true })

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
 * Get all unique expertise tags
 */
export async function getAllExpertiseTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('expertise_tags')

    if (error) {
      throw new Error(error.message)
    }

    // Flatten and deduplicate tags
    const allTags = data?.reduce((tags: string[], speaker: any) => {
      return [...tags, ...(speaker.expertise_tags || [])]
    }, []) || []

    return Array.from(new Set(allTags)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch expertise tags'
    throw new Error(message)
  }
}

/**
 * Get all unique organizations
 */
export async function getAllOrganizations(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('speakers')
      .select('organization')
      .neq('organization', null)

    if (error) {
      throw new Error(error.message)
    }

    const organizations = data?.map((s: any) => s.organization).filter(Boolean) || []
    return Array.from(new Set(organizations)).sort()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch organizations'
    throw new Error(message)
  }
}

/**
 * Get speaker statistics
 */
export async function getSpeakerStats(): Promise<{
  total_speakers: number
  total_events: number
  average_talks_per_speaker: number
  top_organizations: { organization: string; count: number }[]
}> {
  try {
    const { count: totalSpeakers } = await supabase
      .from('speakers')
      .select('*', { count: 'exact', head: true })

    const { count: totalEventSpeakers } = await supabase
      .from('event_speakers')
      .select('*', { count: 'exact', head: true })

    const { data: byOrganization } = await supabase
      .from('speakers')
      .select('organization')
      .neq('organization', null)

    const orgStats = (byOrganization || []).reduce(
      (acc: any, speaker: any) => {
        const org = speaker.organization
        acc[org] = (acc[org] || 0) + 1
        return acc
      },
      {}
    )

    const topOrganizations = Object.entries(orgStats)
      .map(([organization, count]) => ({ organization, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      total_speakers: totalSpeakers || 0,
      total_events: totalEventSpeakers || 0,
      average_talks_per_speaker:
        totalSpeakers && totalEventSpeakers ? totalEventSpeakers / totalSpeakers : 0,
      top_organizations: topOrganizations,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch speaker stats'
    throw new Error(message)
  }
}