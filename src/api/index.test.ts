import z from 'zod'

import testEndpoint from '../../tests/testEndpoint'

import root, { indexResponseSchema } from './root'
import search, { resultSchema } from './search'

import { annotationSchema, type Annotation } from '../Annotation'
import createAnnotation from './createAnnotation'
import fetchAnnotation from './fetchAnnotation'
import updateAnnotation from './updateAnnotation'
import deleteAnnotation from './deleteAnnotation'
import flagAnnotation from './flagAnnotation'
import hideAnnotation from './hideAnnotation'
import showAnnotation from './showAnnotation'

import { groupSchema, type Group } from '../Group'
import getListOfGroups from './getListOfGroups'
import createGroup from './createGroup'
import fetchGroup from './fetchGroup'
import updateGroup from './updateGroup'
import createOrUpdateGroup from './createOrUpdateGroup'
import getGroupMembers from './getGroupMembers'
import addGroupMember from './addGroupMember'
import removeGroupMember from './removeGroupMember'

import fetchProfile from './fetchProfile'
import fetchUsersGroups from './fetchUsersGroups'

import { type User } from '../User'
import createUser from './createUser'
import fetchUser from './fetchUser'
import updateUser from './updateUser'
import {
  ANNOTATION_ID,
  NEW_ANNOTATION,
  PUBLIC_GROUP_ID,
  GROUP_ID,
  NEW_GROUP,
  USER_ID,
  NEW_USER,
  GROUP_ANNOTATION_ID
} from '../../examples/fixtures'
import { userSchema } from '../User'
import { profileSchema } from '../Profile'


testEndpoint(
  root,
  'root',
  indexResponseSchema,
  [],
  true, true, true, true
)
testEndpoint(
  search,
  'search',
  resultSchema,
  [{}],
  true, true, true, true
)

testEndpoint(
  fetchAnnotation,
  'annotations.fetchAnnotation',
  annotationSchema,
  [ANNOTATION_ID],
  true, true, false, false
)

const createAnnotationResponses = testEndpoint(
  createAnnotation,
  'annotations.createAnnotation',
  annotationSchema,
  [NEW_ANNOTATION],
  false, true, false, false
)
if (!createAnnotationResponses.clientless.apiKey) {
  console.error('Cannot test `updateAnnotation` or `deleteAnnotation` until `createAnnotation` tests pass')
} else {
  const annotationId = (createAnnotationResponses.clientless.apiKey as Annotation).id
  testEndpoint(
    updateAnnotation,
    'annotations.updateAnnotation',
    annotationSchema,
    [annotationId, NEW_ANNOTATION],
    false, true, false, false
  )
  testEndpoint(
    flagAnnotation,
    'annotations.flagAnnotation',
    z.boolean(),
    [annotationId],
    false, true, false, false
  )
  testEndpoint(
    deleteAnnotation,
    'annotations.deleteAnnotation',
    z.string(),
    [annotationId],
    false, true, false, false
  )
}


testEndpoint(
  hideAnnotation,
  'annotations.hideAnnotation',
  z.boolean(),
  [GROUP_ANNOTATION_ID],
  false, true, false, false
)
testEndpoint(
  showAnnotation,
  'annotations.showAnnotation',
  z.boolean(),
  [GROUP_ANNOTATION_ID],
  false, true, false, false
)

testEndpoint(
  getListOfGroups,
  'groups.getListOfGroups',
  z.array(groupSchema),
  [],
  true, true, false, false
)
testEndpoint(
  fetchGroup,
  'groups.fetchGroup',
  groupSchema,
  [PUBLIC_GROUP_ID],
  true, true, true, false
)
const createGroupResponses = testEndpoint(
  createGroup,
  'groups.createGroup',
  groupSchema,
  [NEW_GROUP],
  false, true, false, true
)

if (!createGroupResponses.clientless.apiKey) {
  console.error('Cannot test `updateGroup` or `createOrUpdateGroup` until `createGroup` tests pass')
} else {
  const groupId = (createGroupResponses.clientless.apiKey as Group).id
  testEndpoint(
    updateGroup,
    'groups.updateGroup',
    groupSchema,
    [groupId, NEW_GROUP],
    false, true, true, true
  )
  testEndpoint(
    createOrUpdateGroup,
    'groups.createOrUpdateGroup',
    groupSchema,
    [groupId, NEW_GROUP],
    false, true, false, true
  )
}

testEndpoint(
  getGroupMembers,
  'groups.getGroupMembers',
  z.array(userSchema),
  [PUBLIC_GROUP_ID],
  true, true, true, false
)
testEndpoint(
  addGroupMember,
  'groups.addGroupMember',
  z.boolean(),
  [GROUP_ID, USER_ID],
  false, false, true, false
)
testEndpoint(
  removeGroupMember,
  'groups.removeGroupMember',
  z.boolean(),
  [GROUP_ID],
  false, true, false, false
)

testEndpoint(
  fetchProfile,
  'profile.fetchProfile',
  profileSchema,
  [],
  true, true, false, false
)
testEndpoint(
  fetchUsersGroups,
  'profile.fetchUsersGroups',
  z.array(groupSchema),
  [],
  true, true, false, false
)

testEndpoint(
  fetchUser,
  'users.fetchUser',
  userSchema,
  [USER_ID],
  false, false, true, false
)

const createUserResponses = testEndpoint(
  createUser,
  'users.createUser',
  userSchema,
  [NEW_USER],
  false, false, true, false
)

if (!createUserResponses.clientless.authClient) {
  console.error('Cannot test `updateUser` until `createUser` tests pass')
} else {
  testEndpoint(
    updateUser,
    'users.updateUser',
    userSchema,
    [(createUserResponses.clientless.authClient as User).username, NEW_USER],
    false, false, true, false
  )
}
