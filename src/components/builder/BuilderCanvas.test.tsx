import { render, screen } from '@testing-library/react'
import BuilderCanvas from './BuilderCanvas'

describe('BuilderCanvas', () => {
  it('renders without crashing', () => {
    render(<BuilderCanvas />)
    expect(screen.getByTestId('builder-canvas')).toBeInTheDocument()
  })

  it('allows dropping components', () => {
    render(<BuilderCanvas />)
    const canvas = screen.getByTestId('builder-canvas')
    expect(canvas).toHaveAttribute('data-testid', 'builder-canvas')
  })
})
