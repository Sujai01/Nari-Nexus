import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/* ─────────────────────────────────────────────────────
   TAILWIND CLASS UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Merge Tailwind CSS classes safely
 * Prevents class conflicts and duplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ─────────────────────────────────────────────────────
   DATE & TIME UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Format date to readable string (e.g., "Sep 25, 2026")
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Format date and time (e.g., "Sep 25, 2026 · 9:00 AM")
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dateStr = d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${dateStr} · ${timeStr}`
}

/**
 * Format time only (e.g., "9:00 AM - 10:30 AM")
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const startStr = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const endStr = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${startStr} - ${endStr}`
}

/**
 * Get days remaining until event
 */
export function getDaysUntil(date: string | Date): number {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Check if event date has passed
 */
export function isEventPassed(endDate: string | Date): boolean {
  const d = typeof endDate === 'string' ? new Date(endDate) : endDate
  return d < new Date()
}

/**
 * Calculate countdown (days, hours, minutes, seconds)
 */
export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export function calculateCountdown(targetDate: string | Date): Countdown {
  const d = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
  const now = new Date()
  const diff = d.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  }
}

/* ─────────────────────────────────────────────────────
   STRING UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length - 3) + '...'
}

/**
 * Extract initials from full name
 */
export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim()
}

/* ─────────────────────────────────────────────────────
   EMAIL UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Mask email for display (e.g., "u***@example.com")
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  return `${local.charAt(0)}***@${domain}`
}

/* ─────────────────────────────────────────────────────
   NUMBER UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Format number with commas (e.g., 1000 → "1,000")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Format as currency (e.g., 99.99 → "$99.99")
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/* ─────────────────────────────────────────────────────
   ARRAY UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Remove duplicates from array
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

/**
 * Group array items by key
 */
export function groupBy<T, K extends PropertyKey>(
  arr: T[],
  fn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = fn(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    },
    {} as Record<K, T[]>
  )
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

/* ─────────────────────────────────────────────────────
   OBJECT UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Remove undefined values from object
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: any = {}
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      cleaned[key] = obj[key]
    }
  })
  return cleaned
}

/**
 * Deep merge objects
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key as keyof T])) {
        if (!(key in target)) {
          ;(output as any)[key] = source[key as keyof T]
        } else {
          ;(output as any)[key] = deepMerge(
            target[key as keyof T],
            source[key as keyof T] as any
          )
        }
      } else {
        ;(output as any)[key] = source[key as keyof T]
      }
    })
  }
  return output
}

/**
 * Check if value is object
 */
export function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/* ─────────────────────────────────────────────────────
   URL & QUERY UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Build query string from object
 */
export function buildQueryString(
  params: Record<string, any>
): string {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

/**
 * Parse query string to object
 */
export function parseQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query)
  const obj: Record<string, string> = {}
  params.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

/* ─────────────────────────────────────────────────────
   VALIDATION UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Check if string is valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate phone number (basic)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  return phoneRegex.test(phone)
}

/**
 * Check password strength
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak'
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)

  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(
    Boolean
  ).length

  if (strength >= 3) return 'strong'
  if (strength >= 2) return 'medium'
  return 'weak'
}

/* ─────────────────────────────────────────────────────
   LOCAL STORAGE UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Set value in localStorage with type safety
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to set localStorage key "${key}":`, error)
  }
}

/**
 * Get value from localStorage with type safety
 */
export function getLocalStorage<T>(key: string, fallback?: T): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback ?? null
  } catch (error) {
    console.error(`Failed to get localStorage key "${key}":`, error)
    return fallback ?? null
  }
}

/**
 * Remove value from localStorage
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove localStorage key "${key}":`, error)
  }
}

/* ─────────────────────────────────────────────────────
   ASYNC UTILITIES
   ───────────────────────────────────────────────────── */

/**
 * Delay execution (promise-based sleep)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry async function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxAttempts - 1) {
        await delay(delayMs * Math.pow(2, i))
      }
    }
  }
  throw lastError
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}