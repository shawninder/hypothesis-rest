/**
 * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
 *
 * @module
 */
import z from 'zod'
import type { Group } from '../Group'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @group Zod Schema
 * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
 * @see group-new: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group-new.yaml
 */
export const newGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  groupid: z.string().optional()
}).strict()
/**
 * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
 * @see group-new: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group-new.yaml
 */
export type NewGroup = z.infer<typeof newGroupSchema>

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param newGroup Group to be created
 * @see createGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups/post
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function createGroup (
  connectionOptions: Options,
  newGroup: NewGroup
): Promise<Group> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validNewGroup = newGroupSchema.parse(newGroup)

  return await hypothesisFetch(
    validOptions,
    'groups',
    {
      method: 'POST',
      body: JSON.stringify(validNewGroup)
    }
  ) as Group
}