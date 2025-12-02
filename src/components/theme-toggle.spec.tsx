import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './theme-toggle'

describe('ThemeToggle', () => {
  it('should render toggle button', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /alternar tema/i })
    expect(button).toBeInTheDocument()
  })

  it('should toggle theme when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: /alternar tema/i })

    await user.click(button)

    expect(button).toBeInTheDocument()
  })
})
