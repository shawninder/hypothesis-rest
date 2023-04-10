import { describe } from 'vitest'
import z from 'zod'

import testEndpoint from '../../tests/testEndpoint'

import root, { indexResponseSchema } from './root'
import search, { resultSchema } from './search'

import { annotationSchema } from '../Annotation'
import createAnnotation from './createAnnotation'
import fetchAnnotation from './fetchAnnotation'
import updateAnnotation from './updateAnnotation'
import deleteAnnotation from './deleteAnnotation'
import flagAnnotation from './flagAnnotation'
import hideAnnotation from './hideAnnotation'
import showAnnotation from './showAnnotation'

import { groupSchema } from '../Group'
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

import createUser from './createUser'
import fetchUser from './fetchUser'
// import updateUser from './updateUser'
import {
  ANNOTATION_ID,
  NEW_ANNOTATION,
  PUBLIC_GROUP_ID,
  GROUP_ID,
  NEW_GROUP,
  NEW_GROUP_B,
  USER_ID,
  NEW_USER,
  GROUP_ANNOTATION_ID,
  apiKeyConnectionOptions,
  YOUR_API_KEY
  // AUTH_CLIENT_TOKEN
} from '../../examples/fixtures'
import { userSchema } from '../User'
import { profileSchema } from '../Profile'
import HypothesisRest from '../HypothesisRest'


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

testEndpoint(
  createAnnotation,
  'annotations.createAnnotation',
  annotationSchema,
  [NEW_ANNOTATION],
  false, true, false, false
)

describe('Creating new annotations with which to test `updateAnnotation`, `flagAnnotation` and `deleteAnnotation`…', async () => {
  const client = HypothesisRest({ apiKey: YOUR_API_KEY })
  const [clientMadeAnnotation, clientlessMadeAnnotation] = [
    await createAnnotation(apiKeyConnectionOptions, NEW_ANNOTATION),
    await client.annotations.createAnnotation(NEW_ANNOTATION)
  ]
  const clientMadeAnnotationId = clientMadeAnnotation.id
  const clientlessMadeAnnotationId = clientlessMadeAnnotation.id
  testEndpoint(
    updateAnnotation,
    'annotations.updateAnnotation',
    annotationSchema,
    {
      clientless: [clientlessMadeAnnotationId, NEW_ANNOTATION],
      usingClient: [clientMadeAnnotationId, NEW_ANNOTATION]
    },
    false, true, false, false
  )
  testEndpoint(
    flagAnnotation,
    'annotations.flagAnnotation',
    z.boolean(),
    {
      clientless: [clientlessMadeAnnotationId],
      usingClient: [clientMadeAnnotationId]
    },
    false, true, false, false
  )
  testEndpoint(
    deleteAnnotation,
    'annotations.deleteAnnotation',
    z.string(),
    {
      clientless: [clientlessMadeAnnotationId],
      usingClient: [clientMadeAnnotationId]
    },
    false, true, false, false
  )
})

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
testEndpoint(
  createGroup,
  'groups.createGroup',
  groupSchema,
  {
    clientless: [NEW_GROUP],
    usingClient: [NEW_GROUP_B]
  },
  false, true, false, true
)

describe('Creating a new group to test `updateGroup` and `createOrUpdateGroup`…', async () => {
  const newGroup = await createGroup(apiKeyConnectionOptions, NEW_GROUP)
  const newGroupId = newGroup.id
  testEndpoint(
    updateGroup,
    'groups.updateGroup',
    groupSchema,
    [newGroupId, NEW_GROUP],
    false, true, true, true
  )
  testEndpoint(
    createOrUpdateGroup,
    'groups.createOrUpdateGroup',
    groupSchema,
    [newGroupId, NEW_GROUP],
    false, true, false, true
  )
})

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

testEndpoint(
  createUser,
  'users.createUser',
  userSchema,
  [NEW_USER],
  false, false, true, false
)

// describe.skip('Creating new user to test `updateUser`…', async () => {
//   const client = HypothesisRest({ authClient: AUTH_CLIENT_TOKEN })
//   const newUser = await client.users.createUser(NEW_USER)
//   const newUsername = newUser.username
//   testEndpoint(
//     updateUser,
//     'users.updateUser',
//     userSchema,
//     [newUsername, NEW_USER],
//     false, false, true, false
//   )
// })
