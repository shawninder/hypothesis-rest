import { expectType } from 'tsd'

// #region    import
import HypothesisRestClient, {
  type ApiKeyClient
} from '../../src/HypothesisRest'
// #endregion import
// #region    imports
import type { Annotation } from '../../src/Annotation'
import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import type { Profile } from '../../src/Profile'
import type { IndexResponse } from '../../src/api/root'
import {
  ANNOTATION_ID,
  GROUP_ID,
  NEW_ANNOTATION,
  NEW_GROUP,
  QUERY,
  USER_ID
} from '../fixtures'
import {Result} from '../../src/api/search'
// #endregion imports

export default async () => {
  // #region    instantiation
  const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
  expectType<ApiKeyClient>(client)
  // #endregion instantiation
}

export const endpoints = {
  'GET /': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    root
    expectType<IndexResponse>(
      await client.root()
    )
    // #endregion root
  },
  'GET /search': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    search
    expectType<Result>(
      await client.search(QUERY)
    )
    // #endregion search
  },
  'POST /annotations': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    createAnnotation
    expectType<Annotation>(
      await client.annotations.createAnnotation(NEW_ANNOTATION)
    )
    // #endregion createAnnotation
  },
  'GET /annotations/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    fetchAnnotation
    expectType<Annotation>(
      await client.annotations.fetchAnnotation(ANNOTATION_ID)
    )
    // #endregion fetchAnnotation
  },
  'PATCH /annotations/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    updateAnnotation
    expectType<Annotation>(
      await client.annotations.updateAnnotation(ANNOTATION_ID, NEW_ANNOTATION)
    )
    // #endregion updateAnnotation
  },
  'DELETE /annotations/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    deleteAnnotation
    expectType<string>(
      await client.annotations.deleteAnnotation(ANNOTATION_ID)
    )
    // #endregion deleteAnnotation
  },
  'PUT /annotations/{id}/flag': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    flagAnnotation
    expectType<boolean>(
      await client.annotations.flagAnnotation(ANNOTATION_ID)
    )
    // #endregion flagAnnotation
  },
  'PUT /annotations/{id}/hide': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    hideAnnotation
    expectType<boolean>(
      await client.annotations.hideAnnotation(ANNOTATION_ID)
    )
    // #endregion hideAnnotation
  },
  'DELETE /annotations/{id}/hide': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    showAnnotation
    expectType<boolean>(
      await client.annotations.showAnnotation(ANNOTATION_ID)
    )
    // #endregion showAnnotation
  },
  'GET /groups': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    getListOfGroups
    expectType<Group[]>(
      await client.groups.getListOfGroups()
    )
    // #endregion    getListOfGroups
  },
  'POST /groups': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    createGroup
    expectType<Group>(
      await client.groups.createGroup(NEW_GROUP)
    )
    // #endregion    createGroup
  },
  'GET /groups/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    fetchGroup
    expectType<Group>(
      await client.groups.fetchGroup(GROUP_ID)
    )
    // #endregion    fetchGroup
  },
  'PATCH /groups/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    updateGroup
    expectType<Group>(
      await client.groups.updateGroup(GROUP_ID, NEW_GROUP)
    )
    // #endregion    updateGroup
  },
  'PUT /groups/{id}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    createOrUpdateGroup
    expectType<Group>(
      await client.groups.createOrUpdateGroup(GROUP_ID, NEW_GROUP)
    )
    // #endregion    createOrUpdateGroup
  },
  'GET /groups/{id}/members': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    getGroupMembers
    expectType<User[]>(
      await client.groups.getGroupMembers(GROUP_ID)
    )
    // #endregion    getGroupMembers
  },
  'DELETE /groups/{id}/members/{user}': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    removeGroupMember
    expectType<boolean>(
      await client.groups.removeGroupMember(GROUP_ID)
    )
    // #endregion    removeGroupMember
  },
  'GET /profile': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    fetchProfile
    expectType<Profile>(
      await client.profile.fetchProfile()
    )
    // #endregion    fetchProfile
  },
  'GET /profile/groups': async () => {
    const client = HypothesisRestClient({ apiKey: '<YOUR_API_KEY>' })
    // #region    fetchUsersGroups
    expectType<Group[]>(
      await client.profile.fetchUsersGroups()
    )
    // #endregion    fetchUsersGroups
  }
}
