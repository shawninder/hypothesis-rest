/**
 * @see fetchUsersGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile~1groups/get
 *
 * @module
 */
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'
import type { Group } from '../Group'
/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @see fetchUsersGroups: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile~1groups/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchUsersGroups (connectionOptions: Options): Promise<Group[]> {
  const validOptions = optionsSchema.parse(connectionOptions)

  return await hypothesisFetch(validOptions, 'profile/groups') as Group[]
}
