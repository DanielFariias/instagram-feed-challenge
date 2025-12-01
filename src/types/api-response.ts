export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}

export interface ApiError {
  message: string
  code?: string
}
