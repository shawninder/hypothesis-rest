import { expectType } from 'tsd'

import type { Annotation } from '../../src/Annotation'
import type { Group } from '../../src/Group'
import type { User } from '../../src/User'
import type { Profile } from '../../src/Profile'
import root, { type ServiceRoot } from '../../src/api/root'
import search, { type Result } from '../../src/api/search'
import createAnnotation from '../../src/api/createAnnotation'
import fetchAnnotation from '../../src/api/fetchAnnotation'
import updateAnnotation from '../../src/api/updateAnnotation'
import deleteAnnotation from '../../src/api/deleteAnnotation'
import flagAnnotation from '../../src/api/flagAnnotation'
import hideAnnotation from '../../src/api/hideAnnotation'
import showAnnotation from '../../src/api/showAnnotation'
import getListOfGroups from '../../src/api/getListOfGroups'
import createGroup from '../../src/api/createGroup'
import fetchGroup from '../../src/api/fetchGroup'
import updateGroup from '../../src/api/updateGroup'
import createOrUpdateGroup from '../../src/api/createOrUpdateGroup'
import getGroupMembers from '../../src/api/getGroupMembers'
import removeGroupMember from '../../src/api/removeGroupMember'
import fetchProfile from '../../src/api/fetchProfile'
import fetchUsersGroups from '../../src/api/fetchUsersGroups'


import {
  apiKeyConnectionOptions,
  ANNOTATION_ID,
  GROUP_ID,
  NEW_ANNOTATION,
  QUERY,
  NEW_GROUP,
  USER_ID
} from '../fixtures'

export default {
  'GET /': async () => {
    // #region    root
    expectType<ServiceRoot>(
      await root(apiKeyConnectionOptions)
    )
    // #endregion root
  },
  'GET /search': async () => {
    // #region    search
    expectType<Result>(
      await search(apiKeyConnectionOptions, QUERY)
    )
    // #endregion search
  },
  'GET /annotations/{id}': async () => {
    // #region    fetchAnnotation
    expectType<Annotation>(
      await fetchAnnotation(apiKeyConnectionOptions, ANNOTATION_ID)
    )
    // #endregion fetchAnnotation
  },
  'POST /annotations': async () => {
    // #region    createAnnotation
    expectType<Annotation>(
      await createAnnotation(apiKeyConnectionOptions, NEW_ANNOTATION)
    )
    // #endregion createAnnotation
  },
  'PATCH /annotations/{id}': async () => {
    // #region    updateAnnotation
    expectType<Annotation>(
      await updateAnnotation(apiKeyConnectionOptions, ANNOTATION_ID, NEW_ANNOTATION)
    )
    // #endregion updateAnnotation
  },
  'DELETE /annotations/{id}': async () => {
    // #region    deleteAnnotation
    expectType<Annotation['id']>(
      await deleteAnnotation(apiKeyConnectionOptions, ANNOTATION_ID)
    )
    // #endregion deleteAnnotation
  },
  'PUT /annotations/{id}/flag': async () => {
    // #region    flagAnnotation
    expectType<boolean>(
      await flagAnnotation(apiKeyConnectionOptions, ANNOTATION_ID)
    )
    // #endregion flagAnnotation
  },
  'PUT /annotations/{id}/hide': async () => {
    // #region    hideAnnotation
    expectType<boolean>(
      await hideAnnotation(apiKeyConnectionOptions, ANNOTATION_ID)
    )
    // #endregion hideAnnotation
  },
  'DELETE /annotations/{id}/hide': async () => {
    // #region    showAnnotation
    expectType<boolean>(
      await showAnnotation(apiKeyConnectionOptions, ANNOTATION_ID)
    )
    // #endregion showAnnotation
  },
  'GET /groups': async () => {
    // #region    getListOfGroups
    expectType<Group[]>(
      await getListOfGroups(apiKeyConnectionOptions)
    )
    // #endregion getListOfGroups
  },
  'POST /groups': async () => {
    // #region    createGroup
    expectType<Group>(await createGroup(apiKeyConnectionOptions, NEW_GROUP))
    // #endregion createGroup
  },
  'GET /groups/{id}': async () => {
    // #region    fetchGroup
    expectType<Group>(
      await fetchGroup(apiKeyConnectionOptions, GROUP_ID)
    )
    // #endregion fetchGroup
  },
  'PATCH /groups/{id}': async () => {
    // #region    updateGroup
    expectType<Group>(await updateGroup(apiKeyConnectionOptions, GROUP_ID, NEW_GROUP))
    // #endregion updateGroup
  },
  'PUT /groups/{id}': async () => {
    // #region    createOrUpdateGroup
    expectType<Group>(await createOrUpdateGroup(apiKeyConnectionOptions, GROUP_ID, NEW_GROUP))
    // #endregion createOrUpdateGroup
  },
  'GET /groups/{id}/members': async () => {
    // #region    getGroupMembers
    expectType<User[]>(await getGroupMembers(apiKeyConnectionOptions, GROUP_ID))
    // #endregion getGroupMembers
  },
  'DELETE /groups/{id}/members/{user}': async () => {
    // #region    removeGroupMember
    expectType<boolean>(await removeGroupMember(apiKeyConnectionOptions, GROUP_ID))
    // #endregion removeGroupMember
  },
  'GET /profile': async () => {
    // #region    fetchProfile
    expectType<Profile>(await fetchProfile(apiKeyConnectionOptions))
    // #endregion fetchProfile
  },
  'GET /profile/groups': async () => {
    // #region    fetchUsersGroups
    expectType<Group[]>(await fetchUsersGroups(apiKeyConnectionOptions))
    // #endregion fetchUsersGroups
  }
}