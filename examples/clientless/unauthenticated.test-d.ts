import { expectType } from 'tsd'

import type { Annotation } from '../../src/Annotation'
import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import type { Profile } from '../../src/Profile'

import root, { type IndexResponse } from '../../src/api/root'
import search, { type Result } from '../../src/api/search'
import fetchAnnotation from '../../src/api/fetchAnnotation'
import getListOfGroups from '../../src/api/getListOfGroups'
import fetchGroup from '../../src/api/fetchGroup'
import getGroupMembers from '../../src/api/getGroupMembers'
import fetchProfile from '../../src/api/fetchProfile'
import fetchUsersGroups from '../../src/api/fetchUsersGroups'

import {
  ANNOTATION_ID,
  GROUP_ID,
  unauthenticatedConnectionOptions,
  QUERY
} from '../fixtures'

export default {
  'GET /': async () => {
    // #region    root
    expectType<IndexResponse>(
      await root(unauthenticatedConnectionOptions)
    )
    // #endregion root
  },
  'GET /search': async () => {
    // #region    search
    expectType<Result>(
      await search(unauthenticatedConnectionOptions, QUERY)
    )
    // #endregion search
  },
  'GET /annotations/{id}': async () => {
    // #region    fetchAnnotation
    expectType<Annotation>(
      await fetchAnnotation(unauthenticatedConnectionOptions, ANNOTATION_ID)
    )
    // #endregion fetchAnnotation
  },
  'GET /groups': async () => {
    // #region    getListOfGroups
    expectType<Group[]>(
      await getListOfGroups(unauthenticatedConnectionOptions)
    )
    // #endregion getListOfGroups
  },
  'GET /groups/{id}': async () => {
    // #region    fetchGroup
    expectType<Group>(
      await fetchGroup(unauthenticatedConnectionOptions, GROUP_ID)
    )
    // #endregion fetchGroup
  },
  'GET /groups/{id}/members': async () => {
    // #region    getGroupMembers
    expectType<User[]>(await getGroupMembers(unauthenticatedConnectionOptions, GROUP_ID))
    // #endregion getGroupMembers
  },
  'GET /profile': async () => {
    // #region    fetchProfile
    expectType<Profile>(await fetchProfile(unauthenticatedConnectionOptions))
    // #endregion fetchProfile
  },
  'GET /profile/groups': async () => {
    // #region    fetchUsersGroups
    expectType<Group[]>(await fetchUsersGroups(unauthenticatedConnectionOptions))
    // #endregion fetchUsersGroups
  }
}
