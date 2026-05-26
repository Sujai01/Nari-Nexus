import { supabase } from '@/lib/supabase'
import { User, LoginFormData, SignUpFormData } from '@/types'

/* ─────────────────────────────────────────────────────
   AUTHENTICATION SERVICE
   ───────────────────────────────────────────────────── */

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data.user) {
      return null
    }

    // Fetch additional user profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile) {
      return null
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role || 'user',
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Sign up new user with email and password
 */
export async function signUp(data: SignUpFormData): Promise<{ user: User; message: string } | null> {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    })

    if (authError || !authData.user) {
      throw new Error(authError?.message || 'Signup failed')
    }

    // Create user profile
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        role: 'user',
      },
    ])

    if (profileError) {
      throw new Error(profileError.message)
    }

    return {
      user: {
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        avatar_url: null,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      message: 'Signup successful. Please check your email to confirm your account.',
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signup failed'
    throw new Error(message)
  }
}

/**
 * Log in user with email and password
 */
export async function login(data: LoginFormData): Promise<User> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error || !authData.user) {
      throw new Error(error?.message || 'Login failed')
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('Failed to load user profile')
    }

    return {
      id: authData.user.id,
      email: authData.user.email || '',
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      role: profile.role || 'user',
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'
    throw new Error(message)
  }
}

/**
 * Log out current user
 */
export async function logout(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed'
    throw new Error(message)
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password reset failed'
    throw new Error(message)
  }
}

/**
 * Update password with token from reset email
 */
export async function updatePassword(token: string, newPassword: string): Promise<void> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Password update failed'
    throw new Error(message)
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<{ full_name: string; avatar_url: string }>
): Promise<User> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error || !data) {
      throw new Error(error?.message || 'Update failed')
    }

    return {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      role: data.role || 'user',
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Profile update failed'
    throw new Error(message)
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw new Error(error.message)
    }
    return data.session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const user = await getCurrentUser()
      callback(user)
    } else {
      callback(null)
    }
  })
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(provider: 'google' | 'github'): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : `OAuth login failed`
    throw new Error(message)
  }
}

/**
 * Verify email with OTP
 */
export async function verifyOTP(email: string, token: string): Promise<void> {
  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Email verification failed'
    throw new Error(message)
  }
}