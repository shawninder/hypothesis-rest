/**
 * @see annotations: https://h.readthedocs.io/en/latest/api-reference/#tag/annotations
 *
 * @module
 */
import { z } from "zod"

/**
 * @group Zod Schemas
 * @see fragment-selector: https://www.w3.org/TR/annotation-model/#fragment-selector
 */
export const fragmentSelectorSchema = z.object({
  type: z.literal('FragmentSelector'),
  value: z.string(),
  conformsTo: z.string()
})
/**
 * @see FragmentSelector: https://www.w3.org/TR/annotation-model/#fragment-selector
 */
export type FragmentSelector = z.infer<typeof fragmentSelectorSchema>

/**
 * @group Zod Schemas
 * @see CssSelector: https://www.w3.org/TR/annotation-model/#css-selector
 */
export const cssSelectorSchema = z.object({
  type: z.literal('CssSelector'),
  value: z.string()
})
/**
 * @see CssSelector: https://www.w3.org/TR/annotation-model/#css-selector
 */
export type CssSelector = z.infer<typeof cssSelectorSchema>

/**
 * @group Zod Schemas
 * @see XPathSelector: https://www.w3.org/TR/annotation-model/#xpath-selector
 */
export const xPathSelectorSchema = z.object({
  type: z.literal('XPathSelector'),
  value: z.string()
})
/**
 * @see XPathSelector: https://www.w3.org/TR/annotation-model/#xpath-selector
 */
export type XPathSelector = z.infer<typeof xPathSelectorSchema>

/**
 * @group Zod Schemas
 * @see TextQuoteSelector: https://www.w3.org/TR/annotation-model/#text-quote-selector
 * @see `TextQuoteSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L44
 */
export const textQuoteSelectorSchema = z.object({
  type: z.literal('TextQuoteSelector'),
  exact: z.string(),
  prefix: z.string().optional(),
  suffix: z.string().optional()
}).strict()
/**
 * @see TextQuoteSelector: https://www.w3.org/TR/annotation-model/#text-quote-selector
 * @see `TextQuoteSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L44
 */
export type TextQuoteSelector = z.infer<typeof textQuoteSelectorSchema>

/**
 * @group Zod Schemas
 * @see TextPositionSelector: https://www.w3.org/TR/annotation-model/#text-position-selector
 * @see `TextPositionSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L55
 */
export const textPositionSelectorSchema = z.object({
  type: z.literal('TextPositionSelector'),
  start: z.number(),
  end: z.number()
}).strict()
/**
 * @see TextPositionSelector: https://www.w3.org/TR/annotation-model/#text-position-selector
 * @see `TextPositionSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L55
 */
export type TextPositionSelector = z.infer<typeof textPositionSelectorSchema>

/**
 * @group Zod Schemas
 * @see DataPositionSelector: https://www.w3.org/TR/annotation-model/#data-position-selector
 */
export const dataPositionSelectorSchema = z.object({
  type: z.literal('DataPositionSelector'),
  start: z.number(),
  end: z.number()
}).strict()
/**
 * @see DataPositionSelector: https://www.w3.org/TR/annotation-model/#data-position-selector
 */
export type DataPositionSelector = z.infer<typeof dataPositionSelectorSchema>

/**
 * @group Zod Schemas
 * @see SvgSelector: https://www.w3.org/TR/annotation-model/#svg-selector
 */
export const svgSelectorSchema = z.object({
  type: z.literal('SvgSelector'),
  value: z.string()
}).strict()
/**
 * @see SvgSelector: https://www.w3.org/TR/annotation-model/#svg-selector
 */
export type SvgSelector = z.infer<typeof svgSelectorSchema>

/**
 * @group Zod Schemas
 * @see RangeSelector: https://www.w3.org/TR/annotation-model/#range-selector
 * @see `RangeSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L64
 */
export const rangeSelectorSchema = z.object({
  type: z.literal('RangeSelector'),
  startContainer: z.string(),
  endContainer: z.string(),
  startOffset: z.number(),
  endOffset: z.number()
}).strict()
/**
 * @see RangeSelector: https://www.w3.org/TR/annotation-model/#range-selector
 * @see `RangeSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L64
 */
export type RangeSelector = z.infer<typeof rangeSelectorSchema>

/**
 * @group Zod Schemas
 * @see `EPUBContentSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L76
 */
export const epubContentSelectorSchema = z.object({
  type: z.literal('EPUBContentSelector'),
  url: z.string(),
  cfi: z.string().optional(),
  title: z.string().optional()
}).strict()
/**
 * @see `EPUBContentSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L76
 */
export type EPUBContentSelector = z.infer<typeof epubContentSelectorSchema>

/**
 * @group Zod Schemas
 * @see `PageSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L107
 */
export const pageSelectorSchema = z.object({
  type: z.literal('PageSelector'),
  index: z.number(),
  label: z.string().optional()
}).strict()
/**
 * @see `PageSelector`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L107
 */
export type PageSelector = z.infer<typeof pageSelectorSchema>

/**
 * @group Zod Schemas
 * @see description: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation.yaml#L63
 * @see selectors: https://www.w3.org/TR/annotation-model/#selectors
 */
export const selectorSchema = fragmentSelectorSchema
  .or(cssSelectorSchema)
  .or(xPathSelectorSchema)
  .or(textQuoteSelectorSchema)
  .or(textPositionSelectorSchema)
  .or(dataPositionSelectorSchema)
  .or(svgSelectorSchema)
  .or(rangeSelectorSchema)
  .or(epubContentSelectorSchema)
  .or(pageSelectorSchema)
/**
 * @see description: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation.yaml#L63
 * @see selectors: https://www.w3.org/TR/annotation-model/#selectors
 */
export type Selector = z.infer<typeof selectorSchema>

/**
 * @group Zod Schemas
 * @see annotation.yaml: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation.yaml
 * @see `Annotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L147
 * @see `SavedAnnotation`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L211
 * @see `target`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L136
 * @see `user_info`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L143
 */
export const annotationSchema = z.object({
  consumer: z.string().optional(),
  id: z.string(),
  document: z.object({
    title: z.array(z.string())
  }).strict(),
  uri: z.string(),
  created: z.string(),
  updated: z.string(),
  user: z.string(),
  text: z.string(),
  tags: z.array(z.string()),
  group: z.string(),
  permissions: z.any(),
  target: z.array(z.object({
    source: z.string().optional(),
    selector: z.array(selectorSchema).optional()
  }).strict()),
  links: z.any(),
  hidden: z.boolean(),
  flagged: z.boolean(),
  references: z.array(z.string()).optional(),
  user_info: z
    .object({
      display_name: z.string().or(z.null())
    }).strict().optional()
}).strict()
/**
 * @see annotation.yaml: https://github.com/shawninder/h/blob/main/docs/_extra/api-reference/schemas/annotation.yaml
 * @see `target`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L136
 * @see `user_info`: https://github.com/hypothesis/client/blob/main/src/types/api.ts#L143
 */
export type Annotation = z.infer<typeof annotationSchema>
