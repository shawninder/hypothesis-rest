/**
 * @see addGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/post
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
 * @param groupId ID of the group to which to add a new member
 * @param userId ID of the user to add to the group as a new member
 * @see addGroupMember: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}~1members~1\{user\}/post
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function addGroupMember (connectionOptions: Options, groupId: Group['id'], userId: User['userid']): Promise<boolean> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)
  const validUserId = z.string().parse(userId)

  await hypothesisFetch(validOptions, `groups/${validGroupId}/members/${validUserId}`)
  return true
}
