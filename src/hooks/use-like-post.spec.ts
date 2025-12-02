import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@/tests/test-utils'
import { useLikePost } from './use-like-post'
import { usePosts } from './use-posts'
import { resetDatabase } from '@/services/feed-service'

describe('useLikePost', () => {
  beforeEach(() => {
    resetDatabase()
  })

  it('should toggle like on a post', async () => {
    const { result: postsResult } = renderHook(() => usePosts({ pageSize: 1 }))

    await waitFor(() => {
      expect(postsResult.current.isSuccess).toBe(true)
    })

    const firstPost = postsResult.current.data?.posts[0]
    expect(firstPost).toBeDefined()

    const { result: likeResult } = renderHook(() => useLikePost())

    const initialLiked = firstPost!.isLiked
    const initialLikes = firstPost!.likes

    likeResult.current.mutate({ postId: firstPost!.id })

    await waitFor(() => {
      expect(likeResult.current.isSuccess).toBe(true)
    })

    const updatedPost = likeResult.current.data
    expect(updatedPost?.isLiked).toBe(!initialLiked)
    expect(updatedPost?.likes).toBe(initialLiked ? initialLikes - 1 : initialLikes + 1)
  })
})
