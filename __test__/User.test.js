import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { User } from '../src/components/User'

describe('User component', () => {
    test('should be rendered and return correct data', () => {
        render(
            <MemoryRouter> // Need to be because test don't have BrowserRouter
                <User username='John_Smith' />
            </MemoryRouter>
        )
        const username = screen.getByText('John_Smith')
        const initials = screen.getByText('JS')
        expect(username).toBeInTheDocument()
        expect(initials).toBeInTheDocument()
    })
    test('should return defaul data if propse wasn\'t sent', () => {
        render(
            <MemoryRouter>
                <User />
            </MemoryRouter>
        )
        const username = screen.getByText('User')
        const initials = screen.getByText('U')
        expect(username).toBeInTheDocument()
        expect(initials).toBeInTheDocument()
    })
    test('should have correct link to profile ', () => {
        render(
            <MemoryRouter>
                <User username='John_Smith' />
            </MemoryRouter>
        )
        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/profile')
    })
})