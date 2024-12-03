import { describe, expect, test } from '@jest/globals'
import { getInitials } from '../src/utils/getInitials'

describe('Get Initials function', () => {
    const testCases = [
        {
            name: 'name with dash',
            parameter: 'Alex-Smitt',
            expected: 'AS'
        },
        {
            name: 'name with multiple dash',
            parameter: 'Alex-Smitt-Scott',
            expected: 'ASS'
        },
        {
            name: 'names with underscore',
            parameter: 'John_Brown',
            expected: 'JB'
        },
        {
            name: 'names with multiple underscore',
            parameter: 'John_Brown_Scott',
            expected: 'JBS'
        },
        {
            name: 'camelCase name',
            parameter: 'johnBrown',
            expected: 'JB'
        },
        {
            name: 'multiple camelCase name',
            parameter: 'johnBrownScott',
            expected: 'JBS'
        },
        {
            name: 'single word',
            parameter: 'John',
            expected: 'J'
        },
        {
            name: 'single word lowerCase',
            parameter: 'john',
            expected: 'J'
        },
        {
            name: "uppercase only",
            parameter: 'JOHNSMITH',
            expected: 'J'
        },
        {
            name: "mixed separators",
            parameter: 'John-Paul_Smith',
            expected: 'JPS'
        },
        {
            name: 'empty string',
            parameter: '',
            expected: ''
        },
    ]

    testCases.forEach(testCase => {
        test(
            `Parameter as ${testCase.name}: ${testCase.parameter}, expectations: ${testCase.expected}`,
            () => {
                const result = getInitials(testCase.parameter)
                expect(result).toBe(testCase.expected)
            }
        )
    })
})