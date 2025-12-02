import { useEffect, useRef } from 'react'
import { useTracking } from '@/state/tracking'

interface UsePostTrackingOptions {
  postId: string
  enabled?: boolean
  threshold?: number
}

export function usePostTracking({
  postId,
  enabled = true,
  threshold = 0.5,
}: UsePostTrackingOptions) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const { markAsViewed, startTracking, stopTracking } = useTracking()

  useEffect(() => {
    if (!enabled || !elementRef.current) return

    const element = elementRef.current

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries

        if (entry.isIntersecting) {
          // Post entrou na tela
          markAsViewed(postId)
          startTracking(postId)
        } else {
          // Post saiu da tela
          stopTracking()
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      stopTracking()
    }
  }, [postId, enabled, threshold, markAsViewed, startTracking, stopTracking])

  return elementRef
}
