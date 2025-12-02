export interface LikePostRequest {
  postId: string
  username?: string
}

export interface AddCommentRequest {
  postId: string
  content: string
  username?: string
  avatar?: string
}

export interface GetPostsRequest {
  page?: number
  pageSize?: number
  username?: string
}
