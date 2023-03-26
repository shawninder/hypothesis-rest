/**
 * This is somewhat of an internal function that helps reduce code duplication by handling aspects of the API requests common to all actions like combining client-instantiation-time configuration with client-action-function-call-time configuration into one `fetch` call as well as error handling.
 *
 * @module hypothesisFetch
 */
import { z } from 'zod'

/**
 * @group Zod Schemas
 */
export const headersSchema = z.object({
  Accept: z.literal('application/vnd.hypothesis.v1+json'),
  Host: z.string().optional(),
  'Content-Length': z.string().optional()
}).strict()
export type Headers = z.infer<typeof headersSchema>
/**
 * @group Zod Schemas
 */
export const unauthenticatedHeadersSchema = headersSchema.extend({})

export type UnauthenticatedHeaders = z.infer<typeof unauthenticatedHeadersSchema>

/**
 * @group Zod Schemas
 */
export const apiKeyHeadersSchema = headersSchema.extend({
  Authorization: z.string()
})

export type ApiKeyHeaders = z.infer<typeof apiKeyHeadersSchema>

/**
 * @group Zod Schemas
 */
export const authClientHeadersSchema = headersSchema.extend({
  Authorization: z.string()
})
export type AuthClientHeaders = z.infer<typeof authClientHeadersSchema>

/**
 * @group Zod Schemas
 */
export const authClientForwardedUserHeadersSchema = headersSchema.extend({
  "X-Forwarded-User": z.string()
})
export type AuthClientForwardedUserHeaders = z.infer<typeof authClientForwardedUserHeadersSchema>

/**
 * @group Zod Schemas
 */
export const optionsSchema = z.object({
  apiUrl: z.string(),
  headers: apiKeyHeadersSchema
    .or(authClientHeadersSchema)
    .or(authClientForwardedUserHeadersSchema)
    .or(unauthenticatedHeadersSchema)
}).strict()

export type Options = z.infer<typeof optionsSchema>

/**
 * @group Zod Schemas
 * @see Errors: https://h.readthedocs.io/en/latest/api-reference/#section/Hypothesis-API/Errors
 */
export const apiErrorSchema = z.object({
  status: z.literal("failure"),
  reason: z.string()
}).strict()
/**
 * @see Errors: https://h.readthedocs.io/en/latest/api-reference/#section/Hypothesis-API/Errors
 */
export type ApiError = z.infer<typeof apiErrorSchema>
/**
 * @group Constants
 * @see Errors: https://h.readthedocs.io/en/latest/api-reference/#section/Hypothesis-API/Errors
 */
export const STATUS_TITLES: Record<number, string> = {
  400: 'Bad Request',
  403: 'Unauthorized',
  404: 'Not Found',
  409: 'Conflict',
  406: 'Not Acceptable',
  500: 'Server Error',
}

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers The headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param endpoint Target API endpoint, e.g. `/annotations`
 * @param fetchOptions Anything `fetch` accepts as second parameter, including additional headers
 * @returns The parsed API response object (`await response.json()`)
 * @throws {@link ApiError} if unauthorized
 */
export default async function hypothesisFetch (
  connectionOptions: Options,
  endpoint: string,
  fetchOptions: Parameters<typeof fetch>[1] = {}
): Promise<ReturnType<typeof JSON.parse>> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validEndpoint = z.string().parse(endpoint)
  const { apiUrl, headers } = validOptions
  if (fetchOptions.method === 'POST', fetchOptions.method === 'PATCH') {
    if (fetchOptions.body && !validOptions.headers['Content-Length']) {
      validOptions.headers['Content-Length'] = fetchOptions.body.toString().length.toString()
    }
  }
  const response = await fetch(`${apiUrl}/${validEndpoint}`, {
    headers,
    ...fetchOptions
  })

  if (response.status !== 200 && response.status !== 204) {
    const statusPart = `${response.status} (${STATUS_TITLES[response.status] || 'Unexpected Error'})`
    try {
      const error = await response.json() as ApiError
      throw new Error(`${statusPart}: ${error.reason}`)
    } catch (jsonEx) {
      try {
        const error = await response.text()
        throw new Error(`${response.status} (${STATUS_TITLES[response.status] || 'Unexpected Error'}): ${error}.`)
      } catch (ex) {
        throw new Error(`${response.status} (${STATUS_TITLES[response.status] || 'Unexpected Error'}): ${ex}`)
      }
    }
  }

  if (response.status === 204) {
    return true
  }
  try {
    return await response.json()
  } catch (ex) {
    try {
      return await response.text()
    } catch (ex) {
      return null
    }
  }
}
