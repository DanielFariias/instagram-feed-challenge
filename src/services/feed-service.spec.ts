import { describe, it, expect, beforeEach } from 'vitest'
import { getPosts, toggleLikePost, addComment, resetDatabase } from './feed-service'

describe('Feed Service', () => {
  beforeEach(() => {
    resetDatabase()
  })

  it('should return paginated posts', async () => {
    const response = await getPosts({ page: 1, pageSize: 10 })

    expect(response.data).toHaveLength(10)
    expect(response.page).toBe(1)
    expect(response.pageSize).toBe(10)
    expect(response.hasMore).toBe(true)
  })

  it('should toggle like on a post', async () => {
    const posts = await getPosts({ page: 1, pageSize: 1 })
    const post = posts.data[0]
    const initialLikes = post.likes
    const initialLiked = post.isLiked

    const updatedPost = await toggleLikePost({ postId: post.id })

    expect(updatedPost.isLiked).toBe(!initialLiked)
    expect(updatedPost.likes).toBe(initialLiked ? initialLikes - 1 : initialLikes + 1)
  })

  it('should add a comment to a post', async () => {
    const posts = await getPosts({ page: 1, pageSize: 1 })
    const post = posts.data[0]

    const comment = await addComment({
      postId: post.id,
      content: 'Test comment',
    })

    expect(comment.postId).toBe(post.id)
    expect(comment.content).toBe('Test comment')
    expect(comment.id).toBeDefined()
  })
})
