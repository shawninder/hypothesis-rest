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
  parameters: any[],
  testUnauthenticated: boolean,
  testApiKey: boolean,
  testAuthClient: boolean,
  testAuthClientForwardedUser: boolean
) {
  const responses = {
    clientless: {
      unauthenticated: null,
      apiKey: null,
      authClient: null,
      authClientForwardedUser: null
    },
    usingClient: {
      unauthenticated: null,
      apiKey: null,
      authClient: null,
      authClientForwardedUser: null
    }
  }
  describe(clientPath, () => {
    describe('clientless', () => {
      testUnauthenticated && test('Unauthenticated', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, unauthenticatedConnectionOptions, ...parameters))
        expect(validReturnValue)
        responses.clientless.unauthenticated = validReturnValue
      })
      testApiKey && test('API Key', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, apiKeyConnectionOptions, ...parameters))
        expect(validReturnValue)
        responses.clientless.apiKey = validReturnValue
      })
      testAuthClient && test.skip('Auth Client', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, authClientConnectionOptions, ...parameters))
        expect(validReturnValue)
        responses.clientless.authClient = validReturnValue
      })
      testAuthClientForwardedUser && test.skip('Auth Client Forwarded User', async () => {
        const validReturnValue = returnSchema.parse(await clientlessFunction.call(clientlessFunction, authClientForwardedUserConnectionOptions, ...parameters))
        expect(validReturnValue)
        responses.clientless.authClientForwardedUser = validReturnValue
      })
    })

    describe('using client', () => {
      testUnauthenticated && test('Unauthenticated', async () => {
        const client = Client()
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...parameters))
        expect(validReturnValue)
        responses.usingClient.unauthenticated = validReturnValue
      })
      testApiKey && test('API Key', async () => {
        const client = Client({ apiKey: YOUR_API_KEY })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...parameters))
        expect(validReturnValue)
        responses.usingClient.apiKey = validReturnValue
      })
      testAuthClient && test.skip('Auth Client', async () => {
        const client = Client({ authClient: AUTH_CLIENT_TOKEN })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...parameters))
        expect(validReturnValue)
        responses.usingClient.authClient = validReturnValue
      })
      testAuthClientForwardedUser && test.skip('Auth Client Forwarded User', async () => {
        const client = Client({ authClientForwardedUser: AUTH_CLIENT_FORWARDED_USER_TOKEN })
        const validReturnValue = returnSchema.parse(await get(client, clientPath)(...parameters))
        expect(validReturnValue)
        responses.usingClient.authClientForwardedUser = validReturnValue
      })
    })
  })

  return responses
}