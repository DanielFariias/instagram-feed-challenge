import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@/tests/test-utils'
import { App } from '.'

describe('App', () => {
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

    // Espera os posts carregarem
    await waitFor(
      () => {
        const posts = screen.getAllByText(/curtida/)
        expect(posts.length).toBeGreaterThan(0)
      },
      { timeout: 3000 }
    )
  })
})
