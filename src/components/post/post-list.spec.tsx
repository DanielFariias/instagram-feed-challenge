import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { PostList } from './post-list'

describe('PostList', () => {
  it('should render loading state initially', () => {
    render(<PostList />)

    const skeletons = document.querySelectorAll('[data-slot="skeleton"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render posts after loading', async () => {
    render(<PostList />)

    await waitFor(
      () => {
        const usernames = screen.getAllByText(/photographylife/i)
        expect(usernames.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })

  it('should render multiple posts', async () => {
    render(<PostList />)

    await waitFor(
      () => {
        const likeTexts = screen.getAllByText(/curtida/)
        expect(likeTexts.length).toBeGreaterThanOrEqual(3)
      },
      { timeout: 3000 }
    )
  })
})
