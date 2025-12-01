import { describe, it, expect } from 'vitest'
import { render, screen } from '@/tests/test-utils'
import { App } from '.'

describe('App', () => {
  it('should render the app', () => {
    render(<App />)

    expect(screen.getByText(/instagram feed challenge/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
  })
})
