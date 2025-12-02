import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/feed-service'
import { useAuth } from '@/state/auth'

interface UsePostsOptions {
  pageSize?: number
}

export function usePosts(options: UsePostsOptions = {}) {
  const { pageSize = 10 } = options
  const { user } = useAuth()

  return useInfiniteQuery({
    queryKey: ['posts', { pageSize, username: user?.username }],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({
        page: pageParam,
        pageSize,
        username: user?.username,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined
    },
    select: data => ({
      pages: data.pages,
      pageParams: data.pageParams,
      posts: data.pages.flatMap(page => page.data),
    }),
  })
}

export type UsePostsReturn = ReturnType<typeof usePosts>
