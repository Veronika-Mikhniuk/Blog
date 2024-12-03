import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { Title } from '../src/components/Title'

test('Test component Title', () => {
    const titleContent = 'Test title'

    render(<Title>{titleContent}</Title>)

    const titleElement = screen.getByText(titleContent)

    console.log(titleElement)

    expect(titleElement).toBeInTheDocument()
})