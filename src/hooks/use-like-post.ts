import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLikePost } from '@/services/feed-service'
import { toggleUserLike } from '@/utils/likes-storage'
import { useAuth } from '@/state/auth'
import type { Post } from '@/types/post'
import type { PaginatedResponse } from '@/types/api-response'

export function useLikePost() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (request: { postId: string }) => {
      return toggleLikePost({
        ...request,
        username: user?.username,
      })
    },

    onMutate: async ({ postId }) => {
      if (user) {
        await toggleUserLike(user.username, postId)
      }

      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousData = queryClient.getQueryData(['posts'])

      queryClient.setQueriesData<{
        pages: PaginatedResponse<Post>[]
        pageParams: number[]
      }>({ queryKey: ['posts'] }, old => {
        if (!old) return old

        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: page.data.map(post =>
              post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                  }
                : post
            ),
          })),
        }
      })

      return { previousData, postId }
    },

    onError: (_error, _variables, context) => {
      if (user && context?.postId) {
        toggleUserLike(user.username, context.postId)
      }

      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export type UseLikePostReturn = ReturnType<typeof useLikePost>
