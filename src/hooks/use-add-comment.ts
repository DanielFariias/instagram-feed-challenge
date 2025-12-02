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

    onMutate: async newComment => {
      const { postId, content } = newComment

      await queryClient.cancelQueries({ queryKey: ['post-comments', postId] })

      const previousComments = queryClient.getQueryData<Comment[]>(['post-comments', postId])

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

      queryClient.setQueryData<Comment[]>(['post-comments', postId], old => {
        return old ? [...old, optimisticComment] : [optimisticComment]
      })

      return { previousComments, postId }
    },

    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['post-comments', context.postId], context.previousComments)
      }
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post-comments', variables.postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export type UseAddCommentReturn = ReturnType<typeof useAddComment>
