/**
 * @see removeGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/delete
 *
 * @module
 */
import z from 'zod'

import type { Group } from '../Group'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param groupId ID of the group to which to add a new member
 * @see removeGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/delete
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function removeGroupMember (connectionOptions: Options, groupId: Group['id']): Promise<boolean> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)

  await hypothesisFetch(validOptions, `groups/${validGroupId}/members/me`, { method: 'DELETE' })
  return true
}
