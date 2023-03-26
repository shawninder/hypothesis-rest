// @vitest-environment happy-dom

import { describe, test, expect } from 'vitest'
import { indexResponseSchema } from '../src/api/root'
import Client from '../src/HypothesisRest'

describe('Works in the Browser', () => {
  test('basic smoke test', async () => {
    const client = Client()
    const root = indexResponseSchema.parse(await client.root())
    expect(root).toHaveProperty('links')
  })
})
