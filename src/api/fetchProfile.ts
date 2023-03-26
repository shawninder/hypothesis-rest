/**
 * @see fetchProfile: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile/get
 *
 * @module
 */
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'
import type { Profile } from '../Profile'
/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @see fetchProfile: https://h.readthedocs.io/en/latest/api-reference/#tag/profile/paths/~1profile/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchProfile (connectionOptions: Options): Promise<Profile> {
  const validOptions = optionsSchema.parse(connectionOptions)

  return await hypothesisFetch(validOptions, 'profile') as Profile
}
