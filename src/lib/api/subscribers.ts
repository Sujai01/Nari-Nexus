import { supabase } from '@/lib/supabase'
import { NewsletterSubscriber, CreateSubscriberInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   NEWSLETTER SUBSCRIBERS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Subscribe to newsletter
 */
export async function subscribeToNewsletter(
  input: CreateSubscriberInput
): Promise<NewsletterSubscriber> {
  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', input.email)
      .single()

    if (existing) {
      // If already subscribed and confirmed, return existing
      if (existing.is_confirmed) {
        throw new Error('Email already subscribed')
      }
      // If unconfirmed, update
      return updateSubscriber(existing.id, { is_confirmed: true })
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: input.email,
          name: input.name || null,
          is_confirmed: false,
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to subscribe')
    }

    // TODO: Send confirmation email
    // await sendConfirmationEmail(input.email, data.id)

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to subscribe'
    throw new Error(message)
  }
}

/**
 * Get subscriber by ID
 */
export async function getSubscriberById(id: string): Promise<NewsletterSubscriber> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Subscriber not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch subscriber'
    throw new Error(message)
  }
}

/**
 * Get subscriber by email
 */
export async function getSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single()

    if (error && error.code === 'PGRST116') {
      // No rows returned
      return null
    }

    if (error || !data) {
      throw new Error(error?.message || 'Subscriber not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch subscriber'
    throw new Error(message)
  }
}

/**
 * Get all newsletter subscribers with pagination
 */
export async function getSubscribers(
  options?: QueryOptions
): Promise<PaginatedResponse<NewsletterSubscriber>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 50
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' })

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('subscribed_at', { ascending: false })
    }

    // Apply confirmation filter
    if (options?.filters?.is_confirmed !== undefined) {
      query = query.eq('is_confirmed', options.filters.is_confirmed)
    }

    // Apply search
    if (options?.search) {
      query = query.or(`email.ilike.%${options.search}%,name.ilike.%${options.search}%`)
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
    const message = error instanceof Error ? error.message : 'Failed to fetch subscribers'
    throw new Error(message)
  }
}

/**
 * Get confirmed subscribers only
 */
export async function getConfirmedSubscribers(limit?: number): Promise<NewsletterSubscriber[]> {
  try {
    let query = supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_confirmed', true)
      .order('subscribed_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch subscribers'
    throw new Error(message)
  }
}

/**
 * Confirm newsletter subscription
 */
export async function confirmSubscription(subscriberId: string): Promise<NewsletterSubscriber> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_confirmed: true })
      .eq('id', subscriberId)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to confirm subscription')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to confirm subscription'
    throw new Error(message)
  }
}

/**
 * Update subscriber details
 */
export async function updateSubscriber(
  id: string,
  updates: Partial<NewsletterSubscriber>
): Promise<NewsletterSubscriber> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update subscriber')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update subscriber'
    throw new Error(message)
  }
}

/**
 * Unsubscribe from newsletter
 */
export async function unsubscribeFromNewsletter(email: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to unsubscribe'
    throw new Error(message)
  }
}

/**
 * Delete subscriber by ID
 */
export async function deleteSubscriber(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete subscriber'
    throw new Error(message)
  }
}

/**
 * Get subscribers by date range
 */
export async function getSubscribersByDateRange(
  startDate: string,
  endDate: string
): Promise<NewsletterSubscriber[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .gte('subscribed_at', startDate)
      .lte('subscribed_at', endDate)
      .order('subscribed_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch subscribers'
    throw new Error(message)
  }
}

/**
 * Get newsletter statistics
 */
export async function getNewsletterStats(): Promise<{
  total_subscribers: number
  confirmed_subscribers: number
  unconfirmed_subscribers: number
  confirmation_rate: number
}> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('is_confirmed')

    if (error) {
      throw new Error(error.message)
    }

    const subscribers = data || []
    const confirmed = subscribers.filter((s: any) => s.is_confirmed).length
    const total = subscribers.length
    const confirmationRate = total > 0 ? (confirmed / total) * 100 : 0

    return {
      total_subscribers: total,
      confirmed_subscribers: confirmed,
      unconfirmed_subscribers: total - confirmed,
      confirmation_rate: Math.round(confirmationRate * 10) / 10,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch stats'
    throw new Error(message)
  }
}

/**
 * Search subscribers
 */
export async function searchSubscribers(query: string): Promise<NewsletterSubscriber[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .or(`email.ilike.%${query}%,name.ilike.%${query}%`)
      .order('subscribed_at', { ascending: false })

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
 * Export subscribers to CSV (admin only)
 */
export async function exportSubscribersToCSV(): Promise<{ csv: string; filename: string }> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_confirmed', true)
      .order('subscribed_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    const subscribers = data || []

    // Create CSV header
    const headers = ['Email', 'Name', 'Subscribed Date']

    // Create CSV rows
    const rows = subscribers.map((sub: NewsletterSubscriber) => [
      sub.email,
      sub.name || '',
      new Date(sub.subscribed_at).toLocaleString(),
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const filename = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`

    return {
      csv: csvContent,
      filename,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to export subscribers'
    throw new Error(message)
  }
}

/**
 * Bulk unsubscribe emails
 */
export async function bulkUnsubscribe(emails: string[]): Promise<void> {
  try {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .in('email', emails)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bulk unsubscribe failed'
    throw new Error(message)
  }
}