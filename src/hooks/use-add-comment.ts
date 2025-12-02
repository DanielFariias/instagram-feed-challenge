import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment } from '@/services/feed-service'
import { useAuth } from '@/state/auth'
import type { Comment } from '@/types/comment'

export function useAddComment() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (request: { postId: string; content: string }) => {
      return addComment({
        ...request,
        username: user?.username,
        avatar: user?.avatar,
      })
    },

    // Optimistic update
    onMutate: async newComment => {
      const { postId, content } = newComment

      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: ['post-comments', postId] })

      // Salva snapshot anterior
      const previousComments = queryClient.getQueryData<Comment[]>(['post-comments', postId])

      // Cria comentário temporário com dados do usuário logado
      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        postId,
        content,
        createdAt: Date.now(),
        likes: 0,
        user: {
          id: user?.username || 'current-user',
          username: user?.username || 'you',
          fullName: user?.username || 'You',
          avatar: user?.avatar || 'https://i.pravatar.cc/150?img=68',
        },
      }

      // Atualiza otimisticamente
      queryClient.setQueryData<Comment[]>(['post-comments', postId], old => {
        return old ? [...old, optimisticComment] : [optimisticComment]
      })

      return { previousComments, postId }
    },

    // Rollback em caso de erro
    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['post-comments', context.postId], context.previousComments)
      }
    },

    // Refetch após sucesso
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', variables.postId] })
      // Também invalida a lista de posts para atualizar a contagem
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export type UseAddCommentReturn = ReturnType<typeof useAddComment>
