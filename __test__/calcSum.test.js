import { expect, jest, test } from '@jest/globals'
import { calcSum } from './calcSum'

test('Test function calcSum', () => {
    expect(calcSum(2, 3)).toBe(5)
    expect(calcSum(-10, 5)).toBe(-5)
    expect(calcSum(Infinity, 1)).toBe(Infinity)
    expect(calcSum(NaN, 12)).toBe(NaN)
})