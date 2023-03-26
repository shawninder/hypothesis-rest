/**
 * @see updateAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/patch
 *
 * @module
 */
import z from 'zod'
import type { Annotation } from '../Annotation'
import { type NewAnnotation, newAnnotationSchema } from './createAnnotation'
import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 *
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param updatedAnnotation Annotation  with the updates
 * @see updateAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/patch
 * @see `Annotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L147
 * @see `SavedAnnotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L211
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function d (
  connectionOptions: Options,
  annotationId: Annotation['id'],
  updatedAnnotation: NewAnnotation
): Promise<Annotation> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validAnnotationId = z.string().parse(annotationId)
  const validUpdatedAnnotation = newAnnotationSchema.parse(updatedAnnotation)

  return await hypothesisFetch(
    validOptions,
    `annotations/${validAnnotationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(validUpdatedAnnotation)
    }
  ) as Annotation
}