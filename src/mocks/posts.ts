import type { Post } from '@/types/post'
import { mockUsers, getRandomUser } from './users'

export const mockPosts: Post[] = Array.from({ length: 30 }, (_, index) => {
  const user = index < 5 ? mockUsers[index] : getRandomUser()
  const postId = `post-${index + 1}`
  const createdAt = Date.now() - index * 3600000

  return {
    id: postId,
    user,
    imageUrl: `https://picsum.photos/600/600?random=${index + 1}`,
    caption: getCaptionForIndex(index),
    createdAt,
    likes: Math.floor(Math.random() * 10000),
    isLiked: false,
    comments: [],
    commentsCount: Math.floor(Math.random() * 100),
  }
})

function getCaptionForIndex(index: number): string {
  const captions = [
    'Beautiful sunset at the beach 🌅',
    'Amazing food from local restaurant 🍕',
    'New tech gadget review! Check it out 📱',
    'Morning workout complete 💪 #fitness',
    'Exploring new places ✈️ #travel',
    'Weekend vibes 🌴',
    'Coffee and code ☕️ #developer',
    'Nature is beautiful 🌿',
    'City lights at night 🌃',
    'Healthy breakfast bowl 🥗',
    'Mountain hiking adventure ⛰️',
    'Beach day with friends 🏖️',
    'Sunset photography 📸',
    'Delicious homemade pasta 🍝',
    'Morning run done ✅',
    'New camera test 📷',
    'Cozy reading corner 📚',
    'Fresh smoothie bowl 🥤',
    'Urban exploration 🏙️',
    'Yoga session complete 🧘',
  ]

  return captions[index % captions.length]
}
