// #region    connectionOptions-import
import { DEFAULT_API_URL, COMMON_HEADERS } from '../src/HypothesisRest'
// #endregion connectionOptions-import

export const YOUR_API_KEY = process.env.VITE_HYPOTHESIS_API_KEY || ''
export const AUTH_CLIENT_TOKEN = process.env.VITE_HYPOTHESIS_AUTH_CLIENT || ''
export const AUTH_CLIENT_FORWARDED_USER_TOKEN = process.env.VITE_HYPOTHESIS_AUTH_CLIENT_FORWARDED_USER || ''

export const ANNOTATION_ID = process.env.VITE_HYPOTHESIS_ANNOTATION_ID || ''
export const PUBLIC_GROUP_ID = '__world__'
export const GROUP_ID = process.env.VITE_HYPOTHESIS_GROUP_ID || ''
export const GROUP_ANNOTATION_ID = process.env.VITE_HYPOTHESIS_GROUP_ANNOTATION_ID || ''
export const USER_ID = process.env.VITE_HYPOTHESIS_USER_ID || ''

export const NEW_ANNOTATION = {
  uri: 'http://example.com',
  group: 'xjG1r82J',
  text: Math.random().toString()
}
export const NEW_GROUP = { name: Math.random().toString() }
export const NEW_USER = { }

export const QUERY = {}

// #region    connectionOptions
export const apiKeyHeaders = {
  Authorization: `Bearer ${YOUR_API_KEY}`
}
export const authClientHeaders = {
  Authorization: `Bearer ${AUTH_CLIENT_TOKEN}`
}
export const authClientForwardedUserHeaders = {
  'X-Forwarded-User': AUTH_CLIENT_FORWARDED_USER_TOKEN
}

export const unauthenticatedConnectionOptions = {
  apiUrl: DEFAULT_API_URL,
  headers: COMMON_HEADERS
}
export const apiKeyConnectionOptions = {
  apiUrl: DEFAULT_API_URL,
  headers: { ...COMMON_HEADERS, ...apiKeyHeaders }
}
export const authClientConnectionOptions = {
  apiUrl: DEFAULT_API_URL,
  headers: { ...COMMON_HEADERS, ...authClientHeaders }
}
export const authClientForwardedUserConnectionOptions = {
  apiUrl: DEFAULT_API_URL,
  headers: { ...COMMON_HEADERS, ...authClientForwardedUserHeaders }
}
// #endregion connectionOptions
