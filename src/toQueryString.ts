/**
 *
 * @param query object to convert to query string, e.g. `{ key: 'val' }`
 * @returns the query string, e.g. `key=val`
 */
export default function toQueryString (query: any) {
  const qs = new URLSearchParams()

  for (const [key, val] of Object.entries(query)) {
    if (typeof val === 'string') {
      qs.append(key, val)
    } else if (typeof val === 'number') {
      qs.append(key, val.toString())
    } else if (typeof val === 'boolean') {
      qs.append(key, val ? 'true' : 'false')
    } else if (Array.isArray(val)) {
      val.forEach((v) => {
        qs.append(key, v)
      })
    } else {
      throw new Error('Unexpected type')
    }
  }
  return qs.toString()
}
