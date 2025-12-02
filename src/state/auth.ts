import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  username: string
  avatar: string
}

interface AuthState {
  user: AuthUser | null
  login: (username: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const generateAvatar = (username: string): string => {
  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=',
    'https://api.dicebear.com/7.x/bottts/svg?seed=',
    'https://api.dicebear.com/7.x/personas/svg?seed=',
    'https://api.dicebear.com/7.x/fun-emoji/svg?seed=',
  ]

  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
  return `${randomAvatar}${username}`
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,

      login: (username: string) => {
        const avatar = generateAvatar(username)
        set({ user: { username, avatar }, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'instagram-feed-auth',
    }
  )
)
