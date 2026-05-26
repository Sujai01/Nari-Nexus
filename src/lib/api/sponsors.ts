import { supabase } from '@/lib/supabase'
import { Sponsor, EventSponsor, CreateSponsorInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   SPONSORS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get all sponsors
 */
export async function getSponsors(
  options?: QueryOptions
): Promise<PaginatedResponse<Sponsor>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('sponsors')
      .select('*', { count: 'exact' })

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('name', { ascending: true })
    }

    // Apply search
    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`)
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
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsors'
    throw new Error(message)
  }
}

/**
 * Get sponsor by ID
 */
export async function getSponsorById(id: string): Promise<Sponsor> {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Sponsor not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsor'
    throw new Error(message)
  }
}

/**
 * Get sponsors for event
 */
export async function getEventSponsors(eventId: string): Promise<(Sponsor & { tier: string })[]> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .select('sponsor:sponsors(*), tier')
      .eq('event_id', eventId)
      .order('tier', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return (
      data?.map((item: any) => ({
        ...item.sponsor,
        tier: item.tier,
      })) || []
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch event sponsors'
    throw new Error(message)
  }
}

/**
 * Get sponsors by tier
 */
export async function getEventSponsorsByTier(
  eventId: string,
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'associate'
): Promise<Sponsor[]> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .select('sponsor:sponsors(*)')
      .eq('event_id', eventId)
      .eq('tier', tier)
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data?.map((item: any) => item.sponsor).filter(Boolean) || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsors'
    throw new Error(message)
  }
}

/**
 * Get sponsors count by tier
 */
export async function getSponsorCountByTier(
  eventId: string
): Promise<{
  title: number
  platinum: number
  gold: number
  silver: number
  bronze: number
  associate: number
}> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .select('tier')
      .eq('event_id', eventId)

    if (error) {
      throw new Error(error.message)
    }

    const tierCounts = {
      title: 0,
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      associate: 0,
    }

    data?.forEach((item: any) => {
      if (item.tier in tierCounts) {
        tierCounts[item.tier as keyof typeof tierCounts]++
      }
    })

    return tierCounts
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsor counts'
    throw new Error(message)
  }
}

/**
 * Create new sponsor (admin only)
 */
export async function createSponsor(input: CreateSponsorInput): Promise<Sponsor> {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .insert([input])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create sponsor')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create sponsor'
    throw new Error(message)
  }
}

/**
 * Update sponsor (admin only)
 */
export async function updateSponsor(id: string, updates: Partial<Sponsor>): Promise<Sponsor> {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update sponsor')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update sponsor'
    throw new Error(message)
  }
}

/**
 * Delete sponsor (admin only)
 */
export async function deleteSponsor(id: string): Promise<void> {
  try {
    // Delete event sponsor associations first
    await supabase.from('event_sponsors').delete().eq('sponsor_id', id)

    // Then delete sponsor
    const { error } = await supabase.from('sponsors').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete sponsor'
    throw new Error(message)
  }
}

/**
 * Add sponsor to event
 */
export async function addSponsorToEvent(
  eventId: string,
  sponsorId: string,
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'associate'
): Promise<EventSponsor> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .insert([{ event_id: eventId, sponsor_id: sponsorId, tier }])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to add sponsor to event')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add sponsor to event'
    throw new Error(message)
  }
}

/**
 * Update sponsor tier for event
 */
export async function updateSponsorTier(
  eventId: string,
  sponsorId: string,
  newTier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'associate'
): Promise<EventSponsor> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .update({ tier: newTier })
      .eq('event_id', eventId)
      .eq('sponsor_id', sponsorId)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update sponsor tier')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update sponsor tier'
    throw new Error(message)
  }
}

/**
 * Remove sponsor from event
 */
export async function removeSponsorFromEvent(eventId: string, sponsorId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('event_sponsors')
      .delete()
      .eq('event_id', eventId)
      .eq('sponsor_id', sponsorId)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to remove sponsor from event'
    throw new Error(message)
  }
}

/**
 * Search sponsors
 */
export async function searchSponsors(query: string): Promise<Sponsor[]> {
  try {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name', { ascending: true })

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
 * Get all sponsors for all events (admin dashboard)
 */
export async function getAllEventSponsors(): Promise
  (EventSponsor & { sponsor: Sponsor; event_id: string })[]
> {
  try {
    const { data, error } = await supabase
      .from('event_sponsors')
      .select('*, sponsor:sponsors(*)')
      .order('tier', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return (
      data?.map((item: any) => ({
        ...item,
        sponsor: item.sponsor,
      })) || []
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsors'
    throw new Error(message)
  }
}

/**
 * Get sponsor statistics
 */
export async function getSponsorStats(): Promise<{
  total_sponsors: number
  total_event_sponsorships: number
  sponsors_per_event: number
}> {
  try {
    const [{ count: totalSponsors }, { count: totalSponsorsips }] = await Promise.all([
      supabase.from('sponsors').select('*', { count: 'exact', head: true }),
      supabase.from('event_sponsors').select('*', { count: 'exact', head: true }),
    ])

    const sponsorsPerEvent = totalSponsors && totalSponsorsips ? totalSponsorsips / totalSponsors : 0

    return {
      total_sponsors: totalSponsors || 0,
      total_event_sponsorships: totalSponsorsips || 0,
      sponsors_per_event: Math.round(sponsorsPerEvent * 10) / 10,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sponsor stats'
    throw new Error(message)
  }
}