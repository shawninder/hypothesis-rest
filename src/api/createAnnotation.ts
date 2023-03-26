/**
 * @see createAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations/post
 *
 * @module
 */
import z from 'zod'
import type { Annotation } from '../Annotation'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @group Zod Schema
 * @see createAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations/
 * @see annotation-create: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation-create.yaml
 * @see `Annotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L147
 * @see `SavedAnnotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L211
 */
export const newAnnotationSchema = z.object({
  uri: z.string(),
  document: z.object({
    title: z.array(z.string()).optional(),
    dc: z.object({
      identifier: z.array(z.string()).optional()
    }).strict().optional(),
    highwire: z.object({
      doi: z.array(z.string()).optional(),
      pdf_url: z.array(z.string()).optional()
    }).strict().optional(),
    link: z.array(
      z.object({
        href: z.string(),
        type: z.string().optional()
      }).strict()
    ).optional()
  }).strict().optional(),
  text: z.string().optional(),
  tags: z.array(z.string()).optional(),
  group: z.string().optional(),
  permissions: z.any().optional(),
  target: z.object({
    selector: z.array(
      z.object({
        type: z.string()
      })
    )
  }).strict().optional(),
  references: z.array(z.string()).optional()
}).strict()

/**
 * @see createAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations/
 * @see annotation-create: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation-create.yaml
 */
export type NewAnnotation = z.infer<typeof newAnnotationSchema>

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param newAnnotation Annotation to be created
 * @see createAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations/post
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function createAnnotation (
  connectionOptions: Options,
  newAnnotation: NewAnnotation
): Promise<Annotation> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validNewAnnotation = newAnnotationSchema.parse(newAnnotation)

  return await hypothesisFetch(
    validOptions,
    'annotations',
    {
      method: 'POST',
      body: JSON.stringify(validNewAnnotation)
    }
  ) as Annotation
}