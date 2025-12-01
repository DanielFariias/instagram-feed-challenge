import type { Comment } from '@/types/comment'
import { getRandomUser } from './users'

export function generateMockComments(postId: string, count: number = 5): Comment[] {
  const comments: Comment[] = []
  const commentTexts = [
    'Amazing photo! 😍',
    'Love this! ❤️',
    'Great content!',
    'This is incredible! 🔥',
    'Beautiful! 🌟',
    'Wow! Amazing work 👏',
    'Love your posts!',
    'This is so cool! 😎',
    'Fantastic! Keep it up! 💪',
    'Absolutely stunning! ✨',
  ]

  for (let i = 0; i < count; i++) {
    comments.push({
      id: `comment-${postId}-${i + 1}`,
      postId,
      user: getRandomUser(),
      content: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      createdAt: Date.now() - i * 600000, // 10 minutos de diferença
      likes: Math.floor(Math.random() * 50),
    })
  }

  return comments
}
