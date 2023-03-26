/**
 * @see profile: https://h.readthedocs.io/en/latest/api-reference/#tag/profile
 *
 * @module
 */
import z from 'zod'

/**
 * @group Zod Schemas
 * @see Profile: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/profile.yaml
 * @see `Profile`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L213
 */
export const profileSchema = z.object({
  authority: z.string(),
  features: z.record(z.string(), z.boolean()),
  preferences: z.record(z.string(), z.boolean()),
  userid: z.string().or(z.null()),
  groups: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().optional(),
    public: z.boolean()
  }).strict()),
  user_info: z.object({
    display_name: z.string().or(z.null())
  }).strict().optional()
}).strict()
/**
 * @see Profile: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/profile.yaml
 * @see `Profile`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L213
 * @see `user_info`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L143
 */
export type Profile = z.infer<typeof profileSchema>
