import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PostView {
  postId: string
  viewedAt: number
  viewDuration: number
}

interface TrackingState {
  viewedPosts: Record<string, PostView>

  activePostId: string | null
  startTime: number | null

  markAsViewed: (postId: string) => void

  startTracking: (postId: string) => void

  stopTracking: () => void

  isPostViewed: (postId: string) => boolean

  getViewDuration: (postId: string) => number

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
