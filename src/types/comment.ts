import type { User } from './user'

export interface Comment {
  id: string
  postId: string
  user: User
  content: string
  createdAt: number
  likes: number
}
