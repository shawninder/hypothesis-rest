/**
 * @see groups: https://h.readthedocs.io/en/latest/api-reference/#tag/groups
 *
 * @module
 */
import z from 'zod'

/**
 * @group Zod Schemas
 * @see group: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group.yaml
 * @see `Group`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L234
 * @see `Organization`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L222
 * @see `GroupScopes`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L229
 */
export const groupSchema = z.object({
  id: z.string(),
  groupid: z.string().or(z.null()),
  name: z.string(),
  links: z.object({
    html: z.string().optional()
  }).strict(),
  organization: z.null()
    .or(z.string())
    .or(z.object({
      id: z.string(),
      default: z.boolean().optional(),
      logo: z.string(),
      name: z.string()
    }).strict()),
  public: z.boolean(),
  scopes: z.object({
    enforced: z.boolean(),
    uri_patterns: z.array(z.string())
  }).optional().or(z.null()),
  scoped: z.boolean(),
  type: z.enum(['private', 'open', 'restricted'])
}).strict()
/**
 * @see group: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/group.yaml
 */
export type Group = z.infer<typeof groupSchema>
