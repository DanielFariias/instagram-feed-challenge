import { useQuery } from '@tanstack/react-query'
import { getPostComments } from '@/services/feed-service'

export function usePostComments(postId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['post-comments', postId],
    queryFn: () => getPostComments(postId),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export type UsePostCommentsReturn = ReturnType<typeof usePostComments>
