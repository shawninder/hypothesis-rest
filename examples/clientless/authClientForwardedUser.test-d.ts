import { expectType } from 'tsd'

import type { Group } from '../../src/Group'

import root, { type IndexResponse } from '../../src/api/root'
import search, { type Result } from '../../src/api/search'
import createGroup from '../../src/api/createGroup'
import updateGroup from '../../src/api/updateGroup'
import createOrUpdateGroup from '../../src/api/createOrUpdateGroup'

import {
  authClientForwardedUserConnectionOptions,
  QUERY,
  NEW_GROUP,
  GROUP_ID
} from '../fixtures'

export default {
  'GET /': async () => {
    // #region    root
    expectType<IndexResponse>(
      await root(authClientForwardedUserConnectionOptions)
    )
    // #endregion root
  },
  'GET /search': async () => {
    // #region    search
    expectType<Result>(
      await search(authClientForwardedUserConnectionOptions, QUERY)
    )
    // #endregion search
  },
  'POST /groups': async () => {
    // #region    createGroup
    expectType<Group>(await createGroup(authClientForwardedUserConnectionOptions, NEW_GROUP))
    // #endregion createGroup
  },
  'PATCH /groups/{id}': async () => {
    // #region    updateGroup
    expectType<Group>(await updateGroup(authClientForwardedUserConnectionOptions, GROUP_ID, NEW_GROUP))
    // #endregion updateGroup
  },
  'PUT /groups/{id}': async () => {
    // #region    createOrUpdateGroup
    expectType<Group>(await createOrUpdateGroup(authClientForwardedUserConnectionOptions, GROUP_ID, NEW_GROUP))
    // #endregion createOrUpdateGroup
  }
}