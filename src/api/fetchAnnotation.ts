/**
 * @see fetchAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/get
 *
 * @module
 */
import z from 'zod'
import type { Annotation } from '../Annotation'

import hypothesisFetch, { type Options, optionsSchema } from '../hypothesis-fetch'

/**
 * @param connectionOptions.apiUrl Target annotation database API URL
 * @param connectionOptions.headers Headers responsible for authenticating the request and the Hypothes.is Accept header
 * @param annotationId ID of the annotation to be fetched
 * @see fetchAnnotation: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations/paths/~1annotations~1\{id\}/get
 * @throws {@link hypothesisFetch.ApiError}
 */
export default async function fetchAnnotation (
  connectionOptions: Options,
  annotationId: Annotation['id']
): Promise<Annotation> {
  const validOptions = optionsSchema.parse(connectionOptions)
  const validAnnotationId = z.string().parse(annotationId)

  return await hypothesisFetch(
    validOptions,
    `annotations/${validAnnotationId}`
  ) as Annotation
}
