import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { App } from '.'
import { useAuth } from '@/state/auth'

describe('App', () => {
  beforeEach(() => {
    useAuth.getState().login('testuser')
  })

  afterEach(() => {
    useAuth.getState().logout()
  })

  it('should render the app header', () => {
    render(<App />)

    expect(screen.getByText(/instagram feed/i)).toBeInTheDocument()
  })

  it('should render theme toggle button', () => {
    render(<App />)

    const themeToggle = screen.getByRole('button', { name: /alternar tema/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('should render post list', async () => {
    render(<App />)

    await waitFor(
      () => {
        const posts = screen.getAllByText(/curtidas?/)
        expect(posts.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })
})
