/**
 * @see showAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}~1hide/delete
 *
 * @module
 */
import z from 'zod'
import type { Annotation } from '../Annotation'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param annotationId ID of the annotation to show
 * @see showAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}~1hide/delete
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function showAnnotation (
  connectionOptions: Options,
  annotationId: Annotation['id']
): Promise<boolean> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validAnnotationId = z.string().parse(annotationId)

  await hypothesisFetch(
    validOptions,
    `annotations/${validAnnotationId}/hide`,
    {
      method: 'DELETE'
    }
  )
  return true
}