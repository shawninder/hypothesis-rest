import { expectType } from 'tsd'

// #region    import
import HypothesisRestClient, {
  type UnauthenticatedClient
} from '../../src/HypothesisRest'
// #endregion import

// #region    imports
import type { Annotation } from '../../src/Annotation'
import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import type { Profile } from '../../src/Profile'
import type { ServiceRoot } from '../../src/api/root'
import { ANNOTATION_ID, GROUP_ID, QUERY } from '../fixtures'
import {Result} from '../../src/api/search'
// #endregion imports

export default async () => {
  // #region    instantiation
  const client = HypothesisRestClient()
  expectType<UnauthenticatedClient>(client)
  // #endregion instantiation
}

export const endpoints = {
  'GET /': async () => {
    const client = HypothesisRestClient()
    // #region    root
    expectType<ServiceRoot>(
      await client.root()
    )
    // #endregion root
  },
  'GET /search': async () => {
    const client = HypothesisRestClient()
    // #region    search
    expectType<Result>(
      await client.search(QUERY)
    )
    // #endregion search
  },
  'GET /annotations/{id}': async () => {
    const client = HypothesisRestClient()
    // #region    fetchAnnotation
    expectType<Annotation>(
      await client.annotations.fetchAnnotation(ANNOTATION_ID)
    )
    // #endregion fetchAnnotation
  },
  'GET /groups': async () => {
    const client = HypothesisRestClient()
    // #region    getListOfGroups
    expectType<Group[]>(
      await client.groups.getListOfGroups()
    )
    // #endregion    getListOfGroups
  },
  'GET /groups/{id}': async () => {
    const client = HypothesisRestClient()
    // #region    fetchGroup
    expectType<Group>(
      await client.groups.fetchGroup(GROUP_ID)
    )
    // #endregion    fetchGroup
  },
  'GET /groups/{id}/members': async () => {
    const client = HypothesisRestClient()
    // #region    getGroupMembers
    expectType<User[]>(
      await client.groups.getGroupMembers(GROUP_ID)
    )
    // #endregion    getGroupMembers
  },
  'GET /profile': async () => {
    const client = HypothesisRestClient()
    // #region    fetchProfile
    expectType<Profile>(
      await client.profile.fetchProfile()
    )
    // #endregion    fetchProfile
  },
  'GET /profile/groups': async () => {
    const client = HypothesisRestClient()
    // #region    fetchUsersGroups
    expectType<Group[]>(
      await client.profile.fetchUsersGroups()
    )
    // #endregion    fetchUsersGroups
  }
}
