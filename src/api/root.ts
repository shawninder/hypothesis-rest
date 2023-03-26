/**
 * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
 *
 * @module
 */
import { z } from 'zod'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @group Zod Schemas
 * @see `RouteMetadata`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L13
 */
export const routeMetadataSchema = z.object({
  method: z.union([
    z.literal('GET'),
    z.literal('POST'),
    z.literal('PUT'),
    z.literal('PATCH'),
    z.literal('DELETE')
  ]),
  url: z.string(),
  desc: z.string().or(z.null())
}).strict()
/**
 * @see `RouteMetadata`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L13
 */
export type RouteMetadata = z.infer<typeof routeMetadataSchema>

/**
 * @group Zod Schemas
 * @see `IndexResponse`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L28
 */
export const indexResponseSchema = z.object({
  links: z.object({
    annotation: z.object({
      create: routeMetadataSchema,
      delete: routeMetadataSchema,
      read: routeMetadataSchema,
      update: routeMetadataSchema,
      flag: routeMetadataSchema,
      hide: routeMetadataSchema,
      unhide: routeMetadataSchema
    }).strict(),
    search: routeMetadataSchema,
    bulk: z.object({
      action: routeMetadataSchema,
      annotation: routeMetadataSchema
    }).strict(),
    group: z.object({
      member: z.object({
        add: routeMetadataSchema,
        delete: routeMetadataSchema
      }).strict(),
      create: routeMetadataSchema,
      read: routeMetadataSchema,
      members: z.object({
        read: routeMetadataSchema
      }).strict(),
      update: routeMetadataSchema,
      create_or_update: routeMetadataSchema
    }).strict(),
    groups: z.object({
      read: routeMetadataSchema
    }).strict(),
    index: routeMetadataSchema.optional(),
    links: routeMetadataSchema,
    profile: z.object({
      read: routeMetadataSchema,
      groups: z.object({
        read: routeMetadataSchema
      }).strict(),
      update: routeMetadataSchema
    }).strict(),
    user: z.object({
      create: routeMetadataSchema,
      read: routeMetadataSchema,
      update: routeMetadataSchema
    }).strict()
  }).strict()
}).strict()
/**
 * @see `IndexResponse`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L28
 */
export type IndexResponse = z.infer<typeof indexResponseSchema>

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @see root: https://h.readthedocs.io/en/latest/api-reference/#tag/general/paths/~1/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchRoot (
  connectionOptions: Options
): Promise<IndexResponse> {
  const validOptions = optionsSchema.parse(connectionOptions)
  return await hypothesisFetch(
    validOptions,
    ''
  ) as IndexResponse
}
