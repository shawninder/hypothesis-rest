/**
 * @see fetchGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/get
 *
 * @module
 */
import z from 'zod'
import { Group } from '../Group'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'
import toQueryString from '../toQueryString'

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param groupId ID of the group to be fetched
 * @param expand One or more relations to expand for a group resource, e.g. `["organization","scopes"]`
 * @see fetchGroup: https://h.readthedocs.io/en/latest/api-reference/#tag/groups/paths/~1groups~1\{id\}/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchGroup (connectionOptions: Options, groupId: Group['id'], expand?: string[]): Promise<Group> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validGroupId = z.string().parse(groupId)
  const validExpand = z.array(z.string()).optional().parse(expand)

  return await hypothesisFetch(validOptions, `groups/${validGroupId}?${validExpand ? toQueryString({ expand: validExpand }) : ''}`) as Group
}
