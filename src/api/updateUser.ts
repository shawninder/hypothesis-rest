/**
 * @see updateUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{username\}/patch
 *
 * @module
 */
import z from 'zod'
import type { User } from '../User'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @group Zod Schemas
 * @see user-update: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user-update.yaml
 */
export const updatedUserSchema = z.object({
  email: z.string().optional(),
  display_name: z.string().or(z.null()).optional()
}).strict()
/**
 * @see user-update: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user-update.yaml
 */
export type UpdatedUser = z.infer<typeof updatedUserSchema>

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param username username of the user to update
 * @param updatedUser Updated user
 * @see updateUser: https://h.readthedocs.io/en/latest/api-reference/#tag/users/paths/~1users~1\{username\}/patch
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function updateUser (
  connectionOptions: Options,
  username: User['username'],
  updatedUser: UpdatedUser
): Promise<User> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validUserId = z.string().parse(username)
  const validUpdatedUser = updatedUserSchema.parse(updatedUser)

  return await hypothesisFetch(
    validOptions,
    `users/${validUserId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(validUpdatedUser)
    }
  ) as User
}