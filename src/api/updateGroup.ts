/**
 * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
 *
 * @module
 */
import z from 'zod'
import type { Group } from '../Group'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

import { type NewGroup, newGroupSchema } from './createGroup'

/**
 * @group Zod Schema
 * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
 * @see group-update: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group-update.yaml
 */
export const updatedGroupSchema = newGroupSchema.extend({
  name: z.string().optional()
})

/**
 * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
 * @see group-update: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group-update.yaml
 */
export type UpdatedGroup = z.infer<typeof updatedGroupSchema>
/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param groupId ID of the group to update
 * @param updatedGroup Updated group
 * @see updateGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/patch
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function updateGroup (
  connectionOptions: Options,
  groupId: Group['id'],
  updatedGroup: UpdatedGroup
): Promise<Group> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)
  const validUpdatedGroup = updatedGroupSchema.parse(updatedGroup)

  return await hypothesisFetch(
    validOptions,
    `groups/${validGroupId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(validUpdatedGroup)
    }
  ) as Group
}