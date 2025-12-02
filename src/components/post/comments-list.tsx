import { Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommentItem } from './comment-item'
import type { Comment } from '@/types/comment'

interface CommentsListProps {
  comments?: Comment[]
  isLoading?: boolean
}

export function CommentsList({ comments, isLoading }: CommentsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Nenhum comentário ainda. Seja o primeiro!
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-1">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </ScrollArea>
  )
}
