import { expectType } from 'tsd'

// #region    import
import HypothesisRestClient, {
  type AuthClientForwardedUserClient
} from '../../src/HypothesisRest'
// #endregion import
// #region    imports
import type { Group } from '../../src/Group'
import type { IndexResponse } from '../../src/api/root'
import { type Result } from '../../src/api/search'
import { GROUP_ID, NEW_GROUP, QUERY } from '../fixtures'
// #endregion imports

export default async () => {
  // #region    instantiation
  const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
  expectType<AuthClientForwardedUserClient>(client)
  // #endregion instantiation
}

export const endpoints = {
  'GET /': async () => {
    const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
    // #region    root
    expectType<IndexResponse>(
      await client.root()
    )
    // #endregion root
  },
  'GET /search': async () => {
    const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
    // #region    search
    expectType<Result>(
      await client.search(QUERY)
    )
    // #endregion search
  },
  'POST /groups': async () => {
    const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
    // #region    createGroup
    expectType<Group>(
      await client.groups.createGroup(NEW_GROUP)
    )
    // #endregion    createGroup
  },
  'PATCH /groups/{id}': async () => {
    const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
    // #region    updateGroup
    expectType<Group>(
      await client.groups.updateGroup(GROUP_ID, NEW_GROUP)
    )
    // #endregion    updateGroup
  },
  'PUT /groups/{id}': async () => {
    const client = HypothesisRestClient({ authClientForwardedUser: '<FORWARDED_USER_OAUTH2_TOKEN>' })
    // #region    createOrUpdateGroup
    expectType<Group>(
      await client.groups.createOrUpdateGroup(GROUP_ID, NEW_GROUP)
    )
    // #endregion    createOrUpdateGroup
  }
}