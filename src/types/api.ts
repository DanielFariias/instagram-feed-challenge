export interface LikePostRequest {
  postId: string
}

export interface AddCommentRequest {
  postId: string
  content: string
}

export interface GetPostsRequest {
  page?: number
  pageSize?: number
}
