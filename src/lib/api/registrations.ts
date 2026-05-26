import { supabase } from '@/lib/supabase'
import { Registration, CreateRegistrationInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   REGISTRATIONS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Generate unique confirmation code
 */
function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

/**
 * Create new registration
 */
export async function createRegistration(
  input: CreateRegistrationInput
): Promise<Registration> {
  try {
    const confirmationCode = generateConfirmationCode()

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          event_id: input.event_id,
          full_name: input.full_name,
          email: input.email,
          organization: input.organization || null,
          phone: input.phone || null,
          registration_type: input.registration_type,
          confirmation_code: confirmationCode,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create registration')
    }

    // TODO: Send confirmation email with confirmation_code
    // await sendConfirmationEmail(input.email, confirmationCode, input.event_id)

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create registration'
    throw new Error(message)
  }
}

/**
 * Get registration by ID
 */
export async function getRegistrationById(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Registration not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration'
    throw new Error(message)
  }
}

/**
 * Get registration by confirmation code
 */
export async function getRegistrationByConfirmationCode(code: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('confirmation_code', code)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Registration not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration'
    throw new Error(message)
  }
}

/**
 * Get all registrations for event with optional filtering
 */
export async function getEventRegistrations(
  eventId: string,
  options?: QueryOptions
): Promise<PaginatedResponse<Registration>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('registrations')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Apply status filter
    if (options?.filters?.status) {
      query = query.eq('status', options.filters.status)
    }

    // Apply type filter
    if (options?.filters?.registration_type) {
      query = query.eq('registration_type', options.filters.registration_type)
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `full_name.ilike.%${options.search}%,email.ilike.%${options.search}%,organization.ilike.%${options.search}%`
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
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by email
 */
export async function getRegistrationsByEmail(email: string): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get user's registrations
 */
export async function getUserRegistrations(userId: string): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by type for event
 */
export async function getEventRegistrationsByType(
  eventId: string,
  type: 'attendee' | 'presenter' | 'workshop' | 'exhibitor'
): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('registration_type', type)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registration count by type
 */
export async function getRegistrationCountByType(
  eventId: string
): Promise<{
  attendees: number
  presenters: number
  workshops: number
  exhibitors: number
  total: number
}> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('registration_type', { count: 'exact' })
      .eq('event_id', eventId)

    if (error) {
      throw new Error(error.message)
    }

    const typeCounts = {
      attendee: 0,
      presenter: 0,
      workshop: 0,
      exhibitor: 0,
    }

    data?.forEach((reg: any) => {
      if (reg.registration_type in typeCounts) {
        typeCounts[reg.registration_type as keyof typeof typeCounts]++
      }
    })

    return {
      attendees: typeCounts.attendee,
      presenters: typeCounts.presenter,
      workshops: typeCounts.workshop,
      exhibitors: typeCounts.exhibitor,
      total: data?.length || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration counts'
    throw new Error(message)
  }
}

/**
 * Update registration status
 */
export async function updateRegistrationStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'checked_in' | 'cancelled'
): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration'
    throw new Error(message)
  }
}

/**
 * Confirm registration
 */
export async function confirmRegistration(confirmationCode: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'confirmed' })
      .eq('confirmation_code', confirmationCode)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to confirm registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to confirm registration'
    throw new Error(message)
  }
}

/**
 * Check in attendee
 */
export async function checkInRegistration(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'checked_in' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to check in registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check in registration'
    throw new Error(message)
  }
}

/**
 * Cancel registration
 */
export async function cancelRegistration(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to cancel registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to cancel registration'
    throw new Error(message)
  }
}

/**
 * Update registration details
 */
export async function updateRegistration(
  id: string,
  updates: Partial<Registration>
): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration'
    throw new Error(message)
  }
}

/**
 * Delete registration
 */
export async function deleteRegistration(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('registrations').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete registration'
    throw new Error(message)
  }
}

/**
 * Check if email already registered for event
 */
export async function isEmailRegisteredForEvent(
  eventId: string,
  email: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('email', email)
      .neq('status', 'cancelled')
      .single()

    if (error && error.code === 'PGRST116') {
      // No rows returned
      return false
    }

    if (error) {
      throw new Error(error.message)
    }

    return !!data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check registration'
    throw new Error(message)
  }
}

/**
 * Get registration statistics for event
 */
export async function getEventRegistrationStats(eventId: string): Promise<{
  total_registrations: number
  confirmed: number
  checked_in: number
  cancelled: number
  attendance_rate: number
}> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('status')
      .eq('event_id', eventId)

    if (error) {
      throw new Error(error.message)
    }

    const registrations = data || []
    const total = registrations.length

    const statusCounts = {
      confirmed: 0,
      checked_in: 0,
      cancelled: 0,
    }

    registrations.forEach((reg: any) => {
      if (reg.status === 'confirmed') statusCounts.confirmed++
      else if (reg.status === 'checked_in') statusCounts.checked_in++
      else if (reg.status === 'cancelled') statusCounts.cancelled++
    })

    const attendanceRate = total > 0 ? (statusCounts.checked_in / total) * 100 : 0

    return {
      total_registrations: total,
      confirmed: statusCounts.confirmed,
      checked_in: statusCounts.checked_in,
      cancelled: statusCounts.cancelled,
      attendance_rate: Math.round(attendanceRate * 10) / 10,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration stats'
    throw new Error(message)
  }
}

/**
 * Export registrations to CSV (admin only)
 */
export async function exportEventRegistrations(
  eventId: string
): Promise<{ csv: string; filename: string }> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    const registrations = data || []

    // Create CSV header
    const headers = [
      'Full Name',
      'Email',
      'Organization',
      'Phone',
      'Registration Type',
      'Status',
      'Confirmation Code',
      'Created At',
    ]

    // Create CSV rows
    const rows = registrations.map((reg: Registration) => [
      reg.full_name,
      reg.email,
      reg.organization || '',
      reg.phone || '',
      reg.registration_type,
      reg.status,
      reg.confirmation_code,
      new Date(reg.created_at).toLocaleString(),
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const filename = `registrations-${eventId}-${new Date().toISOString().split('T')[0]}.csv`

    return {
      csv: csvContent,
      filename,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to export registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by date range
 */
export async function getRegistrationsByDateRange(
  eventId: string,
  startDate: string,
  endDate: string
): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Send registration reminder email
 */
export async function sendRegistrationReminder(registrationId: string): Promise<void> {
  try {
    const registration = await getRegistrationById(registrationId)

    // TODO: Send reminder email
    // await sendReminderEmail(
    //   registration.email,
    //   registration.full_name,
    //   registration.confirmation_code
    // )

    console.log(`Reminder sent to ${registration.email}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send reminder'
    throw new Error(message)
  }
}import { supabase } from '@/lib/supabase'
import { Registration, CreateRegistrationInput, QueryOptions, PaginatedResponse } from '@/types'

/* ─────────────────────────────────────────────────────
   REGISTRATIONS SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Generate unique confirmation code
 */
function generateConfirmationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

/**
 * Create new registration
 */
export async function createRegistration(
  input: CreateRegistrationInput
): Promise<Registration> {
  try {
    const confirmationCode = generateConfirmationCode()

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          event_id: input.event_id,
          full_name: input.full_name,
          email: input.email,
          organization: input.organization || null,
          phone: input.phone || null,
          registration_type: input.registration_type,
          confirmation_code: confirmationCode,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to create registration')
    }

    // TODO: Send confirmation email with confirmation_code
    // await sendConfirmationEmail(input.email, confirmationCode, input.event_id)

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create registration'
    throw new Error(message)
  }
}

/**
 * Get registration by ID
 */
export async function getRegistrationById(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Registration not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration'
    throw new Error(message)
  }
}

/**
 * Get registration by confirmation code
 */
export async function getRegistrationByConfirmationCode(code: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('confirmation_code', code)
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Registration not found')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration'
    throw new Error(message)
  }
}

/**
 * Get all registrations for event with optional filtering
 */
export async function getEventRegistrations(
  eventId: string,
  options?: QueryOptions
): Promise<PaginatedResponse<Registration>> {
  try {
    const page = options?.page || 1
    const pageSize = options?.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('registrations')
      .select('*', { count: 'exact' })
      .eq('event_id', eventId)

    // Apply sorting
    if (options?.sortBy) {
      const order = options?.sortOrder === 'desc' ? { ascending: false } : { ascending: true }
      query = query.order(options.sortBy, order)
    } else {
      query = query.order('created_at', { ascending: false })
    }

    // Apply status filter
    if (options?.filters?.status) {
      query = query.eq('status', options.filters.status)
    }

    // Apply type filter
    if (options?.filters?.registration_type) {
      query = query.eq('registration_type', options.filters.registration_type)
    }

    // Apply search filter
    if (options?.search) {
      query = query.or(
        `full_name.ilike.%${options.search}%,email.ilike.%${options.search}%,organization.ilike.%${options.search}%`
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
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by email
 */
export async function getRegistrationsByEmail(email: string): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get user's registrations
 */
export async function getUserRegistrations(userId: string): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by type for event
 */
export async function getEventRegistrationsByType(
  eventId: string,
  type: 'attendee' | 'presenter' | 'workshop' | 'exhibitor'
): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .eq('registration_type', type)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Get registration count by type
 */
export async function getRegistrationCountByType(
  eventId: string
): Promise<{
  attendees: number
  presenters: number
  workshops: number
  exhibitors: number
  total: number
}> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('registration_type', { count: 'exact' })
      .eq('event_id', eventId)

    if (error) {
      throw new Error(error.message)
    }

    const typeCounts = {
      attendee: 0,
      presenter: 0,
      workshop: 0,
      exhibitor: 0,
    }

    data?.forEach((reg: any) => {
      if (reg.registration_type in typeCounts) {
        typeCounts[reg.registration_type as keyof typeof typeCounts]++
      }
    })

    return {
      attendees: typeCounts.attendee,
      presenters: typeCounts.presenter,
      workshops: typeCounts.workshop,
      exhibitors: typeCounts.exhibitor,
      total: data?.length || 0,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration counts'
    throw new Error(message)
  }
}

/**
 * Update registration status
 */
export async function updateRegistrationStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'checked_in' | 'cancelled'
): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration'
    throw new Error(message)
  }
}

/**
 * Confirm registration
 */
export async function confirmRegistration(confirmationCode: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'confirmed' })
      .eq('confirmation_code', confirmationCode)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to confirm registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to confirm registration'
    throw new Error(message)
  }
}

/**
 * Check in attendee
 */
export async function checkInRegistration(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'checked_in' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to check in registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check in registration'
    throw new Error(message)
  }
}

/**
 * Cancel registration
 */
export async function cancelRegistration(id: string): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to cancel registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to cancel registration'
    throw new Error(message)
  }
}

/**
 * Update registration details
 */
export async function updateRegistration(
  id: string,
  updates: Partial<Registration>
): Promise<Registration> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Failed to update registration')
    }

    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update registration'
    throw new Error(message)
  }
}

/**
 * Delete registration
 */
export async function deleteRegistration(id: string): Promise<void> {
  try {
    const { error } = await supabase.from('registrations').delete().eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete registration'
    throw new Error(message)
  }
}

/**
 * Check if email already registered for event
 */
export async function isEmailRegisteredForEvent(
  eventId: string,
  email: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('email', email)
      .neq('status', 'cancelled')
      .single()

    if (error && error.code === 'PGRST116') {
      // No rows returned
      return false
    }

    if (error) {
      throw new Error(error.message)
    }

    return !!data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to check registration'
    throw new Error(message)
  }
}

/**
 * Get registration statistics for event
 */
export async function getEventRegistrationStats(eventId: string): Promise<{
  total_registrations: number
  confirmed: number
  checked_in: number
  cancelled: number
  attendance_rate: number
}> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('status')
      .eq('event_id', eventId)

    if (error) {
      throw new Error(error.message)
    }

    const registrations = data || []
    const total = registrations.length

    const statusCounts = {
      confirmed: 0,
      checked_in: 0,
      cancelled: 0,
    }

    registrations.forEach((reg: any) => {
      if (reg.status === 'confirmed') statusCounts.confirmed++
      else if (reg.status === 'checked_in') statusCounts.checked_in++
      else if (reg.status === 'cancelled') statusCounts.cancelled++
    })

    const attendanceRate = total > 0 ? (statusCounts.checked_in / total) * 100 : 0

    return {
      total_registrations: total,
      confirmed: statusCounts.confirmed,
      checked_in: statusCounts.checked_in,
      cancelled: statusCounts.cancelled,
      attendance_rate: Math.round(attendanceRate * 10) / 10,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registration stats'
    throw new Error(message)
  }
}

/**
 * Export registrations to CSV (admin only)
 */
export async function exportEventRegistrations(
  eventId: string
): Promise<{ csv: string; filename: string }> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    const registrations = data || []

    // Create CSV header
    const headers = [
      'Full Name',
      'Email',
      'Organization',
      'Phone',
      'Registration Type',
      'Status',
      'Confirmation Code',
      'Created At',
    ]

    // Create CSV rows
    const rows = registrations.map((reg: Registration) => [
      reg.full_name,
      reg.email,
      reg.organization || '',
      reg.phone || '',
      reg.registration_type,
      reg.status,
      reg.confirmation_code,
      new Date(reg.created_at).toLocaleString(),
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const filename = `registrations-${eventId}-${new Date().toISOString().split('T')[0]}.csv`

    return {
      csv: csvContent,
      filename,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to export registrations'
    throw new Error(message)
  }
}

/**
 * Get registrations by date range
 */
export async function getRegistrationsByDateRange(
  eventId: string,
  startDate: string,
  endDate: string
): Promise<Registration[]> {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch registrations'
    throw new Error(message)
  }
}

/**
 * Send registration reminder email
 */
export async function sendRegistrationReminder(registrationId: string): Promise<void> {
  try {
    const registration = await getRegistrationById(registrationId)

    // TODO: Send reminder email
    // await sendReminderEmail(
    //   registration.email,
    //   registration.full_name,
    //   registration.confirmation_code
    // )

    console.log(`Reminder sent to ${registration.email}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send reminder'
    throw new Error(message)
  }
}