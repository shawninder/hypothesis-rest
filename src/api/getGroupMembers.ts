/**
 * @see getGroupMembers: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members/get
 *
 * @module
 */
import z from 'zod'

import type { Group } from '../Group'
import type { User } from '../User'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param groupId ID of the group for which to get the members
 * @see getGroupMembers: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function getGroupMembers (connectionOptions: Options, groupId: Group['id']): Promise<User[]> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)

  return await hypothesisFetch(validOptions, `groups/${validGroupId}/members`) as User[]
}
