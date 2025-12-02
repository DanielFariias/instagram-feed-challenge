import { useCallback } from 'react'
import { PostCard } from './post-card'
import { PostCardSkeleton } from './post-card-skeleton'
import { Button } from '@/components/ui/button'
import { AlertCircle, Loader2 } from 'lucide-react'
import type { Post } from '@/types/post'
import { usePosts } from '@/hooks/use-posts'
import { useLikePost } from '@/hooks/use-like-post'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface PostListProps {
  onPostClick?: (post: Post) => void
}

export function PostList({ onPostClick }: PostListProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePosts({ pageSize: 10 })

  const { mutate: likePost, isPending: isLiking } = useLikePost()

  // Intersection Observer para infinite scroll
  const loadMoreRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: hasNextPage && !isFetchingNextPage,
  })

  const handleLike = useCallback(
    (postId: string) => {
      likePost({ postId })
    },
    [likePost]
  )

  const handleComment = useCallback(
    (postId: string) => {
      const post = data?.posts.find(p => p.id === postId)
      if (post) {
        onPostClick?.(post)
      }
    },
    [onPostClick, data]
  )

  // Loading inicial
  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-center text-muted-foreground">
          {error?.message || 'Erro ao carregar posts'}
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Tentar novamente
        </Button>
      </div>
    )
  }

  // Empty state
  if (!data?.posts || data.posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground">Nenhum post encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-8">
      {data.posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          isLiking={isLiking}
        />
      ))}

      {/* Infinite scroll trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Carregando mais posts...</span>
            </div>
          )}
        </div>
      )}

      {/* End of feed */}
      {!hasNextPage && data.posts.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">Você viu todos os posts! 🎉</div>
      )}
    </div>
  )
}
