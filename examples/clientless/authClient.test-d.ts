import { expectType } from 'tsd'

import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import root, { type IndexResponse } from '../../src/api/root'
import search, { type Result } from '../../src/api/search'
import fetchGroup from '../../src/api/fetchGroup'
import updateGroup from '../../src/api/updateGroup'
import getGroupMembers from '../../src/api/getGroupMembers'
import addGroupMember from '../../src/api/addGroupMember'
import createUser from '../../src/api/createUser'
import fetchUser from '../../src/api/fetchUser'
import updateUser from '../../src/api/updateUser'

import {
  GROUP_ID,
  authClientConnectionOptions,
  QUERY,
  NEW_GROUP,
  USER_ID,
  NEW_USER
} from '../fixtures'

export default {
  'GET /': async () => {
    // #region    root
    expectType<IndexResponse>(
      await root(authClientConnectionOptions)
    )
    // #endregion root
  },
  'GET /search': async () => {
    // #region    search
    expectType<Result>(
      await search(authClientConnectionOptions, QUERY)
    )
    // #endregion search
  },
  'GET /groups/{id}': async () => {
    // #region    fetchGroup
    expectType<Group>(
      await fetchGroup(authClientConnectionOptions, GROUP_ID)
    )
    // #endregion fetchGroup
  },
  'PATCH /groups/{id}': async () => {
    // #region    updateGroup
    expectType<Group>(await updateGroup(authClientConnectionOptions, GROUP_ID, NEW_GROUP))
    // #endregion updateGroup
  },
  'GET /groups/{id}/members': async () => {
    // #region    getGroupMembers
    expectType<User[]>(await getGroupMembers(authClientConnectionOptions, GROUP_ID))
    // #endregion getGroupMembers
  },
  // REMOVE FROM API KEY
  'POST /groups/{id}/members/{user}': async () => {
    // #region    addGroupMember
    expectType<boolean>(await addGroupMember(authClientConnectionOptions, GROUP_ID, USER_ID))
    // #endregion addGroupMember
  },
  // REMOVE FROM API KEY
  'POST /users': async () => {
    // #region    createUser
    expectType<User>(await createUser(authClientConnectionOptions, NEW_USER))
    // #endregion createUser
  },
  // REMOVE FROM API KEY
  'GET /users/{user}': async () => {
    // #region    fetchUser
    expectType<User>(await fetchUser(authClientConnectionOptions, USER_ID))
    // #endregion fetchUser
  },
  // REMOVE FROM API KEY
  'PATCH /users/{username}': async () => {
    // #region    updateUser
    expectType<User>(await updateUser(authClientConnectionOptions, USER_ID, NEW_USER))
    // #endregion updateUser
  }
}