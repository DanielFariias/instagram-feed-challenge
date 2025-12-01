import type { User } from '@/types/user'

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'photographylife',
    fullName: 'Photography Life',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isVerified: true,
  },
  {
    id: '2',
    username: 'travelblogger',
    fullName: 'Travel Stories',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isVerified: true,
  },
  {
    id: '3',
    username: 'foodie_adventures',
    fullName: 'Foodie Adventures',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isVerified: false,
  },
  {
    id: '4',
    username: 'tech_review',
    fullName: 'Tech Reviews',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isVerified: true,
  },
  {
    id: '5',
    username: 'fitness_journey',
    fullName: 'Fitness & Health',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isVerified: false,
  },
]

export function getRandomUser(): User {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)]
}
