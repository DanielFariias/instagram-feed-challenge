import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '.'

describe('App', () => {
  it('should render the app title', () => {
    render(<App />)

    expect(screen.getByText(/instagram feed challenge/i)).toBeInTheDocument()
  })

  it('should render a button with the correct text', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /Clique aqui/i })).toBeInTheDocument()
  })
})
