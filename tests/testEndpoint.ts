import { describe, test, expect } from 'vitest'
import get from 'lodash.get'
import type { ZodSchema } from 'zod'

import {
  apiKeyConnectionOptions,
  authClientConnectionOptions,
  authClientForwardedUserConnectionOptions,
  AUTH_CLIENT_FORWARDED_USER_TOKEN,
  AUTH_CLIENT_TOKEN,
  unauthenticatedConnectionOptions,
  YOUR_API_KEY
} from '../examples/fixtures'
import Client from '../src/HypothesisRest'

export default function testEndpoint (
  clientlessFunction: Function,
  clientPath: string,
  returnSchema: ZodSchema,
  parameters: any[] | Record<string, any[]>,
  testUnauthenticated: boolean,
  testApiKey: boolean,
  testAuthClient: boolean,
  testAuthClientForwardedUser: boolean
) {
  if (!Array.isArray(parameters)) {

  }
  describe(clientPath, async () => {
    describe('clientless', async () => {
      const params = Array.isArray(parameters) ? parameters : parameters.clientless
      testUnauthenticated && test('Unauthenticated', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, unauthenticatedConnectionOptions, ...params))
        expect(validReturnValue)
      })
      testApiKey && test('API Key', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, apiKeyConnectionOptions, ...params))
        expect(validReturnValue)
      })
      testAuthClient && test.skip('Auth Client', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, authClientConnectionOptions, ...params))
        expect(validReturnValue)
      })
      testAuthClientForwardedUser && test.skip('Auth Client Forwarded User', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, authClientForwardedUserConnectionOptions, ...params))
        expect(validReturnValue)
      })
    })

    describe('using client', async () => {
      const params = Array.isArray(parameters) ? parameters : parameters.usingClient
      testUnauthenticated && test('Unauthenticated', async () => {
        const client = Client()
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...params))
        expect(validReturnValue)
      })
      testApiKey && test('API Key', async () => {
        const client = Client({ apiKey: YOUR_API_KEY })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...params))
        expect(validReturnValue)
      })
      testAuthClient && test.skip('Auth Client', async () => {
        const client = Client({ authClient: AUTH_CLIENT_TOKEN })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...params))
        expect(validReturnValue)
      })
      testAuthClientForwardedUser && test.skip('Auth Client Forwarded User', async () => {
        const client = Client({ authClientForwardedUser: AUTH_CLIENT_FORWARDED_USER_TOKEN })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...params))
        expect(validReturnValue)
      })
    })
  })
}
