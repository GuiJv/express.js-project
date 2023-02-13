import { isEmpty } from '../utils/utils.js'
import { describe, expect, test } from '@jest/globals'

describe('isEmpty', () => {
  test('returns true if empty', () => {
    expect(isEmpty('')).toBe(true)
  })
  test('returns false if filled', () => {
    expect(isEmpty('Arnaldo')).toBe(false)
  })
})
