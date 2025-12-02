import { useMemo } from 'react'
import { Heart, MessageCircle, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatRelativeTime, formatNumber } from '@/utils/format-date'
import type { Post } from '@/types/post'
import { cn } from '@/lib/utils'
import { usePostTracking } from '@/hooks/use-post-tracking'
import { useAuth } from '@/state/auth'
import { isPostLikedByUser } from '@/utils/likes-storage'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  isLiking?: boolean
}

export function PostCard({ post, onLike, onComment, isLiking }: PostCardProps) {
  const trackingRef = usePostTracking({ postId: post.id })
  const { user } = useAuth()

  const isLiked = useMemo(() => {
    if (typeof post.isLiked === 'boolean') {
      return post.isLiked
    }
    return user ? isPostLikedByUser(user.username, post.id) : false
  }, [post.isLiked, user, post.id])

  const handleLike = () => {
    onLike?.(post.id)
  }

  const handleComment = () => {
    onComment?.(post.id)
  }

  return (
    <Card ref={trackingRef} className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.username} />
          <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold">{post.user.username}</p>
            {post.user.isVerified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</p>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="flex items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            disabled={isLiking}
            className="hover:bg-transparent"
          >
            <Heart
              className={cn(
                'w-6 h-6 transition-colors',
                isLiked ? 'fill-red-500 text-red-500' : 'text-foreground hover:text-gray-500'
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleComment}
            className="hover:bg-transparent"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            <Bookmark className="w-6 h-6" />
          </Button>
        </div>

        <div className="text-sm font-semibold">
          {formatNumber(post.likes)} curtida{post.likes !== 1 ? 's' : ''}
        </div>

        {post.caption && (
          <div className="text-sm">
            <span className="font-semibold mr-2">{post.user.username}</span>
            <span>{post.caption}</span>
          </div>
        )}

        {post.commentsCount > 0 && (
          <button
            onClick={handleComment}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos os {post.commentsCount} comentários
          </button>
        )}
      </CardFooter>
    </Card>
  )
}
