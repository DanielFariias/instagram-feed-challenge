import { Heart, MessageCircle, Bookmark, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { CommentItem } from './comment-item'
import { AddCommentForm } from './add-comment-form'
import { formatNumber } from '@/utils/format-date'
import { cn } from '@/lib/utils'
import { usePostComments } from '@/hooks/use-post-comments'
import { useAddComment } from '@/hooks/use-add-comment'
import { useMemo } from 'react'
import { useAuth } from '@/state/auth'
import { isPostLikedByUser } from '@/utils/likes-storage'
import type { PaginatedResponse } from '@/types/api-response'
import type { Post } from '@/types/post'

interface PostDetailsModalProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostDetailsModal({ post, open, onOpenChange }: PostDetailsModalProps) {
  const { user } = useAuth()

  const { data: postsData } = useQuery<{
    pages: PaginatedResponse<Post>[]
    pageParams: number[]
  }>({
    queryKey: ['posts'],
    enabled: false,
    initialData: undefined,
  })

  const currentPost = useMemo(() => {
    if (!post) return null

    // Procurar o post atualizado nos dados em cache
    if (postsData?.pages) {
      for (const page of postsData.pages) {
        const updatedPost = page.data.find(p => p.id === post.id)
        if (updatedPost) return updatedPost
      }
    }

    return post
  }, [post, postsData])

  const isLiked = useMemo(() => {
    if (!currentPost) return false

    if (typeof currentPost.isLiked === 'boolean') {
      return currentPost.isLiked
    }
    return user ? isPostLikedByUser(user.username, currentPost.id) : false
  }, [currentPost?.isLiked, user, currentPost?.id])

  const { data: comments, isLoading: isLoadingComments } = usePostComments(
    currentPost?.id || '',
    open && !!currentPost
  )

  const { mutate: addComment, isPending: isAddingComment } = useAddComment()

  if (!currentPost) return null

  const handleAddComment = (content: string) => {
    addComment({ postId: currentPost.id, content })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] p-0 flex flex-col">
        <div className="w-full bg-black shrink-0 rounded-t-lg">
          <img
            src={currentPost.imageUrl}
            alt={currentPost.caption}
            className="w-full max-h-[50vh] object-contain rounded-lg"
          />
        </div>

        <div className="flex items-center gap-3 p-4 border-b shrink-0">
          {currentPost.caption && (
            <div className="flex gap-3 w-full">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src={currentPost.user.avatar} alt={currentPost.user.username} />
                <AvatarFallback>{currentPost.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="text-sm font-semibold">{currentPost.user.username}</span>
                <span className="text-sm ml-2">{currentPost.caption}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0">
          {isLoadingComments && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!isLoadingComments && (!comments || comments.length === 0) && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              Nenhum comentário ainda. Seja o primeiro!
            </div>
          )}

          {!isLoadingComments && comments && comments.length > 0 && (
            <div className="py-2 space-y-1">
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t bg-background rounded-b-lg">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Heart
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isLiked ? 'fill-red-500 text-red-500' : 'text-foreground hover:text-gray-500'
                  )}
                />
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <MessageCircle className="w-6 h-6" />
              </Button>

              <div className="flex-1" />

              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Bookmark className="w-6 h-6" />
              </Button>
            </div>

            <p className="text-sm font-semibold">
              {formatNumber(currentPost.likes)} curtida{currentPost.likes !== 1 ? 's' : ''}
            </p>

            <Separator />

            <AddCommentForm onSubmit={handleAddComment} isPending={isAddingComment} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
