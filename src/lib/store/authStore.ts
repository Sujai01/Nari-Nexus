import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import { signIn, signUp, signInWithGoogle, signInWithGithub, signOut, getCurrentUser } from '@/lib/api/auth'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      initialized: false,

      signIn: async (email, password) => {
        set({ loading: true })
        try {
          const { user } = await signIn(email, password)
          set({ user })
        } finally {
          set({ loading: false })
        }
      },

      signUp: async (email, password) => {
        set({ loading: true })
        try {
          const { user } = await signUp(email, password)
          set({ user })
        } finally {
          set({ loading: false })
        }
      },

      signInWithGoogle: async () => {
        set({ loading: true })
        try {
          await signInWithGoogle()
        } finally {
          set({ loading: false })
        }
      },

      signInWithGithub: async () => {
        set({ loading: true })
        try {
          await signInWithGithub()
        } finally {
          set({ loading: false })
        }
      },

      signOut: async () => {
        set({ loading: true })
        try {
          await signOut()
          set({ user: null })
        } finally {
          set({ loading: false })
        }
      },

      initialize: async () => {
        const { user } = await getCurrentUser()
        set({ user, initialized: true })
      },
    }),
    {
      name: 'narinexus-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)