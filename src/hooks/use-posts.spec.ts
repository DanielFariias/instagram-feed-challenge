import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@/tests/test-utils'
import { usePosts } from './use-posts'
import { resetDatabase } from '@/services/feed-service'

describe('usePosts', () => {
  beforeEach(() => {
    resetDatabase()
  })

  it('should fetch posts successfully', async () => {
    const { result } = renderHook(() => usePosts({ pageSize: 10 }))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data?.posts).toHaveLength(10)
  })

  it('should have more pages available', async () => {
    const { result } = renderHook(() => usePosts({ pageSize: 10 }))

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.hasNextPage).toBe(true)
  })
})
