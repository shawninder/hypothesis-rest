/**
 * @see users: https://h.readthedocs.io/en/latest/api-reference/#tag/users
 *
 * @module
 */
import z from 'zod'

/**
 * @group Zod Schemas
 * @see user: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user.yaml
 */
export const userSchema = z.object({
  authority: z.string(),
  username: z.string(),
  email: z.string(),
  display_name: z.string().or(z.null()).optional(),
  identities: z.array(
    z.object({
      provider: z.string(),
      provider_unique_id: z.string()
    }).strict()
  ).optional(),
  userid: z.string()
}).strict()
/**
 * @see user: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/user.yaml
 */
export type User = z.infer<typeof userSchema>
