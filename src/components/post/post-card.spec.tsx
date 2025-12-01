import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { PostCard } from './post-card'
import type { Post } from '@/types/post'
import userEvent from '@testing-library/user-event'

const mockPost: Post = {
  id: '1',
  user: {
    id: '1',
    username: 'testuser',
    fullName: 'Test User',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isVerified: true,
  },
  imageUrl: 'https://picsum.photos/600/600',
  caption: 'Test caption',
  createdAt: Date.now() - 3600000, // 1 hora atrás
  likes: 100,
  isLiked: false,
  comments: [],
  commentsCount: 5,
}

describe('PostCard', () => {
  it('should render post information correctly', () => {
    render(<PostCard post={mockPost} />)

    // Username aparece 2 vezes (header e caption), então usa getAllByText
    const usernames = screen.getAllByText('testuser')
    expect(usernames).toHaveLength(2)

    expect(screen.getByText('Test caption')).toBeInTheDocument()
    expect(screen.getByText(/100 curtida/)).toBeInTheDocument()
    expect(screen.getByText(/Ver todos os 5 comentários/)).toBeInTheDocument()
  })

  it('should show verified badge for verified users', () => {
    render(<PostCard post={mockPost} />)

    // Verifica se o SVG do badge verificado existe
    const verifiedBadge = document.querySelector('.text-blue-500')
    expect(verifiedBadge).toBeInTheDocument()
  })

  it('should call onLike when like button is clicked', async () => {
    const onLike = vi.fn()
    const user = userEvent.setup()
    render(<PostCard post={mockPost} onLike={onLike} />)

    const likeButton = screen.getAllByRole('button')[0]
    await user.click(likeButton)

    expect(onLike).toHaveBeenCalledWith('1')
  })

  it('should call onComment when comment button is clicked', async () => {
    const onComment = vi.fn()
    const user = userEvent.setup()
    render(<PostCard post={mockPost} onComment={onComment} />)

    const commentButton = screen.getAllByRole('button')[1]
    await user.click(commentButton)

    expect(onComment).toHaveBeenCalledWith('1')
  })

  it('should show liked state correctly', () => {
    const likedPost = { ...mockPost, isLiked: true }
    render(<PostCard post={likedPost} />)

    // Verifica se o ícone de coração está preenchido (classe fill-red-500)
    const heartIcon = screen.getAllByRole('button')[0].querySelector('svg')
    expect(heartIcon).toHaveClass('fill-red-500')
  })
})
