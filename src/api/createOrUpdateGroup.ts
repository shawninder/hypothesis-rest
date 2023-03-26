/**
 * @see createOrUpdateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/put
 *
 * @module
 */
import z from 'zod'
import type { Group } from '../Group'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

import { type NewGroup, newGroupSchema } from './createGroup'

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param groupId ID of the group to update
 * @param newOrUpdatedGroup New or updated group
 * @see createOrUpdateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/put
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function createOrUpdateGroup (
  connectionOptions: Options,
  groupId: Group['id'],
  newOrUpdatedGroup: NewGroup
): Promise<Group> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)
  const validUpdatedGroup = newGroupSchema.parse(newOrUpdatedGroup)

  return await hypothesisFetch(
    validOptions,
    `groups/${validGroupId}`,
    {
      method: 'PUT',
      body: JSON.stringify(validUpdatedGroup)
    }
  ) as Group
}