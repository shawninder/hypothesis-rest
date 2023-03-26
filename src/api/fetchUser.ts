/**
 * @see fetchUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{user\}/get
 *
 * @module
 */
import z from 'zod'
import { User } from '../User'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param userId ID of the user to be fetched
 * @see fetchUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{user\}/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchUser (connectionOptions: Options, userId: User['userid']): Promise<User> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validUserId = z.string().parse(userId)

  return await hypothesisFetch(validOptions, `groups/${validUserId}`) as User
}
