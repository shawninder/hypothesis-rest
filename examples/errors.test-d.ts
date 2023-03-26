import { expectType } from 'tsd'

import { type ZodError } from 'zod'

import HypothesisRestClient from '../src/HypothesisRest'
import { ApiError } from '../src/hypothesis-fetch'
import createAnnotation from '../src/api/createAnnotation'

import {
  apiKeyConnectionOptions,
  NEW_ANNOTATION,
  YOUR_API_KEY
} from './fixtures'

export default {
    'Error handling using try…catch': {
    'Using a Client': async () => {
      // #region    client-example
      const client = HypothesisRestClient({ apiKey: YOUR_API_KEY })
      try {
        await client.annotations.createAnnotation(NEW_ANNOTATION)
      } catch (ex) {
        console.error(ex)
      }
      // #endregion client-example
    },
    'Client-less': async () => {
      // #region    clientless-example
      try {
        await createAnnotation(apiKeyConnectionOptions, NEW_ANNOTATION)
      } catch (ex) {
        console.error(ex)
      }
      // #endregion clientless-example
    }
  }
}