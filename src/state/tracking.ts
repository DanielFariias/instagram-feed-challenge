import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PostView {
  postId: string
  viewedAt: number
  viewDuration: number // em segundos
}

interface TrackingState {
  // Posts vistos
  viewedPosts: Record<string, PostView>

  // Post atualmente sendo visualizado
  activePostId: string | null
  startTime: number | null

  // Marcar post como visto
  markAsViewed: (postId: string) => void

  // Iniciar tracking de tempo
  startTracking: (postId: string) => void

  // Parar tracking e salvar tempo
  stopTracking: () => void

  // Verificar se post foi visto
  isPostViewed: (postId: string) => boolean

  // Obter duração de visualização
  getViewDuration: (postId: string) => number

  // Obter todos os posts vistos
  getViewedPosts: () => PostView[]
}

export const useTracking = create<TrackingState>()(
  persist(
    (set, get) => ({
      viewedPosts: {},
      activePostId: null,
      startTime: null,

      markAsViewed: (postId: string) => {
        const { viewedPosts } = get()

        // Só marca se ainda não foi visto
        if (!viewedPosts[postId]) {
          set({
            viewedPosts: {
              ...viewedPosts,
              [postId]: {
                postId,
                viewedAt: Date.now(),
                viewDuration: 0,
              },
            },
          })
        }
      },

      startTracking: (postId: string) => {
        const { activePostId, stopTracking } = get()

        // Se já estava trackando outro post, para o anterior
        if (activePostId && activePostId !== postId) {
          stopTracking()
        }

        set({
          activePostId: postId,
          startTime: Date.now(),
        })
      },

      stopTracking: () => {
        const { activePostId, startTime, viewedPosts } = get()

        if (activePostId && startTime) {
          const duration = Math.floor((Date.now() - startTime) / 1000)
          const existing = viewedPosts[activePostId]

          set({
            viewedPosts: {
              ...viewedPosts,
              [activePostId]: {
                postId: activePostId,
                viewedAt: existing?.viewedAt || Date.now(),
                viewDuration: (existing?.viewDuration || 0) + duration,
              },
            },
            activePostId: null,
            startTime: null,
          })
        }
      },

      isPostViewed: (postId: string) => {
        return !!get().viewedPosts[postId]
      },

      getViewDuration: (postId: string) => {
        return get().viewedPosts[postId]?.viewDuration || 0
      },

      getViewedPosts: () => {
        return Object.values(get().viewedPosts)
      },
    }),
    {
      name: 'post-tracking-storage',
    }
  )
)
