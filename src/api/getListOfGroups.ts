/**
 * @see getListOfGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/get
 *
 * @module
 */
import z from 'zod'
import { Group } from '../Group'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'
import toQueryString from '../toQueryString'

/**
 * @group Zod Schemas
 */
const groupQuerySchema = z.object({
  authority: z.string().optional(),
  document_uri: z.string().optional(),
  expand: z.array(z.string()).optional()
}).strict()
export type GroupQuery = z.infer<typeof groupQuerySchema>

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @see getListOfGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function getListOfGroups (connectionOptions: Options, query?: GroupQuery): Promise<Group[]> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const queryString = query ? `?${toQueryString(groupQuerySchema.parse(query))}` : ''

  return await hypothesisFetch(validOptions, `groups${queryString}`) as Group[]
}
