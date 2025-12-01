import type { User } from './user'
import type { Comment } from './comment'

export interface Post {
  id: string
  user: User
  imageUrl: string
  caption: string
  createdAt: number
  likes: number
  isLiked: boolean
  comments: Comment[]
  commentsCount: number
}
