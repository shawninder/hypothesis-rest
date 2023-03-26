/**
 * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
 *
 * @module
 */
import { z } from 'zod'
import {annotationSchema} from '../Annotation'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'
import toQueryString from '../toQueryString'

/**
 * @group Zod Schemas
 * @see `SearchQuery`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L278
 */
export const querySchema = z.object({
  sort: z.string().optional(),
  search_after: z.string().optional(),
  offset: z.number().optional(),
  order: z.string().optional(),
  uri: z.string().optional(),
  url: z.string().optional(),
  'url.parts': z.string().optional(),
  wildcard_uri: z.string().optional(),
  user: z.string().optional(),
  group: z.string().optional(),
  tag: z.string().optional(),
  tags: z.array(
    z.string()
  ).optional(),
  any: z.string().optional(),
  quote: z.string().optional(),
  references: z.string().optional(),
  text: z.string().optional(),
  limit: z.number().optional(),
  _separate_replies: z.boolean().optional()
}).strict()

export type Query = z.infer<typeof querySchema>

/**
 * @group Zod Schemas
 * @see `SearchResponse`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L295
 */
export const resultSchema = z.object({
  total: z.number(),
  rows: z.array(annotationSchema),
  replies: z.array(annotationSchema).optional()
}).strict()

export type Result = z.infer<typeof resultSchema>

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param query Search query object
 * @see search: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1search/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function search (
  connectionOptions: Options,
  query: Query
): Promise<Result> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validSearchQuery = querySchema.parse(query)

  return await hypothesisFetch(
    validOptions,
    `search?${toQueryString(validSearchQuery)}`
  ) as Result
}
