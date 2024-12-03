import { describe, expect, test } from '@jest/globals'
import { buildSchemePagination } from '../src/utils/buildSchemePagination'

describe('BuildSchemePagination function', () => {
    test('should accept parameter "currentPage" as number or string', () => {
        const result1 = buildSchemePagination('1', 10)
        expect(result1).toEqual([1, 2, "...", 10])

        const result2 = buildSchemePagination(1, 10)
        expect(result2).toEqual([1, 2, "...", 10])
    })
    test('should returm array', () => {
        const result = buildSchemePagination(1, 20)
        expect(result instanceof Array).toBe(true)
    })
    test('should returm array with either number or "..."', () => {
        const result = buildSchemePagination(1, 20)
        expect(result.every(item => typeof (item) === 'number' | item === '...')).toBeTruthy()
    })
    test('... should only appear between numbers with gap > 1', () => {
        const result = buildSchemePagination(1, 20)
        result.forEach((item, index) => {
            if (item === '...') {
                const prevNum = result[index - 1]
                const nextNum = result[index + 1]
                expect(nextNum - prevNum).toBeGreaterThan(1)
            }
        })
    })
    test('should not exceed maximum possible length', () => {
        const result = buildSchemePagination(5, 10)
        expect(result.length).toBeLessThanOrEqual(7)
    })
    test('should have minimum required length', () => {
        const result = buildSchemePagination(5, 10)
        expect(result.length).toBeGreaterThanOrEqual(3)
    })
    test('should have minimum required length', () => {
        const result = buildSchemePagination(5, 10)
        expect(result.length).toBeGreaterThanOrEqual(3)
    })
    test('array should not contain duplicates', () => {
        const result = buildSchemePagination('3', 5)
        const uniqueItems = new Set(result)
        expect(result.length).toBe(uniqueItems.size)
    })
    test('should not have ... after first page or before last page', () => {
        const result1 = buildSchemePagination('1', 5)
        expect(result1[0]).toBe(1)
        expect(result1[1]).not.toBe('...')

        const result2 = buildSchemePagination('5', 5)
        expect(result2[result2.length - 1]).toBe(5)
        expect(result2[result2.length - 2]).not.toBe('...')
    })
    test('should not return ... when small page count', () => {
        const result = buildSchemePagination('2', 3)
        expect(result).toEqual([1, 2, 3])
        expect(result).not.toContain('...')
    })
})
