import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleLikePost } from '@/services/feed-service'
import type { Post } from '@/types/post'
import type { PaginatedResponse } from '@/types/api-response'

export function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleLikePost,

    // Optimistic update
    onMutate: async ({ postId }) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Salva snapshot do estado anterior
      const previousData = queryClient.getQueryData(['posts'])

      // Atualiza otimisticamente
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

      return { previousData }
    },

    // Rollback em caso de erro
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },

    // Sempre refetch após sucesso ou erro
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export type UseLikePostReturn = ReturnType<typeof useLikePost>
