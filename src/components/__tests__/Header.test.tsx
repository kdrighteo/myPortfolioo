import { render, screen } from '@testing-library/react'
import Header from '../Header'

// Mock the SearchBar component
jest.mock('../SearchBar', () => {
  return () => <div data-testid="search-bar-mock">Search Bar</div>
})

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn()
  }),
  useSearchParams: () => new URLSearchParams()
}))

describe('Header Component', () => {
  it('renders the header with navigation links', () => {
    render(<Header />)
    
    // Check if the logo/name is present
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument()
    
    // Check if navigation links are present
    // Test the first instance of each link which should be the desktop navigation
    const projectsLink = screen.getAllByRole('link', { name: /Projects/i })[0]
    const blogLink = screen.getAllByRole('link', { name: /Blog/i })[0]
    const aboutLink = screen.getAllByRole('link', { name: /About/i })[0]
    const careerLink = screen.getAllByRole('link', { name: /Career/i })[0]
    
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/projects')
    
    expect(blogLink).toBeInTheDocument()
    expect(blogLink).toHaveAttribute('href', '/blog')
    
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink).toHaveAttribute('href', '/about')
    
    expect(careerLink).toBeInTheDocument()
    expect(careerLink).toHaveAttribute('href', '/career')

    // Check if search bar mock is present
    expect(screen.getByTestId('search-bar-mock')).toBeInTheDocument()
  })
})
