/**
 * @see createUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users/post
 *
 * @module
 */
import z from 'zod'
import type { User } from '../User'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @group Zod Schema
 * @see createUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users/post
 * @see user-new: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user-new.yaml
 */
export const newUserSchema = z.object({

}).strict()
/**
 * @see createUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users/post
 * @see user-new: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user-new.yaml
 */
export type NewUser = z.infer<typeof newUserSchema>

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param newUser User to be created
 * @see createUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users/post
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function createGroup (
  connectionOptions: Options,
  newUser: NewUser
): Promise<User> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validNewUser = newUserSchema.parse(newUser)

  return await hypothesisFetch(
    validOptions,
    'users',
    {
      method: 'POST',
      body: JSON.stringify(validNewUser)
    }
  ) as User
}