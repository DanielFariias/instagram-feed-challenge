import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatRelativeTime } from '@/utils/format-date'
import type { Comment } from '@/types/comment'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.user.avatar} alt={comment.user.username} />
        <AvatarFallback>{comment.user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{comment.user.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </div>
  )
}
