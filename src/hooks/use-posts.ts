import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/feed-service'

interface UsePostsOptions {
  pageSize?: number
}

export function usePosts(options: UsePostsOptions = {}) {
  const { pageSize = 10 } = options

  return useInfiniteQuery({
    queryKey: ['posts', { pageSize }],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({
        page: pageParam,
        pageSize,
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
