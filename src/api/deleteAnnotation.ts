/**
 * @see deleteAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/delete
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
 * @param annotationId ID of the annotation to delete
 * @see deleteAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/delete
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function deleteAnnotation (
  connectionOptions: Options,
  annotationId: Annotation['id']
): Promise<Annotation['id']> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validAnnotationId = z.string().parse(annotationId)

  return (await hypothesisFetch(
    validOptions,
    `annotations/${validAnnotationId}`,
    {
      method: 'DELETE'
    }
  )).id
}