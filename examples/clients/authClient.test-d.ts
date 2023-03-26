import { expectType } from 'tsd'

// #region    import
import HypothesisRestClient, {
  type AuthClientClient
} from '../../src/HypothesisRest'
// #endregion import
// #region    imports
import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import type { IndexResponse } from '../../src/api/root'
import { GROUP_ID, USER_ID, NEW_USER, QUERY, NEW_GROUP } from '../fixtures'
import {Result} from '../../src/api/search'
// #endregion imports

export default async () => {
  // #region    instantiation
  const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
  expectType<AuthClientClient>(client)
  // #endregion instantiation
}
export const endpoints = {
  'GET /': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    root
    expectType<IndexResponse>(
      await client.root()
    )
    // #endregion root
  },
  'GET /search': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    search
    expectType<Result>(
      await client.search(QUERY)
    )
    // #endregion search
  },
  'GET /groups/{id}': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    fetchGroup
    expectType<Group>(
      await client.groups.fetchGroup(GROUP_ID)
    )
    // #endregion    fetchGroup
  },
  'PATCH /groups/{id}': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    updateGroup
    expectType<Group>(
      await client.groups.updateGroup(GROUP_ID, NEW_GROUP)
    )
    // #endregion    updateGroup
  },
  'GET /groups/{id}/members': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    getGroupMembers
    expectType<User[]>(
      await client.groups.getGroupMembers(GROUP_ID)
    )
    // #endregion    getGroupMembers
  },
  'POST /groups/{id}/members/{user}': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    addGroupMember
    expectType<boolean>(
      await client.groups.addGroupMember(GROUP_ID, USER_ID)
    )
    // #endregion    addGroupMember
  },
  'POST /users': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    createUser
    expectType<User>(
      await client.users.createUser(NEW_USER)
    )
    // #endregion    createUser
  },
  'GET /users': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    fetchUser
    expectType<User>(
      await client.users.fetchUser(USER_ID)
    )
    // #endregion    fetchUser
  },
  'PATCH /users/{username}': async () => {
    const client = HypothesisRestClient({ authClient: '<OAUTH2_TOKEN>' })
    // #region    updateUser
    expectType<User>(
      await client.users.updateUser(USER_ID, NEW_USER)
    )
    // #endregion    updateUser
  }
}
